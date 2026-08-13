import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import type { AutocompleteItem } from "@earendil-works/pi-tui";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const CONFIG_PATH = "/Users/zach/Documents/denv/dotfiles/ai/agents/pi/ctx.toml";
const MAX_DIR_ENTRIES = 300;
const MAX_FILE_BYTES = 80 * 1024;
const EXCLUDED_DIRS = new Set([
	".git",
	".next",
	".turbo",
	".venv",
	"build",
	"coverage",
	"dist",
	"node_modules",
	"target",
	"vendor",
]);

type Source = {
	section: string;
	key: string;
	name: string;
	path: string;
};

type ResolvedContext = {
	label: string;
	path: string;
	kind: "file" | "directory";
	content: string;
};

function expandHome(rawPath: string): string {
	if (rawPath === "~") return os.homedir();
	if (rawPath.startsWith("~/")) return path.join(os.homedir(), rawPath.slice(2));
	return rawPath;
}

function parseConfig(): Source[] {
	let content = "";
	try {
		content = fs.readFileSync(CONFIG_PATH, "utf8");
	} catch {
		return [];
	}

	const sources: Source[] = [];
	let section = "default";
	for (const rawLine of content.split(/\r?\n/)) {
		const line = rawLine.replace(/\s+#.*$/, "").trim();
		if (line.length === 0 || line.startsWith("#")) continue;

		const sectionMatch = line.match(/^\[([A-Za-z0-9_-]+)\]$/);
		if (sectionMatch) {
			section = sectionMatch[1]!;
			continue;
		}

		const kvMatch = line.match(/^([A-Za-z0-9_-]+)\s*=\s*"([^"]*)"\s*$/);
		if (!kvMatch) continue;

		const key = kvMatch[1]!;
		const sourcePath = path.resolve(expandHome(kvMatch[2]!));
		sources.push({ section, key, name: `${section}.${key}`, path: sourcePath });
	}
	return sources.sort((a, b) => a.name.localeCompare(b.name));
}

function tokenize(input: string): string[] {
	const tokens: string[] = [];
	let current = "";
	let quote: "'" | '"' | undefined;
	let escaping = false;

	for (const char of input) {
		if (escaping) {
			current += char;
			escaping = false;
			continue;
		}
		if (char === "\\") {
			escaping = true;
			continue;
		}
		if (quote) {
			if (char === quote) quote = undefined;
			else current += char;
			continue;
		}
		if (char === "'" || char === '"') {
			quote = char;
			continue;
		}
		if (/\s/.test(char)) {
			if (current.length > 0) {
				tokens.push(current);
				current = "";
			}
			continue;
		}
		current += char;
	}

	if (escaping) current += "\\";
	if (current.length > 0) tokens.push(current);
	return tokens;
}

function getCompletionPrefix(args: string): string {
	const match = args.match(/(?:^|\s)(\S*)$/);
	return match?.[1] ?? "";
}

function buildArgumentCompletionValue(args: string, replacement: string, appendSpace: boolean): string {
	const prefix = getCompletionPrefix(args);
	const beforePrefix = args.slice(0, args.length - prefix.length);
	return `${beforePrefix}${replacement}${appendSpace ? " " : ""}`;
}

function sourceNamesFor(source: Source, _sources: Source[]): string[] {
	return [source.name];
}

function findSource(input: string, sources: Source[]): { source: Source; relativePath: string } | undefined {
	const normalized = input.replace(/^\/+/, "");
	const candidates = sources.flatMap((source) =>
		sourceNamesFor(source, sources).map((alias) => ({ source, alias })),
	);
	candidates.sort((a, b) => b.alias.length - a.alias.length);

	for (const candidate of candidates) {
		if (normalized === candidate.alias) return { source: candidate.source, relativePath: "" };
		if (normalized.startsWith(`${candidate.alias}/`)) {
			return { source: candidate.source, relativePath: normalized.slice(candidate.alias.length + 1) };
		}
	}
}

function safeResolve(root: string, relativePath: string): string | undefined {
	const resolved = path.resolve(root, relativePath);
	const relative = path.relative(root, resolved);
	if (relative.startsWith("..") || path.isAbsolute(relative)) return undefined;
	return resolved;
}

function readFileCapped(filePath: string): string {
	const buffer = fs.readFileSync(filePath);
	if (buffer.byteLength <= MAX_FILE_BYTES) return buffer.toString("utf8").trimEnd();
	return [
		buffer.subarray(0, MAX_FILE_BYTES).toString("utf8").trimEnd(),
		`\n\n[Truncated by /ctx: file is ${buffer.byteLength} bytes; first ${MAX_FILE_BYTES} bytes shown.]`,
	].join("");
}

function shouldSkipEntry(entry: fs.Dirent): boolean {
	if (entry.name.startsWith(".")) return true;
	if (entry.isDirectory() && EXCLUDED_DIRS.has(entry.name)) return true;
	return false;
}

function listDirectoryTree(root: string): string {
	const results: string[] = [];
	const stack = [root];

	while (stack.length > 0 && results.length < MAX_DIR_ENTRIES) {
		const dir = stack.shift()!;
		let entries: fs.Dirent[] = [];
		try {
			entries = fs.readdirSync(dir, { withFileTypes: true });
		} catch {
			continue;
		}

		for (const entry of entries.sort((a, b) => Number(b.isDirectory()) - Number(a.isDirectory()) || a.name.localeCompare(b.name))) {
			if (shouldSkipEntry(entry)) continue;
			const entryPath = path.join(dir, entry.name);
			const relativePath = path.relative(root, entryPath);
			if (entry.isDirectory()) {
				results.push(`${relativePath}/`);
				stack.push(entryPath);
			} else if (entry.isFile()) {
				results.push(relativePath);
			}
			if (results.length >= MAX_DIR_ENTRIES) break;
		}
	}

	const suffix = results.length >= MAX_DIR_ENTRIES ? `\n... truncated at ${MAX_DIR_ENTRIES} entries` : "";
	return [
		`Directory map under ${root}:`,
		"This is a path map only. /ctx did not read every file in this directory.",
		"Use Pi tools to inspect only the files needed for the user's task.",
		...results.map((file) => `- ${file}`),
	].join("\n") + suffix;
}

function resolveContext(token: string, sources: Source[]): ResolvedContext {
	const match = findSource(token, sources);
	if (!match) throw new Error(`Unknown context source: ${token}`);

	const targetPath = match.relativePath.length > 0 ? safeResolve(match.source.path, match.relativePath) : match.source.path;
	if (!targetPath) throw new Error(`Refusing path outside source root: ${token}`);

	const stat = fs.statSync(targetPath);
	if (stat.isDirectory()) {
		return {
			label: token,
			path: targetPath,
			kind: "directory",
			content: listDirectoryTree(targetPath),
		};
	}
	if (stat.isFile()) {
		return {
			label: token,
			path: targetPath,
			kind: "file",
			content: readFileCapped(targetPath),
		};
	}
	throw new Error(`Not a file or directory: ${targetPath}`);
}

function completeSourcePath(source: Source, alias: string, relativePrefix: string): AutocompleteItem[] {
	const slash = relativePrefix.lastIndexOf("/");
	const dirPart = slash >= 0 ? relativePrefix.slice(0, slash + 1) : "";
	const leafPrefix = slash >= 0 ? relativePrefix.slice(slash + 1) : relativePrefix;
	const dirPath = safeResolve(source.path, dirPart);
	if (!dirPath) return [];

	let entries: fs.Dirent[] = [];
	try {
		entries = fs.readdirSync(dirPath, { withFileTypes: true });
	} catch {
		return [];
	}

	return entries
		.filter((entry) => !shouldSkipEntry(entry))
		.filter((entry) => entry.isDirectory() || entry.isFile())
		.filter((entry) => entry.name.startsWith(leafPrefix))
		.sort((a, b) => Number(b.isDirectory()) - Number(a.isDirectory()) || a.name.localeCompare(b.name))
		.slice(0, 50)
		.map((entry) => {
			const value = `${alias}/${dirPart}${entry.name}${entry.isDirectory() ? "/" : ""}`;
			return {
				value,
				label: value,
				description: entry.isDirectory() ? "directory" : "Markdown file",
			};
		});
}

function getCompletions(args: string): AutocompleteItem[] | null {
	const sources = parseConfig();
	const prefix = getCompletionPrefix(args).replace(/^\/+/, "");
	const used = new Set(tokenize(args).filter((token) => token !== "--"));
	const sourcePathMatch = findSource(prefix, sources);

	if (sourcePathMatch && prefix.includes("/")) {
		const alias = prefix.slice(0, prefix.length - sourcePathMatch.relativePath.length - 1);
		const items = completeSourcePath(sourcePathMatch.source, alias, sourcePathMatch.relativePath).map((item) => ({
			...item,
			value: buildArgumentCompletionValue(args, item.value, !item.label.endsWith("/")),
		}));
		return items.length > 0 ? items : null;
	}

	const items = sources.flatMap((source) =>
		sourceNamesFor(source, sources).map((alias) => ({ source, alias })),
	)
		.filter(({ alias }) => !used.has(alias) || alias === prefix)
		.filter(({ alias }) => alias.startsWith(prefix))
		.map(({ source, alias }) => ({
			value: buildArgumentCompletionValue(args, alias, true),
			label: alias,
			description: source.path,
		}));
	return items.length > 0 ? items : null;
}

export default function ctxExtension(pi: ExtensionAPI) {
	pi.registerCommand("ctx", {
		description: "Load configured Markdown context sources and send a task",
		getArgumentCompletions: getCompletions,
		handler: async (args, ctx) => {
			const sources = parseConfig();
			const tokens = tokenize(args);
			const separator = tokens.indexOf("--");
			const contextTokens: string[] = [];
			let task = "";

			if (separator >= 0) {
				contextTokens.push(...tokens.slice(0, separator));
				task = tokens.slice(separator + 1).join(" ");
			} else {
				for (let i = 0; i < tokens.length; i++) {
					const token = tokens[i]!;
					if (findSource(token, sources)) {
						contextTokens.push(token);
						continue;
					}
					task = tokens.slice(i).join(" ");
					break;
				}
			}

			if (contextTokens.length === 0) {
				const names = sources.map((source) => source.name).join(", ") || "(none)";
				ctx.ui.notify(`Usage: /ctx <source...> -- <task>. Sources: ${names}`, "warning");
				return;
			}
			let contexts: ResolvedContext[] = [];
			try {
				contexts = contextTokens.map((token) => resolveContext(token, sources));
			} catch (error) {
				ctx.ui.notify(error instanceof Error ? error.message : String(error), "error");
				return;
			}

			const sections = contexts.map((context) =>
				[
					`<!-- BEGIN /ctx ${context.label} (${context.kind}: ${context.path}) -->`,
					context.content,
					`<!-- END /ctx ${context.label} -->`,
				].join("\n"),
			);

			const effectiveTask = task.trim() || [
				"Acknowledge that the configured context was loaded.",
				"Briefly list each loaded context label and path.",
				"Do not analyze the content yet; wait for the user's next instruction.",
			].join(" ");

			const prompt = [
				"Use the following configured context for this task.",
				"",
				...sections.flatMap((section) => [section, ""]),
				"Task:",
				effectiveTask,
			].join("\n");

			pi.sendUserMessage(prompt);
		},
	});
}
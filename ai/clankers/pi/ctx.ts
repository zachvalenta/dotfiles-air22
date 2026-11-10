import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import type { AutocompleteItem } from "@earendil-works/pi-tui";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const CONFIG_PATH = "/Users/zach/Documents/denv/dotfiles/ai/clankers/pi/ctx.yaml";
const MAX_FILE_BYTES = 80 * 1024;

type YamlValue = string | null | YamlMap;
type YamlMap = Record<string, YamlValue>;

type Strategy = {
	name: string;
	tool?: string;
	guide: string;
};

type Source = {
	name: string;
	filepath: string;
	strategy: Strategy;
	index?: string;
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

function yamlScalar(value: string): string | null {
	const trimmed = value.trim();
	if (trimmed === "null" || trimmed === "~") return null;
	if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
		return trimmed.slice(1, -1);
	}
	return trimmed;
}

// Deliberately small YAML reader: ctx.yaml is a mapping-only config. Keeping it
// dependency-free lets this extension load from a dotfiles directory directly.
function parseYaml(text: string): YamlMap {
	const root: YamlMap = {};
	const stack: Array<{ indent: number; map: YamlMap }> = [{ indent: -1, map: root }];

	for (const rawLine of text.split(/\r?\n/)) {
		if (/^\s*(?:#|$)/.test(rawLine)) continue;
		const indent = rawLine.match(/^\s*/)?.[0].length ?? 0;
		const match = rawLine.trim().match(/^([^:#][^:]*):(?:\s*(.*))?$/);
		if (!match) throw new Error(`Unsupported YAML line: ${rawLine}`);
		while (stack.length > 1 && indent <= stack[stack.length - 1]!.indent) stack.pop();
		const parent = stack[stack.length - 1]!;
		const key = match[1]!.trim();
		const value = match[2] ?? "";
		if (value.trim() === "") {
			const child: YamlMap = {};
			parent.map[key] = child;
			stack.push({ indent, map: child });
		} else {
			parent.map[key] = yamlScalar(value);
		}
	}
	return root;
}

function stringField(map: YamlMap, key: string, required = true): string | undefined {
	const value = map[key];
	if (typeof value === "string") return value;
	if (!required && value === null) return undefined;
	if (required) throw new Error(`Missing string field \`${key}\``);
	return undefined;
}

function readGuide(configDir: string, guidePath: string): string {
	const resolved = path.resolve(configDir, expandHome(guidePath));
	return fs.readFileSync(resolved, "utf8").trim();
}

function parseConfig(): Source[] {
	const configDir = path.dirname(CONFIG_PATH);
	const config = parseYaml(fs.readFileSync(CONFIG_PATH, "utf8"));
	const strategyMap = config.strategies;
	if (!strategyMap || typeof strategyMap === "string") throw new Error("ctx.yaml needs a top-level \`strategies\` mapping");

	const strategies = new Map<string, Strategy>();
	for (const [name, value] of Object.entries(strategyMap)) {
		if (!value || typeof value === "string") throw new Error(`Strategy \`${name}\` must be a mapping`);
		strategies.set(name, {
			name,
			tool: stringField(value, "tool", false),
			guide: readGuide(configDir, stringField(value, "guide")!),
		});
	}

	const sources: Source[] = [];
	for (const [section, entries] of Object.entries(config)) {
		if (section === "strategies") continue;
		if (!entries || typeof entries === "string") throw new Error(`Context group \`${section}\` must be a mapping`);
		for (const [key, value] of Object.entries(entries)) {
			if (!value || typeof value === "string") throw new Error(`Context \`${section}.${key}\` must be a mapping`);
			const strategyName = stringField(value, "strategy")!;
			const strategy = strategies.get(strategyName);
			if (!strategy) throw new Error(`Context \`${section}.${key}\` names unknown strategy \`${strategyName}\``);
			sources.push({
				name: `${section}.${key}`,
				filepath: path.resolve(expandHome(stringField(value, "filepath")!)),
				strategy,
				index: stringField(value, "index", false),
			});
		}
	}
	return sources.sort((a, b) => a.name.localeCompare(b.name));
}

function tokenize(input: string): string[] {
	const tokens: string[] = [];
	let current = "";
	let quote: "'" | '"' | undefined;
	let escaping = false;
	for (const char of input) {
		if (escaping) { current += char; escaping = false; continue; }
		if (char === "\\") { escaping = true; continue; }
		if (quote) { if (char === quote) quote = undefined; else current += char; continue; }
		if (char === "'" || char === '"') { quote = char; continue; }
		if (/\s/.test(char)) { if (current) { tokens.push(current); current = ""; } continue; }
		current += char;
	}
	if (escaping) current += "\\";
	if (current) tokens.push(current);
	return tokens;
}

function findSource(input: string, sources: Source[]): { source: Source; relativePath: string } | undefined {
	const normalized = input.replace(/^\/+/, "");
	for (const source of [...sources].sort((a, b) => b.name.length - a.name.length)) {
		if (normalized === source.name) return { source, relativePath: "" };
		if (normalized.startsWith(`${source.name}/`)) return { source, relativePath: normalized.slice(source.name.length + 1) };
	}
}

function safeResolve(root: string, relativePath: string): string | undefined {
	const resolved = path.resolve(root, relativePath);
	const relative = path.relative(root, resolved);
	return relative.startsWith("..") || path.isAbsolute(relative) ? undefined : resolved;
}

function readFileCapped(filePath: string): string {
	const buffer = fs.readFileSync(filePath);
	if (buffer.byteLength <= MAX_FILE_BYTES) return buffer.toString("utf8").trimEnd();
	return `${buffer.subarray(0, MAX_FILE_BYTES).toString("utf8").trimEnd()}\n\n[Truncated by /ctx: first ${MAX_FILE_BYTES} of ${buffer.byteLength} bytes.]`;
}

function renderStrategy(source: Source, targetPath: string): string {
	const indexPath = source.index ? path.join(source.filepath, source.index) : "";
	const substitutions: Record<string, string> = {
		"{{root}}": source.filepath,
		"{{target}}": targetPath,
		"{{index}}": indexPath,
		"{{tool}}": source.strategy.tool ?? "",
	};
	let guide = source.strategy.guide;
	for (const [needle, replacement] of Object.entries(substitutions)) guide = guide.split(needle).join(replacement);
	return [
		`Context root: ${source.filepath}`,
		`Selected target: ${targetPath}`,
		`Discovery strategy: ${source.strategy.name}${source.index ? ` (index: ${indexPath})` : ""}`,
		"",
		guide,
	].join("\n");
}

function resolveContext(token: string, sources: Source[]): ResolvedContext {
	const match = findSource(token, sources);
	if (!match) throw new Error(`Unknown context source: ${token}`);
	const targetPath = match.relativePath ? safeResolve(match.source.filepath, match.relativePath) : match.source.filepath;
	if (!targetPath) throw new Error(`Refusing path outside source root: ${token}`);
	const stat = fs.statSync(targetPath);
	if (stat.isFile()) return { label: token, path: targetPath, kind: "file", content: readFileCapped(targetPath) };
	if (stat.isDirectory()) return { label: token, path: targetPath, kind: "directory", content: renderStrategy(match.source, targetPath) };
	throw new Error(`Not a file or directory: ${targetPath}`);
}

function getCompletionPrefix(args: string): string { return args.match(/(?:^|\s)(\S*)$/)?.[1] ?? ""; }
function replacePrefix(args: string, value: string): string {
	const prefix = getCompletionPrefix(args);
	return `${args.slice(0, args.length - prefix.length)}${value} `;
}

function getCompletions(args: string): AutocompleteItem[] | null {
	let sources: Source[];
	try { sources = parseConfig(); } catch { return null; }
	const prefix = getCompletionPrefix(args).replace(/^\/+/, "");
	const used = new Set(tokenize(args).filter((token) => token !== "--"));
	const items = sources
		.filter((source) => (!used.has(source.name) || source.name === prefix) && source.name.startsWith(prefix))
		.map((source) => ({ value: replacePrefix(args, source.name), label: source.name, description: `${source.strategy.name} · ${source.filepath}` }));
	return items.length ? items : null;
}

export default function ctxExtension(pi: ExtensionAPI) {
	pi.registerCommand("ctx", {
		description: "Load context roots with their progressive discovery strategies",
		getArgumentCompletions: getCompletions,
		handler: async (args, ctx) => {
			let sources: Source[];
			try { sources = parseConfig(); } catch (error) {
				ctx.ui.notify(`Could not load ${CONFIG_PATH}: ${error instanceof Error ? error.message : String(error)}`, "error");
				return;
			}
			const tokens = tokenize(args);
			const separator = tokens.indexOf("--");
			let contextTokens: string[];
			let task: string;
			if (separator >= 0) {
				contextTokens = tokens.slice(0, separator);
				task = tokens.slice(separator + 1).join(" ");
			} else {
				contextTokens = [];
				let taskStart = tokens.length;
				for (let i = 0; i < tokens.length; i++) {
					if (findSource(tokens[i]!, sources)) contextTokens.push(tokens[i]!);
					else { taskStart = i; break; }
				}
				task = tokens.slice(taskStart).join(" ");
			}
			if (!contextTokens.length) {
				ctx.ui.notify(`Usage: /ctx <context...> -- <task>. Contexts: ${sources.map((source) => source.name).join(", ")}`, "warning");
				return;
			}
			let contexts: ResolvedContext[];
			try { contexts = contextTokens.map((token) => resolveContext(token, sources)); } catch (error) {
				ctx.ui.notify(error instanceof Error ? error.message : String(error), "error"); return;
			}
			const sections = contexts.map((context) => [
				`<!-- BEGIN /ctx ${context.label} (${context.kind}: ${context.path}) -->`, context.content, `<!-- END /ctx ${context.label} -->`,
			].join("\n"));
			const effectiveTask = task.trim() || "Acknowledge the available contexts and wait for my next instruction.";
			pi.sendUserMessage([
				"Use the configured contexts below. Directory contexts are lazy: no corpus content was loaded.",
				"Follow each supplied discovery strategy, starting with its cheapest overview. Read only files that become relevant; do not recursively dump or read a whole context.", "",
				...sections.flatMap((section) => [section, ""]), "Task:", effectiveTask,
			].join("\n"));
		},
	});
}

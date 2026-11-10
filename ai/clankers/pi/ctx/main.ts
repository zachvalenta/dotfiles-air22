import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import type { AutocompleteItem } from "@earendil-works/pi-tui";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const CONFIG_PATH = path.join(path.dirname(fs.realpathSync(fileURLToPath(import.meta.url))), "contexts.yaml");
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

type TraceRoot = {
	name: string;
	path: string;
};

type TraversalTrace = {
	roots: TraceRoot[];
	files: Map<string, Map<string, Set<string>>>;
	operations: Map<string, Set<string>>;
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

// Deliberately small YAML reader: contexts.yaml is a mapping-only config. Keeping it
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
	if (!strategyMap || typeof strategyMap === "string") throw new Error("contexts.yaml needs a top-level \`strategies\` mapping");

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

function pathWithin(root: string, candidate: string): boolean {
	const relative = path.relative(root, candidate);
	return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

function traceRootForPath(trace: TraversalTrace, rawPath: string): TraceRoot | undefined {
	const candidate = path.resolve(rawPath);
	return trace.roots.find((root) => pathWithin(root.path, candidate));
}

function recordTraversal(trace: TraversalTrace, rawPath: string, headers: string[] = []): void {
	const root = traceRootForPath(trace, rawPath);
	if (!root) return;
	const resolved = path.resolve(rawPath);
	const relativePath = path.relative(root.path, resolved) || path.basename(resolved);
	let files = trace.files.get(root.name);
	if (!files) trace.files.set(root.name, files = new Map());
	let knownHeaders = files.get(relativePath);
	if (!knownHeaders) files.set(relativePath, knownHeaders = new Set());
	for (const header of headers) knownHeaders.add(header);
}

function markdownHeaders(text: string): string[] {
	return [...text.matchAll(/^#{1,6}\s+(.+?)\s*#*\s*$/gm)].map((match) => match[1]!);
}

function textBlocks(content: Array<{ type: string; text?: string }>): string {
	return content.filter((block) => block.type === "text" && typeof block.text === "string").map((block) => block.text!).join("\n");
}

function recordOperation(trace: TraversalTrace, root: TraceRoot, operation: string): void {
	let operations = trace.operations.get(root.name);
	if (!operations) trace.operations.set(root.name, operations = new Set());
	operations.add(operation.replace(/\s+/g, " ").trim().slice(0, 240));
}

function recordPathOperation(trace: TraversalTrace, rawPath: string, operation: string): void {
	const root = traceRootForPath(trace, rawPath);
	if (root) recordOperation(trace, root, operation);
}

function recordBashOperation(trace: TraversalTrace, command: string): void {
	for (const root of trace.roots) if (command.includes(root.path)) recordOperation(trace, root, `bash: ${command}`);
}

function yamlKey(value: string): string {
	return /^[A-Za-z0-9_.\/-]+$/.test(value) ? value : JSON.stringify(value);
}

function renderTraceTree(entries: Array<[string, { files?: Map<string, Set<string>>; operations?: Set<string> }]>): string[] {
	const root = new Map<string, unknown>();
	for (const [sourceName, trace] of entries) {
		let node = root;
		for (const part of sourceName.split(".")) {
			let child = node.get(part);
			if (!(child instanceof Map)) node.set(part, child = new Map<string, unknown>());
			node = child;
		}
		if (trace.operations?.size) node.set("__operations__", trace.operations);
		if (trace.files?.size) node.set("__files__", trace.files);
	}
	const render = (node: Map<string, unknown>, indent: string): string[] => {
		const lines: string[] = [];
		for (const [key, value] of node) {
			if (key === "__operations__") {
				lines.push(`${indent}traversed:`);
				for (const operation of value as Set<string>) lines.push(`${indent}  - ${yamlKey(operation)}`);
				continue;
			}
			if (key === "__files__") {
				lines.push(`${indent}read:`);
				for (const [file, headers] of value as Map<string, Set<string>>) {
					if (!headers.size) lines.push(`${indent}  ${yamlKey(file)}: []`);
					else {
						lines.push(`${indent}  ${yamlKey(file)}:`);
						for (const header of headers) lines.push(`${indent}    - ${yamlKey(header)}`);
					}
				}
				continue;
			}
			lines.push(`${indent}${yamlKey(key)}:`);
			lines.push(...render(value as Map<string, unknown>, `${indent}  `));
		}
		return lines;
	};
	return render(root, "");
}

function renderTrace(trace: TraversalTrace): string | undefined {
	const sourceNames = new Set([...trace.files.keys(), ...trace.operations.keys()]);
	if (!sourceNames.size) return undefined;
	const entries = [...sourceNames].map((name) => [name, { files: trace.files.get(name), operations: trace.operations.get(name) }] as [string, { files?: Map<string, Set<string>>; operations?: Set<string> }]);
	return ["<!-- /ctx traversal -->", "```yaml", ...renderTraceTree(entries), "```", "<!-- /ctx traversal -->"].join("\n");
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
	let trace: TraversalTrace | undefined;

	pi.on("tool_result", (event) => {
		if (!trace || event.isError) return;
		if (event.toolName === "read" && typeof event.input.path === "string") {
			recordTraversal(trace, event.input.path, markdownHeaders(textBlocks(event.content)));
			return;
		}
		if (event.toolName === "bash" && typeof event.input.command === "string") {
			recordBashOperation(trace, event.input.command);
			return;
		}
		if (["grep", "find", "ls"].includes(event.toolName) && typeof event.input.path === "string") {
			recordPathOperation(trace, event.input.path, `${event.toolName}: ${event.input.path}`);
		}
	});

	// A no-tool-call assistant message is the run's final answer. Prepend the
	// observed traversal only then, rather than showing a partial trace between turns.
	pi.on("message_end", (event) => {
		if (!trace || event.message.role !== "assistant" || event.message.content.some((block) => block.type === "toolCall")) return;
		const summary = renderTrace(trace);
		if (!summary) return;
		return { message: { ...event.message, content: [{ type: "text", text: `${summary}\n\n` }, ...event.message.content] } };
	});
	pi.on("agent_settled", () => { trace = undefined; });

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
			trace = {
				roots: contexts.map((context) => ({ name: findSource(context.label, sources)!.source.name, path: context.path })),
				files: new Map(),
				operations: new Map(),
			};
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

import * as fs from "node:fs";
import * as path from "node:path";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

type TextBlock = { type: "text"; text: string };
type ImageBlock = { type: "image"; source?: unknown };
type MessageLike = {
	role: string;
	content?: string | Array<TextBlock | ImageBlock | Record<string, unknown>>;
	timestamp?: number;
};

const PALI_FILENAME = "pali.md";
const CURSOR = "# ⏭️ NEXT";
const CURSOR_RE = /^# ⏭️ NEXT\s*$/gm;

function escapeTomlString(value: string): string {
	return value.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\n/g, "\\n");
}

function timestamp(ms?: number): string {
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone: "America/New_York",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hourCycle: "h23",
	}).formatToParts(new Date(ms ?? Date.now()));
	const part = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
	return `${part("year")}.${part("month")}.${part("day")} @ ${part("hour")}:${part("minute")}:${part("second")}`;
}

function stripBold(markdown: string): string {
	return markdown.replace(/\*\*([^*\n][\s\S]*?[^*\n])\*\*/g, "$1").replace(/__([^_\n][\s\S]*?[^_\n])__/g, "$1");
}

function uppercaseNamespace(value: string): string {
	return value
		.replace(/:$/, "")
		.trim()
		.toUpperCase();
}

function normalizeMarkdown(markdown: string): string {
	const lines = stripBold(markdown).split(/\r?\n/);
	const headingLevels = lines.flatMap((line) => {
		const match = line.match(/^(#{1,6})(\s+)/);
		return match ? [match[1]!.length] : [];
	});
	const shift = headingLevels.length > 0 ? 2 - Math.min(...headingLevels) : 0;

	return lines
		.map((line) => {
			if (line.trim() === CURSOR) return line.replace(CURSOR, "⏭️ NEXT");

			const orderedNamespace = line.match(/^\s*\d+\.\s+(.+?)\s*$/);
			if (orderedNamespace) return uppercaseNamespace(orderedNamespace[1]!);

			const indentedBullet = line.match(/^\s+([*-])\s+/);
			if (indentedBullet) return line.replace(/^\s+[*-]\s+/, "* ");

			return line.replace(/^(#{1,6})(\s+)/, (_match, hashes: string, space: string) => {
				const level = Math.max(2, Math.min(6, hashes.length + shift));
				return `${"#".repeat(level)}${space}`;
			});
		})
		.join("\n");
}

function textContent(message: MessageLike): string {
	let text = "";
	if (typeof message.content === "string") text = message.content;
	else if (Array.isArray(message.content)) {
		const chunks: string[] = [];
		for (const block of message.content) {
			if (block && typeof block === "object" && block.type === "text" && typeof (block as TextBlock).text === "string") {
				chunks.push((block as TextBlock).text);
			} else if (block && typeof block === "object" && block.type === "image") {
				chunks.push("[image]");
			}
		}
		text = chunks.join("\n");
	}
	return normalizeMarkdown(text.trimEnd());
}

function roleHeader(message: MessageLike, modelLabel: string): string | undefined {
	if (message.role === "user") return `# 🗿 zjv ${timestamp(message.timestamp)}`;
	if (message.role === "assistant") return `# 👾 ${modelLabel} ${timestamp(message.timestamp)}`;
	return undefined;
}

function initialDocument(sessionFile: string | undefined, cwd: string): string {
	const session = sessionFile ?? "";
	return [
		"+++",
		`session = "${escapeTomlString(session)}"`,
		`cwd = "${escapeTomlString(cwd)}"`,
		"+++",
		"",
		CURSOR,
		"",
	].join("\n");
}

function ensurePaliFile(filePath: string, sessionFile: string | undefined, cwd: string): void {
	if (fs.existsSync(filePath)) return;
	fs.writeFileSync(filePath, initialDocument(sessionFile, cwd), "utf8");
}

function replaceSingleCursor(markdown: string, replacement: string): string {
	const matches = [...markdown.matchAll(CURSOR_RE)];
	if (matches.length !== 1) {
		throw new Error(`Expected exactly one '${CURSOR}' cursor, found ${matches.length}.`);
	}

	const match = matches[0]!;
	const start = match.index!;
	const end = start + match[0].length;
	const before = markdown.slice(0, start).replace(/\s*$/, "");
	const after = markdown.slice(end).trim();
	const suffix = after.length > 0 ? `\n\n${after}` : "";
	return `${before}\n\n${replacement.trimEnd()}${suffix}\n\n${CURSOR}\n`;
}

function appendTurn(filePath: string, message: MessageLike, modelLabel: string): void {
	const header = roleHeader(message, modelLabel);
	if (!header) return;

	const body = textContent(message);
	if (body.length === 0) return;

	const current = fs.readFileSync(filePath, "utf8");
	const next = replaceSingleCursor(current, `${header}\n\n${body}`);
	fs.writeFileSync(filePath, next, "utf8");
}

function modelLabel(ctx: { model?: { id?: string; provider?: string } }): string {
	const model = ctx.model;
	if (!model) return "model";
	return model.id ?? model.provider ?? "model";
}

export default function palimpsest(pi: ExtensionAPI): void {
	let enabled = false;
	let paliPath = "";

	pi.registerFlag("pali", {
		description: "Maintain a Markdown palimpsest at ./pali.md",
		type: "boolean",
		default: false,
	});

	pi.on("session_start", async (_event, ctx) => {
		enabled = pi.getFlag("pali") === true;
		paliPath = path.join(ctx.cwd, PALI_FILENAME);
		if (!enabled) return;

		try {
			ensurePaliFile(paliPath, ctx.sessionManager.getSessionFile(), ctx.cwd);
			if (ctx.hasUI) ctx.ui.setStatus("pali", `📝 ${PALI_FILENAME}`);
		} catch (error) {
			if (ctx.hasUI) ctx.ui.notify(`pali: ${error instanceof Error ? error.message : String(error)}`, "error");
		}
	});

	pi.on("message_end", async (event, ctx) => {
		if (!enabled) return;
		const message = event.message as MessageLike;
		if (message.role !== "user" && message.role !== "assistant") return;

		try {
			ensurePaliFile(paliPath, ctx.sessionManager.getSessionFile(), ctx.cwd);
			appendTurn(paliPath, message, modelLabel(ctx));
		} catch (error) {
			if (ctx.hasUI) ctx.ui.notify(`pali: ${error instanceof Error ? error.message : String(error)}`, "error");
		}
	});

	pi.on("before_agent_start", async (event) => {
		if (!enabled) return;
		return {
			systemPrompt: `${event.systemPrompt}\n\nPalimpsest Markdown formatting:\n- Because this session writes to pali.md, format assistant responses using zjv's Markdown preferences.\n- Do not use bold syntax (**text** or __text__).\n- Inside a turn, keep top-level headings reserved for turn headers; use second-level headings for sections.\n- Prefer ALL CAPS namespace labels followed by flush-left bullets instead of numbered-list items with indented bullets.`,
		};
	});

	pi.registerCommand("pali", {
		description: "Load ./pali.md into the next user message",
		handler: async (args, ctx) => {
			const filePath = path.join(ctx.cwd, (args || PALI_FILENAME).trim() || PALI_FILENAME);
			let markdown = "";
			try {
				ensurePaliFile(filePath, ctx.sessionManager.getSessionFile(), ctx.cwd);
				markdown = fs.readFileSync(filePath, "utf8");
			} catch (error) {
				ctx.ui.notify(`pali: ${error instanceof Error ? error.message : String(error)}`, "error");
				return;
			}

			pi.sendUserMessage([
				"Use the current palimpsest Markdown below as context for this task.",
				"JSONL remains authoritative; this Markdown is an editable projection only.",
				"",
				`<!-- BEGIN ${path.basename(filePath)} -->`,
				markdown.trimEnd(),
				`<!-- END ${path.basename(filePath)} -->`,
			].join("\n"));
		},
	});
}
import { copyToClipboard, type ExtensionAPI, type SessionEntry } from "@earendil-works/pi-coding-agent";

type ContentBlock = {
	type: string;
	text?: string;
	name?: string;
	arguments?: unknown;
};

type ConversationMessage = {
	role: "user" | "assistant" | string;
	content?: string | ContentBlock[];
};

function formatContent(message: ConversationMessage): string {
	if (typeof message.content === "string") return message.content.trimEnd();
	if (!Array.isArray(message.content)) return "";

	return message.content
		.flatMap((block) => {
			if (block.type === "text") return block.text ?? "";
			if (block.type === "image") return "[image]";
			if (block.type === "toolCall") {
				return `[tool call: ${block.name ?? "unknown"}(${JSON.stringify(block.arguments ?? {})})]`;
			}
			return [];
		})
		.join("\n")
		.trimEnd();
}

function formatTranscript(entries: SessionEntry[]): string {
	const messages = entries.flatMap((entry) => {
		if (entry.type !== "message") return [];
		const message = entry.message as ConversationMessage;
		if (message.role !== "user" && message.role !== "assistant") return [];

		const label = message.role === "user" ? "User" : "Agent";
		const content = formatContent(message) || "[no visible content]";
		return [`## ${label}\n\n${content}`];
	});

	return messages.join("\n\n---\n\n");
}

export default function copySessionExtension(pi: ExtensionAPI): void {
	pi.registerCommand("copy-session", {
		description: "Copy all user and agent messages on the active session branch",
		handler: async (_args, ctx) => {
			const transcript = formatTranscript(ctx.sessionManager.getBranch());
			if (!transcript) {
				ctx.ui.notify("No user or agent messages to copy", "warning");
				return;
			}

			try {
				await copyToClipboard(transcript);
				ctx.ui.notify("Copied session transcript to clipboard", "info");
			} catch (error) {
				ctx.ui.notify(error instanceof Error ? error.message : String(error), "error");
			}
		},
	});
}

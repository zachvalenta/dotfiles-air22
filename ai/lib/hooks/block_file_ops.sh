#!/usr/bin/env bash

set -euo pipefail

# Claude passes hook JSON in HOOK_DATA; Codex passes it on stdin. The JSON shape used by both here is:
#   {
#     "tool_input": {
#       "command": "the shell command the agent wants to run"
#     }
#   }

# Prefer Claude's HOOK_DATA when present. If it is unset or empty, fall back to stdin for Codex | other agents that stream hook JSON.
payload=${HOOK_DATA:-}

# Hooks are normally invoked non-interactively. cat will read the JSON payload from stdin for Codex.
# If no stdin is provided in a manual test, this may wait for input; press Ctrl-D to end stdin.
if [[ -z "$payload" ]]; then
    payload=$(cat)
fi

# Extract the shell command defensively. Missing `.tool_input.command` becomes an empty string so malformed or unrelated hook payloads do not get blocked by accident.
# Invalid JSON will still fail because that should be treated as a hook wiring/configuration problem, not silently allowed.
command=$(jq -r '.tool_input.command // empty' <<< "$payload")

# Examples blocked: ls, cat README.md, rg $QUERY
# Examples allowed: npm test, git status
if [[ "$command" =~ ^(rm|ls|cat|head|tail|grep|rg|find|sed|awk|echo\ \>) ]]; then
    echo "BLOCKED: Use specialized tools instead of Bash for file operations" >&2
    echo "" >&2
    echo "Use the right tool:" >&2
    echo "  - Glob/List files instead of 'ls' or 'find'" >&2
    echo "  - Read instead of 'cat', 'head', or 'tail'" >&2
    echo "  - Grep/Search instead of 'grep' or 'rg'" >&2
    echo "  - Edit/Write instead of 'sed', 'awk', or 'echo >'" >&2
    exit 2
fi

exit 0

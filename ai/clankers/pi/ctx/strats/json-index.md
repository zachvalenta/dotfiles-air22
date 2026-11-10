Start from the manifest at `{{index}}`; it is the inexpensive catalogue for this context.

1. Inspect its shape and search it for task terms with `rg`, `jq`, or a small targeted script.
2. Select the few records/files that appear relevant.
3. Read only those source files, or inspect a narrow range within them.
4. If the manifest is absent or insufficient, use focused `rg --files` and `rg -n` under `{{target}}`; do not recursively read the corpus.

Treat the index as a discovery aid, not necessarily authoritative content.
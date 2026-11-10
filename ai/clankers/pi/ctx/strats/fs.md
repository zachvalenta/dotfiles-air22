There is no trusted structured manifest for this context.

Discover progressively under `{{target}}`:

1. Inspect small root metadata first when present (`README*`, `AGENTS.md`, `CLAUDE.md`, `package.json`, `pyproject.toml`, etc.).
2. Use `rg --files` with focused path filters to identify likely files; exclude generated, dependency, and VCS directories.
3. Use `rg -n` for the task vocabulary before opening files.
4. Read only the selected files or relevant ranges.

Do not produce a recursive directory dump and do not bulk-read files. If the task is underspecified, state what you found and ask for a narrower direction.
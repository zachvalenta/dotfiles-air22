This is a Markdown-heading corpus. Use `{{tool}}` as the discovery tool; it emits paths and headings without loading document bodies.

Progressively inspect `{{target}}`:

1. Map candidate files only:
   ```sh
   {{tool}} "{{target}}" --yaml --depth=1
   ```
2. For the promising files or directory, reveal top-level headings:
   ```sh
   {{tool}} "{{target}}" --yaml --depth=2
   ```
3. Reveal subheadings only where needed:
   ```sh
   {{tool}} "{{target}}" --yaml --depth=3
   ```
4. Read the specific Markdown files or ranges selected by that outline.

`{{index}}` is the generated corpus index when it exists. Prefer regenerating a narrow outline with `ext` when the index might be stale. Do not use `read` on the entire directory or bulk-read every Markdown file.
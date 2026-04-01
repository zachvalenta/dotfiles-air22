Look up a corkboard task by name and display its details.

Query: $ARGUMENTS

**Steps:**

1. Read the task index at `/Users/zach/Documents/zv/personal/corkboard-tasks/.task-index.json`

2. Search the `tasks` array for entries where `title` or `slug` contains the query (case-insensitive). Prefer exact title matches, then prefix matches, then substring matches.

3. **One match:** Read the full file at `<tasks_dir>/<task.path>` and display:
   - Title, project, status, priority, tags
   - Body content (the markdown below the `+++` frontmatter block), if any

4. **Multiple matches:** List them (title + project + status) and ask which one.

5. **No matches:** Say so and suggest running `corkboard-index` in the terminal to refresh the index.

**Index freshness:** The index has a `generated` timestamp. If it's more than a few days old or the file doesn't exist, mention that the user can refresh it with `corkboard-index`.

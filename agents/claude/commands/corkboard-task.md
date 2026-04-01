Load a corkboard task and treat its body as a prompt to act on.

Query: $ARGUMENTS

**Steps:**

1. Run `just index` via Bash in `/Users/zach/Documents/zv/projects/corkboard` to regenerate the index, then read `/Users/zach/Documents/zv/personal/corkboard-tasks/.task-index.json`

2. Search the `tasks` array for entries where `title` or `slug` contains the query (case-insensitive). Prefer exact title matches, then prefix matches, then substring matches.

3. **One match:** Read the full file at `<tasks_dir>/<task.path>`. Display title, project, status, priority briefly, then treat the body (below `+++`) as a prompt and respond to it — answer questions, take actions, continue in-progress work, etc.

4. **Multiple matches:** List them (title + project + status) and ask which one.

5. **No matches:** Say so.

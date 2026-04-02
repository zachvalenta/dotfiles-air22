ARGUMENTS: $ARGUMENTS

Parse ARGUMENTS as: the **first line** is the task query; any lines after that are the **follow-on prompt**.

Task lookup steps:

1. Run `just index` via Bash in `/Users/zach/Documents/zv/projects/corkboard` to regenerate the index, then read `/Users/zach/Documents/zv/personal/corkboard-tasks/.task-index.json`

2. Search the `tasks` array for entries where `title` or `slug` contains the query (case-insensitive). Prefer exact title matches, then prefix matches, then substring matches.

3. **One match:** Read the full file at `<tasks_dir>/<task.path>`. The task is now in context.
   - If there is a follow-on prompt: act on it, using the task as context.
     - e.g. `/corkboard-find cc find task\n- [ ] add pre-commit hook` → load task, then work on the pre-commit hook item
   - If there is no follow-on prompt: briefly confirm which task was loaded and invite the user to continue.
     - e.g. `/corkboard-find cc find task` → "Loaded **CC slash cmd to fuzzy find tasks** (corkboard · now). What would you like to do?"

4. **Multiple matches:** List them (title + project + status) and ask which one.
   - e.g. `/corkboard-find init` → "Found 2 matches: **add sidebar** (corkboard · done), **init** (neovim · next). Which did you mean?"

5. **No matches:** Say so.
   - e.g. `/corkboard-find foobar` → "No tasks matched 'foobar'."

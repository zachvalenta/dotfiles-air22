Load a corkboard task and treat its body as a prompt to act on.

Query: $ARGUMENTS

Read `/Users/zach/Documents/denv/dotfiles/agents/claude/commands/corkboard/find.md` and follow the task lookup steps with the query above.

Once found: display title, project, status, priority briefly, then treat the body (below `+++`) as a prompt and respond to it — answer questions, take actions, continue in-progress work, etc.

Before responding to the task body, explore the relevant codebase or files so your answer is grounded in what actually exists. Do not speculate — check first.

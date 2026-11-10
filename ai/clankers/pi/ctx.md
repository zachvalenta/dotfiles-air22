# CTX

`/ctx` gives Pi **lazy context roots**. Rather than injecting a recursive directory map or every file, it injects the selected root's search strategy and the task.

```text
/ctx notes.sw notes.tasks -- what should I build next?
```

The agent receives the two roots and their respective discovery playbooks. It should inspect the cheapest structured view first, then read only the files that become relevant.

## config

`ctx.ts` reads `ctx.yaml` beside it. It is mapping-only YAML, intentionally dependency-free. Context names are the nested mapping path; `strategies` is reserved.

```yaml
strategies:
  ext:
    tool: /Users/zach/Documents/denv/bin/ext
    guide: ctx-strategies/ext.md
  json-index:
    guide: ctx-strategies/json-index.md
  filesystem:
    guide: ctx-strategies/filesystem.md

notes:
  sw:
    filepath: /Users/zach/Documents/zv/notes/sw
    strategy: ext
    index: index.yaml
  tasks:
    filepath: /Users/zach/Documents/zv/personal/corkboard-tasks
    strategy: json-index
    index: .task-index.json
```

Each context needs:

* `filepath`: its root (or a single file)
* `strategy`: a named strategy
* `index`: optional manifest path relative to the root

Each strategy has a `guide`, plus an optional `tool`. Guides are Markdown and support `{{root}}`, `{{target}}`, `{{index}}`, and `{{tool}}`. This keeps tool-specific procedures reusable while letting unstructured repositories use a plain filesystem/grep playbook.

## built-in strategies

* `ext`: progressively runs `ext --yaml --depth=1`, then depth 2 and 3 on promising areas. It is for Markdown heading corpora such as `notes.sw`.
* `json-index`: starts from the configured JSON manifest and uses focused `rg`/`jq` before source reads.
* `filesystem`: reads small root metadata, then uses narrow `rg --files` and `rg -n`; it deliberately has no broad traversal.

Add a new guide when a corpus needs a different search procedure; do not encode a large corpus into `/ctx` itself.

## usage

```text
/ctx notes.sw notes.tasks -- what should I build next?
/ctx notes.sw -- find notes related to DuckDB extensions
/ctx colligo.eng/aws/cognito.md -- summarize this file
/ctx denv.logs -- find the error around yesterday's deploy
```

A configured source can include a subpath. A selected directory receives its source's strategy with the subpath as `{{target}}`; a selected file is read directly (capped at 80 KiB).

With no `--`, the remaining words are treated as the task. Use `--` when the task could look like a context name.

## autocomplete

Typing `/ctx ` completes configured context names. It intentionally does not enumerate every descendant path: that would recreate the eager directory-map problem. Enter a known subpath manually when needed.

## safety and prompt shape

Directory contexts contain no corpus text. `/ctx` explicitly tells the agent to follow the supplied strategy and not recursively dump/read the root. File contexts are capped at 80 KiB and carry a truncation notice.

The sent message is shaped like:

```text
Use the configured contexts below. Directory contexts are lazy: no corpus content was loaded.

<!-- BEGIN /ctx notes.sw (directory: /…/notes/sw) -->
Context root: /…/notes/sw
Selected target: /…/notes/sw
Discovery strategy: ext (index: /…/notes/sw/index.yaml)
…strategy guide…
<!-- END /ctx notes.sw -->

Task:
what should I build next?
```

# CTX

`/ctx` gives Pi **lazy context roots**. Rather than injecting a recursive directory map or every file, it injects the selected root's search strategy and the task.

```text
/ctx notes.sw notes.tasks -- what should I build next?
```

The agent receives the two roots and their respective discovery playbooks. It should inspect the cheapest structured view first, then read only the files that become relevant.

## config

`main.ts` reads `contexts.yaml` beside it. It is mapping-only YAML, intentionally dependency-free. Context names are the nested mapping path; `strategies` is reserved.

```yaml
strategies:
  ext:
    tool: /Users/zach/Documents/denv/bin/ext
    guide: strats/ext.md
  json-index:
    guide: strats/json-index.md
  filesystem:
    guide: strats/fs.md

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

```sh
/ctx notes.sw notes.tasks -- what should I build next?
/ctx notes.sw -- find notes related to DuckDB extensions
/ctx colligo.eng/aws/cognito.md -- summarize this file
/ctx denv.logs -- find the error around yesterday's deploy
```

A configured source can include a subpath. A selected directory receives its source's strategy with the subpath as `{{target}}`; a selected file is read directly (capped at 80 KiB).

With no `--`, the remaining words are treated as the task. Use `--` when the task could look like a context name.

## autocomplete

Typing `/ctx ` completes configured context names. It intentionally does not enumerate every descendant path: that would recreate the eager directory-map problem. Enter a known subpath manually when needed.

## traversal summary

For a `/ctx`-started run, `main.ts` observes Pi's successful `tool_result` events and prepends a YAML traversal summary to the final assistant message. This is strategy-independent: it records files and Markdown headings returned by `read`, plus the successful `bash`, `grep`, `find`, and `ls` operations that explicitly target a selected context root.

The summary is observational. A command is recorded as traversal, while only `read` results appear under `read`; it does not infer files from arbitrary shell output.

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

## traversal report

```sh
/ctx notes.sw -- good project to learning streaming architectures, feels like the biggest thing is the upstream data source

```

```yaml
notes:
    sw:
    traversed:
        - "bash: /Users/zach/Documents/denv/bin/ext \"/Users/zach/Documents/zv/notes/sw/design/infra/streams.md\" --yaml --depth=3"
        - "bash: /Users/zach/Documents/denv/bin/ext \"/Users/zach/Documents/zv/notes/sw/data/eng/01-ingest.md\" --yaml --depth=3"
        - "bash: /Users/zach/Documents/denv/bin/ext \"/Users/zach/Documents/zv/notes/sw/data/eng/03-process.md\" --yaml --depth=3"
    read:
        design/infra/streams.md:
        - "⛩️"
        - "参考"
        - "进步"
        - "🐙 KAFKA"
        - "https://chatgpt.com/c/67f82c9e-e088-8004-b351-3d2ef30e212f https://claude.ai/chat/1caf57d7-7999-4ceb-ba45-846a91e0d4a5"
        - "⭐️ PICOMQ / DURABLE STREAMS"
        - "🔴 REDIS"
        - "🏪 OPTIONS"
        - Faust
        - streams
        - "🟨 ZA"
        - "old notes"
        - "Streaming: Kafka topic carries raw web click events from frontends to data lake."
        - "Stream processing: Flink job consumes that topic, agg \"clicks per user per 5-minute window,\" push res to Redis for dashboards"
        data/eng/01-ingest.md:
        - "⛩️"
        - "参考"
        - "进步"
        - "🔢 STEPS"
        - mask
        - "entity resolution (splink)"
        - "Structured extraction using your RAG notes"
```

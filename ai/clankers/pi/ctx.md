# CTX

/ctx loads chain-able context (files | directories) into the next Pi message.

## config

Configure sources in TOML tables. Use Python-object-style names: `<table>.<key>`.

```toml
[me]
sw = "/Users/zach/Documents/zv/notes/sw"
domains = "/Users/zach/Documents/zv/notes/domains"

[colligo]
eng = "/Users/zach/Documents/zv/work/colligo/docs/eng"
site = "/Users/zach/Documents/zv/work/colligo/src/site"
```

This exposes:

```text
me.sw
me.domains
colligo.eng
colligo.site
```

## usage

Load context and provide a task:

```text
/ctx me.sw colligo.eng -- find docs relevant to Cognito auth
```

Load a file or subdirectory below a configured source:

```text
/ctx colligo.eng/aws/cognito.md -- summarize the Cognito setup
/ctx colligo.site/design-system/ -- inspect the relevant design-system docs
```

Load context only, no task:

```text
/ctx colligo.eng colligo.site
```

This asks the model to acknowledge what was loaded and wait for the next instruction.

## autocomplete

Typing `/ctx ` surfaces configured sources:

```text
colligo.eng    /Users/zach/Documents/zv/work/colligo/docs/eng
me.domains     /Users/zach/Documents/zv/notes/domains
me.sw          /Users/zach/Documents/zv/notes/sw
```

After selecting one source, autocomplete remains additive:

```text
/ctx me.domains me
```

selecting `me.sw` becomes:

```text
/ctx me.domains me.sw 
```

Path autocomplete also works below configured roots:

```text
/ctx colligo.eng/aws/
```

# FILE LOADING

## files

When the target is a file, `/ctx` reads the file content into the prompt.

SAFETY
* file reads are capped at 80KB
* if a file is larger, only the first 80KB is sent
* the prompt includes a truncation notice

Example:

```text
/ctx colligo.eng/aws/cognito.md -- explain this setup
```

## directories

When the target is a directory, /ctx does not read every file.

Instead, it sends a capped directory map:

```text
Directory map under /path/to/source:
This is a path map only. /ctx did not read every file in this directory.
Use Pi tools to inspect only the files needed for the user's task.
- README.md
- package.json
- src/
- src/App.tsx
```

This is meant to tell the model:

> this directory is relevant; navigate it intelligently using tools

It is not meant to dump source code into context.

SAFETY
* directory maps are capped at 300 entries
* common generated/vendor dirs are skipped: `.git`, `.next`, `.turbo`, `.venv`, `build`, `coverage`, `dist`, `node_modules`, `target`, `vendor`
* hidden files and dirs are skipped
* file contents are not read for directory targets

This makes source-code dirs safe to pass as context hints:

```text
/ctx colligo.site -- find the auth page and update layout
```

The model sees a map, then can use normal Pi tools like `read`, `grep`, `find`, and `ls` to inspect only what is needed.

# DESIGN

## prompt shape

`/ctx` sends a user message shaped like:

```text
Use the following configured context for this task.

<!-- BEGIN /ctx colligo.site (directory: /path/to/site) -->
Directory map under /path/to/site:
...
<!-- END /ctx colligo.site -->

Task:
find the auth page and update layout
```

For files, the section contains file content. For directories, the section contains only the directory map.

## path safety

Subpaths are resolved under their configured source root.

This is allowed:

```text
/ctx colligo.eng/aws/cognito.md -- summarize
```

Escaping the source root is refused:

```text
/ctx colligo.eng/../../secrets.md -- summarize
```

# 🟨 ZA

Future ideas:

* add config for per-source entry caps
* add config for exclude patterns
* include small root metadata files by default, e.g. `README.md`, `AGENTS.md`, `CLAUDE.md`, `package.json`
* support an explicit deep-read mode for docs-only trees, separate from safe source-code directory maps

# problem

Idea: a lot of my conversations in Pi go like this:

```sh
me: topic-1
LLM: response to topic-1 w/ topic-1.1, topic-1.2 and so on
me: response to LLM re: topic-1.1, topic-1.2 and so on
```

I find these conversations very helpful. Many go into:

* @/Users/zach/Documents/zv/notes/sw
* @/Users/zach/Documents/zv/personal/corkboard-tasks

But there's a lot of editing toil copying to/from Pi and my editor.

# MD

What I'm thinking is some shared palimpsest-like document that we're both editing in turn.

`pi --pali` would start a normal Pi session but also create a Markdown doc in the $CWD, `pali.md`.

# dumb

Pi's JSONL session is already the authoritative session tree.

The palimpsest is an ergonomic projection/export of the active branch, not a replacement for sessions. Otherwise, branching, /tree, compaction, tool calls, etc. would turn into a goddamn mess.

Pi - or any other agent! - doesn't need its session tree, branching, or any other mechanisms for maintaining state to know anything about pali.

# structure

> [!NOTE]
> Something of a clash here w/ `/Users/zach/Documents/denv/dotfiles/ai/lib/rules/markdown.md`, just noting for now.

The document would be structured thus:

```md
# 🗿 zjv $TIMESTAMP

# 👾 model $TIMESTAMP

## foo
### this
### that

## bar
### here
### there

# ⏭️ NEXT
```

# timestamp fmt/timezone

EST + a little more human-readable

```diff
- 2026-08-12T19:14:40.879Z
+ 2026.08.12 @ 15:14:40
```

# header nesting

The point of this structure is not that every top level header has exactly three levels of nesting beneath it or anything, but rather that each turn between us in this conversation will be a top level header and everything within turn should be nested within the header.

# cursor

`# ⏭️ NEXT` is just indicates where the next turn in the session will be written i.e.:

* everything *before* the cursor is subject to my editing / revision
* assistant only writes immediately after the cursor, then moves cursor forward to end of doc

# frontmatter

TOML frontmatter:

```toml
session = "/path/to/session"
cwd = "/Users/zach/Desktop"
```

# usage

* `pi --pali` creates `pali.md` if missing.
* after each user | assistant turn, Pi writes to `pali.md` and updates the cursor
* `/pali` slash cmd will prompt assistant to read `pali.md` if necessary
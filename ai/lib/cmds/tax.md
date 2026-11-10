Propose how you would re-taxonomize $ARGUMENTS. If no $ARGUMENTS, assume $CWD.

re:

* file(s)
* top-level headers
* subheaders

After re-taxonomizing, we'd be left w/ what files and headers?

# OUTPUT

## files first

First, files:

```sh
├── CWD
│   └── foo.md
│   └── bar.md
│   └── baz.md
```

## YAML trees

Use YAML (vs. Markdown) to sketch out the contents.

```yaml
file1:
  tlh1:
    - sub1
    - sub2
  tlh2:
    - sub3
    - sub4
file2:
  tlh1:
    - sub1
    - sub2
  tlh2:
    - sub3
    - sub4
```

Less verbose than all the hashband header indicators (`#`), indentation more clearly expresses tree structure.

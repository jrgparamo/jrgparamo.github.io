---
name: caveman-compression
description: Use when compressing verbose tool output to reduce token usage. Wraps caveman-code's 4-layer pipeline (tool budgets, JSON/XML extraction, ANSI stripping, truncation). Invoke via the caveman-compress tool on any large bash, read, or grep output before passing it to further reasoning.
license: MIT
compatibility: opencode
metadata:
  source: https://github.com/JuliusBrussee/caveman-code
  layers: "tool-budgets,structured-compression,ansi-strip,truncation"
---

## What this skill does

Guides use of the `caveman-compress` custom tool, which ports caveman-code's
4-layer token compression pipeline into OpenCode. Apply it to any large tool
output before reasoning over it to cut 50–94% of tokens.

## The 4 layers

| Layer | Name | What it does |
|-------|------|-------------|
| 1 | **Tool Budgets** | Per-tool line caps with head+tail preservation. Omitted lines are counted and noted. |
| 2 | **Structured Compression** | JSON: keeps relevant keys, stubs arrays >3 items, max depth 4. XML: strips xmlns, collapses repeated siblings. Only for bash output. |
| 3 | **ANSI Stripping** | Removes all terminal escape/color codes. |
| 4 | **General Truncation** | Collapses 3+ blank lines; hard truncates at 500 lines (200 head + 100 tail). |

### Default tool budgets

| Tool | Max lines | Head | Tail |
|------|-----------|------|------|
| bash | 80 | 50 | 30 |
| read | 300 | 200 | 100 |
| grep | 120 | 80 | 40 |
| find | 60 | 40 | 20 |
| ls | 60 | 40 | 20 |
| other | 150 | 100 | 50 |

## When to use

- A bash command produces output longer than 80 lines (e.g. `git diff`, `npm ls`, `docker inspect`)
- A file read exceeds ~300 lines and only part of it is relevant
- Grep results are noisy with many matches
- You need to pass large tool output as context into a follow-up prompt

## Usage

Call the `caveman-compress` tool directly:

```
caveman-compress({
  text: "<verbose output here>",
  toolName: "bash",          // bash | read | grep | find | ls | other
  commandHint: "npm ls"      // optional: helps JSON key extraction
})
```

The tool returns the compressed text followed by a stats line:
```
[caveman-compress] 901 → 54 lines · 32400 → 1944 bytes · 94% reduction
```

## Good command hints for JSON extraction

Providing `commandHint` improves JSON compression for bash output:

| Command | Keys retained |
|---------|--------------|
| `docker inspect` | State, Config, NetworkSettings, Mounts, HostConfig |
| `docker ps` | Names, Status, Ports, Image |
| `npm ls` | name, version, dependencies |
| `kubectl` | metadata, spec, status |
| `aws ...` | Arn, Name, Status, State, Id |

## Source

Logic ported from [caveman-code](https://github.com/JuliusBrussee/caveman-code) (MIT © Julius Brussee).
Implemented inline in `.opencode/tools/caveman-compress.ts` — no runtime dependency on the caveman package.

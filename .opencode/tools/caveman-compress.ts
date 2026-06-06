/**
 * caveman-compress — OpenCode custom tool
 *
 * Ports caveman-code's 4-layer token compression pipeline:
 *   Layer 1 — Per-tool budget truncation (head+tail preservation)
 *   Layer 2 — Structured output compression (JSON/XML semantic extraction)
 *   Layer 3 — ANSI escape code stripping
 *   Layer 4 — Blank-line collapse + general truncation
 *
 * Logic adapted from https://github.com/JuliusBrussee/caveman-code (MIT)
 * Implemented inline to avoid coupling to internal package paths.
 */

import { tool } from "@opencode-ai/plugin"

// ─── Constants ───────────────────────────────────────────────────────────────

const MAX_LINES = 500
const HEAD_LINES = 200
const TAIL_LINES = 100

const TOOL_BUDGETS: Record<string, { maxLines: number; headLines: number; tailLines: number }> = {
  bash:  { maxLines: 80,  headLines: 50,  tailLines: 30 },
  read:  { maxLines: 300, headLines: 200, tailLines: 100 },
  grep:  { maxLines: 120, headLines: 80,  tailLines: 40 },
  find:  { maxLines: 60,  headLines: 40,  tailLines: 20 },
  ls:    { maxLines: 60,  headLines: 40,  tailLines: 20 },
}
const FALLBACK_BUDGET = { maxLines: 150, headLines: 100, tailLines: 50 }

const ANSI_RE = /[\u001b\u009b](?:[@-Z\\-_]|\[[0-9;]*[ -/]*[@-~]|[@-_][0-9;]*[@-~]?|[@-_]|[0-9;]*m)/g

const JSON_KEY_HINTS: Record<string, string[]> = {
  "docker inspect": ["State", "Config", "NetworkSettings", "Mounts", "HostConfig"],
  "docker ps":      ["Names", "Status", "Ports", "Image"],
  "npm ls":         ["name", "version", "dependencies"],
  "package.json":   ["name", "version", "scripts", "dependencies", "devDependencies"],
  tsconfig:         ["compilerOptions", "include", "exclude"],
  kubectl:          ["metadata", "spec", "status"],
  "aws ":           ["Arn", "Name", "Status", "State", "Id"],
}

// ─── Layer 1: Per-tool budget truncation ────────────────────────────────────

function truncateWithBudget(text: string, toolName: string): string {
  const budget = TOOL_BUDGETS[toolName] ?? FALLBACK_BUDGET
  const lines = text.split("\n")
  if (lines.length <= budget.maxLines) return text
  const omitted = lines.length - budget.headLines - budget.tailLines
  return [
    ...lines.slice(0, budget.headLines),
    "",
    `[... ${omitted} lines omitted (${toolName} budget: ${budget.maxLines} lines) ...]`,
    "",
    ...lines.slice(lines.length - budget.tailLines),
  ].join("\n")
}

// ─── Layer 2: Structured output compression ──────────────────────────────────

function detectFormat(text: string): "json" | "xml" | "text" {
  if (text.split("\n").length <= 50) return "text"
  const t = text.trimStart()
  if (t.startsWith("{") || t.startsWith("[")) {
    try { JSON.parse(t); return "json" } catch { /* fall through */ }
    if (/^\s*[[{]/.test(t) && /[}\]]\s*$/.test(text.trimEnd())) return "json"
  }
  if (t.startsWith("<?xml") || (t.startsWith("<") && !t.startsWith("<!DOCTYPE html"))) {
    if (t.includes("</") || t.includes("/>")) return "xml"
  }
  return "text"
}

function getKeyHints(commandHint?: string): Set<string> {
  const hints = new Set<string>()
  if (!commandHint) return hints
  const lower = commandHint.toLowerCase()
  for (const [pattern, keys] of Object.entries(JSON_KEY_HINTS)) {
    if (lower.includes(pattern.toLowerCase())) keys.forEach((k) => hints.add(k))
  }
  return hints
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function compressValue(value: any, relevantKeys: Set<string>, depth: number): any {
  if (depth > 4) {
    if (Array.isArray(value)) return `[Array(${value.length})]`
    if (typeof value === "object" && value !== null) return `{Object(${Object.keys(value).length} keys)}`
    return value
  }
  if (Array.isArray(value)) {
    if (value.length <= 3) return value.map((item) => compressValue(item, relevantKeys, depth + 1))
    const kept = value.slice(0, 3).map((item) => compressValue(item, relevantKeys, depth + 1))
    return [...kept, `... ${value.length - 3} more items (${value.length} total)`]
  }
  if (typeof value === "object" && value !== null) {
    const keys = Object.keys(value)
    if (relevantKeys.size > 0 && depth <= 1) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result: Record<string, any> = {}
      const omitted: string[] = []
      let kept = 0
      for (const key of keys) {
        if (relevantKeys.has(key)) { result[key] = compressValue(value[key], relevantKeys, depth + 1); kept++ }
        else omitted.push(key)
      }
      if (kept === 0) {
        keys.slice(0, 5).forEach((k) => { result[k] = compressValue(value[k], relevantKeys, depth + 1) })
        if (keys.length > 5) result["..."] = `${keys.length - 5} more keys omitted`
      } else if (omitted.length > 0) {
        result["..."] = `${omitted.length} keys omitted: ${omitted.slice(0, 5).join(", ")}${omitted.length > 5 ? "..." : ""}`
      }
      return result
    }
    const max = 8
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: Record<string, any> = {}
    keys.slice(0, max).forEach((k) => { result[k] = compressValue(value[k], relevantKeys, depth + 1) })
    if (keys.length > max) result["..."] = `${keys.length - max} more keys omitted`
    return result
  }
  if (typeof value === "string" && value.length > 200) return `${value.slice(0, 200)}... (${value.length} chars)`
  return value
}

function compressJson(text: string, commandHint?: string): string {
  let parsed: unknown
  try { parsed = JSON.parse(text.trim()) } catch { return text }
  const hints = getKeyHints(commandHint)
  const compressed = compressValue(parsed, hints, 0)
  const result = JSON.stringify(compressed, null, 2)
  const origLines = text.split("\n").length
  const newLines = result.split("\n").length
  if (newLines >= origLines * 0.6) return text
  const note = hints.size > 0 ? `Keys retained: ${[...hints].join(", ")}` : "Top-level keys retained"
  return `${result}\n\n[JSON compressed: ${newLines} of ${origLines} lines. ${note}]`
}

function compressXml(text: string): string {
  const lines = text.split("\n")
  const origCount = lines.length
  const result: string[] = []
  let repetitionCount = 0
  let lastTagName = ""
  let skipping = false
  for (const line of lines) {
    const cleaned = line.replace(/\s+xmlns(?::\w+)?="[^"]*"/g, "")
    const tagMatch = cleaned.match(/^\s*<(\w+)[\s>]/)
    if (tagMatch) {
      const tagName = tagMatch[1]
      if (tagName === lastTagName) {
        repetitionCount++
        if (repetitionCount > 3) {
          if (!skipping) { result.push(`    ... (repeated <${tagName}> elements)`); skipping = true }
          continue
        }
      } else {
        if (skipping) { result.push(`    [${repetitionCount} total <${lastTagName}> elements]`); skipping = false }
        lastTagName = tagName
        repetitionCount = 1
      }
    }
    result.push(cleaned)
  }
  if (skipping) result.push(`    [${repetitionCount} total <${lastTagName}> elements]`)
  const newCount = result.length
  if (newCount >= origCount * 0.6) return text
  return `${result.join("\n")}\n\n[XML compressed: ${newCount} of ${origCount} lines]`
}

function compressStructured(text: string, toolName: string, commandHint?: string): string {
  if (toolName !== "bash") return text
  const fmt = detectFormat(text)
  if (fmt === "json") return compressJson(text, commandHint)
  if (fmt === "xml")  return compressXml(text)
  return text
}

// ─── Layers 3+4: ANSI strip, blank-line collapse, general truncation ─────────

function stripAnsi(text: string): string {
  return text.replace(ANSI_RE, "")
}

function collapseBlankLines(text: string): string {
  return text.replace(/(\r?\n){3,}/g, "\n\n")
}

function truncateGeneral(text: string): string {
  const lines = text.split("\n")
  if (lines.length <= MAX_LINES) return text
  const omitted = lines.length - HEAD_LINES - TAIL_LINES
  return [
    ...lines.slice(0, HEAD_LINES),
    "",
    `[... ${omitted} lines omitted (general truncation) ...]`,
    "",
    ...lines.slice(lines.length - TAIL_LINES),
  ].join("\n")
}

function generalCompress(text: string): string {
  return truncateGeneral(collapseBlankLines(stripAnsi(text)))
}

// ─── Full pipeline ────────────────────────────────────────────────────────────

function compressAll(text: string, toolName: string, commandHint?: string): string {
  let out = truncateWithBudget(text, toolName)   // Layer 1
  out = compressStructured(out, toolName, commandHint) // Layer 2
  out = generalCompress(out)                      // Layers 3+4
  return out
}

// ─── Tool export ──────────────────────────────────────────────────────────────

export default tool({
  description:
    "Compress verbose tool output using caveman-code's 4-layer token compression " +
    "(per-tool budgets, JSON/XML semantic extraction, ANSI stripping, truncation). " +
    "Use on any large bash/read/grep output to reduce token usage by 50–94% before " +
    "passing it to further reasoning steps.",
  args: {
    text: tool.schema
      .string()
      .describe("Raw text or tool output to compress"),
    toolName: tool.schema
      .enum(["bash", "read", "grep", "find", "ls", "other"])
      .optional()
      .describe("Source tool for budget selection. Defaults to 'bash'."),
    commandHint: tool.schema
      .string()
      .optional()
      .describe(
        "The command that produced the output (e.g. 'npm ls', 'docker inspect'). " +
        "Improves JSON key extraction for bash output."
      ),
  },
  async execute(args) {
    const toolName = args.toolName === "other" || !args.toolName ? "bash" : args.toolName
    const compressed = compressAll(args.text, toolName, args.commandHint)

    const origBytes = new TextEncoder().encode(args.text).length
    const newBytes  = new TextEncoder().encode(compressed).length
    const origLines = args.text.split("\n").length
    const newLines  = compressed.split("\n").length
    const savings   = Math.round((1 - newBytes / origBytes) * 100)

    const stats =
      `[caveman-compress] ${origLines} → ${newLines} lines · ` +
      `${origBytes} → ${newBytes} bytes · ${savings}% reduction`

    return `${compressed}\n\n${stats}`
  },
})

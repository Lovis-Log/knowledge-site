---
slug: 02-codex-agent-loop
title: "Unrolling the Codex Agent Loop: Prompts, Caching, Compaction"
summary: "How one user request becomes a chain of API calls: what goes into the prompt, how tool results are fed back, why every new request reuses the old prompt as an exact prefix, and what cache misses and compaction each solve."
updatedAt: 2026-11-01
content_type: technical-tutorial
categories: [ai-era]
tags: [agent-loop, codex, tool-use, context-management]
sources:
  - kind: article
    title: "Unrolling the Codex agent loop"
    url: https://openai.com/index/unrolling-the-codex-agent-loop/
    author: Michael Bolin
---

## Aligning terminology

Codex is the umbrella name for a family of software agents (CLI, Cloud, VS Code extension). This note is about the Codex **harness**: the core loop and execution logic shared by every Codex experience and surfaced through the CLI. Below, "Codex" and "Codex CLI" are used interchangeably.

Three words that are easy to confuse:

- **turn**: everything from one user input to one agent reply. A single turn can contain many iterations of "model inference → tool call".
- **thread**: an entire multi-turn conversation.
- **harness**: the program that orchestrates all of this — the agent itself. The model is one component it calls.

## The loop

The skeleton has four steps:

1. Take user input and assemble it, together with system instructions, into a **prompt**.
2. Query the model (**inference**): the prompt is tokenized, the model samples a new sequence of tokens, and those are decoded back to text.
3. The model either produces a final reply or requests a **tool call** (e.g., "run `ls` and report the output").
4. For a tool call, the harness executes it, appends the output to the original prompt, and queries the model again with the new information.

The loop repeats until the model stops requesting tools and emits an **assistant message** for the user. That message is the termination signal for the turn; control returns to the user.

One point is easy to miss: the agent's "output" is not limited to that message. It may already have written code or edited files on your machine. But however much work happened, every turn ends with an assistant message.

## What a request looks like

Codex talks to the **Responses API**. Three fields matter most:

| Field | Purpose |
| --- | --- |
| `instructions` | System or developer instructions placed at the front of the model's context |
| `tools` | The tools the model may call, described by JSON Schema |
| `input` | A list of text, image, and file inputs |

Where `instructions` come from: if `~/.codex/config.toml` specifies `model_instructions_file`, that file is used; otherwise the model's own `base_instructions` apply (for example `gpt-5.2-codex_prompt.md` in the repository).

`tools` has three sources: tools provided by the CLI (`shell`, `update_plan`), tools provided by the Responses API (such as `web_search`), and tools provided by the user through MCP servers (such as `mcp__weather__get-forecast`).

## How the initial prompt is assembled

The user message is not the first item in `input`. Codex inserts several items ahead of it:

1. **Permissions instructions** (`role=developer`): which folders the sandbox may write, whether there is network access, and when to ask the user for approval. It constrains only Codex's own `shell` tool; MCP tools are not sandboxed by Codex and must enforce their own guardrails.
2. **Developer instructions** (optional, `role=developer`): the `developer_instructions` value from `config.toml`.
3. **User instructions** (optional, `role=user`): aggregated from several sources, not a single file:
   - `AGENTS.override.md` and `AGENTS.md` under `$CODEX_HOME`
   - Walking from the project root to `cwd`, any `AGENTS.override.md`, `AGENTS.md`, or configured fallback filenames, with a default budget of 32 KiB
   - If skills are configured: a short preamble, each skill's metadata, and instructions for using skills
4. **Environment context** (`role=user`): the current working directory and shell.

```text
<environment_context>
  <cwd>/Users/mbolin/code/codex5</cwd>
  <shell>zsh</shell>
</environment_context>
```

Only then is the actual user message appended. Each item is a JSON object with `type`, `role`, and `content`.

A subtlety: the order of the first three system-level items is decided by the **API server**, not the client. Of those three, only the system message content is server-controlled; `tools` and `instructions` are chosen by the client.

## Streaming responses and tool results

The request returns a Server-Sent Events (**SSE**) stream. Each event's data is JSON with a `type`:

```text
data: {"type":"response.reasoning_summary_text.delta","delta":"ah ", ...}
data: {"type":"response.output_item.added", "item":{...}}
data: {"type":"response.output_text.delta","delta":"forty-", ...}
data: {"type":"response.completed","response":{...}}
```

Codex consumes these events. Some drive streaming in the UI (`response.output_text.delta`); others are transformed into objects appended to the `input` of the next request (`response.output_item.added`).

Suppose the first response produced two items: a `type=reasoning` item (the model's reasoning summary, carrying `encrypted_content`) and a `type=function_call` item invoking `cat README.md`. After the tool runs, `input` becomes:

```javascript
[
  /* ... the original 5 items ... */
  { "type": "reasoning", "summary": [...], "encrypted_content": "gAAAAAB..." },
  { "type": "function_call", "name": "shell",
    "arguments": "{\"command\":\"cat README.md\",\"workdir\":\"/Users/mbolin/code/codex5\"}",
    "call_id": "call_8675309..." },
  { "type": "function_call_output", "call_id": "call_8675309...",
    "output": "..." }
]
```

The key property: **the old prompt is an exact prefix of the new one**. This is deliberate, because only an exact prefix can hit the prompt cache.

## Why the prefix property decides performance

The article describes a Codex implementation that replays its input items each turn. With roughly equal amounts of new content each turn, request size grows approximately linearly, while total bytes sent through turn $n$ grow roughly as $n^2$. The article gives two reasons for that design:

- Requests stay **fully stateless**, so the provider need not store sessions.
- The design accounted for Zero Data Retention (ZDR). The current [Responses WebSocket guide](https://developers.openai.com/api/docs/guides/websocket-mode) also allows `previous_response_id` with `store=false` or ZDR on a live connection’s in-memory cache, without a persistent fallback.

Prefix caching reuses work on input that has already been processed, which can lower repeated-input cost and latency. The model still generates new output, and a cache hit does not shrink the request the client sends.

Caching only works on exact prefixes. Static content (instructions, examples) goes first; variable content goes last. Images and tool definitions must also be identical between requests.

### What causes a cache miss

- Changing the `tools` list mid-conversation.
- Switching the `model` (model-specific instructions change, which alters the third prompt item).
- Changing the sandbox configuration, approval mode, or working directory.

The Codex team must be careful with every new feature. A real example: the first MCP support enumerated tools in an inconsistent order, which broke caching. MCP is especially tricky because a server can change its tool list at any time via `notifications/tools/list_changed`; honoring that notification in the middle of a long conversation costs an expensive miss.

The workable pattern is to record mid-conversation changes by **appending a new message** rather than editing an earlier one:

- Sandbox or approval mode change: append a `role=developer` message in the same format as the original permissions item.
- Working directory change: append a `role=user` message in the same format as the original environment context.

## Context window and compaction

Even with caching, the prompt keeps growing and eventually hits the context window, which is shared by input and output. Codex's strategy: once token count exceeds a threshold, **compact** — replace `input` with a smaller list of items that represents the conversation, so the agent can continue with an understanding of what happened.

The early implementation required a manual `/compact` command, which sent the conversation plus summarization instructions to the model and used the summary as the new `input`.

The [Responses API compaction guide](https://developers.openai.com/api/docs/guides/compaction) describes server-side compaction within `/responses` using `compact_threshold`, as well as a standalone `/responses/compact` call that returns a new input window. The encrypted compaction item is opaque. The Codex trigger described in the article belongs to that implementation.

Compaction is **lossy**: details are summarized away. It answers "can we keep going", not "is everything still here". Facts that must survive should live in files or `AGENTS.md`, not in the hope that history is never compacted.

## Takeaways

- One turn may contain many "inference → tool call" iterations, but always ends with an assistant message.
- A request has `instructions`, `tools`, and `input`; Codex assembles `input` and places the user message after the system-level items.
- After each tool call, the old prompt is an exact prefix of the new prompt, enabling cache hits.
- Cache misses come mainly from changes to tools, model, sandbox, or cwd; MCP tool ordering is a classic trap.
- Sampling dominates cost; caching turns quadratic growth into linear.
- Compaction trades lossy summarization for the ability to continue, so durable facts belong in files.

## Comprehension check

**1. Why is the agent's "output" more than the final assistant message?**

Reference answer: During the loop the agent executes tool calls, and tools can modify the local environment — writing files, editing code, running commands. Those side effects are the primary product of the work. The assistant message marks the end of the turn and returns control to the user ("I added the architecture.md you asked for"), but it does not represent the whole output.

**2. Why does the "old prompt is an exact prefix" property matter?**

Reference answer: Prompt caching only hits on exact prefixes. After each tool call Codex appends the tool output to the end of the original prompt, leaving everything before it unchanged, so the next request can reuse the previous sampling computation and cost grows linearly instead of quadratically. Any edit in the middle — reordering tool definitions, for example — breaks the prefix and the cache.

**3. Name three operations that cause a cache miss and explain why.**

Reference answer: First, changing the `tools` list mid-conversation, since tool definitions sit near the front and the prefix breaks immediately. Second, switching models, because model-specific instructions change the third prompt item. Third, changing sandbox configuration, approval mode, or working directory, which are recorded in system-level items; Codex appends new messages to avoid breaking the prefix, but editing the old items directly would invalidate it. MCP servers dynamically changing their tool list or ordering also causes misses.

**4. Why did the Codex implementation in the article replay the full input each turn?**

Reference answer: The client managed the history, so calls did not depend on persistent server-side conversation state. With roughly constant new content each turn, individual requests grew approximately linearly and the total bytes sent grew roughly quadratically. Current WebSocket continuation can also use `previous_response_id` on a live connection, under the conditions above.

**5. What does compaction solve, and what does it cost?**

Reference answer: It solves unbounded prompt growth that would exceed the context window by replacing `input` with a smaller representative set of items (the newer endpoint returns items including a `type=compaction` item with `encrypted_content`) so the agent can continue. The cost is lossiness: details are summarized away, so facts that must persist should be written to files or `AGENTS.md` rather than relying on conversation history.

**6. If you add a feature that changes the working directory mid-conversation, why not just edit the environment context item in `input`?**

Reference answer: Because that breaks the "old prompt is a prefix of the new prompt" property and invalidates the entire cache, which is expensive in a long conversation. The correct approach is to append a new `role=user` message in the same format to record the change, leaving the prefix intact.

---
slug: "02-tool-use"
title: "Tool Use: Wiring a Language Model to the World"
summary: "Tool use is the foundation of agents: tool categories, code-as-action, call formats, constrained decoding, MCP, parallel calls, and how to evaluate tool ability."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "ai-agents"
  - "tool-use"
  - "constrained-decoding"
  - "mcp"
sources:
  - kind: "video"
    title: "CMU AI Agents 2026: 2. Tool Use for Language Model Agents"
    url: "https://www.youtube.com/watch?v=jXChFB4JSyw"
    author: "Graham Neubig"
    publishedAt: "2026-09-08"
  - kind: "article"
    title: "CMU CS 11-768 course site"
    url: "https://cmu-agents.com"
---

## Why tools define the boundary

A language model predicts tokens. It cannot check the weather, read a file, or run code on its own. A tool is the interface that closes the gap: **the model emits a structured call, an external program executes it, and the result returns to the context**.

Tools pay off in two distinct ways, and the distinction tells you when a tool is worth writing:

| Benefit | Meaning | Example |
| --- | --- | --- |
| Extending | The model fundamentally cannot do it | Fresh information, private state, changing the outside world |
| Facilitating | The model can do it, but a program does it faster and more reliably | Multiplying seven-digit numbers, exact statistics |

The second category is easy to overlook. A model can "do" arithmetic, but only through a long chain of reasoning. A calculator returns a deterministic answer in one call. **Whenever a deterministic program can replace probabilistic reasoning, it usually should.**

### The usual categories

- **Text response.** Either an explicit `finish` tool, or the convention that not calling a tool ends the loop.
- **Web search and retrieval.** Fetch outside information, then generate. The lecture's aside: RAG is not dead; it became so normal that people stopped noticing they use it.
- **Code execution.** Computation, data processing, verification.
- **Image generation.** Unlike text tools, the model rewrites the prompt substantially; the description sent to the image model often differs a lot from the user's words.
- **Application APIs.** Ordering, cart creation, internal business systems.

## Code as a meta-tool

The conventional design exposes dozens of APIs and the model calls one per step. Code is different: it is expressive enough to organize many calls into a single tree, with loops, variables, and libraries.

The lecture compares two ways to answer one question: find the cheapest country among four to buy a given phone, accounting for price, exchange rate, and tax.

- Step-by-step tool calls: look up the rate, look up the price, convert, add tax, look up the rate again, and so on for many turns.
- A single program: generate the whole procedure once, execute it, read the answer.

The cited work finds that code-style tool calling **raises success rates and reduces the number of interaction turns**, even on tasks that did not obviously need programming.

### What it costs

Code is a high-powered action, and that brings four risks:

1. **It can hang.** Infinite loops require external timeouts.
2. **Dependencies are an attack surface.** A pulled-in library may be compromised, and then the agent and the host are compromised with it.
3. **It is hard to constrain.** A large action space makes validation and predictability harder.
4. **Resource impact is larger.** CPU, memory, and disk use far exceed a single API call.

Once code execution is allowed, a sandbox stops being optional and becomes a precondition.

## The mechanics of a tool call

### Special tokens, not function objects

The model does not see functions. It sees text with special tokens, and the format differs by vendor: Qwen has its own tool-call markers, Mistral another, DeepSeek uses a DSML-style function call.

These tokens are usually introduced during **mid-training** rather than pre-training, then reinforced through instruction tuning and RL. In practice you must use the model's own chat template (Hugging Face's `apply_chat_template` does exactly this). Mismatched templates noticeably degrade performance.

### Dispatch and execution

A complete call passes through six stages:

1. the model emits a call (name plus arguments);
2. the harness parses the arguments;
3. the name is resolved in a registry of tools;
4. arguments are validated;
5. the function runs;
6. the result is appended to the context as an observation.

Failures divide into two kinds:

- **Validation failure**: arguments violate the schema, or the tool does not exist.
- **Execution failure**: the arguments are well formed but semantically wrong, such as Python that parses and then raises.

Every call is assigned an ID and its result carries the same ID, which is essential for parallel calls. One practical trap: some APIs (Anthropic's, for instance) reject a history in which a tool call has no matching result. If a crash loses the result, resuming the conversation fails.

## Constrained decoding

Models do not guarantee valid JSON. A missing closing brace makes the parser throw, and patching brackets by hand is not engineering.

Constraints come in three layers:

| Layer | Requirement |
| --- | --- |
| Syntax | The output parses as JSON |
| Shape | Required fields are present and structured correctly |
| Types | Field types, enum values, and units are correct |

JSON Schema expresses all three. The corresponding formal language is not regular: regular expressions are matched by finite-state automata, while nested JSON needs a **pushdown automaton** with a stack.

### How it applies during generation

In an implementation such as XGrammar, every time the model proposes logits for the next token, the current grammar state checks the vocabulary. Legal tokens keep their scores, illegal tokens are set to negative infinity, and the distribution is renormalized. Sampling can only land on legal tokens.

For speed, tokens that are always legal or always illegal are precomputed; only tokens whose legality depends on the stack state are checked on the fly.

### What it does not guarantee

Constraint decoding guarantees **form**, not **meaning**. A syntactically valid Python program can still be wrong. A schema-valid city name can still be fictitious.

There is also an edge case: when the output token budget runs out, the model may stop mid-path in a legal but non-terminal state. The syntax is fine; the call is incomplete.

## Three ways to expose a tool

### REST APIs

The traditional route. A FastAPI backend plus an API key gives a remotely callable tool. Two side benefits: access can be restricted, and the framework generates a JSON Schema that can be handed straight to the model. If the agent has bash, `curl` works too.

### Local function libraries

In programmatic tool calling, a tool is a Python module the model imports in generated code. Simple, but not remotely callable and not usable through the standard JSON tool-call path.

### MCP: a credential boundary

The first reaction to the Model Context Protocol was "why not just call the API". The accepted reason is **security layering**:

- the upstream credential (a GitHub token, say) goes to the MCP server;
- the agent receives only an MCP API key.

If the agent leaks its key into a public repository, the leak exposes a key to the MCP server rather than the GitHub account itself.

MCP also standardizes discovery, transport (stdio or socket), resources, and prompts, and has an official registry. `fastmcp` is positioned as FastAPI for MCP.

## Parallel tool calls

When calls are independent — weather, calendar, flight status — there is no reason to serialize them. The model puts several call blocks in one response, and the harness runs them concurrently with something like `asyncio.gather`.

The precondition is **no dependencies between calls**. "Look up the customer ID, fetch their orders, refund one" cannot be parallelized.

A counterintuitive observation: **a more expensive model can be cheaper per task**. It picks the right approach faster, and newer models parallelize much better. The parallelization itself was largely forced by reinforcement learning: penalize wall-clock duration heavily and models learn to issue many calls at once.

## Evaluating tool use

Before end-to-end agent evaluation comes tool-call evaluation. The standard is the Berkeley Function Calling Leaderboard, now in its fourth version, covering single-turn, multi-turn, agentic tool calling, and robustness (argument hallucination, format sensitivity).

Useful dimensions:

- **Tool selection**: did it pick a tool that can actually do the task?
- **Arguments**: are values, units, and types right?
- **Ordering**: do multi-step calls respect dependencies?
- **End-to-end accuracy**.
- **Efficiency**: latency, tokens, cost.
- **Reliability**: retries on timeout, fallback when a tool fails.
- **Safety**: resistance to adversarial requests to misuse tools.

### Same model, different provider, very different results

An OpenRouter benchmark measured tool-call error rates for one model across inference providers. The spread ran from roughly 0.01% to 15%. Causes include:

1. **Quantization**: FP8 is typically much better than FP4, which saves money at a real quality cost.
2. **Speculative decoding**: lossless should not change results; lossy can.
3. **Constrained decoding**: some providers implement grammar constraints, others rely on the model alone.
4. **Reliability**: timeouts and outages also count as failures.

The practical lesson: **"same model" does not mean "same agent"**.

## Takeaways

- Tools extend the model from generating text to changing the world.
- Code is the most expressive tool and the riskiest; it requires a sandbox.
- A tool call is a full pipeline: format, parse, validate, dispatch, execute, return.
- Constrained decoding guarantees syntax, not semantics.
- MCP's core value is credential isolation and standardization, not merely another API.
- Parallel calls cut latency when calls are independent.
- Evaluate selection, arguments, ordering, efficiency, reliability, and safety.

## Check your understanding

1. When should a task become a tool instead of something the model computes itself?
2. Why does JSON Schema require a pushdown automaton rather than a finite-state machine?
3. Under what condition does constrained decoding still produce an incomplete call?
4. What security property does MCP add over handing the agent a GitHub token?
5. Why can two providers of the "same model" differ by orders of magnitude in tool-call error rate?

## How this connects to the rest of the course

This lecture builds the tool layer. The next one handles long context: what happens when history, tool definitions, and observations keep accumulating. Then come memory and skills, planning, and the training and evaluation loop that turns tool use into a learned capability.

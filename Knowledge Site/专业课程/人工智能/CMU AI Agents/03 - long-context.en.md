---
slug: "03-long-context"
title: "Long Context: Capacity, Efficiency, and Compaction"
summary: "Agent context grows quickly with every turn, so two separate problems must be solved: whether the model can use a long context, and whether the system can afford to serve it."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "ai-agents"
  - "long-context"
  - "kv-cache"
  - "attention"
sources:
  - kind: "video"
    title: "CMU AI Agents 2026: 3. Long Context Modeling for Agents"
    url: "https://www.youtube.com/watch?v=AiwCCvFW1uE"
    author: "Graham Neubig"
    publishedAt: "2026-09-08"
  - kind: "article"
    title: "CMU CS 11-768 course site"
    url: "https://cmu-agents.com"
---

## Why agent context explodes

Every call resends the history. If the first call carries 6 tokens and each turn adds 5, the second call reads 11, the third 16, then 21 and 26. **Cumulative processing grows quadratically with the number of turns.** Real sessions go far beyond five or six turns; the lecture mentions coding agents driven for days.

The lecture analyzed 1,500 OpenHands sessions, each solving a single task rather than a multi-day project. The average session consumed about 78,000 tokens:

| Component | Share | Note |
| --- | --- | --- |
| System prompt + tool descriptions | 23% | 15k–18k tokens; grows with the tool count |
| User messages | 9% | Initial task and follow-ups |
| Reasoning traces | 9% | The model's thinking |
| Model replies | 2% | Text shown to the user |
| Tool calls | 20% | Writing code, reading files |
| Tool results | 37% | The largest single block |

Two ratios are worth remembering: the model spends about five times as many tokens thinking as talking, and tool calls plus results account for nearly 60% of the context.

## Timeline

| Time | Topic |
| --- | --- |
| 0:07 | Opening: context management and long-context architectures |
| 1:10 | Agent context growth: input cost rises quadratically with length |
| 2:37 | Prompt makeup: system prompt, tool definitions, dialogue, tool outputs |
| 4:29 | Two challenges: capacity and efficiency |
| 5:59 | Two inference phases: prefill and decode |
| 11:04 | Attention computation: Q/K/V and quadratic complexity |
| 11:54 | Effectiveness: "lost in the middle" in long-context evaluation |
| 16:08 | Architecture families: local/global hybrids and sparse retrieval |
| 19:00 | Sliding-window attention |
| 20:08 | Linear attention, the state matrix, and its expressiveness gap |
| 29:47 | Gated Delta and the Qwen models |
| 31:10 | Sparse attention: fixed-stride and content-dependent |
| 33:41 | KV compression: fewer heads and low-rank projection |
| 36:22 | Training long context: books, patents and synthetic tasks |
| 38:42 | Positional encodings: RoPE, NoPE and length extrapolation |
| 52:06 | The economics of KV and prompt caching |
| 57:41 | Paged memory and RadixAttention |
| 1:06:23 | Context compaction: what survives and what is lost |
| 1:10:24 | Compaction triggers: token thresholds, slash compact, encrypted compaction |
| 1:12:51 | Evaluating compaction |

## Two separate problems

1. **Capacity**: can the model actually use a long context? This needs architecture, positional encoding, training data, and evaluation.
2. **Efficiency**: can the system afford to serve it? This needs attention approximations, KV caching, and scheduling.

The two are often conflated. "Supports 1M tokens" means it fits, not that it works well.

## The inference baseline

- **Prefill** processes the input tokens once and produces key/value pairs for every layer.
- **Decode** generates one token at a time, reusing earlier KV and appending only the new entries.
- **KV cache** stores the computed keys and values so they are not recomputed.

Four serving metrics:

| Metric | Meaning | When it matters |
| --- | --- | --- |
| TTFT | Time from request to first token | Interactive coding |
| TPOT | Time between output tokens | Interactive coding |
| Throughput | Tokens or requests per unit time | Background batches |
| Cost | Price per million tokens | Everywhere |

A practical point: providers usually ask whether you care more about latency or throughput, because the optimizations conflict. An overnight batch agent does not care about TTFT at all.

## Why attention is expensive

Standard attention compares every token with every earlier token, which is $O(n^2)$. A million tokens means about $10^{12}$ comparisons, each involving vector multiplication.

Almost every long-context architecture does the same thing: **cap the number of comparisons per step**, turning $O(n^2)$ into $O(n \cdot w)$ or $O(n)$.

### Local plus global

- **Local** models cap computation inside a local window.
- **Global** models allow information to travel across the whole sequence, whether or not computation is capped.

Nearly every popular model is a hybrid: many local computations interspersed with occasional global ones. The lecture lists six:

| Model | Local mechanism | Global mechanism | Ratio |
| --- | --- | --- | --- |
| Qwen (latest) | gated delta net | sparse retrieval | 3:1 |
| GLM 5.3 | delta variant | sparse attention | 3:1 |
| Kimi K3 | delta variant | dense attention | 3:1 |
| Nemotron | Mamba | dense attention | 4:1 |
| A sliding-window model | sliding window attention | dense attention | 5:1 |
| DeepSeek | windowed attention | sparse attention with interleaved branches | special |

### Sliding window attention

The simplest option: the current chunk attends to a fixed number of previous chunks (say 512 tokens each). A single layer sees only nearby context, but by layer two the previous chunk already contains earlier information, so the **receptive field expands with depth**. No change to the attention operation itself.

### Linear attention and DeltaNet

Linear attention removes the softmax. The cost is expressiveness: the model loses the nonlinear ability to focus on a few relevant tokens. The gain is that associativity lets the sum over all past keys and values be rearranged into a **state matrix** $S$.

That matrix is a linear map from query to value, and it can be updated incrementally: each new token updates $S$ in constant time, reducing $O(n^2)$ to $O(n)$ and effectively making the model recurrent.

DeltaNet makes the update smarter:

1. Predict a value from the current key and the old matrix, $\hat v_t = k_t^\top S_{t-1}$.
2. Compare with the true value $v_t$ to get an error.
3. Correct the matrix by $k_t \times \text{error}$, scaled by a learning-rate-like $\beta$.
4. Multiply by a decay factor $\alpha$ each step so distant information fades.

The decay solves a real problem: without it, one anomalous key from long ago can contaminate the state forever. GLM and Kimi use **per-element decay**, so different dimensions forget at different rates and some information persists much longer than the rest.

> **One-sentence summary:** Linear attention trades explicit pairwise comparison for an incrementally updated state matrix; DeltaNet buys back expressiveness with error correction and decay.

### Sparse attention

Instead of comparing against all history, select part of it:

- **Strided sparse attention**: sample every 512th token. Still quadratic, but with a constant 512 times smaller.
- **Content-dependent sparse attention**: estimate relevance cheaply (for example, down-project the vectors), take the top k, then run full attention over those k. DeepSeek uses this style.

### KV compression

Three techniques, which can be combined:

- **GQA** reduces the number of key/value heads, often by 4 or 8.
- **MQA** keeps a single key/value group, the extreme case of GQA.
- **MLA** keeps the head count but down-projects each head's key/value dimension.

All three shrink the KV cache so longer contexts fit in GPU memory.

## Training long-context models

### Data is harder than architecture

There is not much coherent 128k-token text on the internet — more than most Wikipedia articles, close to a book. The usual curriculum is:

1. short-context pre-training;
2. continued training on longer documents;
3. long-context adaptation.

**Packed sequences** — concatenating many documents into one window — help efficiency but do not teach cross-document coherence, because the model should not attend across unrelated documents. Adaptation needs genuinely coherent long data.

Sources include books, code repositories (naturally coherent), topically related document collections, patents, agent trajectories, and synthetic tasks.

### Positional encoding and length extrapolation

- **Absolute** positional encodings assign a vector to each position.
- **RoPE** makes the encoding depend on relative distance, implemented with rotations.
- **NoPE** omits positional encoding entirely. The lecture gives the counterintuitive argument: under causal masking, a token at position 2 sees one predecessor while a token at position 5 sees four, so their representations already differ. Autoregressive transformers therefore do not need explicit positions; non-autoregressive ones still do.

RoPE extrapolation has two problems. A model trained on length $L$ has never seen two tokens attend across a distance greater than $L$. And relative position is only one factor; the causal mask matters too.

Common fixes:

- **Position interpolation**: divide the RoPE $\theta$ by the extension factor, effectively stretching the coordinates.
- **YaRN**: extend different frequencies by different amounts, so some dimensions handle long range and others handle short range.

### Parallel training

Long-context training needs **context parallelism**: split one sequence's KV across devices and compute in turn.

It coexists with data, tensor, pipeline, and expert parallelism. The friction is that new attention mechanisms collide with systems work. The lecture gives a concrete example: trying to apply context parallelism to a 35B Qwen model, and finding no gated delta net kernel available anywhere, so it had to be written from scratch. Standard attention and sliding-window kernels are usually readily available.

## KV caching is where the money is

### Reusing the prefix

Step 1 computes and caches the KV for the input. Step 2 computes only the new tool result, reusing everything before it. By step 50 the new content is small relative to the full history, so the savings are large.

Published measurements show the uncached cost growing quadratically with length while the cached cost stays close to linear.

Prices tell the same story: **cached tokens typically cost one tenth of uncached tokens**. The lecture's rule of thumb is that a 90–95% cache hit rate is healthy. Output tokens cost roughly five times input tokens, so the spread between output and cached input can reach 50x.

### Two open-source implementations

- **vLLM's PagedAttention** divides GPU memory into fixed blocks and allocates them like OS memory pages, so many sequences can be generated in parallel and blocks can be evicted together.
- **SGLang's RadixAttention** indexes previously computed prefixes in a radix tree and reuses any matching prefix. It was designed for chat, but matters more for agents because agent conversations are longer and more frequent.

Multi-machine serving needs **cache-aware routing**: send each request to the machine holding the best matching KV cache. Caches are evicted after some idle period — minutes to an hour depending on the provider — and the eviction policy directly changes the hit rate. OpenRouter even ranks providers by cache hit rate.

### Hard constraints on harness design

Caching only works when the **entire prefix is identical**. That yields three rules:

1. **Never change the system message every step.** The classic mistake is appending the current date and time to the system prompt; every step invalidates the whole cache. Put the timestamp in the last user message or tool result instead.
2. **Changing the tool list mid-conversation is fine**; it does not invalidate the prefix already cached.
3. **Switch models sparingly.** Routing one step to a stronger model and the next to a cheaper one means the next call to the strong model still recomputes at the uncached price, which can erase the savings.

## Context compaction

When the context exceeds the budget, history is summarized. The risk is losing information: at best the agent drifts, at worst it deletes files.

A good compaction policy must satisfy two conditions:

- **Behavior preservation**: the future action sequence after compaction should match, or improve on, the one before.
- **Bounded state**: the result must be small enough to keep working.

### What to keep

- **Anchors**: the first user messages of the session, usually protected.
- **Middle summary**: older actions and observations compressed into structured or free text.
- **Recent tail**: the last few steps kept verbatim.
- **Evidence store**: the full history usually remains on disk and can be read back when needed.

### When to trigger

- a token threshold;
- a provider's hard limit;
- a manual command such as `/compact`.

### The traps

Repeated compaction accumulates loss: the first pass is acceptable, later ones degrade further. Summary formats vary too — structured fields, free text, or an encrypted blob in some implementations.

The lecture tells an OpenHands story. They built a compaction algorithm that lost no points on SWE-bench while saving many tokens, and it looked like a success. In production it opened a new pull request every time it compacted, because the model forgot it had already done so, and it forgot user instructions given mid-conversation, because the benchmark only covered single-turn sessions with one user message.

The lesson: **passing a benchmark is not the same as being usable; compaction must be validated in the wild.**

## Takeaways

- Agent context grows quadratically; tool calls and results dominate it.
- Capacity and efficiency are distinct problems, solved by architecture, positional encoding, training data, approximations, and caching.
- Mainstream architectures are local-plus-global hybrids, with linear-attention variants locally and sparse or dense attention globally.
- Linear attention trades expressiveness for linear complexity; DeltaNet compensates with error correction and decay.
- Long-context training is limited by coherent long data more than by compute.
- Prefix caching cuts cost by an order of magnitude but requires a stable prefix; never rewrite the system prompt every step.
- Compaction is a fallback, and it must be tested on realistic multi-turn usage.

## Check your understanding

**1. Why does "supports 1M tokens" not imply "uses 1M tokens well"?**

Reference answer: The claim answers only the **capacity** question — the window fits the tokens. Using them well is a different problem with four parts: (1) architecture, whether attention actually carries information across that distance, given the $O(n^2)$ cost and the trade-offs of sparse or linear approximations; (2) positional encoding and length extrapolation, since training only saw distances up to $L$ and relative positions break beyond that without fixes such as PI or YaRN; (3) training data, because genuinely coherent 128k documents are rare — the bottleneck is data, not compute; (4) evaluation, since passing a needle-in-a-haystack retrieval test says nothing about long-range reasoning or instruction persistence.

**2. What does linear attention gain and lose by removing softmax?**

Reference answer: **Gain**: complexity. Without softmax, associativity lets the sum over past key/values be rearranged into a state matrix $S$ that is updated incrementally in constant time per token, reducing $O(n^2)$ to $O(n)$ — effectively a recurrent network. **Lose**: expressiveness. Softmax provides a sharp nonlinear selection that lets a token attend to only a few relevant tokens; linear attention averages that away. DeltaNet restores part of the capacity through prediction-error correction and decay.

**3. What problem does DeltaNet's decay term solve, and what does per-element decay add?**

Reference answer: Decay solves **permanent state contamination**: without it, a single anomalous key from long ago stays in the state matrix forever. Multiplying by a decay factor $\alpha$ at each step lets old information fade, giving the state a way to forget. Per-element decay (used by GLM and Kimi) lets different dimensions forget at different rates: slow dimensions hold long-term memory while fast ones track recent detail, so one state carries information at several time scales at once.

**4. Why does putting a timestamp in the system prompt badly hurt an agent's cost?**

Reference answer: Prefix KV caching only hits when the **prefix is byte-identical**. The system prompt sits at the very front, so writing the current time into it makes every step's system message different, invalidating the whole prefix; all history is then recomputed at the uncached price. Cached tokens typically cost about a tenth of uncached ones, and a healthy system needs a 90%–95% hit rate; with output tokens costing roughly five times input, the loss compounds to more than an order of magnitude. The fix is to put the time in the last user message or a tool result.

**5. Why did OpenHands' compaction algorithm pass the benchmark and fail in production? What does that imply for evaluation?**

Reference answer: Their evaluation covered only **single-turn sessions with one user message**, so compaction kept the SWE-bench score and saved many tokens. Real use is multi-turn: after compaction the model forgot it had already opened a pull request and opened another one every time, and it also lost instructions the user added mid-session. Evaluation therefore has to mirror real interaction: multi-turn trajectories with mid-session instructions and duplicate-action checks, verifying that the **subsequent action sequence stays the same** before and after compaction rather than only the final answer, and confirming the compacted state is bounded and still workable.

## How this connects to the rest of the course

This lecture covers context within a single session. The next one stretches the time horizon across sessions: how memory and skills keep an agent coherent without the full history. Then come planning, coding agents, and the training and evaluation loop that builds on long-context capability.

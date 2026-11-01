---
slug: "12-rl-systems"
title: "RL Systems: Why Inference and Training Need Separate Engines"
summary: "Core primitives, KV cache and continuous batching, activation checkpointing and parallelism, weight sync, token-level data transfer, async training, and service-oriented frameworks: the systems side of agentic RL."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "ai-agents"
  - "reinforcement-learning"
  - "systems"
  - "inference"
sources:
  - kind: "video"
    title: "CMU AI Agents 2026: 12. RL Systems"
    url: "https://www.youtube.com/watch?v=dwR6NP9nI-8"
    author: "Apurva Gandhi"
    publishedAt: "2026-10-14"
  - kind: "article"
    title: "CMU CS 11-768 course site"
    url: "https://cmu-agents.com"
---

## What this lecture covers

The algorithm lecture asks how to update. This one asks how to make the update run. The stated goal is practical: if you use an RL framework to train agents, or fork one to modify it, these are the system problems you will meet.

An agentic RL framework reduces to five primitives:

1. **Forward passes**, used both for rollout sampling and for recomputation during training.
2. **Loss and backward pass.**
3. **Optimizer step.**
4. **Environment interaction**: execute actions, receive observations.
5. **Reward and advantage computation.**

At first glance these are `forward`, `backward`, and `optimizer.step` in PyTorch. Why do Verl, Miles, SkyRL and similar frameworks exist?

The reason is not the primitives but the fact that **inference and training have very different workload characteristics**. Nearly every framework therefore splits them into separate engines and synchronizes between them.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Opening: how to make the update actually run |
| 4:03 | How inference and training workloads differ |
| 8:21 | Sampling from a policy that is one step stale |
| 12:30 | Branching several rollouts from one task prompt |
| 16:47 | Inference optimizations: batched prefill, then decode (continuous batching) |
| 20:57 | Inference-side recap: KV cache, parallelism, scheduling |
| 25:19 | Training side: data parallelism splits the global batch |
| 29:35 | Broadcasting updated weights to the inference engines |
| 33:54 | Recording routing decisions and shipping them with rollout data |
| 38:23 | Harness differences: summarizing actions every few steps |
| 42:39 | Renderers and chat templates |
| 46:54 | Frameworks track exact tokens and hand them to the trainer |
| 50:55 | Flushing the KV cache after a weight sync |
| 54:59 | Custom chat-completions endpoints in front of the trainer |
| 59:08 | Trainer as a service; the Tinker API |
| 1:03:14 | Multi-tenant and multi-LoRA training |

## The division of labor

| Dimension | Inference (rollout) | Training |
| --- | --- | --- |
| Computation | Autoregressive, one token at a time, sequential | Whole sequence available, parallel |
| Autograd | Not needed; the graph can be discarded | Must retain activations and graph |
| Memory pressure | KV cache | Activations, gradients, optimizer state |
| Typical optimizations | KV cache, prefix cache, continuous batching, speculative decoding | Activation checkpointing, sharding |

Separating them allows dedicated optimizations for each. The cost is data and weight movement between engines, plus a subtler issue: the forward implementation can differ slightly between engines, so even with identical weights the sampled distribution differs a little, producing mild off-policy drift.

## Inference-side optimizations

### How large the KV cache is

During decoding, keys and values for earlier tokens have already been computed and should not be recomputed. Caching them saves substantial compute at the cost of memory. The lecture gives a concrete number: Llama 3 8B in BF16 needs about 256GB of KV cache for 64 trajectories of 32k tokens. And that is a small model.

This is the direct reason the engines must be separated: a unified engine would also have to hold training activations, leaving almost no room for the cache.

### Prefix caching

KV caching avoids recomputation inside one request; requests also share large prefixes.

Every step of an agent is a separate LLM request, but the previous step's entire history is the next step's prefix. GRPO groups also share a system prompt and task description. Without reuse, that prefill is paid repeatedly.

- SGLang manages shared prefixes with radix attention.
- vLLM offers automatic prefix caching.

For agentic RL this is not a nice-to-have; it is a primary source of performance.

### Continuous batching

Naive batching schedules a set of requests together and waits for the longest. With widely varying trajectory lengths, much of the compute idles.

Continuous batching re-examines the batch at every decode step: which requests finished, and whether capacity exists to admit a new one. Short requests free their slots immediately.

Real engines also handle prefill. A long prompt's parallel prefill blocks decoding requests, so **chunked prefill** splits long prompts into chunks interleaved with decode.

### Disaggregated inference

A further step dedicates separate GPU pools to prefill and decode. The decode pool then runs plain continuous batching without interference from long prompts, and each workload can use hardware suited to it.

### Speculative decoding

A small, fast draft model proposes several tokens, and the large model verifies them with rejection sampling that preserves equivalence to sampling from the large model.

RL adds a twist: as the policy drifts during training, the draft model's acceptance rate falls. The common fix is an auxiliary SFT or distillation objective that keeps updating the draft model alongside the policy.

## Trainer-side optimizations

### Activation checkpointing

Backward passes need forward activations. Keeping all of them exhausts memory; checkpointing keeps only each layer's input and recomputes the missing activations during backward. The cost is roughly 33% extra compute for a large memory saving. Under memory pressure, it is the first tool to reach for.

### Prefix sharing in training

Training batches also contain repeated prefixes, but training must account for activations and backward, so inference techniques do not transfer directly.

- Snowflake's Arctic RL uses a system called Zoro.
- Another approach is dynamic tree attention: organize the batch as a prefix tree, traverse depth-first, run forward when entering a branch and backward when leaving it, releasing activations as you go. At any moment, retained activations never exceed one root-to-leaf path.

### Parallelism strategies

| Strategy | What is split | When to use | Cost |
| --- | --- | --- | --- |
| Data parallel | Global batch into micro-batches | Model fits on one GPU | Model replicas |
| Pipeline parallel | Layers across ranks | Model does not fit on one GPU | Pipeline bubbles |
| Expert parallel | MoE experts across ranks | MoE models | Routing communication |
| Tensor parallel | Within an operator | A single layer is too large | Heavy communication, usually within a node |
| Context parallel | The sequence dimension | Very long contexts | Passing keys and values |

The rule of thumb: **maximize data parallelism and minimize tensor parallelism**, because the latter carries the most communication overhead.

## Between the two engines

### Weight synchronization

A one-trillion-parameter model in BF16 is about 2TB. Broadcasting all weights to every inference rank on every update is infeasible.

The observation that makes it work: RL updates are extremely sparse. In BF16, roughly 99% of parameters are bit-for-bit unchanged after one update. Syncing only the delta reduces the transfer to 20–30GB, which is feasible even across clusters.

After syncing, weights must be **resharded** to match the inference engine's layout.

### MoE routing consistency

MoE models select experts during the forward pass. Implementation differences, or even tied routing scores, can make trainer and inference engine choose different experts, so training sees a different distribution from sampling.

The fix is direct: record each token's routing decisions during rollout and, in the trainer, **discard its own decisions and replay the recorded ones** (R3). The lecture suggests checking whether R3 is enabled first if MoE training reward is not increasing.

## Problems specific to agent training

### Sequence extension and compaction

Two harnesses:

- **A** appends each new action to the full history.
- **B** periodically summarizes history and continues.

Production systems usually use B (Codex, Claude Code, and OpenHands all compact), but for training efficiency **A is better**.

The reason is data organization. A's whole trajectory is one contiguous prefix, so it can be **one data point**, with observation tokens masked out. B creates a break at each compaction and must be split into two data points, duplicating the task-prompt prefill. If B is unavoidable, techniques such as dynamic tree attention recover some of the shared computation.

### Default chat templates break the prefix

Qwen 3 / 3.5's default template **removes reasoning tokens from history** at each new user turn to save context. That is effectively an implicit compaction, and it breaks sequence continuity.

Many RL frameworks therefore ship their own renderers: Tinker provides custom rendering, Prime RL lets you configure per model whether reasoning is preserved. The course assignment includes a template for Qwen 3.5 that preserves the prefix.

### Pass tokens, not strings

Early frameworks passed strings between engines because inference APIs are string-based. This turned out to be wrong:

1. Small changes in string space, such as an extra space, change tokenization, so the training distribution differs from the sampling distribution.
2. Token-to-string is many-to-one. The same text can have multiple token representations, and retokenizing need not recover the original sequence.

Together these produce off-policy data, visible as loss spikes and instability. Nearly every framework now stores exact token IDs and hands those to the trainer.

### Async training and in-flight updates

Synchronous RL colocates the engines and alternates: all GPUs train, then all GPUs infer. Async RL runs both at once and can split the GPUs, commonly **3:1** in favor of rollout, because generating long trajectories is usually the bottleneck.

Async introduces a strange operation: **in-flight weight updates**. If the policy updates mid-generation, the request must pause, take the new weights, and continue.

The hard part is the KV cache: prefixes computed with old weights are stale. SGLang's pause-generation API offers a retract mode that flushes the cache on pause and recomputes with the new weights.

### Batching inside complex harnesses

Recursive multi-agent systems form a call tree: a root agent delegates to sub-agents, which may delegate further. Training must decide:

- Is the whole tree one sample, or is each sub-trajectory its own?
- How are compaction breaks split?
- How does sub-agent context return to the parent?

These choices directly affect batching efficiency and the gradient signal.

## Framework design: from SPMD to services

### A harness-agnostic proxy

Harnesses multiply (Codex, Claude Code, OpenHands, Pi, and more). If every new harness required changes to the RL framework, maintenance would be untenable.

The pattern is a **proxy service** between harness and inference engine that emulates the chat completions or responses API:

1. accept the harness's request;
2. forward it to the inference engine;
3. return the response to the harness;
4. simultaneously store the data training needs, such as logprobs and routing decisions.

The harness needs no changes and the framework needs no per-harness adapter.

### SPMD versus service-oriented design

- **SPMD**: every GPU runs the same Python program and branches on rank. Easy to reason about globally and to modify; inflexible.
- **Service-oriented with an orchestrator**: training, inference, weights, and environment are independent services speaking standard protocols, coordinated by a lightweight CPU loop. Decoupled, replaceable, elastic; more protocol and operational complexity.

What service orientation enables:

- mixing vendors and GPU models;
- independent scaling of training and inference;
- multi-policy training, where different agents use different weights or architectures;
- online RL, treating a deployed harness as a data source (Cursor's Composer is mentioned as serving new checkpoints periodically);
- multi-tenant / multi-LoRA training, maintaining one LoRA per user and running forward and backward concurrently, for much higher aggregate throughput than serial runs.

A standard training API, such as the Tinker API, lets frameworks be swapped; open-source implementations such as Miles and SkyRL are adopting it.

## Takeaways

- The workload difference between inference and training forces separate engines.
- Inference optimizations center on KV cache and batching; training optimizations center on activations and parallelism.
- The engines must sync weights, reshard, and reconcile MoE routing and tokenization.
- Stability depends heavily on training seeing exactly the tokens that were sampled.
- Async training and in-flight updates are normal, and stale KV caches must be handled explicitly.
- Service-oriented architecture buys decoupling, heterogeneity, and elasticity at the cost of protocol complexity.

## Check your understanding

**1. Why can't one PyTorch loop handle both sampling and training?**

Reference answer: Because the two workloads are nearly opposite. Inference decodes token by token, serially, needs no autograd and can discard the graph, and its memory is dominated by the KV cache; it is optimized with KV caching, prefix caching, continuous batching and speculative decoding. Training receives whole sequences and can parallelize, must retain activations and the graph, and its memory is dominated by activations, gradients and optimizer states; it is optimized with activation checkpointing and parallelism. In one engine the KV cache and the training activations compete for the same memory — the lecture's number is concrete: Llama 3 8B in BF16 needs about 256GB of KV cache just for 64 trajectories of 32k tokens. Splitting lets each side use its own optimizations; the price is passing data and weights between engines, and the two forward implementations may differ slightly, so even with identical weights the sampling distribution shifts a little, producing mild off-policy data.

**2. Why is prefix caching more important for agent trajectories than for ordinary chat?**

Reference answer: In ordinary chat each request is fairly independent and shared prefixes are limited. In an agent every step is a separate LLM request, yet the previous step's entire history is the next step's prefix, and GRPO's group sampling additionally shares the system prompt and task description; the shared prefix accumulates across steps and becomes very large. Without reuse, that prefill is recomputed over and over. The lecture is explicit: for agentic RL, prefix caching is not a nicety but one of the main sources of performance (SGLang's radix attention and vLLM's automatic prefix caching both target it).

**3. Why does passing strings between engines cause off-policy data, and what does passing token IDs fix?**

Reference answer: Two effects compound. First, a tiny string-level change such as an extra space alters tokenization, so the training distribution differs from the sampling distribution. Second, token-to-string is many-to-one: the same text can have several token representations, and re-tokenizing need not recover the original token sequence. The training input is then conditioned on something other than what was actually sampled — off-policy data, showing up as loss spikes and unstable training. Passing exact token IDs guarantees training sees precisely the tokens that were sampled; nearly every framework now stores token IDs and hands them straight to the trainer.

**4. Why does context compaction increase training compute, and how can that be mitigated?**

Reference answer: Compaction creates breakpoints. With harness A, each step appends the new action to the full history, so the whole trajectory is one contiguous prefix and can be a single data point with only observation tokens masked. With harness B, the history is summarized every few steps; the prefix is no longer shared across the break, so the trajectory must be split into two data points and the task prompt is re-prefilled, raising training compute. Mitigations: use dynamic tree attention to organize the batch as a prefix tree and reuse shared prefixes, or train with the uncompacted harness A while production uses B. Note also that Qwen 3/3.5's default chat template deletes historical reasoning tokens at each new user turn — an implicit compaction that breaks prefix continuity, which is why many frameworks ship their own renderer.

**5. What does R3 replay in MoE training, and what happens without it?**

Reference answer: R3 replays each token's expert routing decisions from rollout: the sampling phase records which experts each token selected, and training discards the training engine's own routing and replays the inference-time decisions. Without it, implementation differences between the training and inference engines — or different tie-breaking in routing — can make the two sides pick different experts, so the distribution seen in training differs from the one sampled, and MoE training reward fails to rise. The lecture's advice is blunt: if MoE reward is flat, check whether R3 is enabled first.

## Connections

The previous lecture covered algorithmic stability; this one covers the systems that support it. The next turns to safety: threat models, sandboxing, credential brokering, and monitoring once agents actually hold tools and credentials.

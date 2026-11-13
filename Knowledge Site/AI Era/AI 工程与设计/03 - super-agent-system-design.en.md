---
slug: "03-super-agent-system-design"
title: "Super-agent design: continuous interaction, concurrent work and persistence"
summary: "Understanding routing, event subscriptions, context recall, asynchronous interaction and the limits of the preliminary evidence."
updatedAt: "2026-11-02"
content_type: "reference"
categories: [ai-era]
tags: ["ai-agents", "agent-architecture", "context-management", "event-driven"]
sources: [{"kind": "article", "title": "Exploring Super-agent Design: Towards a More Autonomous Agent System", "url": "https://x.com/DeepSeekHarness/status/2116857257245987236", "author": "DeepSeek Harness / Yujia Qiao", "publishedAt": "2026-11-01"}]
---

## The problem: human attention becomes the bottleneck

This DeepSeek Harness team article discusses architectural ideas, not a catalog of existing product features. The supplied text identifies itself as a machine translation of a Chinese original. These notes follow that supplied English text. The acknowledgements credit Yujia Qiao with implementing the system and writing the article, with contributions from the team.

As individual coding tasks become more autonomous, people still have to coordinate isolated sessions, remember their contents and synchronize decisions. Adding messaging connectors to a local synchronous session does not by itself remove blocking operations, mixed contexts or dependence on an online device.

The proposed Super-agent is a continuing entity spanning sessions and concurrent tasks. It aims to be **Continuous, Productive, Proactive and Persistent**. These properties arise from the surrounding system, not solely from a stronger model or longer prompt. The article has no source timestamps, so no video timeline is included.

## 1. Continuity and throughput pull in different directions

One session receiving every event preserves shared context but interleaves unrelated details and advances one ReAct step at a time. A fresh session for every event allows concurrency but fragments history and can produce disconnected replies across channels.

The proposal separates responsibilities:

| Layer | Responsibility | Context | Constraint |
| --- | --- | --- | --- |
| Router | Human interaction, task dispatch, cross-task coordination and unified replies | Global decisions, summaries and references | Does not execute tasks; may have no Bash tool |
| Worker | Execute an individual task and report progress | Isolated task context | Does not address external human channels directly |

A Router need not perform the detailed planning of a conventional team lead. A Worker may itself contain an agent team, transparently to the layer above. The authors suggest lighter models may suffice for routing while capable models matter most for execution; this is an experience-based observation, not a universal selection rule.

## 2. Event-driven does not mean invoking a model for every message

The article calls environmental messages and notifications Triggers. Most incoming events require no action, so filtering has two stages:

1. A programmatic Fast Path checks deterministic conditions such as source, group, allowlists and explicit-request policies.
2. A semantic Slow Path asks the model to assess only admitted candidates against context and natural-language policies.

Stable checks become code; ambiguous decisions use a model. This reduces expensive reasoning, but a flexible semantic policy is not a substitute for enforceable permissions.

Additional example: rejecting an event from a disallowed group is deterministic. Deciding whether an admitted discussion justifies preparing a fix is semantic. Improving the latter does not eliminate the former.

## 3. Thread subscriptions bypass repeated routing

A Thread is an external event stream, such as a PR discussion or email chain. It is not a Worker session. After a Router creates a Worker, that Worker subscribes to relevant Threads.

Unsubscribed events require Router decisions. Subscribed follow-ups pass directly to the corresponding Workers through code, avoiding model-mediated forwarding. A Worker can unsubscribe or return an out-of-scope event for redispatch.

Subscriptions are many-to-many. Multiple Workers can observe a shared PR, and one Worker can follow related discussions across several channels. The Router can retain visibility without making a fresh semantic dispatch decision for every event.

Shared notifications give Workers an opportunity to coordinate. They do not establish transactional isolation, file locking or guaranteed conflict-free edits. Occasional cross-task coordination remains necessary.

## 4. Context as a cache: Inline, Spill and Chain of Recall

Injecting everything exhausts attention; injecting only IDs causes repeated tool calls. The proposed compromise combines locality with two operations:

- **Inline:** include likely useful content, nearby messages, summaries and related object IDs directly.
- **Spill:** retain long or less relevant material outside the window and leave a readable reference.

Applying this consistently creates Chain of Recall. Triggers, Threads and Workers have unique IDs. Reading one object returns summaries and IDs for related objects, allowing the model to follow references as needed.

Additional example: an email asks whether yesterday's PR switched to Plan B. The system reads the email Thread, follows a Worker ID, finds the related PR Thread and retrieves the review comment that changed the plan. It need not retain every previous message in the active context.

This is reference-based retrieval, not unlimited memory. Missing links, incomplete summaries, access boundaries and poor retrieval decisions can still lose information.

## 5. Speculation and asynchronous interaction remove different waits

Speculative execution prepares work before final demand is certain. The authors describe checking calendar conflicts and drafting replies when invitations arrive, or silently reproducing an issue while people discuss it. Useful results are delivered; unsuccessful attempts remain quiet. The trade-off is potentially wasted background computation.

Additional boundary: preparing a draft or investigation is different from sending a message or changing external state. Proactivity does not itself grant authorization for those actions.

For full-duplex interaction, long synchronous `run()` calls become asynchronous `start()` calls returning Started immediately. Completion arrives later as an event; `stop()` can cancel work. New input can be handled after the current inference step rather than waiting for a long tool to finish. Receiving a revised instruction still requires propagating it to the relevant task; responsiveness alone does not establish that execution has changed.

Multi-channel behavior addresses presentation. IM replies should be brief and selective; PRs, emails and documents can contain structured background and verification. Worker execution traces are not automatically broadcast to people.

## 6. Separate compute, state and execution environments

The design first puts replaceable Agent Loop compute in cloud containers while persisting sessions and task state in a database. A restarted process can recover continuity without depending on a particular local machine.

It then leaves state-heavy execution environments where they already exist. Lightweight endpoint daemons execute commands and return results, avoiding wholesale copying of uncommitted files, private dependencies or specialized hardware. BYOM means Bring Your Own Machine. Work requiring a temporarily offline endpoint can resume when it reconnects.

Cloud availability does not make an offline machine executable. A daemon keeping no session state also does not make the machine stateless: files, credentials and toolchains remain part of the environment.

## 7. A Watchdog checks meaningful progress

A live process can still loop unproductively or drift from its goal. The article places a scheduled Watchdog session outside the main control loop to address infrastructure failures and assess whether Workers are making substantive progress.

This adds recovery and inspection capability, not a guarantee that the watchdog cannot fail. Natural-language maintenance and rule changes still need appropriate permissions and traceability.

## 8. What the experiments measure

The authors explicitly call the evidence preliminary. Each end-to-end run contains roughly 300 messages, about 20 of them work requests; each design runs five times. Coding execution is simulated by a time-consuming tool. The experiment measures scheduling and coordination, not real code correctness. The figure also scales message intervals and work durations by one quarter while leaving model-call times unscaled.

| Design | Completion time p50 / p95, minutes | Cache-read tokens per run, all sessions |
| --- | --- | --- |
| Super-agent | 12.4 / 15.7 | 23.2M |
| Without pass-through | 12.6 / 15.5 | 31.8M |
| Single session with subagent, neutral prompt | 20.4 / 29.5 | 6.1M |
| Single session with subagent, delegation-first prompt | 13.8 / 29.0 | 10.8M |

The neutral prompt never used subagents in five runs; the delegation-first prompt did so in four. In this workload, structural separation reduced dependence on an unstable delegation decision. It does not prove superiority over every possible optimized single-session design.

Additional calculation: reducing cache reads from 31.8M to 23.2M saves about $(31.8-23.2)/31.8\approx27\%$ relative to the no-pass-through design. Conversely, 31.8M is about 37% higher than 23.2M. These are different denominators. Completion times are nearly unchanged between the two designs, so the measured gain from pass-through is reduced overhead rather than demonstrated latency improvement.

A separate Router test uses a real routing model and mock Workers. As decision-requiring arrivals rise from approximately 1 to 40 per minute, average batches rise from 1.0 to 2.8. Time per request increases from 2.5 to 3.9 seconds, while amortized inference time per decision falls from 6.4 to 1.6 seconds. A decision may require several model requests, so the last metric cannot be derived simply by dividing request time by batch size.

Batching can improve throughput within tested limits. It does not imply that higher load always reduces user waiting time or that a global Router never becomes a bottleneck.

## 9. Open questions and trust boundaries

The article leaves Router scaling, interaction without explicit sessions, context partitioning, agent-to-agent collaboration, security and privacy open. A2A here means agent-to-agent communication generally, not a particular protocol.

Shared context improves coordination but requires deciding what each person or organizational unit is allowed to share. A cloud loop consuming untrusted events can reach endpoints containing private code and credentials. Prompt injection or server compromise could therefore affect multiple devices.

The authors specifically identify the need to use credentials without exposing them to model context. Router/Worker separation, cloud deployment and a Watchdog do not automatically solve that problem.

## Check your understanding

1. **Why prevent the Router from doing small tasks itself?**  
Answer: Execution can reintroduce blocking, mixed context and unpredictable delegation. The trade-off still needs measurement for the actual workload.

2. **Are Threads and Workers one-to-one?**  
Answer: No. A Thread organizes external events; a Worker executes a task. Subscriptions can be many-to-many.

3. **How is Chain of Recall different from keeping all history in the window?**  
Answer: It retrieves details through linked IDs and summaries on demand, trading additional retrieval and possible omissions for smaller active context.

4. **Do the experiments establish better code quality?**  
Answer: No. Execution is mocked. They illustrate scheduling, latency and token trade-offs under synthetic conditions.

5. **Does a cloud loop solve endpoint downtime?**  
Answer: It preserves loop availability and persistent state. Commands requiring an offline endpoint still wait, and endpoint credentials require separate protection.

## Sources and implementation status

The primary source is the supplied clipping of the [DeepSeek Harness article](https://x.com/DeepSeekHarness/status/2116857257245987236). Its linked [dsh-superagent-prototype](https://github.com/deepseek-ai/dsh-superagent-prototype) is explicitly described as a prototype plugin validating the approach, not an official DeepSeek product. These notes do not claim to have run or audited it. Additional examples and calculations are identified as such.

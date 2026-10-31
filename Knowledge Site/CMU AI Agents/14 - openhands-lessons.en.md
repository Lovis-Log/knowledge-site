---
slug: "14-openhands-lessons"
title: "Lessons from OpenHands: Single Agents, Skills, Interfaces, and Automation"
summary: "An engineering retrospective on a real coding-agent product: SDK design, compaction and sandboxing, single versus multi-agent, skills and MCP, local versus cloud, four interfaces, and turning repeated workflows into a trainable system."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "ai-agents"
  - "coding-agents"
  - "harness-engineering"
  - "automation"
sources:
  - kind: "video"
    title: "CMU AI Agents 2026: 14. Lessons from Building OpenHands"
    url: "https://www.youtube.com/watch?v=VAzZkT68h2Q"
    author: "Graham Neubig"
    publishedAt: "2026-10-19"
  - kind: "article"
    title: "CMU CS 11-768 course site"
    url: "https://cmu-agents.com"
---

## Why this lecture is different

Earlier lectures covered algorithms, systems, and safety. This one covers **building an agent into a product**: real users, real failures, and the design decisions those failures produced. The instructor splits the story into technical choices and the research questions that emerged from actual use.

OpenHands has two modes:

1. **Human in the loop**: describe the day's task in a chat window.
2. **Automations**: configure repeated work to run on a schedule or event — PR review, issue triage, Slack monitoring, fixing failed dependency bumps.

Its main difference from Claude Code and Codex is being **model-agnostic**: switch between DeepSeek, GPT, and Claude at will, whereas the others sit closer to one model ecosystem.

## A short history

- Code generation work started in 2016, but until 2023 it was mostly completion or single-function generation, not agents.
- SWE-bench appeared in 2023; early best results were around 5%.
- In March 2024, Devin's demo drew enormous attention but was not open source.
- The next day, the Qwen team called for a reproduction. The repository reached ten thousand stars in a day. The instructor built a working prototype over three evenings; that became OpenDevin, later OpenHands.
- For most of 2024 agents did not actually work well. Around November, Claude Sonnet 3.5 and then 3.7 made coding agents genuinely usable.
- 2025 was the year coding capability improved rapidly; 2026 is more about **deployment and interfaces**: longer runs, parallel tasks, visualization, repeatable workflows, credentials, verification.

The point of the history is not nostalgia. It shows that **many designs that look obvious today were beaten into shape by failure**.

## The SDK: good defaults, removable

The current harness is the second version. The first was, in the instructor's words, bad — hard to use and hard to extend — and was rewritten wholesale about eight months ago.

The philosophy is the opposite of Pi's. Pi gives a minimal core and expects you to extend it; OpenHands gives **defaults that work out of the box** while letting you tear out and replace any piece.

A configuration that performs well on SWE-bench is roughly ten lines: choose a model, supply an API key, provide tools (terminal, file editor, test tracker), specify a workspace, and run the task → action → observation loop.

### Tools and persistence

Custom tools are built from an Action, an Observation, and an Executor: the executor takes an action and returns an observation. That interface is general enough to wrap arbitrary functions.

Conversations persist by directory and conversation ID: events are written to conversation state and restored by reusing the ID.

### Compaction

OpenHands claims to be among the first to implement context compaction, then called condensation. Anthropic later named it compaction, and the field followed. They still call theirs condensation.

The method summarizes older events into a summary while **keeping the original instructions**. They tried masking individual actions instead, but summarization worked better. Triggers are either every N turns or every N tokens, typically three quarters of the context window.

### Sandboxing and safety

Two isolation styles: run the agent inside a sandbox, or use a `with` block that routes every command executed inside it to the sandbox. The instructor is candid that neither is clearly better: the first has a more mature tooling ecosystem, the second is easier to code.

Two safety mechanisms:

- **Confirmation policy**: which actions may run autonomously and which require asking.
- **Security analyzer**: judge at each step whether the action is safe to execute.

### Choosing a framework for research

- Long rollouts, built-in observability, full features: OpenHands.
- Reading and hacking the whole thing quickly: mini-swe-agent, which is only bash and short enough to read in an afternoon.

## Single agent or multi-agent

Early 2024 favored specialized roles: manager, reproducer, fault localizer, editor, verifier, chained in a fixed workflow. In late 2024 the instructor wrote "Don't sleep on single agent systems", arguing:

> Models keep improving. Instead of hard-coding roles, write a prompt that says do this, then this, then that, and let stronger instruction following execute it.

He calls it a bet, but the outcome suggests it was right: fixed multi-agent workflows are now uncommon in coding.

### How a single agent keeps its capability

- **Keep the tool set small**: edit files, run commands, browse, plus MCP for external services.
- **Split a growing prompt into skills**: when the prompt fills with "when pushing to GitHub do this, when using Docker do that", move those into on-demand skills. OpenHands called them microagents early on; Anthropic later called them skills — a much better name, in the instructor's view.
- **Skills plus MCP replace multi-agent roles**: a multi-agent design gives each role its own prompt and tools; skills and MCP pull the right context in **just in time**. A single agent can therefore cover the same ground.

They also published work showing that giving a model code capability and multimodal browsing lets it solve many different tasks, beating more specialized agents on several benchmarks. That supports the generalist single-agent route.

### When multi-agent still helps

Three reasons:

1. **Efficiency**: ten independent PRs can be dispatched in parallel.
2. **Independent review**: an agent that does not see the rationale is harsher than self-review, where the agent holds all the justifications and tends to be lenient.
3. **Cost control**: a sub-agent drops most of its context when reporting back; and a cheaper model can implement while an expensive one orchestrates.

But multi-agent context management is genuinely hard. Their asynchronous software-engineering experiment — a manager dispatching engineers on long tasks such as PaperBench and Commit0 — showed that engineers must return exactly the right context, avoid conflicting with each other, and the manager must integrate the results. Deep research benefits more easily, because work can be split by document source.

## Where the agent runs

- **Devin** started as a cloud SaaS.
- **OpenDevin** ran locally in Docker, largely for safety.
- **Claude Code, Codex, and OpenHands** can now run locally.

The instructor expected local execution to be unacceptable: a prompt injection could exfiltrate data or API keys. But in practice, **for human-in-the-loop coding, users strongly prefer local**. Cloud is more common for background and non-coding work such as code review.

## Four interfaces

| Interface | Strength | Limitation |
| --- | --- | --- |
| IDE | Familiar; files, diffs, tests, debugger | Legacy if you no longer read code |
| GUI desktop app | Redesigned for agents, suits non-programmers | Still a minority among programmers |
| CLI | Works anywhere, including servers | Limited expressive interaction |
| Integrations (Slack / GitHub) | Stays where you already work | Complex operations are constrained |

In the class poll, CLI came first and IDE second. The instructor expects integrations to grow: no special interface to open, the agent lives in the tools you already use.

### An experiment about people

They compared GitHub Copilot users with OpenHands agent users on the same tasks:

- Agent users took about half the time and completed about twice as many tasks.
- Negative feedback concentrated on two points: "watching the agent work is boring" and "it is hard to confirm whether it did a good job".

Those two complaints define the core interface problems: **helping people work in parallel**, and **helping them verify cheaply**.

## Automation: turning repeated workflows into a trainable system

An automation is a trigger (issue, PR, or schedule) → context gathering → an isolated workspace run → an artifact → a check by a person or policy.

OpenHands focuses on two:

1. **Issue triage**: if an issue is unclear, say what must be clarified; if clear, list the acceptance criteria.
2. **PR review**: check against written guidelines — is it in scope, does it satisfy the checklist.

Both share a property: **the same process repeats endlessly**, which makes it a machine learning problem. Inputs and outputs exist, and training data accumulates.

### Skill Refiner

Their recent paper closes the loop automatically:

1. Collect success and failure trajectories; failure signals are delayed, such as the bot saying LGTM and a maintainer disagreeing.
2. Embed and cluster successes and failures separately.
3. Generate proposals for instruction edits.
4. Gate proposals on evidence that they improve the next review.
5. Merge them into a new skill.

Across several models it was both cheaper and better than baselines such as GEPA and Trace2Scale.

A further direction is **mining workflows from traces**: cluster how users actually use the system and turn recurring patterns into automations, then feed them into the refinement loop. The instructor notes that today they edit prompts; training the model is the other path, but it requires rigorous evaluation for underspecified tasks such as triage and review, which is itself very hard.

## Takeaways

- A product agent competes on defaults, replaceability, and fit with real workflows.
- A single agent with a small tool set plus skills and MCP can cover what fixed multi-agent workflows used to.
- Multi-agent value is in parallelism, independent review, and cost tiering, not role-play.
- Local and cloud are not better or worse; they fit different task types.
- Interface design must solve parallelism and verification, not just conversation.
- Once a repeated workflow is stable, treat it as a data loop to improve.

## Check your understanding

1. Why does "stronger models plus a single agent" erode the value of fixed multi-agent workflows?
2. How do skills and MCP substitute for role specialization?
3. Why do self-review and independent review differ?
4. Why are issue triage and PR review especially suited to automation and continuous improvement?
5. What interface problems do "boring" and "hard to verify" correspond to?

## Connections

This lecture ties together tool use, context management, planning, safety, and training from a product perspective. It echoes the first lecture's claim: an agent is a system, and reliability comes from the harness, evaluation, and iteration under real use, not from model capability alone.

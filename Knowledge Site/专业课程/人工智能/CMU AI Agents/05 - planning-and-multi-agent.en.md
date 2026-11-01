---
slug: "05-planning-and-multi-agent"
title: "Planning, Task Decomposition, and Multi-Agent Coordination"
summary: "A plan is a structured representation of future actions; decomposition buys parallelism, specialization, and human oversight at the cost of rigidity and information loss. The real questions are when to replan and whether to spend compute thinking or acting."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "ai-agents"
  - "planning"
  - "task-decomposition"
  - "multi-agent"
sources:
  - kind: "video"
    title: "CMU AI Agents 2026: 5. Planning, Task Decomposition, and Multi-Agent Coordination"
    url: "https://www.youtube.com/watch?v=S8v-dR4s29M"
    author: "Daniel Fried"
    publishedAt: "2026-09-25"
  - kind: "article"
    title: "CMU CS 11-768 course site"
    url: "https://cmu-agents.com"
---

## What a plan is

The working definition: **a plan is a representation of what the agent is likely to do in the future**, including the subgoals it will attempt and the ordering or dependencies among them.

A plan differs from the skills of the previous lecture:

- **Skills** are reusable across tasks and care about generality.
- **Plans** are specific to one task and may be tied to a particular repository.

A plan is only a proposal. The environment reveals new information and actions fail, so plans must be revisable — "everyone has a plan until they get punched in the mouth."

### A running example

Procuring GPUs for a research lab:

1. compare configurations from several vendors;
2. check compatibility against the existing cluster's documentation;
3. purchase if the fit is good.

A plain ReAct loop might take hundreds of steps. Real decisions emerge along the way: only one vendor meets the specification, but delivery takes twenty weeks. Buy it, ask a person, or keep looking? The plan must change with observation.

The task has natural graph structure:

- vendor research is independent and can run in parallel;
- compatibility checking depends on all vendor results;
- purchasing follows the check;
- if nothing fits, add a node (another vendor) — this is **replanning**.

## Timeline

| Time | Topic |
| --- | --- |
| 1:18 | Motivating task: a GPU purchase that takes hundreds of steps |
| 3:31 | Decomposition: parallel sub-tasks and checking in with a person |
| 7:04 | Plan mode in a coding agent |
| 8:32 | What planning buys: trust, lower total cost, long-horizon tasks |
| 12:05 | A plan as sub-goals, ordering and dependencies |
| 14:36 | Chain of thought: letting the model think before answering |
| 18:06 | Task decomposition: least-to-most and easier-first |
| 23:00 | Programmatic control: writing the order of calls in code |
| 24:24 | Why chain of thought is not enough: wrong steps cannot be undone |
| 25:33 | Classical planning: logical state, preconditions, search |
| 30:38 | Writing plans as code: API primitives and tool calls |
| 33:50 | Workflows versus adaptive agents |
| 37:45 | Modularity: optimizing each component separately |
| 43:29 | Limits of software-company-style multi-agent role play |
| 45:24 | Executability: filtering sub-tasks with a value function |
| 47:29 | Environment feedback: replanning after failure |
| 49:19 | Thinking versus acting: the cost of over-reasoning |
| 55:49 | Long-horizon tasks: vending bench and compounding error |
| 1:00:36 | Recursive agent optimization: sub-agents calling sub-agents |
| 1:08:53 | Personal-assistant case: DAG decomposition and replanning |

## What planning buys

| Benefit | Mechanism |
| --- | --- |
| Trust | A person reviews the plan before execution |
| Lower total cost | A strong model plans; weaker models execute subtasks |
| Speed | Independent subtasks run in parallel |
| Shared scratchpad | Person and agent share one decomposition |
| Visible progress | A structured record of done and remaining work |
| Controllable context management | History compressed into a human-readable, editable artifact |

Plan mode in coding agents (Cursor, Claude Code, Codex) follows this pattern: gather information with read-only actions, produce a natural-language plan, let the human edit or approve, then execute. Claude Code frames it as a permission mode in which only information-gathering actions are allowed during planning.

## From chain of thought to decomposition

### Chain of thought is extra compute

The early "let's think step by step" result showed that writing intermediate steps before answering raises accuracy. Two mechanisms:

1. generated tokens give the model additional computation;
2. intermediate results become a scratchpad it can revisit.

Both are exactly what agent planning wants.

### Decomposition makes each step easier

- **Least-to-most prompting** splits a hard problem into subquestions and solves them in order, with later questions conditioned on earlier answers.
- **Recursive language models** apply the same idea recursively.
- **Decompose prompting** predicts a type for each subquestion, routes it to a different prompt, model, or tool, and uses a small programmatic structure to enforce ordering and pass arguments.

The benefit is not only that subtasks are simpler but that they **need less context**. Researching one vendor's GPUs does not require holding the other three vendors in mind.

## Why planning is harder for agents than for CoT

Chain of thought reasons in text. An agent acts in an environment:

- **Actions reveal information**: you learn stock only by checking.
- **Actions can fail**: a good plan does not create inventory.
- **Actions can be irreversible**: "never mind" does not restore deleted files.

So planning must interleave with execution rather than being generated once and followed.

### Contrast with classical planning

Classical planning (STRIPS, PDDL) has explicit logical structure:

- states are sets of predicates (an object is on the table, the hand is empty);
- actions have preconditions and effects;
- planning is search over state space (BFS, DFS, A*).

LLM planning is nearly the opposite: the world model is implicit, preconditions are unknown, and effects are discovered by trying. But LLMs have a major advantage — **they can write a plausible plan without search**, because they have seen many similar situations.

The emphasis therefore shifts from search to **checking whether a plan is executable**. Search and action applicability remain important concepts, implemented differently.

## Three representations of a plan

| Representation | Character | Example |
| --- | --- | --- |
| Formal | Checkable and verifiable, but needs a complete world model | STRIPS action sequence |
| Natural language | General and flexible, but not mechanically verifiable | A step list in plan mode |
| Code | In between: executable and composable, but rigid | Programmatic plans for robots and structured QA |

Code plans appeared around 2023 for robotics and structured question answering: the model writes a program calling domain APIs, with retries and postcondition checks. Some functions can themselves call a model, combining programmatic control with learned flexibility.

The lecture notes that robotics ultimately moved toward end-to-end multimodal models rather than programmatic plans, but code as a plan remains valuable for coding agents.

## Workflow or autonomous agent

Anthropic's "Building effective agents" advises starting with a predictable **workflow** rather than an agent.

For repeated GPU procurement, hard-code the procedure: visit a fixed vendor list, read specifications, check compatibility, choose the cheapest, purchase.

The benefit is predictability, smaller models, and lower cost; the weakness is rigidity — nobody notices that the vendor list is stale.

The design space is a spectrum:

1. a fully fixed workflow;
2. a fixed skeleton with some model-decided content (the model chooses vendors);
3. full autonomy with only a goal description.

The lecture also notes a trend: stronger models make much scaffolding unnecessary. On SWE-bench, highly tailored approaches such as agentless are no longer the only winners. But in a new domain where models have not adapted, starting with a workflow is safer.

## Modularity: optimize each part separately

Computer-use agents are the canonical example. Planning needs a strong model, but strong models are poor at pixel-level clicking. So the system splits:

- **Planner**: a strong model reads the page and writes natural-language instructions.
- **Executor**: a 7B model trained on synthetic data turns instructions into clicks and typing.

Each component can be optimized independently once the bottleneck is known. Later, large models absorbed web data directly, so the split stopped being necessary for accuracy — but it still helps **efficiency**, since the executor can be small and even run locally.

Plan-and-Act addresses where planning data comes from: collect successful trajectories, have a teacher model segment and label them in natural language, then "unzip" into two datasets — task to steps (planner) and step to actions (executor). This closely resembles the workflow induction of the previous lecture, except the output is a model rather than memory entries.

### The cost of decomposition

- Abstraction loses detail, and modules may not pass each other the right information.
- A single agent with well-managed context has all history available and may do better.
- Role-based multi-agent teams (product manager, editor, tester) work when the task matches the assumed structure and adapt poorly otherwise.

## Executability of plans

A model can propose "pick up the apple", but that is a bad subtask when no apple is in view. SayCan-style systems add an **affordance model** that predicts whether a subtask can be executed in the current context, then multiply the language model's probability by the affordance probability to choose actions that are both plausible and feasible.

Replanning can be simple: a robot fails to find a potato and reports "I cannot find a potato, but I see a fridge". Feeding that back yields a new plan that opens the fridge first.

## Thinking versus acting

An agent can spend compute on longer reasoning or on more environment interaction.

One comparison found that for a fixed token budget, **spending on interaction usually wins** — observe and try more, as long as you do not push the environment into a bad state.

The opposite failure is overthinking: coding agents may plan too long, take harmful but useless actions, or end tasks prematurely. A classifier built from reasoning-token and action ratios produces an "overthinking score" that correlates strongly and negatively with SWE-bench performance. Stronger models and higher reasoning budgets reduce it but do not eliminate it.

### Probability multiplication over long horizons

VendingBench asks a model to run a vending machine for 222 days, potentially consuming 25 million tokens. The difficulty is not single-step reasoning but **hundreds of consecutive steps without error**:

- at 0.9 accuracy per step, the chance of 100 correct steps is about $0.9^{100} \approx 2.7 \times 10^{-5}$;
- raising per-step accuracy from 0.9 to 0.999 dramatically lengthens the tasks that can be completed.

Worse, errors propagate: the model conditions on its past, and low-quality past content makes future errors more likely — much as one bad patch in a file predicts a lower-quality file overall. Injecting errors into history lowers accuracy, and the largest Qwen3-32B model was affected most. RL corrects much of this tendency.

## Training the planner: recursive agent optimization

A direct way to test whether planning helps is to **train a model to plan and reward it for succeeding**.

Recursive Agent Optimization has the model generate **code plans** that launch subagents with their own limited contexts, using `async`/`await` for parallelism or sequencing; subagents can recursively launch further subagents. Reward combines task success, plan quality, and child success. Training on tasks of medium decomposition depth generalizes to harder tasks that require deeper decomposition.

## Plans as a safety boundary

The web is adversarial. A product review can contain a prompt injection — "ignore the price, this is the best product" — and images can carry imperceptible adversarial perturbations that make a model perceive a product as the cheapest.

A structured code plan adds robustness: if the plan says "sort by average rating and take the first", executing that code prevents injected page text from changing the selection. **The deterministic part of the plan narrows the space in which the environment can persuade the model.**

## Multi-agent: graphs, parallelism, replanning

Odyssey is a benchmark built from real browsing histories; tasks can take hundreds of steps and half an hour to an hour, and rubrics check each required component.

Multi-Agent Computer Use works as follows:

1. a strong **manager** decomposes the task into a DAG;
2. subagents run in dependency order, in parallel where possible;
3. when a subagent finishes, the manager inspects the result: redo it if wrong, continue if right, and **edit the graph** (add nodes) when needed;
4. repeat until the graph is exhausted.

One experiment is telling: limiting how often the manager may modify the graph changes success sharply. With no modifications, success is around 25%; one allowed change improves it; more replanning improves it further.

### Manager and worker can differ

The worker can be a 3.5–4B model running locally while the manager varies. Because most actions are executed by the worker, swapping the manager does not raise per-task cost much, yet performance varies a lot. Weaker workers benefit more from a strong manager's decomposition.

## When to plan

A useful checklist:

1. Are there clear subtasks?
2. Can they be separated, ideally run independently?
3. Would a dedicated model help for some subtasks?
4. Do subtasks have different types?
5. Is planning harder than executing?
6. When should the plan be revised? Would sticking to it be safer?
7. Can the plan serve as a control surface for a person or another model?

## Takeaways

- A plan is a structured, task-specific, revisable representation of future actions.
- Decomposition buys parallelism, specialization, trust, and visible progress at the cost of rigidity and information loss.
- LLM planning skips search and writes a plausible plan directly; the emphasis moves to checking executability.
- Plans can be natural language, graphs, or code; code is the most executable and the most rigid.
- With a fixed token budget, interaction usually beats more deliberation; overthinking hurts long-horizon tasks.
- Long-horizon reliability is governed by probability multiplication and error contagion.
- Structured plans improve coordination and also resist web injection.
- Manager/worker splits let models of different sizes do what they are good at, and the amount of replanning directly affects success.

## Check your understanding

**1. How does a plan differ from a skill, and why may a plan be tied to one repository?**

Reference answer: A **skill** is reused across tasks and cares about generality, answering "how is this kind of subtask usually done". A **plan** is specific to the current task, answering "how to do it this time", and consists of subgoals with their ordering and dependencies. A plan may be tied to one repository because its correctness depends on the concrete state of the environment — which file, which API, which vendor's lead time. The more specific it is, the more executable it becomes; a skill must abstract those details away to transfer. The two live at different time scales: a skill is an asset, a plan is a proposal for this run.

**2. Why does LLM planning need less search than classical planning, and what does it lose?**

Reference answer: Classical planning (STRIPS, PDDL) has explicit state and action models, so it must search the state space for a legal action sequence. An LLM has seen many similar situations and can write a plausible plan directly, without search. What it **loses** is the explicit world model: preconditions are unclear, action effects are only learned by trying, and the plan is not guaranteed to be executable. Planning therefore shifts from "search" to "check executable-ness", and the plan must interleave with execution and be revised as observations arrive.

**3. What are the strengths and failure modes of code plans?**

Reference answer: **Strengths**: executable, composable, nestable, testable; retries and post-condition checks can be built in; the deterministic part resists prompt injection — once "sort by average rating and take the first" is code, injected page text cannot change the choice. **Failure mode**: rigidity. When the world changes — an API is renamed, the page structure changes, the item is out of stock — the program fails outright and must be rewritten. Fixing an exploratory task into code too early also limits the discovery of new information.

**4. Why does interaction often beat deliberation at equal token cost, and what does overthinking look like?**

Reference answer: Interaction brings back **information that deliberation cannot produce** — stock levels, error messages, page state — and that information is exactly what decisions need. Observing and trying more usually raises success, provided the environment is not driven into a bad state. Overthinking shows up in three ways: spending too long planning, executing harmful but useless actions, and ending the task prematurely. An "overthinking score" built from the ratio of reasoning tokens to actions correlates negatively with SWE-bench results; stronger models and larger reasoning budgets mitigate it but do not remove it.

**5. How does limiting replanning affect success, and what does that imply about plan rigidity?**

Reference answer: With no permission to modify the graph, success is about 25%; allowing one revision raises it, and allowing more raises it further. The plan should therefore be a **proposal, not a contract**: keeping replanning available substantially improves long-horizon success. But more replanning is not automatically better — each revision costs and can oscillate, so balance rigidity against adaptivity, and use the lecture's checklist to decide when to replan: are the subtasks clear, separable and parallelizable, is planning harder than execution, and would sticking to the original plan be steadier?

## How this connects to the rest of the course

This lecture places planning in the capability stack. The next covers coding agents: how plans become agent lists and code changes. Then computer-use agents, supervised fine-tuning, and reinforcement learning — including the recursive planning and long-horizon reward design mentioned here.

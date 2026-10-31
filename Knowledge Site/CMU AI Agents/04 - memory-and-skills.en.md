---
slug: "04-memory-and-skills"
title: "Memory and Skills: Keeping Experience Outside the Context"
summary: "Cross-task experience can live in external stores: fact memory, trajectory retrieval, and reusable text or code skills induced from success and failure, with a lifecycle of their own."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "ai-agents"
  - "memory"
  - "skills"
  - "skill-induction"
sources:
  - kind: "video"
    title: "CMU AI Agents 2026: 4. Memory and Skills for Agents"
    url: "https://www.youtube.com/watch?v=6zigF2a-2Pw"
    author: "Daniel Fried"
    publishedAt: "2026-09-08"
  - kind: "article"
    title: "CMU CS 11-768 course site"
    url: "https://cmu-agents.com"
---

## Why memory must leave the context

The previous lecture managed context within one task. This one stretches the horizon: **how does an agent store what it learns across tasks so future tasks benefit?**

Two tasks on the same shopping site — "add these Sony headphones to my wish list" and "find the price range of wireless keyboards" — share most of their actions: open the store, find the search box, type a query, click search. Once the agent has worked out that flow, it should reuse it rather than rediscover it.

The lecture separates three routes to improvement:

| Route | Carrier | Strength | Weakness |
| --- | --- | --- | --- |
| Context window | Message and observation history | Direct, no extra infrastructure | Bounded; lost when the task ends |
| External artifacts | Database, filesystem, skill library | Portable across models; human-readable and editable | Needs retrieval and lifecycle management |
| Model weights | SFT, RL | Internalized; no inference-time structure | Model-specific and expensive |

Two properties of external artifacts matter most: they are **portable** (a note on "how to search this site" works with any model) and **inspectable** (a person can read, edit, and audit them).

## Three kinds of retained experience

### 1. Episodes

The full sequence of observations and actions. Highest fidelity, highest cost. As in supervised learning, retaining every detail is usually unnecessary; what generalizes is the abstraction.

### 2. Facts

Knowledge about the user or environment: age, location, preferences. Early memory systems focused almost entirely on facts. ChatGPT and Claude memory work this way: a model extracts facts from past conversations into text that the user can inspect and edit.

### 3. Skills

Knowledge about *how* to perform a reusable subtask, abstracted away from the specifics. The distinction from memory is:

- **Memory** answers "what happened" — what was purchased last time.
- **Skills** answer "how to do it" — the steps for searching this site.

A skill is worth keeping only if the same subtask will recur.

## Human-authored skills: the Agent Skills standard

The current de facto standard is a folder:

```
python-review/
├─ SKILL.md        # required: YAML metadata + detailed instructions
├─ scripts/        # optional: executable scripts
├─ references/     # optional: documentation loaded on demand
└─ assets/         # optional: templates and other resources
```

The YAML header needs a `name` and a `description`. The description determines *when* the model thinks to use the skill, so it must be short and precise.

### Progressive disclosure

A library of skills cannot all live in the context. Loading happens in three layers:

1. **Metadata**: name and description, always present in the system prompt.
2. **Body**: read through a tool call once the model judges the skill relevant.
3. **Resources**: scripts, references, and assets, loaded only when used.

The lecture notes that one state-of-the-art agent carries about 3,000 tokens of skill descriptions in its system prompt. Skills are not free; enough of them crowd out working context.

### Too many skills make things worse

This is both intuitive and experimentally supported: irrelevant skills distract the model and lengthen the context. Keep the library small and load by task.

### Trigger accuracy requires evaluation

Whether a skill is invoked depends entirely on the model's judgment from the description and context. A vague description means the skill is never used; an over-broad one means it is used when it should not be. SkillsBench is an early systematic evaluation:

- roughly two million skills collected online, with 400 human-written tasks;
- annotators pick skills that might apply to each task;
- four agent frameworks and about eighteen models, with and without skills.

Average pass rates rise, but with two important caveats:

1. **Tasks that need fewer skills benefit more**; tasks requiring many skills may be hurt by distraction.
2. For some model–task combinations, skills still **lower** performance because the model applies them incorrectly.

Writing a skill is therefore not enough; you must verify that it improves output.

### Skills should come from experience

A counterintuitive result: asking a model to write a skill from a task description alone works badly and can hurt performance. Skills should be based on **real prior interactions**, because execution reveals details you would not have predicted.

Improving a skill can be a closed loop. For a code-review skill:

1. the agent produces review comments using the skill;
2. a person decides which comments to address;
3. a model judges how many were adopted;
4. across many pull requests, a reasoning model summarizes what worked and proposes edits to the skill.

In effect, human adoption is the reward signal.

## Memory systems: from MEMGPT to editable memory

### MEMGPT: the context as working memory

Inspired by OS memory hierarchies: the context window is fast, small memory; external storage is large and slow. The system prompt is fixed, a working context is filled from external memory via tool calls, and messages have their own store. When the user mentions "Six Flags", the model retrieves past mentions into the working context.

### Memory must be updated and deleted

Append-only memory goes stale. If someone changes jobs, the old fact must be replaced. MeM0-style systems:

1. extract candidate facts from each new message;
2. retrieve the most similar existing memories by embedding;
3. ask a language model whether to add, update, delete (when negated), or ignore.

The analogy to DeltaNet is useful: linear attention can only append to its state, while Delta retrieves and modifies values associated with particular queries. Text memory does the same thing with sentences instead of vectors. At the weight level, the corresponding problem is forgetting, addressed with methods such as unlearning.

### Reflexion: learning from feedback

When a task allows multiple attempts, conditioning the retry on natural-language feedback about what went wrong is far more effective than blind retrying. If the model answered with one battle when the question asked for a series, feedback pointing that out lets the second attempt succeed. Feedback general enough also transfers to similar tasks.

### Trajectory retrieval: RAG for agents

Store successful trajectories — messages, tool calls, observations, and reasoning — in a pool. When a new task arrives, embed its description, retrieve similar trajectories, and place them in the context. Implementations differ, but the core is "use similar experience as examples".

## Skill induction: extracting reusable pieces

### What counts as a skill

In a web task, a search flow might be: click the search box with a given element ID, type a query, click the search button. Storing that action sequence verbatim is a bad idea: element IDs change and another site's interface is structured differently. An induced skill must **abstract the variable parts**, for example turning the specific query into a parameter template.

### Starting with textual workflows

Agent Workflow Memory:

1. a language model inspects a tool-call sequence;
2. it marks spans likely to recur;
3. it produces a workflow: subtask description, action sequence, parameter template;
4. a judge model decides whether the original trajectory succeeded, and only successful ones are stored.

Retrieved workflows are inserted into the context. On a benchmark involving map tools, a baseline without memory hovers around 10% accuracy, while the workflow memory improves substantially and enables harder tasks such as finding a nearby hotel and showing a walking route.

### Code skills: more rigid, more powerful

The same search flow can be a function:

- **Text skill**: the model sees instructions and example actions but still emits every low-level call. Flexible — it can adapt when the site changes — but repetitive.
- **Code skill**: the model calls the function with arguments. Testable, composable, refactorable, hierarchical — but rigid, since the steps inside are fixed and break when the interface changes.

Agent Skill Induction turns trajectories into functions with docstrings, plus a rewritten version of the trajectory that calls them. **Executing the generated code and judging the result** is a stronger filter than judging the original trajectory, because the code actually runs.

SkillWeaver adds failure-driven revision: execute the skill, score it with a reward model, and revise on failure. A real example: an `identify_pill` function accepts a color argument but never uses it; a linter points this out, and the model fixes it.

### The efficiency payoff

Code skills also cut environment interactions. For updating two addresses, a baseline agent navigates forms, types fields, and re-observes the page repeatedly. With `navigate_to_address_settings` and `update_address_details`, three steps suffice. This matters especially for GUI agents, where screenshots and reasoning traces are expensive.

On tasks with repetitive structure, code skills beat text skills on both accuracy and interaction count.

### Generalization failure and abstract classes

A code skill induced on one site fails on Target: the original site used a dropdown, Target uses radio buttons.

The fix borrows from software engineering: **an abstract class plus site-specific implementations** (PolySkill). On first visiting a new site, the model writes an abstract class with method stubs — search product, add to cart, checkout — and then a concrete implementation for that site. Switching sites only swaps the implementation. This allows a large library of specific skills while activating only the relevant subset.

## Learning from failure

Learning only from success throws away signal. The lecture gives an example: a site treats multiple search terms as OR, so "Bluetooth headphones" returns five thousand results, the agent paginates endlessly and loses the task.

Handing the failed trajectory to a model to write **general advice** — "use a more specific query", "show more items at once" — works better than storing the failure. ReasoningBench's comparison found that negative examples do not help when attached to raw trajectories or workflows, but help substantially when expressed as textual strategies. The reason is simple: **a sentence can describe how to avoid failure, but a failed trajectory rarely reveals a general rule**.

## Managing the memory

### Judge quality matters

Almost every method uses a judge to decide whether an experience is worth storing. Judges are imperfect, and their accuracy propagates into system performance. ReasoningBench ran controlled experiments with simulated judge accuracy: performance degrades as accuracy falls, but a fairly wide range still yields gains.

### Retrieving more is not better

Increasing the number of retrieved experiences lowers performance. Two explanations:

1. the memory contains nothing relevant, so extra items are noise;
2. the model is distracted by irrelevant context.

The second can be addressed by training, or by **pruning memory**: track how often each item is used and drop the ones that never are. This saves context and may improve success.

### Training the induction process itself

All of the above is prompt-engineered heuristics. A natural question: can a model be trained to induce skills?

Yes. Run reinforcement learning over **online sequences of similar tasks**: the model induces skills, writes memory, and uses it on later tasks, with reward from later task success and from reuse of previously induced skills. The pipeline is complex and non-differentiable, which RL does not mind. Recent papers report gains, and one finds that a reuse bonus improves results further.

## Takeaways

- Cross-task experience belongs in external stores because artifacts are portable and inspectable.
- Experience has three granularities: episodes (faithful, expensive), facts (light), and skills (reusable).
- Human-authored skills depend on a standard format and progressive disclosure; more skills is not better.
- Skills should be induced from real interactions; generating them from a task description alone often hurts.
- Memory must support updates and deletion or it will keep serving stale facts.
- Text skills are flexible; code skills are efficient and testable but rigid, and abstract classes mitigate the rigidity.
- Failed trajectories should become general advice, not stored verbatim.
- Memory size, retrieval quality, and judge quality jointly determine the payoff.

## Check your understanding

1. What are the two biggest advantages of external skills over fine-tuning weights?
2. What are the three layers of progressive disclosure, and why must the first be short?
3. Why does a skill written only from a task description perform poorly?
4. How do text and code skills fail differently, and how do abstract classes help?
5. Why does turning failed trajectories into textual advice beat retrieving the failures directly?

## How this connects to the rest of the course

This lecture places memory and skills in the capability stack. The next one covers planning, task decomposition, and multi-agent coordination — how an agent decides which skills to use and in what order. Then come coding and computer-use agents, and the training and evaluation loop that turns experience into capability.

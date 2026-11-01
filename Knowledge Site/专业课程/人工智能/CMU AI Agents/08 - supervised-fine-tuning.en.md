---
slug: "08-supervised-fine-tuning"
title: "Supervised Fine-Tuning for Agents: Turning Trajectories into Signal"
summary: "SFT is the cold start for agent training: render a full trajectory as one token sequence, compute loss only on assistant tokens, and let data source, filtering, and mixture decide what the model learns."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "ai-agents"
  - "supervised-fine-tuning"
  - "training-data"
  - "llm-training"
sources:
  - kind: "video"
    title: "CMU AI Agents 2026: 8. Supervised Fine Tuning"
    url: "https://www.youtube.com/watch?v=O3HSU0AoILc"
    author: "Yueqi Song"
    publishedAt: "2026-09-25"
  - kind: "article"
    title: "CMU CS 11-768 course site"
    url: "https://cmu-agents.com"
---

## Why SFT comes before RL

This is the first training lecture. It begins with a question that sounds redundant: if reinforcement learning can learn from an environment, why do supervised fine-tuning first?

Two pieces of evidence:

- **DeepSeek R1-Zero** ran RL directly on a base model with no SFT. Its answers mixed languages and were hard to read.
- The follow-up **R1** put SFT back, using a few thousand carefully built examples to establish a high-quality starting point before RL.

So SFT is not the destination. It is a **cold start**: teach the model the basic shape of being an agent — how to emit a tool call, how to keep going in a long conversation, what a tool result looks like — and let RL refine it afterward.

In a public pipeline such as Kimi K3, the order is SFT to initialize agentic capability, RL to develop domain expertise, then on-policy distillation to consolidate the experts into one model.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Opening: where SFT sits in the agent training pipeline |
| 5:21 | SFT as the cold start before RL: tool calls, long conversations, observation format |
| 10:50 | What a training trajectory keeps: model outputs, tool calls, observations |
| 15:54 | Loss mask versus context-only: assistant header, end-of-turn, reasoning blocks |
| 17:02 | Whether reasoning blocks are trained; Balanced SFT rebalances reasoning against action |
| 20:06 | Mixing data by capability: STEM/coding, general agency, helpfulness and safety |
| 24:34 | SWE-Gym: keeping only runs that pass their tests |
| 25:07 | Scaling trajectory count and where it saturates |
| 26:22 | Passing tests is not enough: redundant rerun loops and other bad behaviour |
| 27:26 | Filtering by trajectory length and turn count (drop runs under five turns) |
| 29:10 | Choosing the teacher: the strongest model is not always the best teacher |
| 31:49 | Task source changes results more than any other choice |
| 37:15 | Cover the abilities you need; Agent Data Protocol standardizes trajectory format |
| 39:13 | Converting the unified format into the target agent's format |
| 41:09 | Pre-training checks: tool calls parse, conversations end correctly |
| 42:20 | Controlled study: same harness, same model, same evaluation format |
| 52:42 | Evaluate abilities you were not optimizing for, instead of gaming one benchmark |
| 57:48 | K2 Horizon: further fine-tuning rounds after SFT and RL |
| 1:02:51 | Questions and discussion |

## Three ways to update an agent

| Method | Strength | Cost |
| --- | --- | --- |
| Change the context window | High fidelity to what happened | Expensive, noisy, does not decide what matters |
| Change external artifacts (files, memory) | Editable, retrievable, portable, human-readable | Must be induced, selected, and maintained |
| Change the weights | Faster inference, broader behavior change | Slow and opaque to train, model-specific, irreversible |

Weights are special because **you change them once and every later call inherits the behavior with nothing extra in the prompt**. The price is that you cannot inspect what changed, and you cannot move the change to another model.

## What a trajectory looks like to the trainer

A trajectory has system, user, assistant, and observation rows:

```text
[system] [user request] [assistant thought + tool call] [observation result]
[assistant ...] [observation ...] ... [assistant final answer]
```

The chat template renders the whole conversation into one string and records where each assistant span starts and ends. After tokenization there is one long token sequence plus **a one-bit mask per token**:

- tokens the assistant generated — tool calls, final answers, stop tokens — get mask 1 and contribute to the cross-entropy loss;
- system messages, user messages, and tool observations get mask 0 and act only as conditioning context.

This is teacher-forced imitation learning: at training time the model sees the real history, not a history it sampled itself.

### Masking details that trip people up

1. **The stop token must be inside the mask**, or the model never learns to stop.
2. **End-of-turn is not one event.** It means ending the message, ending the tool call, and finishing the task. Kimi K3's template separates them into distinct special tokens so the model can learn when to stop.
3. **Whether reasoning tokens count toward loss** is a model-specific choice. Reasoning is often very long; if it dominates the loss, the model may learn to think at length without acting correctly. Work such as Balanced SFT rebalances reasoning against tool calls.
4. **Template drift is fatal.** The training template must match the serving template exactly, down to whitespace. If serving appends a conditional thinking block to history, earlier assistant turns no longer have the same prefix and the tool loop breaks.

## What a trajectory actually teaches

- How to write a tool call the harness can execute;
- How to keep going when the conversation gets long;
- What a tool result looks like — the model should **wait for it**, not invent it;
- Whatever else is in the data: extra commentary, repeated commands, one particular way of solving the task.

That last point matters: **the loss copies every action indiscriminately**. A trajectory that ends in success can still contain bad habits.

## Where the data comes from

Two axes define the strategy:

| | Keep everything | Keep only what passes a verifier |
| --- | --- | --- |
| Generated by a strong model | Plain distillation | Most agent SFT (SWE-Gym, OpenHands Agent) |
| Generated by the model itself | Self-distillation (MAI) | Expert iteration (later lectures) |

Most agent SFT sits in the upper right: run tasks with a strong model and keep only trajectories that pass the repository's own tests. The logic is direct — a strong model writes better trajectories than the student would sample, and the task's verifier filters out failures.

Without a stronger teacher, self-distillation is an option, or the emphasis shifts to RL. SFT is fundamentally bounded by the teacher's ability.

### Scale saturates; distribution does not

SWE-Gym holds the task set fixed and increases only the number of samples. Accuracy rises, then saturates, and smaller models saturate earlier. When the sampling budget ran out, the binding constraint was compute, not task count.

A second comparison is more important. From the same 10k dataset, adding more rollouts **from the same distribution** (the pink curve) flattens out; adding **new tasks or synthetic augmentation** (the blue curves) keeps climbing.

The lesson: **more data is weaker than wider data**. The empirical advice is to mix four to eight sources; going wider rarely helps a specific benchmark.

### Successful trajectories can be toxic

Suppose three trajectories all pass the unit tests:

- one edits a line and reruns the tests in a loop for most of its turns;
- one leaves print statements in the final patch;
- one makes a wrong edit, sees the test fail, and recovers.

Training on them teaches the loop, the leftover debugging code, and the final fix together. A cheap filter is **turn count**: the OpenHands Agent ablation found that dropping runs shorter than five turns helped on average. But turn count measures how much work happened, not whether it was good — a clean four-turn fix can be dropped while a messy fourteen-turn run is kept.

### The best model is not always the best teacher

In the OpenHands Agent study, GPT-5.3 Codex was the strongest agent on the benchmark and the **worst teacher**: distilling from it gave the smallest gain, sometimes a regression. A plausible explanation is that its thinking style and problem-solving approach are too far from the student's, so its trajectories are correct but hard to imitate.

Choose a teacher by whether the student can learn from it, not by leaderboard rank.

### Task source matters more than hyperparameters

The same study found task source to have the largest effect: SWE-Smith contributed most to SWE-bench Verified and less to Terminal Bench. **Pick the right task sources first**, then tune everything else.

## A concrete data-selection question

The lecture presents three runs of one task:

- A: solved cleanly in four turns;
- B: a long run that makes a wrong edit, fails the test, recovers, and solves it;
- C: eleven attempts that change nothing.

The discussion favors keeping **both A and B**. A teaches the correct path; B teaches recovery, which a model that only sees clean successes never learns. But B carries risk: the loss also learns the wrong edit. C contains nothing worth learning and should be dropped.

## Standardizing the data format

The lecture presents the Agent Data Protocol, which the speaker worked on. The motivation is practical: datasets use incompatible formats — some web data uses HTML, some uses accessibility trees — and different agents represent actions differently. Feeding N datasets into M agents would require N×M converters.

After standardization, N+M conversions suffice: each dataset converts once into the shared format, and the shared format converts once into each target agent's format. The shared representation keeps both HTML and accessibility trees, so downstream consumers can choose.

## Real training configurations and traps

Public technical reports show wide variation:

- Nemotron 3 Ultra packs about 294k tokens per sequence, batch 64, learning rate decay.
- MAI self-distillation uses 128k sequences, a large batch, warm-up before decay.
- K2 Horizon uses 512k sequences across three phases, decaying the learning rate on high-quality subsets.

These are full fine-tunes, not parameter-efficient ones.

### Packing

Conversations are neither truncated nor split. Each is assigned to the pack whose remaining capacity fits most tightly; identical problems are kept out of the same pack; packs are shuffled. Avoiding splits prevents the model from learning from truncated trajectories and hallucinating.

### Expert routing in mixture-of-experts models

Fine-tuning a MoE on narrow agent data causes a few experts to absorb most tokens. MAI reports that load balancing during the supervised stage is about a thousand times harder than during RL, with a drop rate of 15.

## Training loss is not evaluation

This is the lecture's most important engineering warning.

At training time the model predicts one action at a time on a **recorded** trajectory, and the history always comes from real data. At deployment there is no recording; every action the model takes changes what it sees next. Once it reaches a state the training data never visited, low loss means nothing.

Therefore:

- monitor training loss and evaluation results together;
- first confirm the model can overfit 20 examples, or the bug is upstream;
- evaluate in a real harness on tasks with checkable outcomes;
- read published numbers carefully — some are the best of several harnesses;
- match the split to the claim: to claim generalization to new repositories, split by repository rather than putting different runs of the same task on both sides.

### Robustness across harnesses

Trajectories teach **system conventions** along with the task. Data collected only in OpenHands may not transfer to Claude Code or Codex. Frontier labs collect across several harnesses so the model does not learn one tool and nothing else.

## The division of labor between SFT and RL

| | SFT | RL |
| --- | --- | --- |
| Signal | A target for every token | One reward number per rollout |
| Data | Recorded trajectories | The model's own rollouts |
| Needs | Data and GPUs | A live environment, sandboxes, checkable rewards |
| Good at | Tool formats, long tasks, general agent ability | Sharpening behavior the model already attempts, domain expertise |
| Limited by | Quality and coverage of demonstrations | Reward design and cost |

Three conclusions:

1. With no SFT at all, a base model barely moves (the R1-Zero lesson).
2. SFT alone falls short of SFT plus RL.
3. The winning recipe often starts RL from a checkpoint **deliberately not trained to its own best score**, leaving room for RL to improve.

SFT is best understood as building a strong enough prior that RL has something worth sharpening.

## Takeaways

- SFT is the cold start for agent training, not the finish line.
- The trajectory becomes one token sequence; loss falls only on assistant tokens.
- Data source, filtering, and task distribution matter more than most hyperparameters.
- Successful trajectories can carry bad habits; turn-count filtering is cheap but coarse.
- Training loss cannot replace evaluation; deployment reaches states training never saw.
- Choose task sources and teachers before scaling.

## Check your understanding

**1. Why compute loss only on assistant tokens? What does training on observations gain and risk?**

Reference answer: The loss sits only on assistant tokens because those are the tokens the model must produce at deployment — reasoning, tool calls, the final answer, and the stop token. System, user and observation tokens are conditions, not actions; the model never generates them. Training on observations would arguably teach a weak world model of what tool outputs look like, but the risk is worse: the model may learn to fabricate tool results rather than wait for them as the lecture insists, and long observation spans would dominate the loss and crowd out the action signal.

**2. A trajectory passed the unit tests — why might it still be bad SFT data?**

Reference answer: Because the loss copies every action indiscriminately, and passing the tests does not make the process clean. The lecture's examples: an edit-one-line / rerun-test loop across many turns, leftover `print` statements in the final patch, verbose narration and repeated commands. Those habits are learned alongside the correct fix. Two further risks: a teacher whose distribution is too far from the student produces trajectories that are correct but hard to imitate (GPT-5.3 Codex was the worst teacher in the OpenHands Agent study), and trajectories carry system conventions that may not transfer to another scaffold.

**3. How do the curves for more samples and wider task distribution differ?**

Reference answer: With a fixed task set and only more samples per task, accuracy rises and then saturates, and smaller models saturate earlier — the SWE-Gym experiments ended limited by sampling compute, not by task count. In the paired comparison, the same 10k data points of continued sampling from the same distribution flatten out, while adding new tasks or synthetic augmentation keeps rising. So breadth beats volume; the course's empirical advice is to mix 4–8 sources.

**4. Why does template drift break the tool loop?**

Reference answer: The chat template renders the whole trajectory into one string, and the model learns the next-token distribution under that exact prefix; the training template must match serving exactly, down to whitespace. If serving appends a conditional thinking block to the history, the prefix of earlier assistant turns changes, the input distribution no longer matches training, and the learned pattern of "emit a tool call, wait for the observation, continue" breaks — the tool loop fails.

**5. Why is SFT bounded by the teacher? What are the alternatives when no stronger teacher exists?**

Reference answer: SFT is teacher-forced imitation learning, so the model can only learn behaviours and quality present in the demonstrations; the data matrix puts "strong model generates, verifier filters" at the heart of most agent SFT, which makes teacher capability and coverage the ceiling. A stronger teacher is not automatically a better one either — too large a distribution gap shrinks the gain. Alternatives without a stronger teacher: self-distillation (the model generates its own trajectories), expert iteration (filter its own successful rollouts with a verifier, covered later), shifting emphasis to RL, and widening task sources rather than piling up samples.

## How this connects to the course

The previous lecture used SFT to train a computer use agent; this one opens the mechanism. The next three lectures cover reinforcement learning — basics, advanced algorithms, and training systems — and the checkpoint produced here is their starting point.

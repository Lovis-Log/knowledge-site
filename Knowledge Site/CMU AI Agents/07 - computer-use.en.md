---
slug: "07-computer-use"
title: "Computer Use Agents: Acting Through the GUI"
summary: "Computer use agents read screenshots and click, scroll, and type. This lecture covers their history, four families of evaluation, and the three-stage training pipeline."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "ai-agents"
  - "computer-use"
  - "gui-agents"
  - "evaluation"
sources:
  - kind: "video"
    title: "CMU AI Agents 2026: 7. Computer Use Agents"
    url: "https://www.youtube.com/watch?v=jwGluLrrqjQ"
    author: "Jing Yu Koh"
    publishedAt: "2026-09-25"
  - kind: "article"
    title: "CMU CS 11-768 course site"
    url: "https://cmu-agents.com"
---

## What this lecture is about

Earlier lectures had agents working through text and code. A computer use agent (CUA) changes the action space: **it sees screenshots and performs the same actions a person would — click, scroll, type, drag — inside the same graphical interface**.

The agent needs no API from the target software and no understanding of the page's DOM. If it can take a screenshot and control a mouse and keyboard, it can operate almost any program: a website, a desktop app, a phone. The price is a pixel-level action space, noisy environments, and harder evaluation.

### The minimal loop

1. A natural-language task, such as "buy a box of blueberries under $20".
2. The environment returns the current screenshot.
3. A vision-language model produces a reasoning trace and then a structured action, such as "left click at (x, y)".
4. The infrastructure executes the action.
5. The environment returns a new screenshot.
6. The action and screenshot are appended to history; repeat until the model stops or the budget runs out.

The reward is usually binary — task complete or not — though long-horizon work also uses partial credit.

## History: from toy worlds to real desktops

| When | Work | What changed |
| --- | --- | --- |
| 2017 | World of Bits (OpenAI) | First CUA paper: small synthetic web environments trained with early RL, far ahead of the models of the time |
| 2022 | WebShop | Still simulated, but much closer to a real shopping site; language models enter the picture |
| 2024 | WebArena (CMU) | High-fidelity simulated sites seeded with real data; about 800 tasks across four apps |
| 2024 | OSWorld | A real Linux VM with 369 tasks across nine apps, moving from the web to the full desktop |
| 2025–2026 | MyPCBench and peers | Coding agents generate entire apps and synthetic data end to end; environments become cleaner and more controllable |
| 2026 | KA World (CMU) | Long-tail professional software such as astronomy, biology, and engineering tools |

The GPT-6 Astra demo shown in class performs 3D modeling in CAD software. The video is sped up 30x, which makes the point: the capability is strong, but it is **still slow and expensive**.

A notable shift: environments themselves are now generated. Early benchmarks needed humans to write open-source apps and then populate them; today a coding agent can generate a Gmail clone with synthetic data that is cleaner than the real thing.

## Four families of evaluation

"Success" in computer use is not as easy to test as a math answer or a code patch, so evaluation splits into complementary approaches.

### 1. Static evaluation: score each action

Given a screenshot and a task, check whether the predicted next action falls inside the ground-truth bounding box.

- **ScreenSpot-Pro**: about 1,500 screenshots across applications and operating systems, measuring grounding — can the model turn "this button" into the right pixels?
- **Mind2Web**: next-action imitation; given the screenshot and task, predict where a human would click.

This is fast and cheap because no environment is needed. The weakness is **false negatives**: there are usually several valid ways to proceed, and the annotation records only one. The benchmark measures similarity to the annotator, not task completion.

### 2. End-to-end evaluation: check the final state

Run the agent to completion in a controlled environment and verify the resulting state programmatically.

- **WebArena**: about 800 tasks on four simulated apps; verifiers were hand-written by CMU graduate students and check outcomes rather than steps.
- **VisualWebArena**: 910 tasks that can only be solved with visual information, pushing the community away from accessibility trees toward screenshots.
- **OSWorld**: a real Linux VM, 369 tasks across nine apps, such as updating a LibreOffice spreadsheet from receipts and saving it.
- **Windows Agent Arena**: Microsoft's counterpart for Windows enterprise workflows.

This is closer to the real objective, with two risks: incomplete verifiers produce false positives and negatives, and agents can **reward hack** by satisfying the check rather than doing the task.

### 3. LLM judges: score the trajectory

When a verifier cannot be written, hand the task and full trajectory to another VLM and ask whether it succeeded.

- **WebVoyager**: 15 real websites, 600 tasks, operating on the live internet.
- **Online-Mind2Web**: 136 real sites, 300 tasks, with a judge that agrees with humans about 85% of the time.

Live-web evaluation is the most realistic, but has no programmatic verifier, so the judge can be fooled by surface evidence. It also sends real traffic to sites whose owners dislike it. The lecture's read: these benchmarks are used less now, partly because modern models have largely solved them and partly because deploying agents on the live web has become more cautious.

### 4. Long-horizon evaluation: process and partial credit

On long tasks the final reward is very sparse. An agent can do hours of useful work and fail the last step, scoring zero. These benchmarks therefore use **rubrics** that award partial credit.

- **Odyssey** (CMU): 200 long-horizon web tasks, each with roughly eight criteria, such as "find a non-stop flight from Pittsburgh to Los Angeles" and "schedule the drive between 9 a.m. and 4 p.m.".
- **OSWorld 2**: 108 tasks with a median human time of 1.6 hours; frontier agents average around 300 calls, including CAD modeling and photo editing.
- **KA World Long**: 200 specialized tasks, most requiring more than 500 calls.

Rubrics are typically LLM-generated and human-verified. Generation can use privileged information, such as page HTML, so the model performs better and the resulting rubric is more accurate.

## How the models are built

### Representation: an interleaved vision-language history

A CUA is still a vision-language model. Input is a natural-language goal plus a sequence of screenshots; output is a structured action expressed as text. History keeps growing:

```text
[goal] [screen 0] [action 0] [screen 1] [action 1] [screen 2] ...
```

Text is tokenized into text tokens, screenshots are encoded into visual tokens, and the two are concatenated before entering the transformer. At each step the model conditions on the whole history to predict the next action.

Coordinates are usually **normalized to 0–1000** rather than absolute pixels, so a policy trained on a Mac transfers to a tablet or a different resolution.

### Action space

Models differ slightly in what they can emit: click, scroll, type, drag, key press. The representation might be pyautogui calls, tool-call JSON, or XML tags, and the environment parses it into something executable.

### Why screenshots rather than HTML

HTML is messy, and desktop apps do not expose a unified DOM. A screenshot is consistent across every device. The lecture notes that screenshot-based policies perform surprisingly well, to the point where structured representations can seem unnecessary.

Frontier models do use **accessibility trees** and other metadata when available, because structure improves robustness. The advantage of pure screenshots is generality: a model trained on Windows transfers more easily to Linux or macOS.

### Engineering detail: waiting

After an action, the system usually sleeps about three seconds and then takes a screenshot. If the screen is still loading, the model is trained to wait again. More elaborate infrastructure waits for the screen to change, but sleeping is the common approach.

## Three-stage training

### 1. Pretraining: localization and grounding

The goal is to teach the model **where things are on screen**. Data is a screenshot plus bounding boxes plus coordinates, and the model learns to output the location of an element. Such data can be generated at scale — a short JavaScript snippet on a web page yields every bounding box.

Action-prediction data is mixed in: given a screenshot and a task, predict the next action. The data is noisy but plentiful. This stage builds only basic abilities: reading a screenshot, locating elements, and understanding their relative positions.

### 2. Post-training SFT: imitate humans and synthetic traces

- **Human demonstrations**: Momo Web collected about 36,000 human trajectories; AgentNet is similar. Each trajectory is a screenshot-action sequence.
- **Synthetic traces**: let a model that can access the accessibility tree — privileged information unavailable at inference — complete the task, collect its trajectories, then discard the privileged channel and keep only screenshots and actions. Momo Web generated about 105,000 synthetic traces this way and filtered them by quality.

The lecture's analogy is Tesla: train with lidar on the car, collect trajectories, discard the lidar, and learn from pixels. **The teacher sees more than the student, so the student learns better.**

### 3. Reinforcement learning: trial and error in simulation

Place the model in a simulated environment, let it act autonomously, assign rewards, and update the policy. Successful trajectories are upweighted, failures downweighted. No human demonstration is involved.

Simulation is mandatory because real-world trial and error is costly: repeatedly booking and refunding rides gets an account banned or runs out of money. A simulator makes failure cheap.

The lecture's numbers: success after SFT is around 0.5; adding RL pushes it above 0.6. More importantly, long-horizon skill is hard to obtain from demonstrations — collecting multi-hour human traces is prohibitively expensive, while RL can practice in simulation.

## Open problems

- **Speed**: capability is at or above median human level, but inference remains slow and expensive.
- **Personalization**: adapting to one user's habits and preferences.
- **Infrastructure and UX**: loading states, pop-ups, permissions, resolution handling consume a large share of engineering effort.
- **Multi-agent**: several CUAs collaborating across applications.

## Takeaways

- A CUA's value is **sharing the human interface**, so it needs no API and is not limited to apps that expose one.
- There is no single evaluation: static scoring is fast but yields false negatives; end-to-end verifiers are realistic but reward-hackable; LLM judges are flexible but noisy; long tasks need rubrics.
- Training has three stages: pretraining for localization, SFT for imitation (human plus synthetic), RL for reward maximization in an environment.
- Screenshots are the general representation; accessibility trees are a useful supplement; normalized coordinates transfer across resolutions.

## Check your understanding

1. What do static and end-to-end evaluation each measure, and where do their false positives and negatives come from?
2. Why are rubrics a better fit than binary success for long-horizon tasks?
3. What is the "privileged information" in synthetic traces, and why can the student still learn after it is discarded?
4. Why is reinforcement learning for CUAs almost always done in simulation?
5. What does pure-screenshot representation gain and lose relative to HTML or accessibility trees?

## How this connects to the course

This lecture turns "environment understanding" into the GUI. Tool calls from the previous lecture become clicks and keystrokes. The next lecture revisits imitation learning through supervised fine-tuning, and lectures 9 and 11 expand the reinforcement learning sketched here.

import type { Book } from "@/content/types";

export const cmuAiAgents: Book = {
  slug: "cmu-ai-agents",
  title: "CMU AI Agents 学习笔记",
  subtitle: "CS 11-768 · Fall 2026",
  description:
    "从「什么是 Agent」开始，沿着工具使用、长上下文、记忆、规划一路读到评测与安全。每章是我看完讲座后用自己的话重写的要点，不是字幕的复制。",
  updatedAt: "2026-10-30",
  chapters: [
    {
      slug: "01-what-is-an-agent",
      number: 1,
      updatedAt: "2026-10-30",
      sources: [
        {
          kind: "video",
          title: "CMU AI Agents 2026: 1. What are Agents and How Do They Work?",
          url: "https://www.youtube.com/watch?v=UwfjzyLnvMg",
          author: "Daniel Fried, Graham Neubig",
          publishedAt: "2026-09-08",
        },
        {
          kind: "article",
          title: "CMU CS 11-768 课程主页",
          url: "https://cmu-agents.com",
        },
      ],
      versions: {
        zh: {
          title: "什么是 Agent",
          summary:
            "Agent 的核心不是更大的模型，而是把模型放进一个可反复行动的循环里，并为此设计终止条件、错误恢复与成本控制。",
          body: `## 定义

一个 **Agent** 是让语言模型在循环中行动的系统：模型读取当前观察，选择一个动作，环境返回新的观察，模型再决定下一步。和一次性问答相比，关键不在模型更大，而在于**动作会改变下一步能看到的东西**。

### 三个组成部分

1. **模型**：负责推理与决策。
2. **工具**：可以调用的函数，例如搜索、读写文件、执行代码。
3. **循环**：把「观察 → 思考 → 行动」串起来，直到任务完成或预算耗尽。

> Agent 不是更强的模型，而是一个被允许反复尝试、并为此付出成本与风险的系统。

### 最小循环

\`\`\`python
while not done:
    action = model.decide(observation)
    observation = environment.step(action)
    done = budget_exceeded()
\`\`\`

### 与单次问答的差别

| 维度 | 单次问答 | Agent 循环 |
| --- | --- | --- |
| 延迟 | 一次生成 | 多轮，可能到分钟级 |
| 失败方式 | 回答错误 | 错误会累积并放大 |
| 工程重点 | 提示词 | 终止条件、错误恢复、可观测性 |

## 本课程的地图

后续内容沿着一条链路展开：工具使用 → 长上下文 → 记忆与技能 → 规划与多智能体 → 评测与安全。

![Agent 的观察—行动循环](/images/agent-loop.svg)

## 读后自问

- 这个系统的**终止条件**是什么？
- 失败时能不能**回退**到上一个已知良好的状态？
- 每一步的成本（时间、token、副作用）是否可度量？
`,
        },
        en: {
          title: "What Is an Agent",
          summary:
            "The point of an agent is not a bigger model but a model allowed to act repeatedly — which makes termination, recovery, and cost the real engineering problems.",
          body: `## Definition

An **agent** is a language model placed inside a loop: it reads an observation, chooses an action, the environment returns a new observation, and it decides again. Unlike a single answer, the defining property is that **actions change what the model can see next**.

### Three parts

1. **Model** — reasoning and decision making.
2. **Tools** — functions such as search, file access, code execution.
3. **Loop** — observe, think, act, until the task is done or the budget runs out.

> An agent is not a stronger model. It is a system allowed to retry, and therefore a system that pays for retries in cost and risk.

### A minimal loop

\`\`\`python
while not done:
    action = model.decide(observation)
    observation = environment.step(action)
    done = budget_exceeded()
\`\`\`

### Compared with a single call

| Axis | Single call | Agent loop |
| --- | --- | --- |
| Latency | one generation | many rounds, often minutes |
| Failure mode | a wrong answer | errors compound |
| Engineering focus | prompting | termination, recovery, observability |

## The map of the course

The lectures follow one chain: tool use → long context → memory and skills → planning and multi-agent coordination → evaluation and safety.

![The observe-act loop of an agent](/images/agent-loop.svg)

## Questions to keep

- What is the **termination condition** of this system?
- Can it **roll back** to the last known-good state?
- Is the cost of each step — time, tokens, side effects — measurable?
`,
        },
      },
    },
    {
      slug: "02-tool-use",
      number: 2,
      updatedAt: "2026-10-29",
      sources: [
        {
          kind: "video",
          title: "CMU AI Agents 2026: 2. Tool Use for Language Model Agents",
          url: "https://www.youtube.com/watch?v=jXChFB4JSyw",
          author: "CMU CS 11-768",
          publishedAt: "2026-09-15",
        },
      ],
      versions: {
        zh: {
          title: "工具使用：把动作变成接口",
          summary:
            "工具不是给模型的装饰，而是把世界压缩成可验证动作的接口；描述质量、参数校验与错误返回决定了 Agent 能不能稳定工作。",
          body: `## 工具是什么

工具把一个动作暴露给模型：名字、用途说明、参数结构、返回值。模型看不到工具内部，只能看到这份**接口描述**。因此工具设计的第一原则是——描述要像写给一个没有上下文的新同事。

### 一份好的工具描述

\`\`\`json
{
  "name": "read_file",
  "description": "读取仓库内的一个文本文件。只接受相对路径，禁止访问仓库之外。",
  "parameters": {
    "path": {
      "type": "string",
      "description": "相对于仓库根目录的路径，例如 src/main.py"
    },
    "start_line": { "type": "integer", "minimum": 1 },
    "max_lines": { "type": "integer", "maximum": 400 }
  }
}
\`\`\`

要点：

- **边界写清楚**：能做什么、不能做什么，比功能列表更重要。
- **参数少而明确**：默认值写在描述里，不要让模型猜。
- **返回可读**：错误信息要告诉模型*下一步该怎么做*，而不是只抛出堆栈。

### 常见失败方式

1. 模型编造参数名——通常是 schema 太抽象。
2. 模型重复调用同一个工具——缺少「已经做过」的状态反馈。
3. 工具返回过长——把上下文挤爆，后续步骤失去依据。

> 工具调用不是 RPC，而是一次**有噪声的通信**：模型可能误解，工具也可能失败。好的设计假设这两件事都会发生。

## 设计清单

- 工具名是否动词开头、含义唯一？
- 失败时返回的是「为什么错」还是「怎么改」？
- 是否有幂等版本，供重试使用？
- 权限边界是否在工具内部强制执行，而不是靠提示词？
`,
        },
      },
    },
    {
      slug: "03-long-context",
      number: 3,
      updatedAt: "2026-10-28",
      sources: [
        {
          kind: "video",
          title: "CMU AI Agents 2026: 3. Long Context Modeling for Agents",
          url: "https://www.youtube.com/watch?v=AiwCCvFW1uE",
          author: "CMU CS 11-768",
          publishedAt: "2026-09-22",
        },
      ],
      versions: {
        en: {
          title: "Long Context Is a Budget, Not a Bucket",
          summary:
            "A larger context window does not remove the need to choose what the model sees. Treat context as a budget with attention decay, and design retrieval and summarization around it.",
          body: `## The window is not free

A long context window changes what is possible, not what is useful. Three effects matter in practice:

- **Attention decay** — material in the middle of a long prompt is used less reliably than material at the edges.
- **Cost and latency** — every token is paid for on every step of an agent loop.
- **Distraction** — irrelevant but plausible text makes the model more likely to follow the wrong thread.

## What to put in context

Think of the prompt as a budget with four compartments:

| Compartment | Contents | Typical mistake |
| --- | --- | --- |
| Task | goal, constraints, definition of done | restating the goal every turn |
| State | files changed, decisions made | pasting whole files instead of diffs |
| Evidence | retrieved passages, tool output | dumping raw logs |
| Scratch | plan, open questions | letting it grow without pruning |

### Summarize, then drop

A simple policy that works surprisingly well:

1. After each tool result, write a one-line summary into state.
2. Keep the last two raw results; drop older ones.
3. Re-read a file only when the summary is insufficient.

\`\`\`python
state.append(summarize(result))
context = [task] + state[-8:] + recent_results[-2:]
\`\`\`

> Long context is a capability, but context management is the skill. The model cannot attend to what you never put in, and it will not reliably attend to everything you do.

## Failure signals

- The agent re-reads the same file three times.
- Answers cite details that appear only in the middle of a 200k prompt.
- Output quality drops as the transcript grows, even though nothing new was added.
`,
        },
      },
    },
  ],
};

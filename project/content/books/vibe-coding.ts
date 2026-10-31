import type { Book } from "@/content/types";

export const vibeCoding: Book = {
  slug: "vibe-coding",
  title: "Vibe Coding 学习笔记",
  subtitle: "从零基础到上线一个能收钱的 SaaS",
  description:
    "把「让 AI 写代码」从抽奖变成流程：先规划、再定 UI、然后一个功能一个功能地实现与自检。两篇笔记记录我实际跑通的循环。",
  updatedAt: "2026-10-24",
  chapters: [
    {
      slug: "01-the-loop",
      number: 1,
      updatedAt: "2026-10-24",
      sources: [
        {
          kind: "video",
          title: "The Ultimate Vibe Coding Tutorial for Beginners",
          url: "https://www.youtube.com/watch?v=XLhdE-qV87E",
          author: "Codesistency",
          publishedAt: "2026-10-16",
        },
      ],
      versions: {
        zh: {
          title: "一条可以重复的循环",
          summary:
            "规划 → 定 UI → 拆功能 → 每个功能自检与审查 → 部署。核心不是某个工具，而是把每一步的产出固定下来。",
          body: `## 为什么需要一个循环

直接对 AI 说「帮我做个 App」，得到的通常是一堆能跑但说不清的东西。问题不在模型，而在**没有可检查的中间产物**：没有需求、没有界面、没有验收标准，也就无法判断哪一步错了。

### 循环的五步

1. **规划**：让 AI 反向面试你，把模糊的想法逼成一份需求清单。
2. **定 UI**：先用参考图或线框确定界面，而不是边写边想。
3. **拆功能**：一次只做一个可以独立验收的功能。
4. **自检与审查**：每个功能完成后先自己点一遍，再让 AI 做一次代码审查。
5. **部署**：尽早让真实环境跑起来，数据库、支付、域名都在这一步暴露问题。

> 关键不是「让 AI 一次写对」，而是让每一步都留下**可以被人检查的东西**。

### 一次功能实现的骨架

\`\`\`text
需求：用户可以创建一个待办事项
验收：
  - 输入为空时按钮禁用
  - 创建后列表立即出现新条目
  - 刷新页面后仍然存在
约束：不改动现有鉴权逻辑
\`\`\`

把这段写进对话，比「帮我加个待办功能」有效得多。

### 常见偏差

| 偏差 | 表现 | 修正 |
| --- | --- | --- |
| 范围膨胀 | 一个对话里加了五个功能 | 一次只做一件，做完就提交 |
| 假完成 | 页面能打开但数据没存 | 每条验收标准都要亲手验证 |
| 静默回归 | 新功能弄坏了旧页面 | 每次提交前跑一遍主流程 |

## 工具的位置

工具会变，循环不会。选工具时只看三件事：能不能看到改动（diff）、能不能回退（git）、能不能在真实环境验证（预览部署）。

![五步循环：规划、界面、实现、审查、部署](/images/vibe-loop.svg)

## 我的判断

Vibe coding 真正的门槛不是写代码的速度，而是**定义完成的能力**。能把「做完」说清楚的人，用任何模型都能跑通这条循环。
`,
        },
        en: {
          title: "A Loop You Can Repeat",
          summary:
            "Plan, fix the UI, ship one feature at a time, verify and review, then deploy. The tool changes; the loop is what makes the output checkable.",
          body: `## Why a loop

Ask an AI for "an app" and you usually get something that runs but cannot be explained. The problem is not the model — it is the absence of **inspectable intermediate artifacts**: no requirements, no interface, no definition of done.

### Five steps

1. **Plan** — have the AI interview you until vague ideas become a requirements list.
2. **Fix the UI** — decide the interface from references before writing logic.
3. **Slice features** — one independently verifiable feature at a time.
4. **Verify and review** — click through it yourself, then ask for a code review.
5. **Deploy** — get it onto a real environment early; databases, payments, and DNS surface there.

> The point is not getting the AI to write it right the first time. The point is leaving something a human can check at every step.

### A feature brief

\`\`\`text
Feature: a user can create a todo
Acceptance:
  - submit is disabled while the input is empty
  - the new item appears immediately
  - it is still there after a reload
Constraint: do not touch the existing auth flow
\`\`\`

That paragraph does more than "add a todo feature".

### Common failure modes

| Failure | Symptom | Fix |
| --- | --- | --- |
| Scope creep | five features in one chat | one at a time, commit when done |
| Fake completion | page opens, data is not saved | verify every acceptance line by hand |
| Silent regression | a new feature breaks an old page | run the golden path before each commit |

## Where tools fit

Tools change; the loop does not. Pick tools on three properties: you can see the diff, you can roll back, and you can verify on a real deployment.

![The five-step loop: plan, interface, build, review, deploy](/images/vibe-loop.svg)

## My take

The real skill in vibe coding is not typing speed — it is **defining done**. Anyone who can state "done" precisely can run this loop with any model.
`,
        },
      },
    },
    {
      slug: "02-my-ai-workflow",
      number: 2,
      updatedAt: "2026-10-23",
      sources: [
        {
          kind: "video",
          title: "我的 AI 编程全流程",
          url: "https://www.youtube.com/watch?v=KJybu1Y2tyY",
          author: "Vibe coding tutorials",
          publishedAt: "2026-10-20",
        },
      ],
      versions: {
        zh: {
          title: "我的 AI 编程全流程",
          summary:
            "从一句话想法到一个能用的产品，我把过程拆成固定动作：写清约束、先跑通主路径、用 diff 控制改动面、每个阶段结束都留一个可回退的提交。",
          body: `## 起点：一句话与三条约束

每次开始新项目，我先写三行：

1. **给谁用**：一个具体的人，而不是「用户」。
2. **解决什么**：一句可以被验证的话。
3. **不做什么**：明确排除，防止范围膨胀。

这三行会一直贴在对话开头。缺了第三条，功能会越加越多。

## 过程：先主路径，后细节

### 第一轮

只实现主路径：能创建、能看到、能删除。样式先不管，数据先存本地。

### 第二轮

补状态：空列表、加载中、错误提示。这些才是让产品「感觉完成」的部分。

### 第三轮

再谈视觉与动效。顺序反了，就会在还没跑通的时候反复调间距。

\`\`\`bash
git add -A
git commit -m "feat: todo main path"
\`\`\`

> 每个阶段结束必须有一个能回退的提交。没有提交的改动，等于没有改动。

## 与 AI 协作的四个习惯

- **给 diff，不给整文件**：改动面越小，越容易审查。
- **一次一个问题**：把「顺便修一下」留到下一轮。
- **让它解释**：要求用三句话说明改了什么、为什么、风险在哪。
- **保留失败记录**：走错的路写进笔记，下次少走一次。

## 收尾

发布前只检查五件事：主路径、空状态、错误状态、移动端、真实数据。五项都过，再谈上线。
`,
        },
      },
    },
  ],
};

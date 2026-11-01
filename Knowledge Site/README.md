# 成稿笔记的发布目录

这里只放**已经整理好的学习笔记**。本目录会随 Git 提交并公开到 GitHub，站点在构建时直接读取这里的 Markdown。

## 不该放在这里的内容

- YouTube 字幕稿、原始转录（`CMU AI agent/`、`MIT Linear Algebra(...)/` 等）
- 网页摘录、剪藏（`Clippings/`）
- 私人笔记、草稿、未完成的片段

这些内容留在 vault 其他目录，`.gitignore` 白名单会阻止它们进入仓库。

## 目录组织：大类 → 子分类 → 书名

```
Knowledge Site/
├─ taxonomy.json
├─ AI Era/
│  ├─ AI 原理与应用/
│  │  ├─ AI Agent 工程与技能设计/
│  │  ├─ 大模型原理与使用/
│  │  └─ LLM Wiki Workflow/
│  └─ AI 编程与创作/
│     ├─ Vibe Coding Tutorials/
│     └─ 产品与设计/
├─ 专业课程/
│  ├─ 数学/
│  │  ├─ MIT Real Analysis/
│  │  ├─ MIT Discrete Applied Mathematics/
│  │  └─ MIT Linear Algebra/
│  ├─ 计算机与编程/
│  │  ├─ C++ Programming/
│  │  ├─ Harvard Python Programming/
│  │  └─ Python for AI/
│  └─ 人工智能/
│     └─ CMU AI Agents/
└─ 精选收录/
   └─ 英语与外刊/
      └─ 外刊精读/
```

- 每个书名文件夹内保留 `_book.md` 和章节 Markdown；大类、子分类是容器目录。
- 文件夹名称与已确认的书名一致，网站显示名称读取 `_book.md` 的 `title`。
- 网站递归发现书籍，URL 取自书籍和章节的 `slug`；移动或重命名文件夹不改变已发布链接。
- 章节文件用 `NN - 标题` 命名，序号两位补零，`NN` 必须与 frontmatter 的 `slug` 前缀一致。
- 中英双版用 `.zh` / `.en` 后缀配对；同一章的序号与 `slug` 必须一致。
- 只有一种语言也可以，站点不会显示语言切换。

## 语言规则

- **中文原始资料只生成中文笔记**，不生成英文版。
- **英文原始资料生成中文 + 英文两份**，两份独立成文但事实与结论一致。
- 语言由文件后缀推断，不写 `lang` 字段。

## `_book.md`

每本书必须有一个 `_book.md`：

```yaml
---
slug: cmu-ai-agents          # ASCII，稳定 URL
title: CMU AI Agents
subtitle: CS 11-768 · Fall 2026
description: 卡片上的一句话简介。    # 尽量 40 字内，最多两行
longDescription: 详情页的详细简介，两到三句。  # 可选，缺省回退到 description
category: ai-courses         # 必须是 taxonomy.json 中的 slug
updatedAt: 2026-10-30
author: Daniel Fried, Graham Neubig   # 可选：单一作者或机构
content_type: video-course            # 可选：书本级类型，取值同章节
links:                                # 可选：原始来源（YouTube / X / 原文页）
  - label: YouTube 讲座
    url: https://www.youtube.com/watch?v=UwfjzyLnvMg
collection: true                      # 可选：多来源汇编，卡片显示「多来源」且不填 author
---
```

`coverImage` 可选，图片放 `project/public/covers/`。多来源汇编的书（如 Vibe Coding）不写 `author`，只写 `collection: true`。

## 章节 frontmatter

```yaml
---
slug: 01-what-is-an-agent      # ASCII，稳定 URL，一经发布不改
title: 什么是 AI Agent
summary: 一句话说明本章讲什么
updatedAt: 2026-11-01
content_type: video-course     # 见下方类型表
tags:
  - ai-agents
  - agent-architecture
sources:
  - kind: video                # video | blog | podcast | article
    title: "CMU AI Agents 2026: 1. What are Agents?"
    url: https://www.youtube.com/watch?v=UwfjzyLnvMg
    author: Graham Neubig
    publishedAt: 2026-09-08
---
```

必填：`slug`、`title`、`summary`、`updatedAt`、`sources`。

`publishedAt` 可选，写在章节 frontmatter 顶层表示本章原资源首发日期；不写时自动取 `sources` 中最早的 `publishedAt`。

`content_type` 取值：`video-course`、`technical-tutorial`、`science-explainer`、`news`、`opinion`、`podcast-interview`、`reference`、`social-post`。

## 内容分类

`taxonomy.json` 是主题分类的受控词表：

```json
{
  "sections": [
    { "slug": "courses", "name": "专业课程", "description": "…" }
  ],
  "categories": [
    { "slug": "ai-courses", "section": "courses", "name": "人工智能", "description": "…" }
  ]
}
```

- 书的 `category` 必须来自该词表；未知分类会导致 `npm run verify` 失败。
- 首页按大类展示最多 4 本书，大类页按子分类展示全部书籍。
- 文件夹路径须与词表中的大类、子分类以及书籍 `title` 一致。
- 新增或调整命名、分类、归属，须先按根目录 `AGENTS.md` 征求用户选择。

## Markdown 兼容性

站点渲染器支持：GFM 表格、任务列表、围栏代码、`$...$` 与 `$$...$$`（KaTeX）、普通引用块、图片。

不支持，**发布稿必须避免**：

| 禁用 | 替代 |
| --- | --- |
| `> [!abstract]` 等 Obsidian callout | `> **一句话总结**` |
| `[[Wiki Link]]` | `[文字](https://…)` 或省略 |
| `![[embed]]` | 标准 `![](/images/x.svg)` |
| 正文一级标题 `#` | 从 `##` 开始 |
| HTML 块 | Markdown 原生语法 |

## 生成与发布

使用 `deeplearn-notes` skill 从剪藏生成笔记，写入本目录并维护去重状态。

发布：

```bash
git add "Knowledge Site"
git commit -m "notes: add <书名> chapter <N>"
git push
```

不要使用 `git add -A` 或 `git add .`。

## 校验

```bash
cd project
npm run build
npm run verify
```

`verify` 会扫描本目录，检查每个文件是否可解析、分类是否合法、页面是否生成，以及 KaTeX、代码高亮、双语块是否正常。

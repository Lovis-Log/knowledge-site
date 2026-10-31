# 成稿笔记的发布目录

这里只放**已经整理好的学习笔记**。本目录会随 Git 提交并公开到 GitHub。

## 不该放在这里的内容

- YouTube 字幕稿、原始转录（`CMU AI agent/`、`MIT Linear Algebra(...)/` 等）
- 网页摘录、剪藏（`Clippings/`）
- 私人笔记、草稿、未完成的片段

这些内容留在 vault 其他目录，`.gitignore` 白名单会阻止它们进入仓库。

## 目录组织：一课一书

```
Knowledge Site/
├─ CMU AI Agents/
│  ├─ 01 - What are Agents.zh.md
│  ├─ 01 - What are Agents.en.md
│  └─ 02 - Tool Use.zh.md
└─ MIT 线性代数/
   ├─ 01 - Geometry of Equations.zh.md
   └─ 02 - Elimination.zh.md
```

- 每个课程一个文件夹，文件夹名即书名。
- 章节文件用 `NN - 标题` 排序，序号两位补零。
- 中英双版用 `.zh` / `.en` 后缀配对；同一章的序号与 `slug` 必须一致。
- 只有一种语言也可以，站点不会显示语言切换。

## Frontmatter 约定

```yaml
---
slug: 01-what-is-an-agent      # ASCII，稳定 URL，一经发布不改
title: 什么是 AI Agent
summary: 一句话说明本章讲什么
updatedAt: 2026-11-01
sources:
  - kind: video                # video | blog | podcast | article
    title: "CMU AI Agents 2026: 1. What are Agents?"
    url: https://www.youtube.com/watch?v=UwfjzyLnvMg
    author: Graham Neubig
    publishedAt: 2026-09-08
---
```

必填：`slug`、`title`、`summary`、`updatedAt`、`sources`。
语言由文件后缀推断，不需要 `lang` 字段。

## 发布流程

确认内容已是成稿后，在 vault 根目录：

```bash
git add "Knowledge Site"
git commit -m "notes: add <书名> chapter <N>"
git push
```

不要使用 `git add -A` 或 `git add .`，避免误把其他目录加入暂存区。

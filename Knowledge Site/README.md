# 成稿笔记的发布目录

这里只放**已经整理好的学习笔记**。本目录会随 Git 提交并公开到 GitHub，站点在构建时直接读取这里的 Markdown。

## 不该放在这里的内容

- YouTube 字幕稿、原始转录（`CMU AI agent/`、`MIT Linear Algebra(...)/` 等）
- 网页摘录、剪藏（`Clippings/`）
- 私人笔记、草稿、未完成的片段

这些内容留在 vault 其他目录，`.gitignore` 白名单会阻止它们进入仓库。

## 目录组织：大类 → 可选子分类 → 书名

```
Knowledge Site/
├─ taxonomy.json
├─ 校内课程/
│  └─ 工科数学分析/
├─ 专业课程/
│  ├─ 数学/
│  │  ├─ MIT Real Analysis/
│  │  ├─ MIT Discrete Applied Mathematics/
│  │  └─ MIT Linear Algebra/
│  ├─ 计算机科学/
│  │  ├─ C++ Programming/
│  │  ├─ Harvard Python Programming/
│  │  ├─ Python for AI/
│  │  └─ CMU AI Agents/
├─ AI Era/
│  ├─ AI 工程与设计/
│  ├─ 大模型原理与使用/
│  ├─ LLM Wiki Workflow/
│  └─ Vibe Coding Tutorials/
└─ 精选收录/
   ├─ 外刊精读/
   ├─ 社会与思辨/
   ├─ 金融财经/
   └─ 个人精选/
```

- 每个书名文件夹内保留 `_book.md` 和章节 Markdown；大类、子分类是容器目录。
- 文件夹名称与已确认的书名一致，网站显示名称读取 `_book.md` 的 `title`。
- 网站递归发现书籍，URL 取自书籍和章节的 `slug`；移动或重命名文件夹不改变已发布链接。
- 章节文件用 `NN - 标题` 命名，序号两位补零。新章节的 `slug` 前缀与初始序号一致；已发布章节合并或重排时保留原 `slug`，以免旧链接失效。
- 中英双版用 `.zh` / `.en` 后缀配对；同一章的两种语言使用一致的文件序号与 `slug`。
- 校内课程、AI Era 与精选收录直接展示书籍；专业课程保留子分类。网站排序由 `taxonomy.json` 的 sections 决定，依次为校内课程、专业课程、AI Era、精选收录。
- 封面固定使用英文展示名，封面下方的加粗书名跟随界面语言；展示译名集中在服务端的 `project/lib/book-title-translations.ts`，随受保护目录下发，不替换其他正式书名。
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
longDescription: 详情页的详细简介，两到三句。  # 必填：详情页只显示这一条，不要照抄 description
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

校内课程可把目录分成「课程」「作业」等多组：在 `_book.md` 用可选的 `groups` 按顺序声明 `id`、`title`（章节页序号前缀，如「作业」）和 `heading`（目录标题，如「作业目录」），并用 `studyPeriod`（如 `大一`）表示学期。章节用 `group` 归组、用 `displayNumber` 独立编号，`number` 仍由文件序号决定，只作稳定标识。没有这些字段的书保持单组目录、原有编号与日期。

### 校内课程封面与原始资料

- 课程封面必须使用同书架邻居的复古纸本、黄铜器具学术插画风格，不用 SVG 几何线稿或临时占位图；文件为 `webp`、`png` 或 `jpeg` 栅格图，放在 `project/public/covers/`。若注册了响应式缩略图，必须同时提供 `-240.webp` 和 `-480.webp`。
- 版式统一，但书壳颜色要区分：每本课程在 `project/app/globals.css` 有独立的 `[data-book="<slug>"]` 配色，背景色互不重复，正文色与背景对比度不低于 4.5。发布前查看整排书架、详情页小封面和手机宽度。
- 课件、作业原图等原始资料先查云盘去重，上传原格式并在实际匿名窗口核验 reader / anyone 权限，再用 `drive.google.com/file/d/<id>/view` 或 `docs.google.com` 查看/预览入口回填 `_book.md` 的 `links` 和章节 `sources`/正文链接。课程文件夹入口用 `drive.google.com/drive/folders/<id>`。
- 不要用站内 `/course-materials/.../lectures`、`/homework`、`file://`、本机路径或 Google `uc?export=download` 等下载直链代替 Drive 预览；仅构建通过或链接格式存在都不算核验完成，必须实际点开确认不是自动下载。云盘受阻时不要降级成站内下载并宣布发布完成。
- 正文插图仍可使用 `/course-materials/.../figures/...` 或 `/images/...`；普通外部文献、官网和公开课程页面链接不受 Drive 规则限制。
- `npm run verify` 会运行 `verify-campus-publication.ts`，在本地检查封面文件、响应式缩略图、书壳配色/对比度和 Drive 链接结构；它不联网、不登录，也不核验真实权限。完整人工步骤见 [发布与恢复指南](../project/RELEASING.md)。

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

`group` 与 `displayNumber` 可选，仅用于声明了 `groups` 的书；`number` 由文件序号生成，不写在 frontmatter 里。

`publishedAt` 可选，写在章节 frontmatter 顶层表示本章原资源首发日期；不写时自动取 `sources` 中最早的 `publishedAt`。课程笔记日期未知时不要补写日期，由 `_book.md` 的 `studyPeriod` 负责展示时间。

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
- 首页按大类展示全部书籍，推荐书目排在前面；大类页按子分类展示全部书籍。
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

成稿内容使用以上格式与来源规则。发布统一遵循 [发布与恢复指南](../project/RELEASING.md)。仅暂存本任务文件并提交后，在 `project/` 执行 `npm run release`，由同一个命令检查、导入对应 D1 内容、推送 main 并确认生产部署。

仅检查执行 `npm run release:check`。只执行 `git push` 不包含数据库内容更新，不能视为完整发布。

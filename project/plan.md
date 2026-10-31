# 「我的书房」— 个人知识网站规划摘要与实施计划

> 状态：第一版已实现（2026-10-31），构建、产物校验与浏览器验收通过。
> Git 仓库根：`Obsidian Vault/`（白名单，只跟踪两处）
> 代码与技术文档：`Obsidian Vault/project/`
> 成稿笔记：`Obsidian Vault/Knowledge Site/`（进入 Git，公开）
> 字幕稿与摘录：其他目录（永不进入 Git）

## Context

你希望把 Obsidian 里积累的学习内容做成一个类似 `book.oiloil.org` 的个人知识网站。现状是：vault 里主要是 YouTube 课程字幕（CMU AI Agents、MIT 18.06、Vibe Coding 等，共 63 篇 Markdown），而网站真正要展示的是**学习笔记**，目前尚未系统撰写。

因此第一版不是"把现有字幕搬上网"，而是**搭好长期可用的内容载体**：用 mock 数据把「书库 → 课程 → 章节」的阅读体验做到位，后续你只需按约定写笔记，站点即可持续扩充。首版本地运行，架构为纯静态、零后端，后续可部署到 Cloudflare Pages。

参考站已核实：Next.js + Vercel，长文阅读页含面包屑、篇内目录、字号调节；本项目采用同类思路，但不做付费墙、账号与搜索。

**仓库边界**：Git 仓库根目录为 vault 根，`.gitignore` 采用白名单，只跟踪 `project/`（代码与技术文档）与 `Knowledge Site/`（成稿笔记）。字幕稿、摘录、私人笔记所在的目录一律被忽略。

---

## 0. 访谈结论（已确认）

| 主题 | 决定 |
|---|---|
| 定位 | 个人学习笔记站，非商业化、无账号 |
| 首版内容 | Hard-coded mock data（3 本书的示例章节） |
| 发布边界 | vault 内独立发布目录，目录外内容一律不打包 |
| 结构 | **一课一书**，书内按章顺序阅读 |
| 查找方式 | 按目录顺序阅读优先 |
| 搜索 | 首版不做，架构预留 |
| 访问 | 先本地静态服务，后公网 |
| 技术 | **Next.js 静态导出**（`output: 'export'`） |
| 视觉 | 编辑长文风（暖白、衬线标题、窄栏、右侧篇内目录） |
| 阅读功能 | 篇内目录 + 字号调节、上一篇/下一篇 + 进度记忆、代码高亮 + KaTeX 公式 + 图片放大 |
| 来源关联 | 链接到原始来源；来源类型可扩展（视频 / 博客 / 播客 / 文章） |
| 双语 | 同一章节的中英两个版本；阅读页单栏切换并记住选择；网址只有一个；文件用 `.zh` / `.en` 后缀配对 |
| 部署目标 | Cloudflare Pages（后续） |
| 版本管理 | Git 根为 vault；白名单只跟踪 `project/` 与 `Knowledge Site/`；公开仓库 `knowledge-site`；字幕稿不同步 |

---

## 1. PROJECT OVERVIEW — 项目概述

- **使用者**：你自己（长期），未来可能分享给他人。
- **核心价值**：把散落在 Obsidian 的课程学习成果，变成可顺序阅读、可回溯来源、可持续增补的个人"书库"。
- **内容类型**：课程笔记（Markdown 正文 + 元数据 + 来源链接），支持代码块、公式、图片。
- **成功标准**：新增一门课只需新建文件夹与 Markdown；新增一章只需新建一个文件；不需要改页面代码。

---

## 2. FEATURE SCOPE — 功能范围

### 第一版必须实现
1. 首页书库：书名、副标题、简介、章节数、最近更新，进入书本。
2. 书本页：书籍简介 + 按序章节列表（含章节摘要）。
3. 章节阅读页：面包屑、章节序号与标题、正文、来源块、上一篇/下一篇。
4. **双语章节**：中 / EN 单栏切换，标题、正文、篇内目录同步切换，选择持久化；单语章节不显示切换。
5. 右侧篇内目录（桌面端吸顶，移动端折叠）。
6. 字号三档调节，选择持久化。
7. 阅读进度记忆：再次打开同一章回到上次位置；首页显示"继续阅读"。
8. Markdown 渲染：标题、列表、表格、引用、代码高亮、KaTeX 公式、图片点击放大。
9. 响应式：360px 手机 ~ 1440px 桌面。
10. 静态构建成功，`file://` 之外可用本地静态服务器访问。

### 可以延后
- 全文搜索（预留入口与索引层）。
- 深色模式（首版只做浅色，避免维护两套排版）。
- 标签筛选、收藏、相关推荐。
- RSS、站点地图、阅读量统计。
- PWA / 离线缓存。

### 当前明确不做
账号登录、云数据库、服务端 API、评论、付费、多人协作、AI 问答、运行时 Node 服务。

---

## 3. CONTENT ARCHITECTURE — 内容架构

### 数据模型（`project/content/types.ts`）

```ts
export type SourceKind = 'video' | 'blog' | 'podcast' | 'article';
export type Lang = 'zh' | 'en';

export interface Source {
  kind: SourceKind;
  title: string;
  url: string;
  author?: string;
  publishedAt?: string; // ISO date
}

export interface ChapterVersion {
  title: string;         // 两版标题可不同
  summary?: string;
  body: string;          // Markdown
}

export interface Chapter {
  slug: string;          // ASCII，中英两版共用，稳定 URL
  number: number;        // 章节序号，用于"第 N 章"
  versions: Partial<Record<Lang, ChapterVersion>>; // 至少存在一个
  updatedAt: string;     // ISO date
  sources: Source[];
}

export interface Book {
  slug: string;          // ASCII，例：cmu-ai-agents
  title: string;
  subtitle?: string;
  description: string;
  updatedAt: string;
  chapters: Chapter[];   // 顺序即阅读顺序
}
```

### URL 规范（稳定、ASCII）
- 书库：`/`
- 书：`/books/{bookSlug}/`
- 章：`/books/{bookSlug}/{chapterSlug}/`
- 关于：`/about/`

不使用中文标题自动生成 slug，避免编码与改名导致链接失效；slug 显式维护。

语言**不进入 URL**：中英切换发生在同一页面，由 `localStorage` 记忆偏好；分享链接后对方按自己的偏好显示。

### 首版 mock 书目（3 本）
1. **CMU AI Agents 学习笔记**（`cmu-ai-agents`）— 3 章，来源为已有字幕对应的真实视频链接。
2. **MIT 18.06 线性代数学习笔记**（`mit-linear-algebra`）— 3 章，来源为 MIT OCW / YouTube，含公式示例。
3. **Vibe Coding 学习笔记**（`vibe-coding`）— 2 章，来源为 `Vibe coding tutorials/` 中已有笔记对应的视频。

每章正文 400–800 字，覆盖标题层级、列表、代码块、公式、图片，用于验证全部排版能力。其中 CMU 第 1 章与 Vibe Coding 第 1 章制作为中英双版（标题可不同），其余为单语，用于同时验证切换与缺失回落。

---

## 4. SEARCH & NAVIGATION — 查询与导航

- 主导航：书库 / 关于；移动端为同一行折叠。
- 阅读链路：书库 → 书 → 章，面包屑始终可见。
- 篇章底部：上一篇 / 下一篇；首章/末章只显示单侧。
- 篇内目录：读取 `h2` / `h3`，点击平滑滚动，滚动时高亮当前节。
- 搜索：首版不放搜索框（避免无效入口）；预留 `lib/search.ts` 接口与页头布局空位。后续接入 Pagefind（构建后索引，中文需验证）或 MiniSearch。

---

## 5. UI & UX STRUCTURE — 界面结构

### 页面清单
| 路由 | 内容 |
|---|---|
| `/` | 站点标题 + 一句话介绍 + 书库卡片 + 继续阅读 |
| `/books/[book]/` | 书名、简介、元信息、章节目录 |
| `/books/[book]/[chapter]/` | 长文阅读页 |
| `/about/` | 站点说明、内容约定、技术说明 |
| `not-found` | 友好 404，返回书库 |

**双语行为**：章节页在构建期同时输出中英两份正文与各自的篇内目录，用 `<html data-lang>` + CSS 控制显示；切换按钮只更新 `data-lang` 与 `localStorage`，标题、正文、目录同步变化，不重新加载页面。首屏由内联脚本在绘制前设置 `data-lang`，避免闪烁。缺失某语言时隐藏切换按钮；书库与书本页的章节标题按"中文优先、缺失回落英文"在构建期决定，双语章节旁标注 `中/EN`。

### 视觉方向（编辑长文风）
- 底色暖白 `#FBF9F4`，正文墨色 `#1F1E1B`，次要文字 `#6E6A63`，强调色陶土红 `#9A3412`。
- 标题使用衬线栈：`ui-serif, "Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", serif`。
- 正文使用系统无衬线栈（中文可读性优先）：`system-ui, "PingFang SC", "Microsoft YaHei", sans-serif`。
- 正文栏宽 `max-width: 42em`（约 640–700px），字号 17px，行高 1.9。
- 章节标题上方为小号 eyebrow（`第 03 章`），下方细分隔线。
- 右侧目录 200px，`position: sticky`，1200px 以下隐藏并改为文首折叠目录。
- 只做浅色主题；配色全部走 CSS 变量，方便未来加深色。

### 响应式
- ≥1200px：正文居中 + 右侧目录。
- 768–1199px：无右侧目录，文首可展开目录。
- <768px：导航压缩、字号控件收纳、图片按宽度自适应。

### 可访问性
语义化层级（每页一个 h1）、跳过导航链接、可见 focus 样式、图片 alt、`prefers-reduced-motion` 下关闭平滑滚动。

---

## 6. DATA & CONTENT MANAGEMENT — 内容维护方案

### 首版
- mock 数据放在 `project/content/books/*.ts`，类型强约束。
- 所有页面只通过 `content/index.ts` 暴露的 `getAllBooks()` / `getBook(slug)` / `getChapter(bookSlug, chapterSlug)` / `getAdjacentChapters()` 取数据。
- 这一层是未来切换 Markdown 的唯一接缝，页面组件不感知数据来源。

### 未来（写入 vault，独立发布目录）
```
Obsidian Vault/
├─ project/                       # Git 仓库：代码与技术文档
│  ├─ app/
│  ├─ components/
│  ├─ content/                    # 首版 mock；未来改为加载器
│  ├─ lib/
│  ├─ public/
│  ├─ scripts/
│  └─ package.json
└─ Knowledge Site/                      # 成稿笔记（进入 Git）
   ├─ CMU AI Agents/              # 一课一文件夹
   │  ├─ 01 - What are Agents.zh.md
   │  ├─ 01 - What are Agents.en.md
   │  └─ 02 - Tool Use.zh.md
   └─ MIT 线性代数/
```
- 文件名沿用 `NN - 标题` 排序，语言用 `.zh` / `.en` 后缀；同目录、同 `NN` 前缀且同 `slug` 的两个文件合并为一章。
- 每个文件 frontmatter 必填 `slug`、`title`、`summary`、`updatedAt`、`sources`；语言由后缀推断，无需 `lang` 字段。
- 只有单一语言时正常显示，不出现切换按钮。
- 加载器扫描 `Knowledge Site/` 下除 `.` 开头目录外的所有文件夹，一书一文件夹；路径由 `content/index.ts` 中的配置指向 `../Knowledge Site`。
- 新增/修改/删除笔记 = 增删改 Markdown，无需改代码；中英两版可独立增删。
- 构建前做最小校验：同章两版 slug/number 一致、slug 唯一、必填字段齐全、章节序号连续、来源 URL 合法；缺失时构建失败并指出文件。

> 注：首版不实现 MD 加载器，仅写好接口与目录约定，避免 mock 阶段引入无用复杂度。

### 现有笔记接入时必须处理的数据问题（vault 实测）
这些不影响首版 mock，但未来写加载器时要一次性解决，否则站点会出脏数据：

1. **57 篇 CMU / MIT 字幕笔记的正文重复了两遍**（每篇有两个 `## Transcript`，两段相似度约 1.0）。加载器需按第二个标题切分并去重，或只保留第一段。
2. **视频嵌入被写成图片**：笔记里是 `![](https://www.youtube.com/watch?v=...)`，通用 Markdown 会渲染成坏图。加载时需识别并转为"观看视频"链接或播放器区块。
3. **7 个重复文件**：MIT 内 4 对近似重名（`A = LU` vs `A = LU 1`、`R^n` vs `Rn` 等），另有 3 篇 MIT 笔记误放在 `CMU AI agent/`。迁移到发布目录前先清理。
4. **元数据不一致**：3 篇缺 `description`；标题有的带课程前缀、有的带句号；作者是悬空 wikilink（如 `[[MIT OpenCourseWare]]`），需降级为纯文本。
5. **没有本地图片/附件**：无需资源拷贝与图片优化链路；但正文可能引用远程图片，需允许外链或转为本地资产。
6. **语言混排**：现有 90% 笔记为英文，Vibe coding 两篇为中文，站点排版需同时适配中英文（行高、断行、标点）。

其中 `Vibe coding tutorials/` 下的两篇中文学习笔记结构最好（66 个标题、表格、callout、Mermaid、代码块），可作为未来"笔记形态"的参考模板。

### 版本管理与发布边界
- Git 仓库根目录：vault 根；`.gitignore` 白名单只放行 `project/` 与 `Knowledge Site/`。
- `Knowledge Site/` 中的成稿笔记会进入公开仓库并公开可见。
- 字幕稿、摘录与私人笔记（`CMU AI agent/`、`MIT Linear Algebra(...)/`、`Clippings/`、`Vibe coding tutorials/` 等）永不提交；根 `.gitignore` 的 `/*` 规则会忽略它们。
- 部署可直接使用公开仓库的 Cloudflare Pages 构建；只有白名单内的成稿笔记会进入构建环境。

---

## 7. TECHNICAL ARCHITECTURE — 技术架构

### 技术栈（版本已核实，2026-10-31）
| 包 | 版本 |
|---|---|
| next | 16.4.3 |
| react / react-dom | 19.3.1 |
| typescript | ^5.9.3（不用 7.x，避免与 Next 类型检查的兼容风险） |
| react-markdown | 10.1.0 |
| remark-gfm / remark-math | 4.0.1 / 6.0.0 |
| rehype-katex / rehype-highlight / rehype-slug | 7.0.1 / 7.0.2 / 6.0.0 |
| katex | 0.19.1 |
| github-slugger | 2.0.0 |
| serve（本地预览，dev） | 14.2.6 |

**不使用 Tailwind**：单主题、排版为主的站点，用全局 CSS 变量 + 语义类名更精确、依赖更少；若后续组件数量明显增长再评估 CSS Modules。

### 静态导出配置（已核对官方文档）
```ts
// next.config.ts
const nextConfig = {
  output: 'export',
  trailingSlash: true,        // 深层链接刷新到 /books/x/y/index.html
  images: { unoptimized: true },
};
export default nextConfig;
```
- 所有动态路由提供 `generateStaticParams()`，并设 `export const dynamicParams = false`。
- 不使用 Server Actions、依赖 Request 的 Route Handlers、cookies、rewrites、默认图片优化。
- 构建期允许读取本地数据文件。

### 渲染策略
- 页面为 Server Components，Markdown 在**构建期**转为 HTML，阅读页不加载 Markdown 解析器。
- 仅以下交互为客户端小岛（`"use client"`）：语言切换、字号控件、阅读进度、目录高亮、图片放大。
- 双语章节在构建期同时输出两份正文与各自目录，客户端只切换 `data-lang`；不额外请求内容。
- KaTeX 与代码高亮均为构建期输出，仅引入对应 CSS。
- 预置一段内联脚本在首屏前读取 `localStorage` 的语言与字号设置，避免闪烁。

### 本地状态（localStorage）
| key | 内容 |
|---|---|
| `shufang:lang` | `zh` / `en` |
| `shufang:font-size` | `sm` / `md` / `lg` |
| `shufang:progress` | `{ [chapterPath]: percent }` |
| `shufang:last-read` | `{ book, chapter, updatedAt }` |

浏览器数据不跨设备同步，清理浏览器数据会丢失；首版不提供导入导出。

### 目录结构
```
Obsidian Vault/
├─ project/                       # 代码项目
│  ├─ app/
│  │  ├─ layout.tsx
│  │  ├─ page.tsx                 # 书库
│  │  ├─ globals.css
│  │  ├─ about/page.tsx
│  │  ├─ books/[book]/page.tsx
│  │  ├─ books/[book]/[chapter]/page.tsx
│  │  └─ not-found.tsx
│  ├─ components/
│  │  ├─ site-header.tsx
│  │  ├─ book-card.tsx
│  │  ├─ chapter-list.tsx
│  │  ├─ reading-layout.tsx
│  │  ├─ table-of-contents.tsx
│  │  ├─ language-toggle.tsx
│  │  ├─ reading-toolbar.tsx
│  │  ├─ reading-progress.tsx
│  │  ├─ continue-reading.tsx
│  │  ├─ chapter-pager.tsx
│  │  ├─ source-list.tsx
│  │  ├─ markdown.tsx
│  │  └─ zoom-image.tsx
│  ├─ content/
│  │  ├─ types.ts
│  │  ├─ index.ts                 # 唯一数据接缝
│  │  └─ books/{cmu-ai-agents,mit-linear-algebra,vibe-coding}.ts
│  ├─ lib/
│  │  ├─ site.ts                  # 站点名/描述/导航
│  │  ├─ toc.ts                   # 从 Markdown 提取标题与 id
│  │  ├─ language.ts              # 语言偏好、缺失回落
│  │  ├─ reading-preferences.ts
│  │  └─ progress.ts
│  ├─ public/images/              # mock 用示意图
│  ├─ scripts/verify-export.mjs
│  ├─ next.config.ts
│  ├─ tsconfig.json
│  ├─ package.json
│  ├─ plan.md
│  └─ README.md
└─ Knowledge Site/                      # 成稿笔记（进入 Git，公开）
   └─ (未来) CMU AI Agents/ ...
```

---

## 8. DEPLOYMENT & ACCESS — 运行与访问

### 本地
```bash
cd "D:/Users/LENOVO/Documents/about Obsidian/Obsidian Vault/project"
npm install
npm run dev            # 开发预览 http://localhost:3000
npm run build          # 输出 out/
npx serve out          # 以静态服务器验证真实产物
```
静态导出**不能可靠地双击 `index.html` 以 `file://` 打开**，一律用静态服务器访问。

### Cloudflare Pages（后续）
成稿笔记已进入公开仓库，可直接使用 Git 集成构建：
- 仓库：`Lovis-Log/knowledge-site`，根目录为仓库根（vault 根）。
- Build command：`cd project && npm ci && npm run build`
- Output directory：`project/out`
- 无需 `basePath`；`trailingSlash: true` 保证深层链接刷新正常。

也可以本机构建后直传：
```bash
cd project
npm run build
npx wrangler pages deploy out --project-name knowledge-site
```
- 两种方式都只会上传白名单内的代码与 `Knowledge Site/` 成稿笔记；字幕稿不会进入构建。
- 实际公开发布前会再次向你确认。

---

## 9. ASSUMPTIONS — 暂定假设

1. 站点名暂定「我的书房」，集中在 `lib/site.ts`，一处可改。
2. Git 仓库根为 vault 根，白名单只跟踪 `project/` 与 `Knowledge Site/`；两者同级。
3. 首版只做浅色主题。
4. 首版不做搜索框，只预留实现位。
5. mock 书为 CMU AI Agents、MIT 18.06、Vibe Coding 三本。
6. 站点 UI 为中文；笔记正文可能中英混排（现有内容 90% 为英文，中文笔记 2 篇），排版同时适配两种语言。
7. 部署平台为 Cloudflare Pages，公网发布不在一期执行。
8. 来源类型用可扩展联合类型，新增类型只改 `SourceKind` 与展示映射。
9. 双语只作用于章节正文与标题；书库/书本页的书籍元信息保持中文，章节标题按中文优先、缺失回落英文。
10. 中英两版不要求逐段对齐（单栏切换，不做并排对照）。
11. GitHub 公开仓库 `knowledge-site` 包含代码、技术文档与 `Knowledge Site/` 成稿笔记；不包含字幕稿、摘录或私人笔记。

---

## 10. OPEN RISKS — 开放风险

1. **内容产出是真正瓶颈**：站点能建好，但价值取决于笔记是否持续写；首版用 mock 只能验证形式。
2. **同步工具体积**：vault 使用 Nutstore/remotely-save；`project/node_modules`、`.next`、`out` 需在同步工具中排除，否则云同步会变慢。
3. **中文字体差异**：依赖系统字体，Windows / macOS / 手机显示略有不同；不引入网络字体以保速度与离线可用。
4. **URL 稳定性**：中文标题改 slug 会导致旧链接失效，约定 slug 一经发布不修改。
5. **图片与公式体积**：大量图片会拖慢首屏；后续可加图片尺寸规范与懒加载。
6. **深层链接刷新**：已用 `trailingSlash: true` 规避，仍需在真实静态服务器上验收。
7. **误发布风险**：发布边界靠白名单保证；Git 根 `.gitignore` 只放行 `project/` 与 `Knowledge Site/`，加载器也只扫描 `Knowledge Site/`，双重隔离。
8. **依赖兼容**：Next 16 + Turbopack 与 rehype 插件均在构建期运行，风险低；首次构建后需确认无警告。
9. **旧笔记的重复与假图片**：若未来直接把现有字幕复制进发布目录，会把重复正文和坏图片带上线；必须在接入前跑一遍清理/去重脚本（见 §6）。
10. **双语版本结构漂移**：两版标题层级不一致时会出现两套目录，滚动高亮需按当前语言计算；写作时尽量对齐结构。
11. **双语页面体积**：两版正文同时进入 HTML，长章节体积约翻倍；个人站可接受，若笔记变大再考虑按语言懒加载。
12. **白名单失效风险**：若 `.gitignore` 被误改或使用 `git add -f` 强制添加，字幕稿可能进入公开历史；每次提交前用 `git status` 复核暂存范围。

---

## 11. DEFINITION OF DONE — 第一版完成标准

- [x] `npm run build` 成功，`out/` 生成首页、3 本书、8 个章节、`about`、`404.html`。
- [x] 双语章节可在中 / EN 间切换，标题、正文、篇内目录同步更新，刷新后保持选择；单语章节不显示切换。
- [x] 首页 → 书 → 章 → 上一篇/下一篇 全链路可用。
- [x] 篇内目录锚点准确，滚动高亮正常。
- [x] 字号三档切换生效且刷新后保持；阅读进度刷新后恢复。
- [x] 代码块高亮、KaTeX 公式、图片放大均正常。
- [x] 360px / 768px / 1440px 三档布局无溢出、无遮挡。
- [x] `npx serve out` 下直接刷新任意深层 URL 均返回对应页面。
- [x] 构建产物无 `/_next/image` 默认优化请求，无运行时 Node 依赖。
- [x] 404 页面友好，可返回书库。
- [x] `README.md` 写明笔记目录、文件名、frontmatter 与发布约定。
- [ ] GitHub 仓库包含 `Knowledge Site/` 成稿笔记，但不包含任何字幕稿或摘录文件。（白名单已就绪；推送到远端后确认）

---

## 12. 实施计划（Phase 1–5）

### Phase 1 — 基础架构与内容模型
- 在 `project/` 初始化 Next.js 16 + TS 项目，配置静态导出、`trailingSlash`、图片不优化。
- 建立 `content/types.ts`、`content/index.ts`、`lib/site.ts`，写入三本书的 mock 章节骨架。
- 建立全局 CSS 变量、字体栈、基础版式与页头/页脚。
- 路由与 `generateStaticParams` 全部打通。
- **验收**：`npm run build` 通过，`out/` 出现所有路由文件。

### Phase 2 — 核心阅读链路
- 首页书库卡片与"继续阅读"占位。
- 书本页章节列表。
- 章节页：面包屑、标题区、Markdown 正文、来源块、上下篇。
- 双语章节：两版正文、两套篇内目录、切换按钮、语言偏好持久化与缺失回落。
- Markdown 管线：GFM、代码高亮、KaTeX、图片、标题锚点。
- **验收**：三本书全部可读，公式/代码/表格/图片正确渲染。

### Phase 3 — UI/UX 精修
- 编辑长文风排版细化（栏宽、行高、标题层级、分隔线、留白）。
- 右侧目录 + 移动端折叠目录 + 滚动高亮。
- 字号三档 + localStorage + 首屏防闪烁。
- 阅读进度条、进度记忆、首页继续阅读。
- 图片放大灯箱、键盘可达、焦点样式。
- **验收**：三档视口截图检查；交互状态完整。

### Phase 4 — 内容维护与质量验证
- 编写 `README.md`：目录、命名、frontmatter、发布边界。
- 编写 `scripts/verify-export.mjs`：检查产物文件齐全、标题存在、无默认图片优化请求。
- 检查空状态、无来源、长标题、超长代码块等边界。
- 补 `npm run verify` 脚本。
- **验收**：`npm run build && npm run verify` 连续通过。

### Phase 5 — 部署准备与最终验收
- 增加 Cloudflare Pages 直传说明与 `.gitignore`。
- 在本地静态服务器完整走查 DoD 清单。
- 公网发布需你单独确认后执行。
- **验收**：本地静态产物完整可用；部署文档可直接照做。

---

## 13. 验证方式（命令 + 人工清单）

```bash
cd "D:/Users/LENOVO/Documents/about Obsidian/Obsidian Vault/project"
npm install
npm run build
npm run verify
npx serve out
```

人工走查：
1. 首页三本书显示正常，点击进入 CMU 书。
2. 打开第 1 章，检查面包屑、目录、公式、代码块。
3. 调大字号 → 刷新 → 字号保持。
4. 滚动到中部 → 返回书库 → 再进同一章 → 位置恢复。
5. 用上一篇/下一篇走完一本书。
6. 手机宽度（DevTools 360px）检查导航、目录、图片。
7. 直接访问 `/books/cmu-ai-agents/01-what-is-an-agent/` 并刷新，页面正常返回。
8. 访问不存在的章节，出现 404 且能返回书库。
9. 打开双语章节 → 切到 EN → 标题与右侧目录同步变化 → 刷新后仍为 EN → 切回中文正常。
10. `git status` 中只出现 `project/` 与 `Knowledge Site/`，不出现 CMU / MIT / Clippings / Vibe coding 等字幕稿目录。

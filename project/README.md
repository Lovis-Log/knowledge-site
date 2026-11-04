# knowledge-site

LovisMind — 从 Obsidian vault 发布的知识网站。Next.js 导出界面框架，Cloudflare Pages Worker 和 D1 提供账号审核与登录阅读。

当前分支已实现注册、管理员审核、邀请码、服务端会话和审核后阅读；邮件暂不接入，公开首页预留给后续 Landing Page。书库入口为 `/library/`。本地验证与部署步骤见 [backend/README.md](backend/README.md)，尚未切换生产。

## 仓库与内容边界

本仓库根目录是整个 Obsidian vault，但 `.gitignore` 使用白名单，只跟踪两类内容：

| 目录 | 内容 | 是否进入 Git |
|---|---|---|
| `project/` | Next.js 代码与技术文档 | 是 |
| `Knowledge Site/` | 整理成稿的学习笔记（站点内容源） | 是（公开可见） |
| `CMU AI agent/`、`MIT Linear Algebra(...)/` | YouTube 字幕稿 | **否** |
| `Clippings/`、`Vibe coding tutorials/` | 网页摘录、原始字幕 | **否** |
| vault 其他目录 | 私人笔记、配置 | **否** |

**本仓库是公开的**：提交到 `Knowledge Site/` 的笔记会对所有人可见。字幕稿与摘录永远不提交；不要用 `git add -A` 或 `git add .`，只按目录添加。

## 技术栈

- Next.js 16（App Router，`output: 'export'` 静态导出，`trailingSlash: true`）
- React 19 / TypeScript 5.9
- react-markdown + remark-gfm + remark-math + rehype-katex + rehype-highlight + rehype-slug
- 全局 CSS 变量，无 Tailwind；Pages Worker + D1 提供运行时后端

## 本地开发

```bash
cd project
npm ci
npm run types:backend
npm run db:migrate
npm run content:import
npm run admin:init
npm run build
npm run verify
npm run verify:ui
npm run test:auth
npm run dev:full  # http://localhost:8788
```

完整阅读功能需要 Workers/D1，不能用纯静态服务器发布 `out/`。`npm run dev` 仅用于界面调试，不包含认证 API。

## 系统语言与正文语言

右上角“关于”和打赏之间的 `EN / 中` 按钮切换系统界面。首次访问跟随浏览器首选语言（中文或英文），主动选择后保存在 `shufang:ui-lang`。章节内的正文语言单独保存在 `shufang:lang`，两个开关互不影响，页面 URL 不变。

系统通用文案位于 `lib/ui-language.ts`；分类展示译名和书籍英文简介位于 `lib/content-translations.ts`，经鉴权后下发，页面通过 `components/ui-text.tsx` 输出双语界面。新增书籍或分类时，按已有 slug 补充英文展示文案；缺失译文时保留原文，`verify:ui` 会提示遗漏。正式书名、章节标题、摘要、正文和内容目录不随系统语言改变。关于页的英文正文随该页面维护，双语界面不增加独立英文 SEO 路由。

## 目录结构

```
project/
├─ app/                     # 路由：/、/books/[book]/、/books/[book]/[chapter]/、/about/
├─ components/              # 页头、书卡、章节页组件与客户端小岛
├─ content/
│  ├─ types.ts              # Book / Chapter / Source 类型
│  └─ index.ts              # 唯一数据接缝（按分类分组、章节查询）
├─ lib/
│  ├─ notes.ts              # Knowledge Site/ Markdown 加载器
│  └─ content-labels.ts     # content_type 的中文标签
├─ public/images/           # 示意图（SVG）
└─ scripts/verify-export.mjs
```

构建和内容导出通过 `content/index.ts` 读取文件；浏览器通过 `content/client.tsx` 读取已鉴权 API。Markdown 解析集中在 `lib/notes.ts`。默认读取仓库根目录的 `Knowledge Site/`，可用环境变量 `KNOWLEDGE_SITE_DIR` 覆盖。

## 内容维护约定

成稿笔记放在仓库根目录的 `Knowledge Site/`，约定详见 [Knowledge Site/README.md](../Knowledge%20Site/README.md)：

- 按“大类 / 子分类 / 书名”组织目录；每本书有 `_book.md` 声明稳定 URL 的 slug、显示书名、`category` 与简介，加载器递归发现书籍。
- 章节文件用 `NN - 标题` 命名，序号两位补零。
- 中英双版用 `.zh` / `.en` 后缀配对，同一章的 `slug` 与章节序号必须一致。
- 每个文件 frontmatter 必填 `slug`、`title`、`summary`、`updatedAt`、`sources`；语言由后缀推断。
- 主题分类来自 `Knowledge Site/taxonomy.json`；首页按大类预览，大类页按子分类展示。
- 只有单一语言时正常显示，不出现切换按钮。

发布流程（在 vault 根目录）：

```bash
git add "Knowledge Site"
git commit -m "notes: add <书名> chapter <N>"
git push
```

## 部署

当前云端仍为原 Pages 站点。本分支尚未发布。上线前需确认运行计划、预览与生产 D1、构建根目录及 Pages fail-open 设置，详见 [后端部署说明](backend/README.md#云端部署步骤尚未执行)。不得直接将新版本作为无鉴权静态文件部署。

## 文档

- [backend/README.md](backend/README.md) — 当前账号系统、接口、验证与部署
- [plan.md](./plan.md) — 历史静态站实施计划
- [Knowledge Site/README.md](../Knowledge%20Site/README.md) — 笔记目录、命名与 frontmatter 约定

# knowledge-site

「我的书房」— 一个从 Obsidian vault 发布的个人静态知识网站。纯前端、静态导出、零后端。

当前状态：**第一版已实现**。首页书库、书本页、章节阅读页、双语切换、篇内目录、字号与阅读进度记忆均已可用；mock 数据为 3 本书 / 8 章。实施计划见 [plan.md](./plan.md)。

## 仓库与内容边界

本仓库根目录是整个 Obsidian vault，但 `.gitignore` 使用白名单，只跟踪两类内容：

| 目录 | 内容 | 是否进入 Git |
|---|---|---|
| `project/` | Next.js 代码、mock 数据、技术文档 | 是 |
| `Knowledge Site/` | 整理成稿的学习笔记 | 是（公开可见） |
| `CMU AI agent/`、`MIT Linear Algebra(...)/` | YouTube 字幕稿 | **否** |
| `Clippings/`、`Vibe coding tutorials/` | 网页摘录、原始字幕 | **否** |
| vault 其他目录 | 私人笔记、配置 | **否** |

**本仓库是公开的**：提交到 `Knowledge Site/` 的笔记会对所有人可见。字幕稿与摘录永远不提交；不要用 `git add -A` 或 `git add .`，只按目录添加。

## 技术栈

- Next.js 16（App Router，`output: 'export'` 静态导出，`trailingSlash: true`）
- React 19 / TypeScript 5.9
- react-markdown + remark-gfm + remark-math + rehype-katex + rehype-highlight + rehype-slug
- 全局 CSS 变量，无 Tailwind、无运行时后端

## 本地开发

```bash
cd project
npm install
npm run dev        # http://localhost:3000
npm run build      # 静态产物输出到 project/out
npm run verify     # 检查产物文件、标题、KaTeX/代码高亮与图片优化请求
npx serve out      # 以静态服务器验证真实产物
```

静态导出不能可靠地通过 `file://` 双击打开，请使用本地静态服务器。

## 目录结构

```
project/
├─ app/                     # 路由：/、/books/[book]/、/books/[book]/[chapter]/、/about/
├─ components/              # 页头、书卡、章节页组件与客户端小岛
├─ content/
│  ├─ types.ts              # Book / Chapter / Source 类型
│  ├─ index.ts              # 唯一数据接缝（未来替换为 Markdown 加载器）
│  └─ books/*.ts            # 首版 mock 数据
├─ lib/                     # 站点配置、目录提取、语言、字号、进度
├─ public/images/           # mock 示意图（SVG）
└─ scripts/verify-export.mjs
```

页面不直接读文件，只通过 `content/index.ts` 取数据。未来接入 `Knowledge Site/` 时只改这一层。

## 内容维护约定

成稿笔记放在仓库根目录的 `Knowledge Site/`，约定详见 [Knowledge Site/README.md](../Knowledge%20Site/README.md)：

- 一课一文件夹，文件夹名即书名；章节文件用 `NN - 标题` 命名，序号两位补零。
- 中英双版用 `.zh` / `.en` 后缀配对，同一章的 `slug` 与 `number` 必须一致。
- 每个文件 frontmatter 必填 `slug`、`title`、`summary`、`updatedAt`、`sources`；语言由后缀推断。
- 只有单一语言时正常显示，不出现切换按钮。

发布流程（在 vault 根目录）：

```bash
git add "Knowledge Site"
git commit -m "notes: add <书名> chapter <N>"
git push
```

## 部署

成稿笔记已在公开仓库中，可使用 Cloudflare Pages 的 Git 集成：

- 仓库根目录：`/`
- Build command：`cd project && npm ci && npm run build`
- Output directory：`project/out`

或本机构建后直传：

```bash
cd project
npm run build
npx wrangler pages deploy out --project-name knowledge-site
```

公网发布前会单独确认。

## 文档

- [plan.md](./plan.md) — 需求摘要、信息架构、技术方案、分阶段实施计划与验收标准
- [Knowledge Site/README.md](../Knowledge%20Site/README.md) — 笔记目录、命名与 frontmatter 约定

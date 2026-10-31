# knowledge-site

「我的书房」— 一个从 Obsidian vault 发布的个人静态知识网站。纯前端、静态导出、零后端。

当前状态：**规划完成，代码尚未开始实现**。实施计划见 [plan.md](./plan.md)。

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

- Next.js 16（App Router，`output: 'export'` 静态导出）
- React 19 / TypeScript 5.9
- react-markdown + remark-gfm + remark-math + rehype-katex + rehype-highlight
- 全局 CSS 变量，无 Tailwind、无运行时后端

## 本地开发（Phase 1 后可用）

```bash
cd project
npm install
npm run dev        # http://localhost:3000
npm run build      # 静态产物输出到 project/out
npx serve out      # 以静态服务器验证产物
```

静态导出不能可靠地通过 `file://` 双击打开，请使用本地静态服务器。

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

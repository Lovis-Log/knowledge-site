# knowledge-site

「我的书房」— 一个从 Obsidian vault 发布的个人静态知识网站。纯前端、静态导出、零后端。

当前状态：**规划完成，代码尚未开始实现**。实施计划见 [plan.md](./plan.md)。

## 仓库与内容边界

| 目录 | 内容 | 是否进入 Git |
|---|---|---|
| `project/`（本仓库） | Next.js 代码、mock 数据、技术文档 | 是 |
| `../知识网站/` | 学习笔记 Markdown（未来） | **否，永不提交** |
| vault 其他目录 | 课程字幕、摘录、私人笔记 | **否** |

本项目是公开仓库。任何笔记正文、字幕、私人资料都不得提交到这里。`.gitignore` 额外排除 `content/published/`，防止将来拷贝笔记时误上传。

## 技术栈

- Next.js 16（App Router，`output: 'export'` 静态导出）
- React 19 / TypeScript 5.9
- react-markdown + remark-gfm + remark-math + rehype-katex + rehype-highlight
- 全局 CSS 变量，无 Tailwind、无运行时后端

## 本地开发（Phase 1 后可用）

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 静态产物输出到 out/
npx serve out      # 以静态服务器验证产物
```

静态导出不能可靠地通过 `file://` 双击打开，请使用本地静态服务器。

## 部署

笔记不进入公开仓库，因此不使用 GitHub 自动构建。计划采用本机构建后直传 Cloudflare Pages：

```bash
npm run build
npx wrangler pages deploy out --project-name knowledge-site
```

公网发布前会单独确认。

## 文档

- [plan.md](./plan.md) — 需求摘要、信息架构、技术方案、分阶段实施计划与验收标准

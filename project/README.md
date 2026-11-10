# knowledge-site

LovisMind — 从 Obsidian vault 发布的知识网站。Next.js 预生成页面，Cloudflare Pages Worker 和 D1 提供账号审核与登录阅读。

网站提供注册、管理员审核、邀请码、服务端会话和审核后阅读；邮件暂不接入。公开首页为 Landing Page，登录与注册弹窗接入真实账号系统；书库入口为 `/library/`。本地验证与部署步骤见 [backend/README.md](backend/README.md)。

## 阅读与交流功能

- 书库按现有分类展示书籍和章节，支持篇内目录、来源链接、字号调整，以及有对应版本时的阅读语言切换。
- 书籍和文章收藏与账号关联；继续阅读、阅读进度和阅读偏好保存在当前浏览器，不保证跨设备同步。
- 留言板采用可自动增高的紧凑输入框，显示字数并支持中英文提示。发布限额为每账号每分钟 20 条，达到限额时保留草稿并显示重试倒计时；本人可删除留言，管理员可隐藏或恢复。
- 新邀请码为 6 位不分组字母数字，大小写兼容；管理员列表长期显示邀请码并提供复制结果提示。旧长码仍可使用，只有哈希的历史记录无法回显。重置密码凭据仍仅展示一次。
- 导航提供进度条和慢请求入口，书页正常进入时回到顶部，历史返回和文章阅读恢复沿用各自的滚动位置。首页、关于和留言板提供入场效果，遵循系统减少动态效果偏好。
- 关于页说明功能、账号隐私与 AI 辅助内容的局限；邮箱为可选中的纯文本，外部致谢和源码链接在新标签页打开。

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
# 先按 backend/README.md 配置本地 .dev.vars 中的邀请码加密密钥
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

完整阅读功能需要 Workers/D1，`out/` 内含正文和导航数据，必须通过 Pages Worker 部署，并将 Pages 设置为 fail-closed。`npm run dev` 仅用于界面调试，不包含认证 API。

Windows 下若构建提示找不到分类或内容目录，可在 PowerShell 中显式指定内容源后再构建：

```powershell
$env:KNOWLEDGE_SITE_DIR = (Resolve-Path -LiteralPath '../Knowledge Site').Path
npm run build
```

统一验收命令为 `npm run release:check`，使用构建产物和独立测试数据库；具体检查与上线验收见 [发布指南](RELEASING.md)。

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
└─ scripts/                 # 内容导入、Worker 构建与受保护导出检查
```

构建和内容导出通过 `content/index.ts` 读取文件；页面通过 `content/client.tsx` 使用目录上下文。HTML 和 RSC 导航数据均经 Worker 鉴权后返回，运行时收藏、留言和账号操作使用鉴权 API。构建脚本记录分段导航请求与静态导出文件的精确映射，避免预取 404。Markdown 解析集中在 `lib/notes.ts`。默认读取仓库根目录的 `Knowledge Site/`，可用环境变量 `KNOWLEDGE_SITE_DIR` 覆盖。

## 内容维护约定

成稿笔记放在仓库根目录的 `Knowledge Site/`，约定详见 [Knowledge Site/README.md](../Knowledge%20Site/README.md)：

- 按“大类 / 子分类 / 书名”组织目录；每本书有 `_book.md` 声明稳定 URL 的 slug、显示书名、`category` 与简介，加载器递归发现书籍。
- 章节文件用 `NN - 标题` 命名，序号两位补零。
- 中英双版用 `.zh` / `.en` 后缀配对，同一章的 `slug` 与章节序号必须一致。
- 每个文件 frontmatter 必填 `slug`、`title`、`summary`、`updatedAt`、`sources`；语言由后缀推断。
- 主题分类来自 `Knowledge Site/taxonomy.json`；首页按大类预览，大类页按子分类展示。
- 只有单一语言时正常显示，不出现切换按钮。

发布统一遵循 [发布与恢复指南](RELEASING.md)。仅提交本任务文件后，在 `project/` 执行 `npm run release`；仅检查执行 `npm run release:check`。不要将本地密钥、数据库、测试账号或构建产物提交。

## 部署

生产沿用 main 推送触发 `lovismind` 的 Pages Git 构建。统一命令先检查并暂存内容，再等待对应提交和内容版本上线。预览使用独立 Pages 项目与 D1。命令、首次配置、失败恢复和回滚以 [发布指南](RELEASING.md) 为准。

## 文档

- [RELEASING.md](RELEASING.md) — 唯一现行发布、验证与恢复流程
- [backend/README.md](backend/README.md) — 账号系统、接口与数据库配置
- [plan.md](./plan.md) — 历史静态站实施计划
- [Knowledge Site/README.md](../Knowledge%20Site/README.md) — 笔记目录、命名与 frontmatter 约定

## 搜索、投稿与更新公告

元数据搜索在浏览器内执行；留言板的投稿仅本人及管理员可见。账号设置中改密码和永久注销默认关闭，需通过预览平台 CPU 测量才可启用。内容公告工具、隐私规则、迁移与免费额度验收见 [轻量功能说明](docs/lightweight-features.md)。

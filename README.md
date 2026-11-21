# LovisMind

> Where readings linger and thoughts intertwine. 文字留痕，思绪成网。

LovisMind 是 Lovis 的个人知识库。书库按课程与主题组织课堂笔记、作业解析、AI 实践和精选阅读。课程笔记会补充关键推导与证明，收录文章的原始来源链接放在文末，方便回看原文、视频或课件。

[访问 LovisMind](https://lovismind.pages.dev/) · [关于本站](https://lovismind.pages.dev/about/) · [更新日志](https://lovismind.pages.dev/about/#updates)

## 书库

| 大类 | 内容 |
|---|---|
| [校内课程](Knowledge%20Site/%E6%A0%A1%E5%86%85%E8%AF%BE%E7%A8%8B/) | 校内课程的课堂笔记、作业解析与复习整理 |
| [专业课程](Knowledge%20Site/%E4%B8%93%E4%B8%9A%E8%AF%BE%E7%A8%8B/) | 数学、计算机与人工智能课程笔记 |
| [AI Era](Knowledge%20Site/AI%20Era/) | 大模型原理、智能体工程、AI 编程与工具实践 |
| [精选收录](Knowledge%20Site/%E7%B2%BE%E9%80%89%E6%94%B6%E5%BD%95/) | 文章、外刊、视频与访谈的原文收录和学习笔记 |

## 阅读与交流

- 在书库按书名、章节或标签搜索。校内课程可分别浏览课程目录和作业目录，篇内目录可以跳到具体小节或题目。
- 收藏书籍和章节，阅读进度和高亮随账号同步。换设备登录后，可以从「继续阅读」回到最近打开的章节，在目录里查看各章进度。
- 阅读时可以切换浅色与深色主题、调整字号。界面语言与正文语言分开设置，有双语版本的章节可以切换正文。
- 选中文字、公式的一部分或代码片段后可以保存高亮。代码块可直接复制，长公式优先在自然断点换行，宽矩阵和表格可横向滚动。
- 留言板供站内读者交流和回复。推荐资料或反馈问题也可以走私密投稿，投稿由本人和管理员查看。

## 访问权限与来源

网站书库需要登录，通过邀请码或管理员审核获得阅读权限。注册不要求邮箱或手机号。GitHub 仓库及其中的 `Knowledge Site/` 成稿公开可见。

笔记基于学校课件、公开课程、文章、视频及个人实践整理，部分内容使用 AI 辅助。引用或使用其中的代码前，可以通过篇末的「来源」回到原始资料核对。

## 仓库结构

仓库根目录同时是一个 Obsidian vault。主要代码和发布内容放在以下两个目录。

```
project/           Next.js 站点（代码与构建脚本）
Knowledge Site/    成稿笔记（站点内容源，公开可见）
```

`.gitignore` 采用白名单。提交时只暂存本次涉及的文件。

## 本地开发

需要 Node.js 24。首次启动完整站点时，先按[后端说明](project/backend/README.md)配置本地 `.dev.vars`，再从仓库根目录执行以下命令。

```bash
cd project
npm ci
npm run types:backend
npm run db:migrate
npm run content:import
npm run admin:init
npm run build
npm run dev:full   # http://localhost:8788
```

`admin:init` 用于初始化本地管理员。`npm run dev` 可单独调试界面，完整的登录阅读通过 `dev:full` 和本地 D1 运行。统一构建与测试使用 `npm run release:check`，站点生产发布使用 `npm run release`。详细步骤和恢复流程见[发布指南](project/RELEASING.md)。

## 添加内容

1. 按已确认的分类，在 `Knowledge Site/大类/子分类/书名/` 下新建书籍目录，写 `_book.md` 声明 `slug`、`title`、`category` 与简介。
2. 章节文件命名为 `NN - 标题.zh.md` / `NN - 标题.en.md`，`NN` 与 frontmatter 的 `slug` 前缀一致。
3. 每章填写 `slug`、`title`、`summary`、`updatedAt`、`content_type` 与 `sources`。已知原资源的首发日期时，在对应来源中填 `publishedAt`。
4. 分类写进 `Knowledge Site/taxonomy.json`。有课程与作业分组的书籍，可用 `groups` 和 `group` 配置独立目录。

完整约定见 [Knowledge Site/README.md](Knowledge%20Site/README.md)。

## 技术栈

- Next.js 16 App Router、React 19、TypeScript 5.9 与 CSS 变量。
- Cloudflare Pages 承载静态导出，Worker 负责访问控制和 API，D1 保存内容版本、账号和阅读状态。
- Markdown 正文通过 React Markdown 渲染，KaTeX 排版公式，highlight.js 为代码着色。

## 文档

- [project/RELEASING.md](project/RELEASING.md) — 唯一现行发布与恢复流程
- [project/README.md](project/README.md) — 站点结构、开发与部署
- [Knowledge Site/README.md](Knowledge%20Site/README.md) — 笔记目录、命名与 frontmatter 约定

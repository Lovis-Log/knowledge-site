# LovisMind

> Where readings linger and thoughts intertwine. 文字留痕，思绪成网。

围绕课程、主题与阅读兴趣整理学习笔记和原文收录，以书籍和章节组织内容，保留原始来源。网站使用 Next.js 预生成页面，由 Cloudflare Pages Worker 和 D1 提供账号审核、登录阅读、收藏与留言。

## 书库

| 大类 | 内容 |
|---|---|
| [AI Era](Knowledge%20Site/AI%20Era/) | 大模型原理、智能体工程、AI 编程与工具实践 |
| [专业课程](Knowledge%20Site/%E4%B8%93%E4%B8%9A%E8%AF%BE%E7%A8%8B/) | 数学、计算机与人工智能课程笔记 |
| [精选收录](Knowledge%20Site/%E7%B2%BE%E9%80%89%E6%94%B6%E5%BD%95/) | 文章、外刊、视频与访谈的原文收录和学习笔记 |

## 站点特性

- **分类与阅读**：按大类、书籍和章节浏览，篇内目录支持公式和锚点导航；有对应版本的章节可切换阅读语言。
- **收藏与继续阅读**：书籍和文章可收藏到账号；首页可继续最近的阅读，进度、语言、字号和目录偏好保存在当前浏览器。
- **留言交流**：紧凑输入框随内容增高，显示字数；支持本人删除和管理员隐藏。每账号每分钟最多发布 20 条，触发限制后显示倒计时并保留草稿。
- **账号与邀请**：支持注册、人工审核、服务端会话和邀请码。新邀请码为 6 位不分组字母数字，管理员可长期查看、复制；旧邀请码继续有效。
- **页面反馈**：导航进度条、页面淡入和首页文字依次浮现，兼顾移动端、历史返回、阅读进度恢复及系统减少动态效果设置。
- **来源与说明**：章节保留来源链接，仅收录原文时标注「原文」；关于页介绍功能、账号隐私和 AI 辅助内容的局限。

账号系统限制网站访问；本仓库及 `Knowledge Site/` 成稿内容仍公开可见。账号申请信息不向其他读者公开，留言昵称与正文向站内读者展示。部分内容使用 AI 辅助生成或整理，阅读和引用时请结合原始资料核验。

## 搜索与交流更新

站内提供受保护的元数据搜索、标签筛选、关于页更新日志及私密投稿。账号设置中的改密码和永久注销因尚缺预览 CPU 验收暂不开放。维护流程与容量限制见 [轻量功能说明](project/docs/lightweight-features.md)。

## 仓库结构

仓库根目录同时是一个 Obsidian vault。`.gitignore` 使用白名单，只跟踪下面两项：

```
project/           Next.js 站点（代码与构建脚本）
Knowledge Site/    成稿笔记（站点内容源，公开可见）
```

字幕稿、网页剪藏和私人笔记不进入 Git。因此不要用 `git add -A` 或 `git add .`，按目录添加：

```bash
git add README.md "Knowledge Site" project
```

## 本地开发

```bash
cd project
npm ci
# 首次使用邀请码功能前，按后端说明在已忽略的 .dev.vars 中配置独立加密密钥
npm run types:backend
npm run db:migrate
npm run content:import
npm run admin:init
npm run build
npm run verify
npm run verify:ui
npm run test:auth
npm run dev:full   # http://localhost:8788
```

完整流程需要本地 Workers/D1，不再使用纯静态服务器。云端部署与费用前置条件见 [后端说明](project/backend/README.md)。

日常发布与恢复统一见 [发布指南](project/RELEASING.md)：仅提交本任务文件后，在 `project/` 执行 `npm run release`。首次环境配置见后端说明；普通发布不重复初始化账号或配置密钥。

## 添加内容

1. 按已确认的分类，在 `Knowledge Site/大类/子分类/书名/` 下新建书籍目录，写 `_book.md` 声明 `slug`、`title`、`category` 与简介。
2. 章节文件命名为 `NN - 标题.zh.md` / `NN - 标题.en.md`，`NN` 与 frontmatter 的 `slug` 前缀一致。
3. 每章至少填写 `slug`、`title`、`summary`、`updatedAt`、`content_type` 与 `sources`；`sources` 里带上原资源的 `publishedAt`。
4. 分类写进 `Knowledge Site/taxonomy.json`，首页按大类预览，大类页按子分类展示。
5. 仅提交本任务文件后，`cd project && npm run release` 完成检查、内容导入、推送及生产确认；仅检查用 `npm run release:check`。

完整约定见 [Knowledge Site/README.md](Knowledge%20Site/README.md)。

## 技术栈

- Next.js 16（App Router，`output: "export"` 静态导出，`trailingSlash: true`）
- React 19、TypeScript 5.9、全局 CSS 变量（无 Tailwind）
- react-markdown + remark-gfm + remark-math + rehype-katex + rehype-highlight
- gray-matter 读取 frontmatter，github-slugger 生成标题锚点

## 文档

- [project/RELEASING.md](project/RELEASING.md) — 唯一现行发布与恢复流程
- [project/README.md](project/README.md) — 站点结构、开发与部署
- [Knowledge Site/README.md](Knowledge%20Site/README.md) — 笔记目录、命名与 frontmatter 约定

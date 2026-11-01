# LovisMind

> Where readings linger and thoughts intertwine. 文字留痕，思绪成网。

把课程、讲座与文章整理成可以按顺序读下去的「书」：一课一书，一章一篇，正文之外保留原始来源。纯静态、零后端。

## 书库

| 书 | 作者 / 来源 | 章数 | 类型 |
|---|---|---|---|
| [CMU AI Agents 2026](Knowledge%20Site/CMU%20AI%20Agents/) | Daniel Fried, Graham Neubig · [YouTube](https://www.youtube.com/watch?v=UwfjzyLnvMg) | 14 | 系统课程 |
| [MIT Linear Algebra(Gilbert Strang)](Knowledge%20Site/MIT%20%E7%BA%BF%E6%80%A7%E4%BB%A3%E6%95%B0/) | Gilbert Strang · [YouTube](https://www.youtube.com/playlist?list=PLE7DDD91010BC51F8) | 36 | 系统课程 |
| [LLM Wiki Workflow(Karpathy)](Knowledge%20Site/LLM%20%E7%9F%A5%E8%AF%86%E5%BA%93/) | Andrej Karpathy · [X](https://x.com/karpathy/status/2039805659525644595) | 1 | 资料 |
| [Vibe Coding Tutorials](Knowledge%20Site/Vibe%20Coding/) | 多来源 · [YouTube](https://www.youtube.com/watch?v=XLhdE-qV87E) | 2 | 多来源 |

## 站点特性

- **双语章节**：英文原始资料同时产出中文与英文两版，可随时切换，切换不影响阅读位置。
- **目录里的公式**：章内目录与正文一样用 KaTeX 渲染色数学公式，点击可跳转。
- **原始出处**：每章标注原资源的首发日期与来源链接，章尾列出完整来源。
- **阅读偏好本地记忆**：语言、字号、目录显隐和每章的阅读进度都保存在浏览器里。
- **静态导出**：`next build` 直接产出 HTML，不需要服务器与数据库。

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
npm install
npm run dev        # http://localhost:3000
npm run build      # 静态产物输出到 project/out
npm run verify     # 检查产物页面、KaTeX、代码高亮与图片优化请求
npx serve out      # 用静态服务器验证真实产物
```

`out/` 不能可靠地通过 `file://` 打开，请用本地静态服务器访问。

## 添加内容

1. 按已确认的分类，在 `Knowledge Site/大类/子分类/书名/` 下新建书籍目录，写 `_book.md` 声明 `slug`、`title`、`category` 与简介。
2. 章节文件命名为 `NN - 标题.zh.md` / `NN - 标题.en.md`，`NN` 与 frontmatter 的 `slug` 前缀一致。
3. 每章至少填写 `slug`、`title`、`summary`、`updatedAt`、`content_type` 与 `sources`；`sources` 里带上原资源的 `publishedAt`。
4. 分类写进 `Knowledge Site/taxonomy.json`，首页按大类预览，大类页按子分类展示。
5. `cd project && npm run build && npm run verify` 确认页面生成正常。

完整约定见 [Knowledge Site/README.md](Knowledge%20Site/README.md)。

## 技术栈

- Next.js 16（App Router，`output: "export"` 静态导出，`trailingSlash: true`）
- React 19、TypeScript 5.9、全局 CSS 变量（无 Tailwind）
- react-markdown + remark-gfm + remark-math + rehype-katex + rehype-highlight
- gray-matter 读取 frontmatter，github-slugger 生成标题锚点

## 文档

- [project/README.md](project/README.md) — 站点结构、开发与部署
- [Knowledge Site/README.md](Knowledge%20Site/README.md) — 笔记目录、命名与 frontmatter 约定

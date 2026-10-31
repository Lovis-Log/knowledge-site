import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "关于",
  description: `${site.name}的说明：内容约定、目录结构与技术实现。`,
};

export default function AboutPage() {
  return (
    <div className="shell about">
      <header className="page-header">
        <p className="eyebrow">关于</p>
        <h1 className="page-title">这间书房怎么用</h1>
        <p className="page-lede">
          {site.name}放的是我整理过的课程学习笔记。一门课是一本书，一讲是一章，可以按顺序读，也可以只挑需要的部分。
        </p>
      </header>

      <div className="prose prose--page">
        <h2>内容从哪里来</h2>
        <p>
          每一章都对应一份原始材料：讲座视频、课程主页或一篇文章。正文是我看完之后用自己的话重写的要点，
          原始链接放在每章末尾的「来源」区块里，方便回到现场核对。
        </p>

        <h2>为什么先有书，再有笔记</h2>
        <p>
          零散的笔记很难重读，而按课程顺序组织的内容会自然形成一条学习路径。因此这里优先保证结构稳定：
          书与章的顺序固定，改写只发生在正文里，链接不会因为标题变化而失效。
        </p>

        <h2>阅读方式</h2>
        <ul>
          <li>桌面端右侧有篇内目录，滚动时高亮当前小节。</li>
          <li>字号可以调三档，选择会被记住。</li>
          <li>阅读位置会被记住，回到首页可以继续上一次的章节。</li>
          <li>有中英两版的章节可以在同一页切换，网址不变。</li>
        </ul>

        <h2>写作约定</h2>
        <p>
          每个成稿文件以 <code>slug</code>、<code>title</code>、<code>summary</code>、
          <code>updatedAt</code>、<code>sources</code> 作为元数据；中英双版用 <code>.zh</code> 与{" "}
          <code>.en</code> 后缀配对。新增一门课只需新建文件夹，新增一章只需新建文件。
        </p>

        <h2>技术说明</h2>
        <p>
          站点使用 Next.js 静态导出：没有服务端、没有数据库、没有账号。正文在构建时转换为 HTML，
          页面只加载少量用于切换语言、字号和阅读进度的脚本。部署目标是 Cloudflare Pages。
        </p>

        <h2>边界</h2>
        <p>
          这里只放已经整理好的成稿。字幕稿、网页摘录与私人草稿保留在本地，不会进入公开仓库。
        </p>

        <p className="about__back">
          <Link className="text-link" href="/">
            ← 回到书库
          </Link>
        </p>
      </div>
    </div>
  );
}

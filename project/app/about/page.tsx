import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { UiText, UiPair } from "@/components/ui-text";

export const metadata: Metadata = {
  title: "关于",
  description: `关于${site.name}：我的学习笔记、阅读收藏与联系方式。`,
};

export default function AboutPage() {
  return (
    <div className="shell about">
      <header className="page-header">
        <p className="eyebrow"><UiText zh="关于" /></p>
        <h1 className="page-title"><UiText zh="关于这个网站" /></h1>
        <p className="page-lede">
          <UiText zh={`${site.name}是我的个人知识库，用来记录学习过程中整理的笔记，也收藏一些想留着反复读的文章。放在这里，方便自己回顾，也分享给对这些内容感兴趣的人。`}
            en={`${site.name} is my personal knowledge base: a place for study notes and articles I want to return to. I keep them here for my own reference and to share with anyone interested in these topics.`} />
        </p>
      </header>

      <div className="prose prose--page">
        <h2><UiText zh="这里有什么" /></h2>
        <p>
          <UiText zh="内容来自我平时看的课程、讲座、视频和文章，涉及数学、编程、人工智能，也包括其他感兴趣的话题。我把它们按课程或主题整理成书，方便查找。你可以从目录里挑感兴趣的一章，也可以跟着课程慢慢读。"
            en="The material comes from courses, lectures, videos and articles I read and watch, covering mathematics, programming, AI and other topics that interest me. I organize it into books by course or subject for easy reference. Pick a chapter that interests you, or work through a course at your own pace." />
        </p>

        <h2><UiText zh="关于这些笔记" /></h2>
        <p>
          <UiText zh="笔记记录的是我对原始材料的整理和理解，部分内容直接收录原文。每章末尾都附有原始链接，方便查阅完整内容。这里会随着我的学习继续更新，已有的笔记也会补充和修订。"
            en="These notes reflect how I’ve organized and understood the source material; some entries reproduce the original text. Each chapter ends with links to the original sources so you can read them in full. I’ll keep adding to the site as I learn, and revisit existing notes to expand and revise them." />
        </p>

        <h2><UiText zh="联系与致谢" /></h2>
        <p>
          <UiText zh="如果发现笔记有误，或想交流，欢迎给我发邮件：" en="If you spot a mistake or would like to get in touch, email me at " />
          <a href="mailto:aspiration653@gmail.com">aspiration653@gmail.com</a><UiText zh="。" en="." />
        </p>
        <p>
          <UiPair zh={<>本网站 UI 设计灵感来源是 <a href="https://book.oiloil.org/">oiloil 的书</a>。网站源码见 <a href="https://github.com/Lovis-Log/knowledge-site.git">GitHub 仓库</a>。</>}
            en={<>The UI design was inspired by <a href="https://book.oiloil.org/">oiloil’s book</a>. The source code is available in the <a href="https://github.com/Lovis-Log/knowledge-site.git">GitHub repository</a>.</>} />
        </p>

        <p className="about__back">
          <Link className="text-link" href="/">
            <UiText zh="← 回到书库" />
          </Link>
        </p>
      </div>
    </div>
  );
}

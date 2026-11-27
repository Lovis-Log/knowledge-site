import { AboutTabs } from "@/components/changelog-view";
import updates from "@/content/updates.json";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ReaderLink as Link } from "@/components/navigation-feedback";
import { PageEntry } from "@/components/page-entry";
import { site } from "@/lib/site";
import { UiText, UiPair } from "@/components/ui-text";
import { CopyButton } from "@/components/copy-button";
import { PageHeading } from "@/components/page-heading";

export const metadata: Metadata = {
  title: "关于",
  description: `关于 ${site.name} 的学习笔记、阅读功能与联系方式。`,
};

function HomeLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
}

export default function AboutPage() {
  return <PageEntry className="shell about">
    <header className="page-header">
      <p className="eyebrow"><UiText zh="关于" /></p>
      <PageHeading kind="about" zh="关于这个网站" en="About this website" />
      <p className="page-lede"><UiText
        zh={`${site.name} 是 Lovis 的个人知识库，记录我在课堂、AI 实践和日常阅读中学到的东西，也方便日后复习和查找原文。`}
        en={`${site.name} is Lovis’s personal knowledge base. It collects what I learn in class, through hands-on AI work, and through everyday reading, so I can revisit the ideas and find the originals later.`} /></p>
    </header>
    <div className="prose prose--page"><AboutTabs entries={updates}>
      <p><UiPair
        zh={<><strong>内容与来源：</strong>书库分为校内课程、专业课程、AI Era 和精选收录。课程按讲次整理课堂笔记、例题与作业，遇到容易跳步的地方会补上推导或证明。其他内容按主题整理成书。每篇收录的文章末尾都附有原始来源链接，可以回看原文、视频或课件。部分笔记由 AI 辅助整理，引用或使用代码前请核对原始资料。</>}
        en={<><strong>Notes &amp; sources: </strong>The library covers campus courses, online courses, AI Era, and curated reading. Course books organize lecture notes, worked examples, and assignments, with extra steps or proofs where the reasoning needs more explanation. Other material is grouped by topic. Each collected article ends with a link to its original source, such as a post, video, or set of slides. Some notes are prepared with AI assistance. Check the original material before citing a claim or using code.</>} /></p>

      <p><UiPair
        zh={<><strong>阅读与交流：</strong>可在书库搜索书籍、章节或标签，收藏想重读的内容。阅读进度和高亮随账号同步，换设备登录后也能从「继续阅读」回到上次打开的章节。阅读时可调整字号、切换浅色或深色主题，并在有双语版本时切换正文语言。正文和公式都支持局部高亮。欢迎在留言板分享心得、回复其他读者，也可以通过投稿推荐资料或反馈问题。</>}
        en={<><strong>Reading &amp; discussion: </strong>Search the library by book, chapter, or tag, and bookmark anything you want to revisit. Reading progress and highlights sync with your account. Continue Reading takes you back to the last chapter you opened, even on another device. Adjust the text size, switch between light and dark themes, and choose the reading language where both versions are available. You can highlight a passage or part of a formula. Share thoughts or reply to other readers in the guestbook, or send a private submission to recommend a resource or report an issue.</>} /></p>

      <p><UiPair
        zh={<><strong>账号与隐私：</strong>注册不要求邮箱或手机号，阅读权限通过邀请码或管理员审核获得。密码以加盐哈希保存；收藏归个人账号，投稿仅本人和管理员可见，留言向站内读者公开。注销会删除账号及个人数据，已独立发布的笔记保留。</>}
        en={<><strong>Accounts &amp; privacy: </strong>Registration needs no email or phone number. An invite or administrator approval grants reading access. Passwords are stored as salted hashes. Favorites belong to your account; submissions are private to you and administrators, while guestbook posts are visible to readers. Deletion removes your account and personal data; independently published notes remain.</>} /></p>

      <p className="about-tech"><strong><UiText zh="技术架构：" en="Built with: " /></strong>{['Next.js', 'React', 'TypeScript', 'Cloudflare Pages', 'Cloudflare Workers', 'Cloudflare D1'].map(technology => <span key={technology}>{technology}</span>)}</p>

      <p><strong><UiText zh="邮箱联系站主" en="Email the site owner" /></strong><UiText zh="：" en=": " /><span className="about__email">aspiration653@gmail.com</span>{" "}<CopyButton value="aspiration653@gmail.com" /></p>
      <p className="about__source"><strong><UiText zh="源码" en="Source code" /></strong><UiText zh="：" en=": " /><HomeLink href="https://github.com/Lovis-Log/knowledge-site.git">GitHub ↗</HomeLink></p>
      <p className="about__links"><UiPair
        zh={<><strong>主要资料来源：</strong><HomeLink href="https://www.youtube.com/">YouTube</HomeLink>、<HomeLink href="https://www.douyin.com/">Douyin</HomeLink>、<HomeLink href="https://www.bilibili.com/">Bilibili</HomeLink>、<HomeLink href="https://x.com/">X</HomeLink>、<HomeLink href="https://book.oiloil.org/">book.oiloil.org</HomeLink>、<HomeLink href="https://onsin.top/">onsin.top</HomeLink>、<HomeLink href="https://www.bbc.com/">BBC</HomeLink>、<HomeLink href="https://www.theguardian.com/">The Guardian</HomeLink>，以及学校上课课件。</>}
        en={<><strong>Main sources: </strong><HomeLink href="https://www.youtube.com/">YouTube</HomeLink>, <HomeLink href="https://www.douyin.com/">Douyin</HomeLink>, <HomeLink href="https://www.bilibili.com/">Bilibili</HomeLink>, <HomeLink href="https://x.com/">X</HomeLink>, <HomeLink href="https://book.oiloil.org/">book.oiloil.org</HomeLink>, <HomeLink href="https://onsin.top/">onsin.top</HomeLink>, <HomeLink href="https://www.bbc.com/">BBC</HomeLink>, <HomeLink href="https://www.theguardian.com/">The Guardian</HomeLink>, and slides from my university classes.</>} /></p>
      <p className="about__note"><UiPair
        zh={<>内容来源与版权：本站笔记基于公开课程、公开资料与个人学习整理，版权归原作者所有；如版权方要求，请来信联系删除。</>}
        en={<>Sources &amp; copyright: These notes draw on public courses, documentation, and my own study. Copyright remains with the original authors; rights holders may contact me for removal.</>} /></p>
      <p className="about__back"><Link className="text-link" href="/library/"><UiText zh="← 回到书库" /></Link></p>
    </AboutTabs></div>
  </PageEntry>;
}

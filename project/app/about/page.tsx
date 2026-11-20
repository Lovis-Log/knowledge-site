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
        zh={`${site.name} 是 Lovis 的个人知识库，收录课程笔记、AI 实践和阅读中值得留下的内容。`}
        en={`${site.name} is Lovis’s personal knowledge base for coursework, AI experiments, and reading worth keeping.`} /></p>
    </header>
    <div className="prose prose--page"><AboutTabs entries={updates}>
      <p><UiPair
        zh={<><strong>内容与来源：</strong>内容分为校内课程、专业课程、AI Era 和精选收录，按课程或主题整理成书。笔记保留来源链接，并随学习持续修订；部分内容由 AI 辅助整理，引用或使用代码前请核对原始资料。</>}
        en={<><strong>Notes &amp; sources: </strong>Campus and online courses, AI Era, and Curated collect material into books by course or topic. Notes retain source links and evolve as I learn. Some use AI assistance; check the original material before citing a claim or using code.</>} /></p>

      <p><UiPair
        zh={<><strong>阅读与交流：</strong>你可以搜索书籍与章节、收藏内容、调整阅读字号，并在可用时切换中英文。欢迎在留言板分享心得、提出建议或反馈问题。</>}
        en={<><strong>Reading &amp; discussion: </strong>Search books and chapters, save favorites, adjust text size, and switch languages where available. Use the guestbook to share ideas, suggest improvements, or report problems.</>} /></p>

      <p><UiPair
        zh={<><strong>账号与隐私：</strong>注册不要求邮箱或手机号，阅读权限通过邀请码或管理员审核获得。密码以加盐哈希保存；收藏归个人账号，投稿仅本人和管理员可见，留言向站内读者公开。注销会删除账号及个人数据，已独立发布的笔记保留。</>}
        en={<><strong>Accounts &amp; privacy: </strong>Registration needs no email or phone number. An invite or administrator approval grants reading access. Passwords are stored as salted hashes. Favorites belong to your account; submissions are private to you and administrators, while guestbook posts are visible to readers. Deletion removes your account and personal data; independently published notes remain.</>} /></p>

      <p className="about-tech"><strong><UiText zh="技术架构：" en="Built with: " /></strong>{['Next.js', 'React', 'TypeScript', 'Cloudflare Pages', 'Cloudflare Workers', 'Cloudflare D1'].map(technology => <span key={technology}>{technology}</span>)}</p>

      <p><strong><UiText zh="联系与致谢：" en="Contact & credits: " /></strong><UiText zh="邮箱联系站主：" en="Email the site owner: " /><span className="about__email">aspiration653@gmail.com</span>{" "}<CopyButton value="aspiration653@gmail.com" /></p>
      <p className="about__source"><UiText zh="源码：" en="Source: " /><HomeLink href="https://github.com/Lovis-Log/knowledge-site.git">GitHub ↗</HomeLink></p>
      <p className="about__links"><UiPair
        zh={<>常去的网站：<HomeLink href="https://www.youtube.com/">YouTube</HomeLink>、<HomeLink href="https://www.douyin.com/">抖音</HomeLink>、<HomeLink href="https://www.bilibili.com/">哔哩哔哩</HomeLink>、<HomeLink href="https://x.com/">X</HomeLink>、<HomeLink href="https://book.oiloil.org/">book.oiloil.org</HomeLink>、<HomeLink href="https://onsin.top/">onsin.top</HomeLink>，<span className="about__more">等等</span>。</>}
        en={<>Main sources: <HomeLink href="https://www.youtube.com/">YouTube</HomeLink>, <HomeLink href="https://www.douyin.com/">Douyin</HomeLink>, <HomeLink href="https://www.bilibili.com/">Bilibili</HomeLink>, <HomeLink href="https://x.com/">X</HomeLink>, <HomeLink href="https://book.oiloil.org/">book.oiloil.org</HomeLink>, <HomeLink href="https://onsin.top/">onsin.top</HomeLink>, <span className="about__more">and more</span>.</>} /></p>
      <p className="about__note"><UiPair
        zh={<>内容来源与版权：本站笔记基于公开课程、公开资料与个人学习整理，版权归原作者所有；如版权方要求，请来信联系删除。</>}
        en={<>Sources &amp; copyright: These notes draw on public courses, documentation, and my own study. Copyright remains with the original authors; rights holders may contact me for removal.</>} /></p>
      <p className="about__back"><Link className="text-link" href="/library/"><UiText zh="← 回到书库" /></Link></p>
    </AboutTabs></div>
  </PageEntry>;
}

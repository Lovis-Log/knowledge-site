import { AboutTabs } from "@/components/changelog-view";
import updates from "@/content/updates.json";
import type { Metadata } from "next";
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
      <h2><UiText zh="内容与来源" en="Notes & sources" /></h2>
      <p><UiText
        zh="内容分为专业课程、AI Era 和精选收录，按课程或主题整理成书。笔记保留来源链接，并随学习持续修订；部分内容由 AI 辅助整理，引用或使用代码前请核对原始资料。"
        en="Courses, AI Era, and Curated collect material into books by course or topic. Notes retain source links and evolve as I learn. Some use AI assistance; check the original material before citing a claim or using code." /></p>

      <h2><UiText zh="阅读与交流" en="Reading & discussion" /></h2>
      <p><UiText
        zh="你可以搜索书籍与章节、收藏内容、调整阅读字号，并在可用时切换中英文。欢迎在留言板分享心得、提出建议或反馈问题。"
        en="Search books and chapters, save favorites, adjust text size, and switch languages where available. Use the guestbook to share ideas, suggest improvements, or report problems." /></p>

      <h2><UiText zh="账号与隐私" en="Accounts & privacy" /></h2>
      <p><UiText
        zh="注册不要求邮箱或手机号，阅读权限通过邀请码或管理员审核获得。密码以加盐哈希保存；收藏归个人账号，投稿仅本人和管理员可见，留言向站内读者公开。注销会删除账号及个人数据，已独立发布的笔记保留。"
        en="Registration needs no email or phone number. An invite or administrator approval grants reading access. Passwords are stored as salted hashes. Favorites belong to your account; submissions are private to you and administrators, while guestbook posts are visible to readers. Deletion removes your account and personal data; independently published notes remain." /></p>

      <h2><UiText zh="技术架构" en="Built with" /></h2>
      <p><UiText
        zh="笔记以 Markdown 保存在 Obsidian 中，界面使用 Next.js、React 和 TypeScript，部署于 Cloudflare Pages；Worker 与 D1 负责访问控制和账号数据。"
        en="Markdown notes live in Obsidian. Next.js, React, and TypeScript power the interface on Cloudflare Pages; a Worker and D1 handle access control and account data." /></p>

      <h2><UiText zh="联系与致谢" en="Contact & credits" /></h2>
      <p><Link href="/guestbook/" prefetch={false}><UiText zh="留言板" en="Guestbook" /></Link>{" · "}<span className="about__email">aspiration653@gmail.com</span>{" "}<CopyButton value="aspiration653@gmail.com" /></p>
      <p><UiPair
        zh={<>界面灵感来自 <a href="https://book.oiloil.org/" target="_blank" rel="noopener noreferrer">oiloil 的书 ↗</a>。源码见 <a href="https://github.com/Lovis-Log/knowledge-site.git" target="_blank" rel="noopener noreferrer">GitHub ↗</a>。</>}
        en={<>Interface inspired by <a href="https://book.oiloil.org/" target="_blank" rel="noopener noreferrer">oiloil’s book ↗</a>. Source on <a href="https://github.com/Lovis-Log/knowledge-site.git" target="_blank" rel="noopener noreferrer">GitHub ↗</a>.</>} /></p>
      <p className="about__back"><Link className="text-link" href="/library/"><UiText zh="← 回到书库" /></Link></p>
    </AboutTabs></div>
  </PageEntry>;
}

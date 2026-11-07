import type { Metadata } from "next";
import { ReaderLink as Link } from "@/components/navigation-feedback";
import { PageEntry } from "@/components/page-entry";
import { site } from "@/lib/site";
import { UiText, UiPair } from "@/components/ui-text";

export const metadata: Metadata = {
  title: "关于",
  description: `了解${site.name}的内容、阅读功能、账号隐私与 AI 辅助内容说明。`,
};

export default function AboutPage() {
  return (
    <PageEntry className="shell about">
      <header className="page-header">
        <p className="eyebrow"><UiText zh="关于" /></p>
        <h1 className="page-title"><UiText zh="关于这个网站" /></h1>
        <p className="page-lede">
          <UiText zh={`${site.name} 是我的个人知识库，记录课程学习、AI 工具实践，以及阅读中值得保留的内容。我把零散的资料和思考整理在这里，方便回顾、查找和继续探索，也分享给有相同兴趣的人。`}
            en={`${site.name} is my personal knowledge base for coursework, hands-on experiments with AI tools, and reading worth keeping. I bring these materials and thoughts together so I can revisit them, find what I need, and share them with people who have similar interests.`} />
        </p>
      </header>

      <div className="prose prose--page">
        <h2><UiText zh="这里有什么" /></h2>
        <p>
          <UiText zh="书库分为 AI Era、专业课程和精选收录，包含大模型原理、智能体工程、AI 编程实践、数学与计算机课程，以及文章、视频和访谈等材料。内容按课程或主题整理成书；你可以沿着目录学习，也可以从感兴趣的一篇开始。"
            en="The library has three sections: AI Era, Courses, and Curated. They cover large language models, agent engineering, AI-assisted programming, mathematics and computer science, alongside articles, videos, and interviews. Materials are organized into books by course or topic. Follow a table of contents or start with an article that interests you." />
        </p>

        <h2><UiText zh="关于这些笔记" /></h2>
        <p>
          <UiText zh="学习笔记会结合原始材料做讲解、分析和整理；仅收录原文的内容会标注「原文」。章节保留来源链接，方便回到完整材料查阅和核对。这些记录代表我当前的理解，会随着学习继续补充、修订；引用时请以原始来源为准。"
            en="Study notes explain, analyze, and organize the source material. Entries that preserve the source text are marked “Original.” Chapters retain source links so you can read the full material and check the details. These notes reflect my current understanding and will be expanded and revised as I learn. Please consult the original sources when citing." />
        </p>

        <h2><UiText zh="功能与使用方式" en="Features & reading tools" /></h2>
        <ul>
          <li><UiText zh="分类与目录：按主题浏览书籍，通过书内章节和篇内目录定位内容；每章保留来源链接，便于延伸阅读和核对。"
            en="Browse by topic and book, then use chapter lists and article contents to find what you need. Source links support further reading and verification." /></li>
          <li><UiText zh="收藏与继续阅读：收藏感兴趣的书籍或文章，从首页的「继续阅读」入口返回最近读过的章节。阅读进度和语言、字号等偏好保存在当前浏览器中，更换设备时不一定同步。"
            en="Save books or articles to your account and use Continue reading to reopen your latest chapter. Reading progress and preferences such as language and text size are stored in the current browser and may not follow you to another device." /></li>
          <li><UiText zh="阅读与交流：可调整正文字号，按章节提供的版本切换阅读语言或查看原文与精读内容。留言板用于分享心得、提出建议和反馈问题，也支持删除自己的留言。"
            en="Adjust text size and, where available, switch reading languages or view original material alongside notes. The guestbook is a place to share ideas, suggest improvements, and report issues. You can delete your own messages." /></li>
        </ul>

        <h2><UiText zh="账号与隐私" en="Accounts & privacy" /></h2>
        <p><UiText zh="我们重视账号隐私，并按使用需要处理账号信息。目前注册不要求邮箱或手机号，阅读权限通过邀请码或管理员审核获得。密码以加盐哈希形式保存，不存储明文密码；登录状态通过受保护的 Cookie 维持。"
          en="We value account privacy and use account information only as needed to operate the site. Registration currently requires no email address or phone number. Access is granted through an invite code or administrator review. Passwords are stored as salted hashes rather than plain text, and protected cookies maintain sign-in sessions." /></p>
        <p><UiText zh="账号申请信息和审核记录不会向其他读者公开，管理员会在审核与账号维护时接触必要资料。收藏仅在对应账号下展示；留言中的昵称与正文会向站内读者展示，请勿在公开留言中填写密码或其他私密信息。"
          en="Applications and review records are not shown to other readers. Administrators access the information needed for review and account maintenance. Favorites are displayed within their respective accounts. Guestbook nicknames and messages are visible to site readers, so please keep passwords and other private information out of messages." /></p>

        <h2><UiText zh="AI 辅助内容与准确性" en="AI-assisted content & accuracy" /></h2>
        <p><UiText zh="部分内容使用 AI 工具辅助生成、翻译或整理，可能存在事实错误、推导遗漏、表述不准确或信息过时等不足。页面经过整理并不意味着每一处都完整、准确，也不意味着适用于所有场景。阅读时请结合原始资料核验，重要结论与代码示例尤其需要自行检查。"
          en="Some content is generated, translated, or organized with AI assistance. It may contain factual errors, missing steps, unclear explanations, or outdated information. Editing does not guarantee that every detail is complete, accurate, or suitable for every situation. Check the source material, particularly for important conclusions and code examples." /></p>
        <p><UiText zh="本站会随学习和使用反馈持续更新。若发现问题，欢迎附上对应书名、文章链接或复现步骤留言，帮助补充和修正内容。"
          en="The site will continue to evolve as I learn and receive feedback. If you find a problem, include the book, article link, or steps to reproduce it so the material can be improved." /></p>

        <h2><UiText zh="联系与致谢" /></h2>
        <p>
          <UiText zh="发现网站 Bug、内容问题，或想分享学习心得，欢迎到" en="To report a website bug or content issue, or share something you learned, visit the " />
          <Link href="/guestbook/" prefetch={false}><UiText zh="留言板" en="guestbook" /></Link>
          <UiText zh="交流。也可以通过邮件联系我：" en=". You can also reach me by email: " />
          <span className="about__email">aspiration653@gmail.com</span><UiText zh="。" en="." />
        </p>
        <p>
          <UiPair zh={<>本网站的界面设计受到 <a href="https://book.oiloil.org/" target="_blank" rel="noopener noreferrer">oiloil 的书 ↗</a> 启发。网站源码见 <a href="https://github.com/Lovis-Log/knowledge-site.git" target="_blank" rel="noopener noreferrer">GitHub 仓库 ↗</a>。</>}
            en={<>The interface was inspired by <a href="https://book.oiloil.org/" target="_blank" rel="noopener noreferrer">oiloil’s book ↗</a>. The source code is available in the <a href="https://github.com/Lovis-Log/knowledge-site.git" target="_blank" rel="noopener noreferrer">GitHub repository ↗</a>.</>} />
        </p>

        <p className="about__back">
          <Link className="text-link" href="/library/">
            <UiText zh="← 回到书库" />
          </Link>
        </p>
      </div>
    </PageEntry>
  );
}

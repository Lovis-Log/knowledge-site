export type UiLang = "zh" | "en";
export const UI_LANG_STORAGE_KEY = "shufang:ui-lang";

// Display translations only. Content names, slugs and taxonomy stay unchanged.
export const uiEnglish: Record<string, string> = {
  "书库": "Library", "首页": "Home", "关于": "About", "主导航": "Main navigation",
  "面包屑": "Breadcrumb", "内容分类": "Categories", "跳到正文": "Skip to content",
  "查看全部": "View all", "继续阅读": "Continue reading", "目录": "Contents",
  "篇内目录": "On this page", "本篇目录": "On this page", "章节导航": "Chapter navigation",
  "← 上一篇": "← Previous", "下一篇 →": "Next →", "来源": "Sources",
  "视频": "Video", "博客": "Blog", "播客": "Podcast", "文章": "Article",
  "多来源": "Multiple sources", "系统课程": "Course", "技术教程": "Tutorial",
  "科普": "Explainer", "新闻": "News", "观点": "Opinion", "播客访谈": "Podcast / interview",
  "资料": "Reference", "短帖": "Post", "等": "and more",
  "正文语言": "Content language", "语言": "Language", "阅读视图": "Reading view",
  "阅读": "Reading", "原文与精读": "Original & notes", "原文翻译": "Translation",
  "正文字号": "Text size", "字号": "Text size", "小": "Small", "中": "Medium", "大": "Large",
  "目录显示": "Table of contents visibility", "显示": "Show", "隐藏": "Hide",
  "支持本站": "Support this site", "感谢你的支持": "Buy me a coffee",
  "支持一下": "Support", "关闭": "Close", "打开微信扫一扫": "Scan with WeChat",
  "微信支付收款码": "WeChat Pay QR code",
  "本站笔记内容将会持续更新与完善。制作不易，如果这些内容对你有帮助，欢迎打赏支持。谢谢！":
    "I’ll keep updating and improving these notes. Creating and maintaining this site takes time and effort. If you find it useful, your support is welcome. Thank you!",
  "关于这个网站": "About this site", "这里有什么": "What you’ll find here",
  "关于这些笔记": "About the notes", "联系与致谢": "Contact & credits",
  "← 回到书库": "← Back to the library", "返回书库 →": "Back to the library →",
  "这一页不在知识库里": "This page isn’t in the library",
  "链接可能已经改名，或者这一章还没有写。": "The link may have changed, or this chapter may not have been written yet.",
  "课程笔记与来源链接": "Study notes & source links",
  "正文为个人理解，引用请回到原始来源。": "These notes reflect my understanding. Please refer to the original sources when citing.",
  "暖阳下的书与干花": "Books and dried flowers in warm sunlight",
  "Personal Knowledge Vault": "Personal Knowledge Vault",
};

export const taxonomyEnglish: Record<string, { name: string; description: string }> = {
  "ai-era": { name: "AI Era", description: "Explore AI principles, agents and everyday creative practice." },
  "courses": { name: "Courses", description: "Study mathematics, programming and AI through structured courses." },
  "curated": { name: "Selected Reading", description: "A collection of news, articles and perspectives worth reading closely." },
  "ai-principles-applications": { name: "AI Principles & Applications", description: "Language models, agent engineering and AI-assisted knowledge management" },
  "ai-coding": { name: "AI Coding & Creation", description: "Software development, image generation and creative workflows with AI" },
  "mathematics": { name: "Mathematics", description: "Linear algebra, calculus, probability and proofs" },
  "software-engineering": { name: "Computing & Programming", description: "Programming languages, computing fundamentals and software engineering" },
  "ai-courses": { name: "Artificial Intelligence", description: "Courses on agents, tool use, memory, planning and evaluation" },
  "article-collection": { name: "Articles", description: "Articles and perspectives that offer food for thought" },
  "general-collection": { name: "General Collection", description: "Videos and interviews on finance, business, communication and thinking" },
};

export const bookEnglish: Record<string, { description: string; longDescription: string }> = {
  "agent-engineering": { description: "Practical notes on AI agent development and skill writing.", longDescription: "Notes on the principles and practice of building AI agents, covering tool use, context management, task orchestration and skill writing, with methods and lessons from development." },
  "llm-knowledge-base": { description: "Organizing and maintaining a personal knowledge base with language models.", longDescription: "Methods for using language models to organize source material, build a Markdown wiki and maintain a personal knowledge base, with attention to understanding, linking, retrieval and ongoing updates." },
  "llm-principles": { description: "The fundamentals of large language models and how to use them.", longDescription: "Notes on how large language models work, how they are trained and how they are used, exploring their capabilities and limitations alongside practical methods and experience." },
  "vibe-coding": { description: "Practical notes on AI-assisted coding and project development.", longDescription: "Tutorials and practical experience with AI-assisted programming, covering requirements, implementation, debugging and deployment as a reference for building projects." },
  "image-generation-workflows": { description: "Practical notes on product design and AI visual creation.", longDescription: "Learning materials and practical experience in product design and visual creation, covering how to communicate design requirements, create visual assets with AI and review and improve the results." },
  "cmu-ai-agents": { description: "Study notes from the CMU AI Agents course.", longDescription: "Notes from CMU AI Agents on agent fundamentals, design and applications, exploring how models use tools, memory and planning to carry out tasks and how their performance is evaluated." },
  "mit-discrete-applied-mathematics": { description: "Study notes from MIT 18.200 Discrete Applied Mathematics.", longDescription: "Notes from MIT 18.200 on concepts and methods in discrete mathematics, probability and optimization, including proofs, approaches to problems and applications." },
  "mit-linear-algebra": { description: "Study notes from Gilbert Strang’s linear algebra course.", longDescription: "Notes from Gilbert Strang’s MIT 18.06 course, using geometric intuition to understand matrices, vector spaces and linear transformations, with reflections on concepts, derivations and applications." },
  "mit-real-analysis": { description: "Study notes from MIT 18.100B Real Analysis.", longDescription: "Notes from MIT 18.100B on the basic properties of real numbers and functions, exploring definitions, theorems and proof techniques, with derivations and reflections from study." },
  "cpp-programming-course": { description: "Course notes on C++ and program design.", longDescription: "C++ course notes on the language and programming methods, covering syntax, memory management and program design, with code examples to support learning and everyday reference." },
  "cs50-python": { description: "Study notes from Harvard’s CS50P Python programming course.", longDescription: "Notes from Harvard CS50P on Python and the fundamentals of programming, including explanations of concepts, code examples and reflections on exercises." },
  "python-for-ai": { description: "Python programming notes for AI applications.", longDescription: "Python learning materials for AI applications, covering language fundamentals, development environments, data processing and project work, with useful programming methods and experience." },
  "english-news-reading": { description: "Practice English reading and expression through news and articles.", longDescription: "Close-reading notes on English news and articles, with Chinese translations and explanations of vocabulary and expressions, as well as background knowledge for reading alongside the originals." },
  "society-and-reasoning": { description: "Articles on society, personal experience and ways of thinking.", longDescription: "A collection of articles on social issues, personal circumstances and ways of thinking, keeping perspectives and discussions worth returning to for reference and reflection." },
  "personal-selection": { description: "Videos, articles and study notes that interest me.", longDescription: "Videos, articles and related notes I’ve found worth keeping during study and everyday reading. Topics follow my interests, and the collection grows with new discoveries." },
  "finance-and-business": { description: "Learning notes on finance, personal money management and business.", longDescription: "Learning materials and notes on finance, personal money management and business, recording observations and understanding of economic life, business operations and consumer trends." },
};

export function englishText(zh: string): string {
  return uiEnglish[zh] ?? zh;
}

export function uiLabel(zh: string, en = englishText(zh)) {
  return { "aria-label": zh, "data-ui-aria-zh": zh, "data-ui-aria-en": en };
}

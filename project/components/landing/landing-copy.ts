import { landingAssets } from "@/lib/landing-assets";
// Editorial copy is separate from layout and motion for later revisions.
export const landingCopy = {
  heroTitle: { zh: "把学习过的知识，", en: "Turning what we learn" },
  heroAccent: { zh: "梳理成清晰的理解。", en: "into clear understanding." },
  heroDescription: { zh: "收录理工科专业课程、AI前沿信息与个人精选内容。依逻辑梳理脉络，附原始来源出处；记录学习过程，留存思考印记。", en: "Notes on science and engineering courses, developments in AI, and personal selections. Organized to clarify the reasoning, with links to original sources; a record of learning and reflection." },
  enter: { zh: "进入知识库", en: "Enter the library" },
  join: { zh: "申请访问", en: "Request access" },
  storyTitle: { zh: "从逐章细读，到融会贯通。", en: "From close reading to a connected understanding." },
  storyDescription: { zh: "依循目录由浅入深，逐步理解本质。", en: "Follow the outline from fundamentals to deeper ideas, building an understanding of the essentials." },
  collectionTitle: { zh: "专题收录与研习笔记。", en: "Curated subjects and study notes." },
  collectionDescription: { zh: "涵盖数理基础、AI实践与深度阅读，随研读进程持续更新。", en: "Mathematical foundations, AI practice, and close reading, updated as the study progresses." },
  reflectionTitle: { zh: "温故而知新，重读出真意。", en: "Revisit what you know. Read again for deeper understanding." },
  reflectionDescription: { zh: "深奥的道理鲜有一读即透，往往需要经历沉淀、在实践中反复回望，方能豁然贯通。LovisMind 旨在为这些长期的学习与推敲留存底稿，供日后查考，亦同有心人交流。", en: "Difficult ideas rarely become clear in a single reading. Understanding often takes time, practice, and repeated reflection. LovisMind preserves a working record of this sustained study, for future reference and exchange with fellow readers." },
  closingTitle: { zh: "静心阅览，探索新知。", en: "Read at leisure. Explore new ideas." },
  closingDescription: { zh: "凭邀请码激活账户，或提交访问申请。", en: "Activate your account with an invitation code, or submit an access request." },
} as const;

export const landingScenes = [
  { name: { zh: "研读方式", en: "Reading approach" }, title: { zh: "结构化的长篇研读", en: "Structured reading" }, description: { zh: "将系统课程与长篇论述按节切分，理清前后逻辑，保持行文脉络清晰。", en: "Courses and extended texts divided into sections, with a clear sequence of ideas and a coherent thread throughout." }, detail: { zh: "按主题归拢 · 保留各自脉络", en: "Gathered by subject · Each with its own thread" }, image: landingAssets.shelf, width: 1600, height: 890, alt: { zh: "当前书库的新版主题书架与深色书封", en: "The current library shelves with updated clothbound covers" } },
  { name: { zh: "研读方式", en: "Reading approach" }, title: { zh: "推导与代码详注", en: "Annotated derivations and code" }, description: { zh: "保留公式推导的中间环节与程序执行要点，让论据有迹可循。", en: "Intermediate steps in mathematical derivations and key details of program execution, so the reasoning can be followed." }, detail: { zh: "章节索引 · 来源链接 · 随时重访", en: "Chapter outlines · Original sources · A way back" }, image: landingAssets.contents, width: 1600, height: 890, alt: { zh: "当前笔记书目的新版书封和章节目录", en: "An updated book cover and chapter outline from the current library" } },
  { name: { zh: "研读方式", en: "Reading approach" }, title: { zh: "双语语境对照", en: "Bilingual reference" }, description: { zh: "重要外文文献附双语对照与术语释义，兼顾中文流畅与原文精度。", en: "Bilingual versions and terminology notes for key foreign-language texts, balancing fluent Chinese with fidelity to the original." }, detail: { zh: "中英阅读 · 字号调整 · 篇内目录", en: "Two languages · Text sizes · In-page navigation" }, image: landingAssets.reader, width: 1600, height: 890, alt: { zh: "当前阅读页的正文、中英切换和篇内目录", en: "The current reader with language controls and in-page navigation" } },
] as const;

export const landingVolumes = [
  { title: { zh: "线性代数", en: "Linear Algebra" }, description: { zh: "矩阵变换、向量空间与几何投影的系统推演。", en: "A systematic exploration of matrix transformations, vector spaces, and geometric projections." }, cover: landingAssets.bookMath, href: "/books/mit-linear-algebra/" },
  { title: { zh: "外刊精读", en: "English close reading" }, description: { zh: "长篇时文研读，涵盖论证结构、词法句式与背景注释。", en: "Close readings of long-form journalism, with notes on argument structure, vocabulary, syntax, and context." }, cover: landingAssets.bookNews, href: "/books/english-news-reading/" },
  { title: { zh: "C++ 编程与系统", en: "C++ & Systems Programming" }, description: { zh: "探讨语言核心特性、内存模型与底层运行机制。", en: "An exploration of core language features, memory models, and the mechanisms underlying program execution." }, cover: landingAssets.bookCpp, href: "/books/cpp-programming-course/" },
] as const;

export const landingFeatures = [
  { title: { zh: "自动保留阅读进度", en: "Resume where you left off" }, description: { zh: "记录最后驻留的章节与段落，随时重返先前的思考节点。", en: "Saves your place within the chapter, so you can return to the passage and resume your train of thought." } },
  { title: { zh: "按需调整版面排版", en: "Customizable layout" }, description: { zh: "提供三档字号切换与目录大纲开合，兼顾不同屏幕与阅读习惯。", en: "Choose from three text sizes and show or hide the outline to suit your screen and reading habits." } },
  { title: { zh: "完整溯源原始出处", en: "Direct source links" }, description: { zh: "正文内嵌教材、文献与讲座链接，方便随时核实与引证。", en: "Links to textbooks, papers, and lectures within the notes make it easy to verify sources and cite them." } },
] as const;

export const landingQuestions = [
  { question: { zh: "这里主要收录哪些内容？", en: "What subjects are included?" }, answer: { zh: "以大学系统课程、AI技术与外文文献的研读手记为主。既有长篇专题的章节推导，亦有针对特定问题考订的单篇论述。", en: "Primarily study notes on university courses, AI technology, and foreign-language texts. These include chapter-by-chapter derivations in extended series and individual essays examining specific questions." } },
  { question: { zh: "笔记与原始文献的关系为何？", en: "How do these notes relate to original sources?" }, answer: { zh: "所有内容均为个人研读笔记与理解，不作权威定论。文内皆附有原始来源出处，正式引用请务必以原文为准。", en: "All content reflects personal study and interpretation, rather than definitive conclusions. Links to original sources are provided throughout; please consult the originals for formal citation." } },
  { question: { zh: "如何获取阅读权限？", en: "How can I get access?" }, answer: { zh: "持有邀请码者可直接注册登录；暂无邀请码者可提交申请理由，经审核确认后开通访问。", en: "With an invitation code, you can register and sign in directly. Otherwise, submit your reasons for requesting access; access is granted following review." } },
] as const;

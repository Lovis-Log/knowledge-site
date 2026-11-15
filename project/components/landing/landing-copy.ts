import { landingAssets } from "@/lib/landing-assets";
// Editorial copy is separate from layout and motion for later revisions.
export const landingCopy = {
  heroTitle: { zh: "让好奇心，", en: "Stay curious." },
  heroAccent: { zh: "有处安放。", en: "Keep what stays with you." },
  heroDescription: { zh: "文章、书籍、课程，还有读完后仍想追问的问题。在这里，把零散的阅读慢慢整理成自己的理解。", en: "Books, essays, courses, and the questions that stay with you. A place to keep what you read, and return to what you think." },
  enter: { zh: "进入书库", en: "Enter the library" },
  join: { zh: "加入书房", en: "Join the reading room" },
  storyTitle: { zh: "从一次翻阅，到一点理解。", en: "From a first look to a lasting thought." },
  storyDescription: { zh: "找一本感兴趣的，顺着目录读进去，也随时回到原文。", en: "Find something that draws you in. Follow a thread, then go back to the source." },
  collectionTitle: { zh: "兴趣，不止一面。", en: "Room for more than one curiosity." },
  collectionDescription: { zh: "数学、技术、社会与日常。书架随着阅读生长，不急着替好奇心划定边界。", en: "Mathematics, technology, society, everyday life. The shelves grow with the reading, without drawing a line around curiosity." },
  reflectionTitle: { zh: "再读一遍，常有新的理解。", en: "Another reading. A different understanding." },
  reflectionDescription: { zh: "有些句子，隔一阵子才读得懂。有些问题，要走远一点才有答案。把文字与当时的思考留在一起，下次回来，就能接着往下想。", en: "Some passages make sense only later. Some questions need a little distance. Keep the words beside the thoughts they prompted, and pick up the thread when you return." },
  closingTitle: { zh: "欢迎来读。", en: "Make yourself at home." },
  closingDescription: { zh: "凭邀请码加入，或提交访问申请。", en: "Join with an invitation code, or request access." },
} as const;

export const landingScenes = [
  { name: { zh: "翻阅书架", en: "Browse the shelves" }, title: { zh: "顺着兴趣，找到下一本。", en: "Follow what draws you in." }, description: { zh: "从系统学习到偶然遇见的好文章，让不同领域的阅读各有位置。先翻一翻，再决定往哪里走。", en: "A sustained study, or a good essay found by chance. Different kinds of reading, with room to find your own way in." }, detail: { zh: "按主题归拢 · 保留各自脉络", en: "Gathered by subject · Each with its own thread" }, image: landingAssets.shelf, width: 1600, height: 890, alt: { zh: "当前书库的新版主题书架与深色书封", en: "The current library shelves with updated clothbound covers" } },
  { name: { zh: "沿着目录", en: "Find a thread" }, title: { zh: "读进去，也找得回来。", en: "Read on. Find your way back." }, description: { zh: "长内容有了章节，零散的笔记也有了顺序。可以从头读，也可以回到上次没弄明白的地方。", en: "Chapters give longer reads a shape. Start at the beginning, or return to the part you are still working through." }, detail: { zh: "章节索引 · 来源链接 · 随时重访", en: "Chapter outlines · Original sources · A way back" }, image: landingAssets.contents, width: 1600, height: 890, alt: { zh: "当前笔记书目的新版书封和章节目录", en: "An updated book cover and chapter outline from the current library" } },
  { name: { zh: "停下来读", en: "Make time to read" }, title: { zh: "让阅读，多停留一会儿。", en: "Give a thought a little longer." }, description: { zh: "在正文里读推导、看代码，或停在一句值得回味的话上。切换中英、调整字号，把注意力留给内容。", en: "Work through an argument, follow the code, or linger over a sentence. Choose a language and text size, and settle into the page." }, detail: { zh: "中英阅读 · 字号调整 · 篇内目录", en: "Two languages · Text sizes · In-page navigation" }, image: landingAssets.reader, width: 1600, height: 890, alt: { zh: "当前阅读页的正文、中英切换和篇内目录", en: "The current reader with language controls and in-page navigation" } },
] as const;

export const landingVolumes = [
  { title: { zh: "线性代数", en: "Linear algebra" }, description: { zh: "矩阵、空间，以及它们之间的关系。", en: "Matrices, spaces, and the relationships between them." }, cover: landingAssets.bookMath, href: "/books/mit-linear-algebra/" },
  { title: { zh: "外刊精读", en: "English close reading" }, description: { zh: "英文新闻与文章的精读笔记。", en: "Close reading notes on English news and essays." }, cover: landingAssets.bookNews, href: "/books/english-news-reading/" },
  { title: { zh: "C++ 编程", en: "Programming in C++" }, description: { zh: "从语言基础，到程序如何工作。", en: "From language fundamentals to how programs work." }, cover: landingAssets.bookCpp, href: "/books/cpp-programming-course/" },
] as const;

export const landingFeatures = [
  { title: { zh: "继续上次的阅读", en: "Pick up where you left off" }, description: { zh: "在同一浏览器回到最近章节，接着未完的地方。", en: "Return to your recent chapter in the same browser, and pick up the thread." } },
  { title: { zh: "把页面调到舒服", en: "Make the page feel right" }, description: { zh: "三档字号、目录显隐，保留自己的阅读偏好。", en: "Choose a text size and show or hide the outline. Keep the view that suits you." } },
  { title: { zh: "沿着来源，再读一遍", en: "Follow a thought back to its source" }, description: { zh: "从笔记回到原文；有双语内容时，切换语言对照。", en: "Follow the original links, or compare languages where both versions are available." } },
] as const;

export const landingQuestions = [
  { question: { zh: "这里收些什么？", en: "What will I find here?" }, answer: { zh: "课程笔记、文章精读与个人收录。既有沿章节展开的系统学习，也有围绕一个问题留下的阅读记录。", en: "Study notes, close readings, and personal selections. Some follow a subject chapter by chapter; others begin with a single question." } },
  { question: { zh: "笔记与原始内容是什么关系？", en: "How do the notes relate to their sources?" }, answer: { zh: "笔记包含整理与个人理解，正文之外保留来源链接。想了解完整论述，或需要引用时，请回到原始来源。", en: "These pages include personal interpretation, with links to the original material. Return to the source for the complete argument or a citation." } },
  { question: { zh: "怎样加入这间书房？", en: "How do I join?" }, answer: { zh: "有邀请码可以注册加入；没有邀请码，也可以填写申请理由，等待管理员审核。已有账号可直接登录。", en: "Register with an invitation code, or submit a short application for administrator review. Already have an account? Sign in to continue." } },
] as const;

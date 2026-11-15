// Editorial copy is separate from layout and motion for later revisions.
export const landingCopy = {
  heroTitle: { zh: "把学过的课，整理成可以重读的书。", en: "Courses become books. Ready to read again." },
  heroDescription: { zh: "课程笔记按章节展开，留下学习的脉络，也保留原始来源。", en: "Study notes, arranged in chapters. A trail through what I’ve learned, with the original sources close by." },
  enter: { zh: "进入书库", en: "Enter the library" },
  join: { zh: "加入书房", en: "Join the reading room" },
  storyTitle: { zh: "从一本书，读进一门学问。", en: "One book. A way into a subject." },
  collectionTitle: { zh: "兴趣，不止一面。", en: "Room for more than one curiosity." },
  collectionDescription: { zh: "从数学到编程，也收下沿途遇见的好问题。", en: "From mathematics to programming, with good questions gathered along the way." },
  reflectionTitle: { zh: "再读一遍，常有新的理解。", en: "Another reading. A different understanding." },
  reflectionDescription: { zh: "有些问题，第一次读时并没有答案。把文章和笔记留下来，等新的经验带你回到这里。", en: "Some questions stay open on the first reading. Keep the pages and the notes. New experience may bring you back to them." },
  closingTitle: { zh: "欢迎来读。", en: "Make yourself at home." },
  closingDescription: { zh: "凭邀请码加入，或提交访问申请。", en: "Join with an invitation code, or request access." },
} as const;

export const landingScenes = [
  { name: { zh: "书库", en: "The library" }, title: { zh: "从感兴趣的一本开始。", en: "Start with what draws you in." }, description: { zh: "课程、文章与学习笔记，各有位置，也各有值得重读的理由。", en: "Courses, articles and study notes. Each with a place, and a reason to return." }, image: "ai-shelf.webp", width: 1340, height: 1096, alt: { zh: "LovisMind 书库中的 AI 时代书架", en: "The AI Era shelf in the LovisMind library" } },
  { name: { zh: "目录", en: "The chapters" }, title: { zh: "沿着章节，一点点读进去。", en: "A subject unfolds, chapter by chapter." }, description: { zh: "一门课整理成一本书，顺着目录往下读，也方便回到没弄懂的地方。", en: "A course becomes a volume. Follow the outline, or return to the part you’re still working through." }, image: "linear-algebra.webp", width: 1380, height: 1026, alt: { zh: "线性代数笔记的书封与章节目录", en: "Book cover and chapter outline for the linear algebra notes" } },
  { name: { zh: "正文", en: "The reading" }, title: { zh: "读得深入，也找得到来处。", en: "Read closely. Keep the source in sight." }, description: { zh: "公式、代码和个人理解留在正文里；需要对照时，再回到原始来源。", en: "Equations, code and personal notes share the page. The original source is there when you need to look back." }, image: "agent.webp", width: 1020, height: 988, alt: { zh: "AI 工程笔记的章节阅读界面", en: "A chapter from the AI engineering notes" } },
] as const;

export const landingVolumes = [
  { title: { zh: "线性代数", en: "Linear algebra" }, description: { zh: "矩阵、空间，以及它们之间的关系。", en: "Matrices, spaces, and the relationships between them." }, cover: "/covers/editorial-math-480.webp" },
  { title: { zh: "智能体工程", en: "Agent engineering" }, description: { zh: "围绕智能体构建与设计的实践笔记。", en: "Practical notes on building and designing agents." }, cover: "/covers/editorial-agent-engineering-v1-480.webp" },
  { title: { zh: "C++ 编程", en: "Programming in C++" }, description: { zh: "从语言基础，到程序如何工作。", en: "From language fundamentals to how programs work." }, cover: "/covers/editorial-cpp-programming-v2-480.webp" },
] as const;

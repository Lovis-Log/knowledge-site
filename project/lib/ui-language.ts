export type UiLang = "zh" | "en";
export const UI_LANG_STORAGE_KEY = "shufang:ui-lang";

// Display translations only. Content names, slugs and taxonomy stay unchanged.
export const uiEnglish: Record<string, string> = {
  "书库": "Library", "首页": "Home", "关于": "About", "主导航": "Main navigation",
  "面包屑": "Breadcrumb", "内容分类": "Categories", "跳到正文": "Skip to content",
  "查看全部": "View all", "继续阅读": "Continue reading", "目录": "Contents", "返回目录": "Back to contents",
  "左右滑动选书": "Swipe to browse books",
  "篇内目录": "On this page", "本篇目录": "On this page", "章节导航": "Chapter navigation",
  "← 上一篇": "← Previous", "下一篇 →": "Next →", "来源": "Sources",
  "视频": "Video", "博客": "Blog", "播客": "Podcast", "文章": "Article",
  "多来源": "Multiple sources", "系统课程": "Course", "技术教程": "Tutorial",
  "科普": "Explainer", "新闻": "News", "观点": "Opinion", "播客访谈": "Podcast / interview",
  "资料": "Reference", "短帖": "Post", "等": "and more", "原文": "Original",
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

export function englishText(zh: string): string {
  return uiEnglish[zh] ?? zh;
}

export function uiLabel(zh: string, en = englishText(zh)) {
  return { "aria-label": zh, "data-ui-aria-zh": zh, "data-ui-aria-en": en };
}

export function uiPlaceholder(zh: string, en: string) {
  return { placeholder: zh, "data-ui-placeholder-zh": zh, "data-ui-placeholder-en": en };
}

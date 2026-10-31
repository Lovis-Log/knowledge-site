const CONTENT_TYPE_LABELS: Record<string, string> = {
  "video-course": "系统课程",
  "technical-tutorial": "技术教程",
  "science-explainer": "科普",
  news: "新闻",
  opinion: "观点",
  "podcast-interview": "播客访谈",
  reference: "资料",
  "social-post": "短帖",
};

export function contentTypeLabel(slug?: string): string {
  if (!slug) return "";
  return CONTENT_TYPE_LABELS[slug] ?? slug;
}

/**
 * A single comment syntax feeds both the homework table of contents and the
 * prose cleanup in Markdown. Keep the two readers on the same pattern.
 */
const HOMEWORK_TOPIC_COMMENT = /^\s*<!--\s*homework-topic\s*[:：]\s*(.*?)\s*-->\s*$/;

export function parseHomeworkTopic(value: string): string | undefined {
  const match = HOMEWORK_TOPIC_COMMENT.exec(value);
  return match?.[1].trim() || undefined;
}

export function isHomeworkTopicComment(value: string): boolean {
  return HOMEWORK_TOPIC_COMMENT.test(value);
}

interface HtmlNode {
  type?: string;
  value?: string;
  children?: unknown[];
}

/**
 * HAST-level cleanup: ReactMarkdown turns raw HTML nodes into text, so the
 * TOC-only comment has to be removed before the prose is rendered.
 */
export function dropHomeworkTopicComments(tree: unknown): void {
  const walk = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    const element = node as HtmlNode;
    if (!Array.isArray(element.children)) return;
    element.children = element.children.filter((child) => {
      const candidate = child as HtmlNode;
      return !(
        candidate.type === "raw" &&
        typeof candidate.value === "string" &&
        isHomeworkTopicComment(candidate.value)
      );
    });
    element.children.forEach(walk);
  };
  walk(tree);
}

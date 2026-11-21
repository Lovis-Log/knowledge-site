import GithubSlugger from "github-slugger";
import katex from "katex";
import { parseHomeworkTopic } from "./homework-topic";

export interface TocItem {
  id: string;
  text: string;
  html: string;
  depth: 2 | 3;
}

interface ScannedTocItem extends TocItem {
  /** Heading text after inline-code markers are removed, before labels are normalised. */
  raw: string;
  /** Optional short description written directly below the heading. */
  topic?: string;
}

/** Keep the body's generated heading ids: homework comments must never shift a slug. */
function scanToc(markdown: string, lang: string): ScannedTocItem[] {
  const slugger = new GithubSlugger();
  const items: ScannedTocItem[] = [];
  const lines = markdown.split("\n");
  let inFence = false;
  let inMathBlock = false;

  const topicAfter = (start: number): string | undefined => {
    let index = start;
    while (index < lines.length && !lines[index].trim()) index += 1;
    return index < lines.length ? parseHomeworkTopic(lines[index]) : undefined;
  };

  for (const [index, line] of lines.entries()) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    if (/^\s*\$\$\s*$/.test(line)) {
      inMathBlock = !inMathBlock;
      continue;
    }
    if (inMathBlock) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const raw = match[2].replace(/`/g, "").trim();
    if (!raw) continue;

    const slug = slugger.slug(raw);
    items.push({
      id: `${lang}-${slug}`,
      text: plainInline(raw),
      html: renderInline(raw),
      depth: match[1].length === 2 ? 2 : 3,
      raw,
      topic: topicAfter(index + 1),
    });
  }

  return items;
}

interface QuestionLabel {
  text: string;
  html: string;
}

/**
 * Homework headings come in several deliberately different shapes: numbered
 * questions, lettered OJ problems, and numbered parts such as 1.(5). A short
 * topic can be attached with `<!-- homework-topic: ... -->` under the heading;
 * the heading text and its generated slug stay untouched.
 */
function questionLabel(item: ScannedTocItem): QuestionLabel | undefined {
  const text = item.text.trim();

  if (/^[A-Z]$/.test(text)) return { text, html: escapeHtml(text) };

  const named = /^(?:题目\s*(\d+)|题\s*(\d+)|第\s*(\d+)\s*题)/.exec(text);
  if (named) {
    const label = `题目 ${Number(named[1] ?? named[2] ?? named[3])}`;
    return { text: label, html: label };
  }

  const numbered = /^(\d+)\s*[.．、]\s*(.*)$/.exec(text);
  if (!numbered) return undefined;
  const part = /^[（(]\s*(\d+)\s*[）)]/.exec(numbered[2]);
  const label = part
    ? `题目 ${Number(numbered[1])}（${Number(part[1])}）`
    : `题目 ${Number(numbered[1])}`;
  return { text: label, html: label };
}

function withTopic(item: ScannedTocItem, label: QuestionLabel): TocItem {
  const topic = item.topic?.trim();
  if (!topic) return { id: item.id, text: label.text, html: label.html, depth: item.depth };
  return {
    id: item.id,
    text: `${label.text} · ${plainInline(topic)}`,
    html: `${label.html} · ${renderInline(topic)}`,
    depth: item.depth,
  };
}

/** Sections that must never become a question-type group even if they contain h3 steps. */
const NON_QUESTION_SECTIONS =
  /^(解|解答|解析|小结|课堂小结|本章小结|本次小结|资料|相关资料|说明|易错点|本章要点|待确认清单|原始资料)$/;

/**
 * Homework navigation keeps question anchors and, for grouped outlines, the
 * question-type heading that owns them. Solution substeps (`解`, numbered
 * subparts) are never promoted to the question level.
 */
export function buildHomeworkToc(markdown: string, lang: string): TocItem[] {
  const scanned = scanToc(markdown, lang);
  const items: TocItem[] = [];

  for (let index = 0; index < scanned.length; index += 1) {
    const item = scanned[index];
    if (item.depth !== 2) continue;

    const question = questionLabel(item);
    if (question) {
      items.push(withTopic(item, question));
      continue;
    }
    if (NON_QUESTION_SECTIONS.test(item.text.trim())) continue;

    const children: TocItem[] = [];
    for (let child = index + 1; child < scanned.length && scanned[child].depth === 3; child += 1) {
      const childQuestion = questionLabel(scanned[child]);
      if (childQuestion) children.push(withTopic(scanned[child], childQuestion));
    }
    if (!children.length) continue;

    // A non-question h2 is a question-type group only when it owns questions.
    items.push({ id: item.id, text: item.text, html: item.html, depth: 2 });
    items.push(...children);
  }

  return items;
}

const INLINE_MATH_SPLIT = /(\$[^$\n]+\$)/;
const INLINE_MATH_STRIP = /\$([^$\n]+)\$/g;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * 目录标题里的 $...$ 在服务端渲染成 KaTeX 标记，
 * 客户端只拿到 HTML，不必把 katex JS 打进 bundle。
 */
function renderInline(raw: string): string {
  return raw
    .split(INLINE_MATH_SPLIT)
    .map((segment, index) => {
      if (index % 2 === 1) {
        return katex.renderToString(segment.slice(1, -1), {
          throwOnError: false,
          displayMode: false,
        });
      }
      return escapeHtml(segment);
    })
    .join("");
}

function plainInline(raw: string): string {
  return raw.replace(INLINE_MATH_STRIP, "$1");
}

/**
 * 从 Markdown 中提取 h2 / h3，并按 rehype-slug 的规则生成 id。
 * 双语章节在 id 前加语言前缀，避免两版正文出现重复锚点。
 */
export function buildToc(markdown: string, lang: string): TocItem[] {
  return scanToc(markdown, lang).map(({ id, text, html, depth }) => ({
    id,
    text,
    html,
    depth,
  }));
}

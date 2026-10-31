import GithubSlugger from "github-slugger";
import katex from "katex";

export interface TocItem {
  id: string;
  text: string;
  html: string;
  depth: 2 | 3;
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
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inFence = false;
  let inMathBlock = false;

  for (const line of markdown.split("\n")) {
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
    });
  }

  return items;
}

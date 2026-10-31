import GithubSlugger from "github-slugger";

export interface TocItem {
  id: string;
  text: string;
  depth: 2 | 3;
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

    const text = match[2].replace(/`/g, "").trim();
    if (!text) continue;

    const slug = slugger.slug(text);
    items.push({
      id: `${lang}-${slug}`,
      text,
      depth: match[1].length === 2 ? 2 : 3,
    });
  }

  return items;
}

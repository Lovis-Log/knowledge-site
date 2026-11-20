import type { HighlightView, ReadingHighlight } from "./reading-state-types";

const contextLength = 32;

export function indexHighlightText(root: HTMLElement) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => node.parentElement?.closest("button, svg, .katex, .reader-sr-only, [hidden], [aria-hidden=true]")
      ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
  });
  const segments: { node: Text; start: number; end: number }[] = [];
  let text = "";
  for (let current = walker.nextNode(); current; current = walker.nextNode()) {
    const node = current as Text;
    if (!node.length) continue;
    const start = text.length;
    text += node.data;
    segments.push({ node, start, end: text.length });
  }
  return { text, segments };
}

export function highlightSelection(root: HTMLElement, selection: Range, view: HighlightView): ReadingHighlight | null {
  const { text, segments } = indexHighlightText(root);
  const selected = segments.filter(({ node }) => selection.intersectsNode(node));
  const first = selected[0];
  const last = selected.at(-1);
  if (!first || !last) return null;

  const rawStart = first.start + (selection.startContainer === first.node ? selection.startOffset : 0);
  const rawEnd = selection.endContainer === last.node ? last.start + selection.endOffset : last.end;
  const raw = text.slice(rawStart, rawEnd);
  const quote = raw.trim();
  if (!quote || quote.length > 1200) return null;
  const start = rawStart + raw.length - raw.trimStart().length;
  return {
    id: crypto.randomUUID(),
    view,
    start,
    quote,
    prefix: text.slice(Math.max(0, start - contextLength), start),
    suffix: text.slice(start + quote.length, start + quote.length + contextLength),
  };
}

type Anchor = Pick<ReadingHighlight, "start" | "quote" | "prefix" | "suffix">;

export function resolveHighlight(text: string, mark: Anchor): number {
  const matchesContext = (at: number) =>
    text.slice(Math.max(0, at - mark.prefix.length), at) === mark.prefix &&
    text.slice(at + mark.quote.length, at + mark.quote.length + mark.suffix.length) === mark.suffix;

  if (text.startsWith(mark.quote, mark.start) && matchesContext(mark.start)) return mark.start;
  let count = 0;
  let first = -1;
  let match = -1;
  for (let at = text.indexOf(mark.quote); at !== -1; at = text.indexOf(mark.quote, at + 1)) {
    if (++count === 1) first = at;
    if (!matchesContext(at)) continue;
    if (match !== -1) return -1;
    match = at;
  }
  return count === 1 ? first : match;
}

export function highlightRanges(index: ReturnType<typeof indexHighlightText>, mark: ReadingHighlight) {
  const start = resolveHighlight(index.text, mark);
  if (start < 0) return [];
  const end = start + mark.quote.length;
  const ranges = [];
  for (const segment of index.segments) {
    if (segment.end <= start) continue;
    if (segment.start >= end) break;
    const range = new Range();
    range.setStart(segment.node, Math.max(0, start - segment.start));
    range.setEnd(segment.node, Math.min(segment.node.length, end - segment.start));
    ranges.push(range);
  }
  return ranges;
}

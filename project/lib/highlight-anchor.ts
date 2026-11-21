import type { HighlightView, ReadingHighlight } from "./reading-state-types";

const contextLength = 32;
const formulaBoundary = "\ufffc";

export type HighlightIndexMode = "rendered" | "formula" | "legacy";

type Segment = { node: Text | Element; start: number; end: number };

export type HighlightIndex = {
  text: string;
  segments: Segment[];
  root: HTMLElement;
  mode: HighlightIndexMode;
};

/**
 * Three views of the same reading DOM:
 * - rendered: visible KaTeX glyphs, so a highlight can stop on one symbol;
 * - formula:  the original whole-formula anchors, `\ufffc` + TeX + `\ufffc`;
 * - legacy:   text outside formulas, for marks saved before formulas were indexed.
 */
export function indexHighlightText(
  root: HTMLElement,
  mode: HighlightIndexMode = "rendered",
): HighlightIndex {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const element = node instanceof Element ? node : node.parentElement;
      if (!element || element.closest("button, svg, .reader-sr-only, [hidden]"))
        return NodeFilter.FILTER_REJECT;
      const formula = element.closest(".katex");
      if (formula) {
        if (mode === "legacy") return NodeFilter.FILTER_REJECT;
        if (mode === "formula")
          return node === formula ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        // KaTeX keeps a clipped MathML copy for screen readers and rendered glyphs in
        // .katex-html. Index only the visible glyphs, otherwise every formula would be
        // selected twice and a partial selection would still become a whole formula.
        if (element.closest(".katex-html"))
          return node instanceof Text ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        return node === formula ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_REJECT;
      }
      if (element.closest("[aria-hidden=true]")) return NodeFilter.FILTER_REJECT;
      return node instanceof Text ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    },
  });
  const segments: Segment[] = [];
  let text = "";
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const value = node instanceof Text ? node.data
      : formulaBoundary + ((node as Element).querySelector('annotation[encoding="application/x-tex"]')?.textContent ?? node.textContent) + formulaBoundary;
    if (!value.length) continue;
    const start = text.length;
    text += value;
    segments.push({ node: node as Text | Element, start, end: text.length });
  }
  return { text, segments, root, mode };
}

export function highlightAnchor(
  view: HighlightView,
  text: string,
  start: number,
  end: number,
): ReadingHighlight | null {
  const raw = text.slice(start, end);
  const quote = raw.trim();
  if (!quote || quote.length > 1200) return null;
  const anchored = start + raw.length - raw.trimStart().length;
  return {
    id: crypto.randomUUID(),
    view,
    start: anchored,
    quote,
    prefix: text.slice(Math.max(0, anchored - contextLength), anchored),
    suffix: text.slice(anchored + quote.length, anchored + quote.length + contextLength),
  };
}

export function highlightSelection({ text, segments }: HighlightIndex, range: Range, view: HighlightView): ReadingHighlight | null {
  const selected = segments.filter(({ node }) => range.intersectsNode(node));
  const first = selected[0];
  const last = selected.at(-1);
  if (!first || !last) return null;

  const rawStart = first.start + (first.node instanceof Text && range.startContainer === first.node ? range.startOffset : 0);
  const rawEnd = last.node instanceof Text && range.endContainer === last.node ? last.start + range.endOffset : last.end;
  return highlightAnchor(view, text, rawStart, rawEnd);
}

type Anchor = Pick<ReadingHighlight, "start" | "quote" | "prefix" | "suffix">;

function matchesContext(text: string, mark: Anchor, at: number) {
  return text.slice(Math.max(0, at - mark.prefix.length), at) === mark.prefix &&
    text.slice(at + mark.quote.length, at + mark.quote.length + mark.suffix.length) === mark.suffix;
}

export function resolveHighlight(text: string, mark: Anchor): number {
  if (!mark.quote) return -1;
  if (text.startsWith(mark.quote, mark.start) && matchesContext(text, mark, mark.start)) return mark.start;
  let count = 0;
  let first = -1;
  let match = -1;
  for (let at = text.indexOf(mark.quote); at !== -1; at = text.indexOf(mark.quote, at + 1)) {
    if (++count === 1) first = at;
    if (!matchesContext(text, mark, at)) continue;
    if (match !== -1) return -1;
    match = at;
  }
  return count === 1 ? first : match;
}

export function locateHighlight(index: HighlightIndex, mark: Anchor) {
  const start = resolveHighlight(index.text, mark);
  return start < 0 ? null : { start, end: start + mark.quote.length };
}

function rangesForSpan(index: HighlightIndex, start: number, end: number) {
  const ranges: Range[] = [];
  for (const segment of index.segments) {
    if (segment.end <= start) continue;
    if (segment.start >= end) break;
    const range = new Range();
    if (segment.node instanceof Text) {
      const from = Math.max(0, start - segment.start);
      const to = Math.min(segment.node.length, end - segment.start);
      if (to <= from) continue;
      range.setStart(segment.node, from);
      range.setEnd(segment.node, to);
    } else {
      range.selectNode(segment.node);
    }
    ranges.push(range);
  }
  return ranges;
}

export function highlightRanges(
  index: HighlightIndex,
  mark: ReadingHighlight,
  fallback: (mode: HighlightIndexMode) => HighlightIndex =
    (mode) => indexHighlightText(index.root, mode),
): Range[] {
  // U+FFFC anchors come from the whole-formula index. For other anchors,
  // prefer matching context across all indexes before falling back to a unique quote.
  const wholeFormula = mark.quote.includes(formulaBoundary);
  const modes: HighlightIndexMode[] = wholeFormula ? ["formula"] : ["rendered", "formula", "legacy"];
  let unique: { index: HighlightIndex; start: number; end: number } | undefined;
  for (const mode of modes) {
    const candidate = index.mode === mode ? index : fallback(mode);
    const span = locateHighlight(candidate, mark);
    if (!span) continue;
    if (wholeFormula || matchesContext(candidate.text, mark, span.start))
      return rangesForSpan(candidate, span.start, span.end);
    if (mode !== "formula" && !unique) unique = { index: candidate, ...span };
  }
  return unique ? rangesForSpan(unique.index, unique.start, unique.end) : [];
}

import type { HighlightView, ReadingHighlight } from "./reading-state-types";

const contextLength = 32;
const formulaBoundary = "\ufffc";

export type HighlightIndexMode = "visual" | "rendered" | "formula" | "legacy";

type Segment = { node: Text | Element; start: number; end: number };

export type HighlightIndex = {
  text: string;
  segments: Segment[];
  domSegments: Segment[];
  byNode: ReadonlyMap<Node, Segment>;
  root: HTMLElement;
  mode: HighlightIndexMode;
};

/**
 * - visual: rendered glyphs with KaTeX alignment tables ordered by row;
 * - rendered: glyphs in DOM order, for highlights saved before row ordering;
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
        if (mode === "visual" && element.closest(".vlist-s")) return NodeFilter.FILTER_REJECT;
        if (element.closest(".katex-html"))
          return node instanceof Text ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        return node === formula ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_REJECT;
      }
      if (element.closest("[aria-hidden=true]")) return NodeFilter.FILTER_REJECT;
      return node instanceof Text ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    },
  });
  const nodes: Segment["node"][] = [];
  for (let node = walker.nextNode(); node; node = walker.nextNode())
    nodes.push(node as Segment["node"]);
  const segments: Segment[] = [];
  const byNode = new Map<Node, Segment>();
  let text = "";
  for (const node of mode === "visual" ? visualOrder(nodes) : nodes) {
    const value = node instanceof Text ? node.data
      : formulaBoundary + (node.querySelector('annotation[encoding="application/x-tex"]')?.textContent ?? node.textContent) + formulaBoundary;
    if (!value.length) continue;
    const segment = { node, start: text.length, end: text.length + value.length };
    text += value;
    segments.push(segment);
    byNode.set(node, segment);
  }
  return { text, segments, domSegments: mode === "visual" ? nodes.flatMap((node) => {
    const segment = byNode.get(node);
    return segment ? [segment] : [];
  }) : segments, byNode, root, mode };
}

const alignmentCell = ".mtable > [class^='col-align-'] > .vlist-t > .vlist-r:first-child > .vlist > span";

function visualOrder(nodes: Segment["node"][]) {
  const result: Segment["node"][] = [];
  const tables = new Map<Element, Map<number, Segment["node"][]>>();
  const rowNumbers = new Map<Element, number>();
  const tableOffsets = new Map<Element, number>();
  for (const node of nodes) {
    let cell = node.parentElement?.closest(alignmentCell);
    if (!cell?.closest(".katex-display")) {
      result.push(node);
      continue;
    }
    let table = cell.closest(".mtable")!;
    // A matrix or aligned expression inside a cell stays with the outer row.
    for (let outer = table.parentElement?.closest(alignmentCell); outer; outer = table.parentElement?.closest(alignmentCell)) {
      cell = outer;
      table = outer.closest(".mtable")!;
    }
    let rows = tables.get(table);
    if (!rows) {
      rows = new Map();
      tables.set(table, rows);
      tableOffsets.set(table, result.length);
    }
    let row = rowNumbers.get(cell);
    if (row === undefined) {
      row = Array.prototype.indexOf.call(cell.parentElement!.children, cell) as number;
      rowNumbers.set(cell, row);
    }
    const glyphs = rows.get(row);
    if (glyphs) glyphs.push(node);
    else rows.set(row, [node]);
  }
  for (const [table, rows] of [...tables].reverse()) {
    const glyphs = [...rows].sort(([a], [b]) => a - b).flatMap(([, row]) => row);
    result.splice(tableOffsets.get(table)!, 0, ...glyphs);
  }
  return result;
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

// Search text in DOM order to locate even element boundary points. The same
// segments carry their visual offsets, so crossing columns stays on this row.
export function highlightSelection({ text, domSegments, mode }: HighlightIndex, range: Range, view: HighlightView): ReadingHighlight | null {
  let low = 0, high = domSegments.length;
  while (low < high) {
    const mid = (low + high) >>> 1;
    const node = domSegments[mid].node;
    const length = node instanceof Text ? node.length : node.childNodes.length;
    if (range.comparePoint(node, length) < 0) low = mid + 1;
    else high = mid;
  }
  const firstIndex = low;
  high = domSegments.length;
  while (low < high) {
    const mid = (low + high) >>> 1;
    if (range.comparePoint(domSegments[mid].node, 0) > 0) high = mid;
    else low = mid + 1;
  }
  const first = domSegments[firstIndex];
  const last = domSegments[low - 1];
  if (!first || !last || low <= firstIndex) return null;
  const start = first.start + (range.startContainer === first.node ? range.startOffset : 0);
  const end = range.endContainer === last.node ? last.start + range.endOffset : last.end;
  const mark = highlightAnchor(view, text, Math.min(start, end), Math.max(start, end));
  return mark && mode === "visual" ? { ...mark, format: 1 } : mark;
}

export function highlightBetween(
  index: HighlightIndex, anchor: { node: Node; offset: number }, focus: { node: Node; offset: number }, view: HighlightView,
) {
  const first = index.byNode.get(anchor.node);
  const last = index.byNode.get(focus.node);
  if (!first || !last) return null;
  const start = first.start + anchor.offset;
  const end = last.start + focus.offset;
  const mark = highlightAnchor(view, index.text, Math.min(start, end), Math.max(start, end));
  return mark ? { ...mark, format: 1 as const } : null;
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
  const { segments } = index;
  let low = 0, high = segments.length;
  while (low < high) {
    const mid = (low + high) >>> 1;
    if (segments[mid].end <= start) low = mid + 1;
    else high = mid;
  }
  for (let i = low; i < segments.length; i++) {
    const segment = segments[i];
    if (segment.start >= end) break;
    const range = new Range();
    if (segment.node instanceof Text) {
      const from = Math.max(0, start - segment.start);
      const to = Math.min(segment.node.length, end - segment.start);
      if (to <= from) continue;
      range.setStart(segment.node, from);
      range.setEnd(segment.node, to);
    } else {
      range.selectNodeContents(segment.node.querySelector(".katex-html") ?? segment.node);
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
  if (mark.format === 1) {
    const visual = index.mode === "visual" ? index : fallback("visual");
    const span = locateHighlight(visual, mark);
    return span ? rangesForSpan(visual, span.start, span.end) : [];
  }
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

"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { highlightRanges, highlightSelection, indexHighlightText } from "@/lib/highlight-anchor";
import type { HighlightIndex, HighlightIndexMode } from "@/lib/highlight-anchor";
import { groupHighlightBands } from "@/lib/highlight-geometry";
import type { HighlightBand, HighlightBox } from "@/lib/highlight-geometry";
import { changeReadingState } from "@/lib/reading-state-client";
import type { HighlightView, ReadingHighlight, ReadingState } from "@/lib/reading-state-types";
import { uiLabel } from "@/lib/ui-language";
import { UiText } from "./ui-text";

type Target = {
  mark: ReadingHighlight | null;
  remove: boolean;
  rect: DOMRect;
  range: Range;
  view: HighlightView;
  element: HTMLElement;
  ranges: Range[];
  /** The reader dragged right-to-left, so the pen follows the left/focus edge. */
  atStart: boolean;
};
type BandGroup = [HTMLElement, Range[]];
type PaintedMark = {
  mark: ReadingHighlight;
  ranges: Range[];
  element: HTMLElement;
  groups: BandGroup[];
  bands: HighlightBand[];
};

const textBlock = "pre, p, li, dt, dd, td, th, h1, h2, h3, h4, h5, h6, blockquote";
const tableRow = ".mtable > [class^='col-align-'] > .vlist-t > .vlist-r > .vlist > span";
const leftFence = ":scope > .mopen:not(.nulldelimiter)";
const rightFence = ":scope > .mclose:not(.nulldelimiter)";

function matrixFrame(table: Element) {
  // KaTeX also uses .mtable for aligned equations and cases. In particular,
  // cases has a null right delimiter and keeps its independent rows.
  const fenced = table.closest(".minner");
  if (fenced?.querySelector(leftFence) && fenced.querySelector(rightFence)) return fenced;
  const centered = !table.querySelector(":scope > .col-align-l, :scope > .col-align-r");
  return centered && table.querySelector(":scope > .arraycolsep, :scope > .vertical-separator") ? table : null;
}

function coversMatrix(table: Element, selected: ReadonlyMap<Node, Range>) {
  const cells = document.createTreeWalker(table, NodeFilter.SHOW_TEXT);
  let hasText = false;
  for (let node = cells.nextNode(); node instanceof Text; node = cells.nextNode()) {
    if (!node.data.trim()) continue;
    const range = selected.get(node);
    if (!range || range.startOffset !== 0 || range.endOffset !== node.length) return false;
    hasText = true;
  }
  return hasText;
}

function selectedTextRanges(element: HTMLElement, selection: Range) {
  const pieces: Range[] = [];
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
    acceptNode(node) {
      const parent = node instanceof Element ? node : node.parentElement;
      if (!parent || !selection.intersectsNode(node) ||
          parent.closest("button, svg, .reader-sr-only, [hidden], .katex-mathml") ||
          (parent.closest("[aria-hidden='true']") && !parent.closest(".katex-html"))) {
        return NodeFilter.FILTER_REJECT;
      }
      return node instanceof Text ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    },
  });
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const piece = document.createRange();
    piece.selectNodeContents(node);
    if (node === selection.startContainer) piece.setStart(node, selection.startOffset);
    if (node === selection.endContainer) piece.setEnd(node, selection.endOffset);
    if (!piece.collapsed) pieces.push(piece);
  }
  return pieces;
}

function groupRanges(view: HTMLElement, ranges: readonly Range[]): BandGroup[] {
  const groups = new Map<HTMLElement, Range[]>();
  const add = (fragment: Range) => {
    const parent = fragment.startContainer.parentElement;
    const container = parent?.closest<HTMLElement>(".katex-display") ??
      parent?.closest<HTMLElement>(textBlock) ?? view;
    const group = groups.get(container);
    if (group) group.push(fragment);
    else groups.set(container, [fragment]);
  };
  for (const range of ranges) {
    if (range.startContainer instanceof Text) {
      add(range);
    } else {
      // Older marks store an entire KaTeX node. Paint its rendered glyphs by row too.
      const node = range.startContainer.childNodes[range.startOffset];
      const rendered = node instanceof Element
        ? node.querySelector<HTMLElement>(".katex-html")
        : null;
      if (rendered) selectedTextRanges(rendered, range).forEach(add);
    }
  }
  return [...groups];
}

function measureBands(container: HTMLElement, fragments: readonly Range[]) {
  const area = container.getBoundingClientRect();
  if (!area.width || !area.height || area.bottom <= 0 ||
      area.top >= innerHeight || area.right <= 0 || area.left >= innerWidth) return [];

  const display = container.matches(".katex-display");
  const matrices = new Map<Element, Element>();
  let hasMathRows = false;
  if (display) {
    for (const table of container.querySelectorAll(".katex-html .mtable")) {
      const frame = matrixFrame(table);
      if (frame) matrices.set(table, frame);
      else hasMathRows = true;
    }
  }
  // A single displayed equation can still have tall operators and stacked scripts.
  const equationCenter = display && !hasMathRows ? (area.top + area.bottom) / 2 : undefined;
  const font = display ? container.querySelector(".katex") ?? container : container;
  const size = Number.parseFloat(getComputedStyle(font).fontSize) || 16;
  // A viewport overlay still has to respect the code, formula, or table scrollport.
  const scroll = container.closest<HTMLElement>("pre, .katex-display, .table-wrap");
  const bounds = scroll?.getBoundingClientRect();
  const minX = bounds && scroll ? bounds.left + scroll.clientLeft : -Infinity;
  const minY = bounds && scroll ? bounds.top + scroll.clientTop : -Infinity;
  const maxX = scroll ? minX + scroll.clientWidth : Infinity;
  const maxY = scroll ? minY + scroll.clientHeight : Infinity;

  const boxes: HighlightBox[] = [];
  const delimiters: HighlightBox[] = [];
  const compactBands: HighlightBand[] = [];
  const lineCenters = new Map<Element, number>();
  const addBox = (selected: HighlightBox[], rect: DOMRect, rowCenter?: number) => {
    const left = Math.max(rect.left, minX);
    const right = Math.min(rect.right, maxX);
    const top = Math.max(rect.top, minY);
    const bottom = Math.min(rect.bottom, maxY);
    if (right > left && bottom > top) selected.push({ top, left, right, bottom, size, rowCenter });
  };
  if (matrices.size) {
    const selected = new Map(fragments.map((range) => [range.startContainer, range]));
    for (const [table, frame] of matrices) {
      if (!coversMatrix(table, selected)) continue;
      const outline = [table, frame.querySelector(leftFence), frame.querySelector(rightFence)];
      const target = hasMathRows ? [] : boxes;
      for (const part of outline) {
        if (part) addBox(target, part.getBoundingClientRect(), equationCenter ?? 0);
      }
      if (hasMathRows) compactBands.push(...groupHighlightBands(target));
    }
  }
  for (const range of fragments) {
    const parent = range.startContainer.parentElement;
    let row = hasMathRows ? parent?.closest(tableRow) : null;
    for (let table = row?.closest(".mtable"); table && matrices.has(table); table = row?.closest(".mtable")) {
      row = table.parentElement?.closest(tableRow);
    }
    const anchor = display
      ? row?.querySelector(":scope > .pstrut")
      : parent?.closest(".katex-html .base")?.querySelector(":scope > .strut");
    let rowCenter = equationCenter;
    if (anchor) {
      rowCenter = lineCenters.get(anchor);
      if (rowCenter === undefined) {
        // The KaTeX strut ends at the row baseline plus its descender offset.
        const offset = parseFloat(getComputedStyle(anchor).verticalAlign) || 0;
        rowCenter = anchor.getBoundingClientRect().bottom + offset - size * 0.34;
        lineCenters.set(anchor, rowCenter);
      }
    }

    const selected = hasMathRows && parent?.closest(".delimsizing.mult") ? delimiters : boxes;
    for (const rect of range.getClientRects()) addBox(selected, rect, rowCenter);
  }

  const bands = groupHighlightBands(boxes.length ? boxes : delimiters, hasMathRows ? Math.max(2, size * 0.15) : 0);
  if (!boxes.length || !delimiters.length) return [...bands, ...compactBands];

  // Pieces of a tall brace can extend a selected row, but cannot join two rows.
  const extended = bands.map((band) => {
    const y = band.top + band.height / 2;
    let left = band.left;
    let right = band.left + band.width;
    for (const piece of delimiters) {
      if (piece.top <= y && piece.bottom >= y) {
        left = Math.min(left, piece.left);
        right = Math.max(right, piece.right);
      }
    }
    return { ...band, left, width: right - left };
  });
  return [...extended, ...compactBands];
}

function visibleBoxes(range: Range) {
  return Array.from(range.getClientRects()).filter((box) =>
    box.width > 0 && box.height > 0 && box.bottom > 0 && box.top < innerHeight &&
    box.right > 0 && box.left < innerWidth);
}

function visibleSelectionRect(range: Range, atStart = false) {
  const edge = range.cloneRange();
  edge.collapse(atStart);
  const caret = edge.getBoundingClientRect();
  if (caret.height > 0 && caret.bottom > 0 && caret.top < innerHeight &&
      caret.right >= 0 && caret.left <= innerWidth) return caret;
  const boxes = visibleBoxes(range);
  return atStart ? boxes[0] : boxes.at(-1);
}

function matchingMark(ranges: Range[], range: Range) {
  return ranges.some((candidate) =>
    candidate.isPointInRange(range.startContainer, range.startOffset) ||
    candidate.isPointInRange(range.endContainer, range.endOffset) ||
    range.isPointInRange(candidate.startContainer, candidate.startOffset));
}

function startsAtFocus(raw: Range) {
  const selection = window.getSelection();
  return Boolean(selection?.focusNode === raw.startContainer && selection.focusOffset === raw.startOffset);
}

function sameBoundaries(first: Range, second: Range) {
  return first.startContainer === second.startContainer && first.startOffset === second.startOffset &&
    first.endContainer === second.endContainer && first.endOffset === second.endOffset;
}

function sameBands(first: readonly HighlightBand[], second: readonly HighlightBand[]) {
  return first.length === second.length && first.every((band, index) => {
    const other = second[index];
    return Math.abs(band.top - other.top) < 0.5 && Math.abs(band.left - other.left) < 0.5 &&
      Math.abs(band.width - other.width) < 0.5 && Math.abs(band.height - other.height) < 0.5;
  });
}

function bandPath(bands: readonly HighlightBand[]) {
  return bands.map(({ left, top, width, height }) =>
    `M${left},${top}h${width}v${height}h${-width}Z`).join("");
}

export function ReadingHighlights({ root, book, chapter, state, failed, refresh }: {
  root: RefObject<HTMLDivElement | null>;
  book: string;
  chapter: string;
  state: ReadingState | null;
  failed?: boolean;
  refresh: () => void;
}) {
  const [target, setTarget] = useState<Target | null>(null);
  const [pending, setPending] = useState<ReadingHighlight[]>([]);
  const [hidden, setHidden] = useState<ReadonlySet<string>>(() => new Set());
  const busy = useRef(false);
  const [error, setError] = useState(false);
  const [bands, setBands] = useState<HighlightBand[]>([]);
  const [activeBands, setActiveBands] = useState<HighlightBand[]>([]);
  // Bumped when the reader switches language, view or font size: the formula
  // geometry must be measured again even if the article's size is unchanged.
  const [revision, setRevision] = useState(0);
  const button = useRef<HTMLButtonElement>(null);
  const painted = useRef<PaintedMark[]>([]);
  const savedHighlights = state?.highlights;
  const activeRange = target?.range;
  const activeElement = target?.element;
  const activeRanges = target?.ranges;

  useEffect(() => {
    const article = root.current;
    if (!article) return;
    painted.current = [];
    const saved = savedHighlights ?? [];
    const marks = saved.filter((mark) => !hidden.has(mark.id));
    for (const mark of pending) {
      if (hidden.has(mark.id) || saved.some((item) => item.id === mark.id)) continue;
      marks.push(mark);
    }
    for (const element of article.querySelectorAll<HTMLElement>("[data-highlight-view]")) {
      const viewMarks = marks.filter((mark) => mark.view === element.dataset.highlightView);
      if (!viewMarks.length) continue;
      const index = indexHighlightText(element);
      const indexes = new Map<HighlightIndexMode, HighlightIndex>([["rendered", index]]);
      const fallbackIndex = (mode: HighlightIndexMode) => {
        let found = indexes.get(mode);
        if (!found) {
          found = indexHighlightText(element, mode);
          indexes.set(mode, found);
        }
        return found;
      };
      for (const mark of viewMarks) {
        const ranges = highlightRanges(index, mark, fallbackIndex);
        if (ranges.length) painted.current.push({ mark, ranges, element, groups: groupRanges(element, ranges), bands: [] });
      }
    }
    const paint = () => {
      const next = painted.current.flatMap((item) => {
        item.bands = item.groups.flatMap(([container, ranges]) => measureBands(container, ranges));
        return item.bands;
      });
      setBands((current) => sameBands(current, next) ? current : next);
    };
    paint();
    let frame = 0;
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(() => { frame = 0; paint(); });
    };
    window.addEventListener("scroll", schedule, { capture: true, passive: true });
    window.addEventListener("resize", schedule);
    // A font-size or reading-view switch reflows the article without a resize event.
    const flow = typeof ResizeObserver === "function" ? new ResizeObserver(schedule) : null;
    flow?.observe(article);
    return () => {
      flow?.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
    };
  }, [root, savedHighlights, pending, hidden, revision]);

  useEffect(() => {
    if (!state) return;
    const ids = new Set(state.highlights.map((mark) => mark.id));
    setPending((list) => list.some((mark) => ids.has(mark.id))
      ? list.filter((mark) => !ids.has(mark.id)) : list);
    setHidden((current) => {
      if (!current.size) return current;
      const next = new Set([...current].filter((id) => ids.has(id)));
      return next.size === current.size ? current : next;
    });
  }, [state]);

  useEffect(() => {
    if (!activeRange || !activeElement || !activeRanges) {
      setActiveBands((current) => current.length ? [] : current);
      return;
    }
    const ancestor = activeRange.commonAncestorContainer;
    const part = ancestor instanceof HTMLElement ? ancestor : ancestor.parentElement;
    const root = part && activeElement.contains(part) ? part : activeElement;
    const picked = activeRanges.length ? activeRanges : selectedTextRanges(root, activeRange);
    const groups = groupRanges(activeElement, picked);
    const paint = () => {
      const next = groups.flatMap(([container, ranges]) => measureBands(container, ranges));
      setActiveBands((current) => sameBands(current, next) ? current : next);
      activeElement.toggleAttribute("data-reading-band-selection", Boolean(next.length));
    };
    paint();
    let frame = 0;
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(() => { frame = 0; paint(); });
    };
    window.addEventListener("scroll", schedule, { capture: true, passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      activeElement.removeAttribute("data-reading-band-selection");
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
    };
  }, [activeRange, activeElement, activeRanges]);

  useEffect(() => {
    const article = root.current;
    if (!article) return;
    const clear = () => { setTarget(null); setError(false); };
    const viewFor = (node: Node) => (node instanceof Element ? node : node.parentElement)
      ?.closest<HTMLElement>("[data-highlight-view]");
    const selected = () => {
      if (busy.current || document.activeElement === button.current) return;
      const selection = window.getSelection();
      if (!selection?.rangeCount || selection.isCollapsed) {
        setTarget((current) => current?.mark ? current : null);
        return;
      }
      // Selection keeps the drag direction, while its DOM Range is already ordered.
      const raw = selection.getRangeAt(0);
      const atStart = startsAtFocus(raw);
      const start = viewFor(raw.startContainer);
      const end = viewFor(raw.endContainer);
      const element = start ?? end;
      if (!element || !article.contains(element) || (start && end && start !== end)) { clear(); return; }
      const range = raw.cloneRange();
      if (!start) range.setStart(element, 0);
      if (!end) range.setEnd(element, element.childNodes.length);
      const rect = visibleSelectionRect(range, atStart);
      if (!rect) { clear(); return; }
      const view = element.dataset.highlightView as HighlightView;
      setError(false);
      setTarget((current) => {
        if (current && current.atStart === atStart && sameBoundaries(current.range, range)) return current;
        const existing = painted.current.find((item) => item.element === element && matchingMark(item.ranges, range));
        return { mark: existing?.mark ?? null, remove: Boolean(existing), rect, range,
          view, element, ranges: existing?.ranges ?? [], atStart };
      });
    };
    let pointer: number | null = null;
    let queued = 0;
    let settle = 0;
    const cancelSelection = () => {
      window.clearTimeout(settle);
      cancelAnimationFrame(queued);
      queued = 0;
    };
    const queueSelection = () => {
      cancelSelection();
      queued = requestAnimationFrame(() => {
        queued = 0;
        if (pointer === null) selected();
      });
    };
    const schedule = () => {
      // Mouse drags stay entirely native. Keyboard selection and touch handles
      // also get a quiet interval before any formula geometry is measured.
      if (pointer !== null || queued) return;
      cancelSelection();
      settle = window.setTimeout(queueSelection, 120);
    };
    const clickMark = (event: MouseEvent) => {
      if (busy.current || !window.getSelection()?.isCollapsed || !(event.target instanceof Element) ||
        event.target.closest("a, button")) return;
      const view = viewFor(event.target);
      for (const { mark, ranges, element, bands } of painted.current) {
        if (element !== view) continue;
        const hit = bands.find((band) => event.clientX >= band.left && event.clientX <= band.left + band.width &&
          event.clientY >= band.top && event.clientY <= band.top + band.height);
        if (!hit) continue;
        const selection = window.getSelection();
        const range = selection?.rangeCount ? selection.getRangeAt(0).cloneRange() : ranges[0];
        const rect = new DOMRect(event.clientX, hit.top, 0, hit.height);
        setError(false);
        setTarget({ mark, remove: true, rect, range, view: mark.view, element, ranges, atStart: false });
        return;
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        cancelSelection();
        clear();
      } else if (event.shiftKey && !event.repeat && /^(Arrow|Home$|End$|Page)/.test(event.key)) {
        clear();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (button.current?.contains(event.target as Node)) return;
      cancelSelection();
      clear();
      if (event.isPrimary && event.button === 0 && article.contains(event.target as Node)) pointer = event.pointerId;
    };
    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerId !== pointer) return;
      pointer = null;
      queueSelection();
    };
    const onBlur = () => {
      pointer = null;
      cancelSelection();
    };
    let frame = 0;
    const reposition = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setTarget((value) => {
          if (!value) return value;
          const rect = visibleSelectionRect(value.range, value.atStart);
          if (!rect) return null;
          return rect.top === value.rect.top && rect.left === value.rect.left && rect.width === value.rect.width
            ? value : { ...value, rect };
        });
      });
    };
    document.addEventListener("selectionchange", schedule);
    document.addEventListener("pointerup", onPointerUp, true);
    document.addEventListener("pointercancel", onPointerUp, true);
    article.addEventListener("click", clickMark);
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("blur", onBlur);
    window.addEventListener("scroll", reposition, { capture: true, passive: true });
    window.addEventListener("resize", reposition);
    const observer = new MutationObserver(() => {
      clear();
      setRevision((value) => value + 1);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-lang", "data-reading-view", "data-font-size"] });
    return () => {
      document.removeEventListener("selectionchange", schedule);
      document.removeEventListener("pointerup", onPointerUp, true);
      document.removeEventListener("pointercancel", onPointerUp, true);
      article.removeEventListener("click", clickMark);
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", reposition);
      cancelSelection();
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [root]);

  async function apply() {
    if (!target || busy.current) return;
    if (!state?.account) {
      refresh();
      return;
    }
    const previous = target;
    const index = previous.mark ? null : indexHighlightText(previous.element);
    const mark = previous.mark ?? (index && highlightSelection(index, previous.range, previous.view));
    if (!mark) { setTarget(null); return; }
    const ranges = index ? highlightRanges(index, mark) : previous.ranges;
    const restoring: Target = { ...previous, mark, ranges };

    busy.current = true;
    setError(false);
    window.getSelection()?.removeAllRanges();
    setTarget(null);
    if (previous.remove) {
      setHidden((ids) => new Set(ids).add(mark.id));
      try {
        await changeReadingState(state.account, book, chapter, { action: "remove-highlight", id: mark.id });
        refresh();
      } catch {
        setHidden((ids) => {
          const next = new Set(ids);
          next.delete(mark.id);
          return next;
        });
        setTarget(restoring);
        setError(true);
      } finally {
        busy.current = false;
      }
      return;
    }
    // Paint optimistically; keep the mark until the reload confirms it, then drop it.
    setPending((list) => list.some((item) => item.id === mark.id) ? list : [...list, mark]);
    try {
      await changeReadingState(state.account, book, chapter, { action: "highlight", mark });
      refresh();
    } catch {
      setPending((list) => list.filter((item) => item.id !== mark.id));
      setTarget(restoring);
      setError(true);
    } finally {
      busy.current = false;
    }
  }

  if (!target && !bands.length && !activeBands.length) return null;
  return createPortal(<>
    {(bands.length > 0 || activeBands.length > 0) && (
      <svg className="reading-highlight-bands" aria-hidden="true">
        <path d={bandPath([...bands, ...activeBands])} />
      </svg>
    )}
    {target && (
      <div className="reading-highlight-action" style={{
        top: Math.max(8, Math.min(innerHeight - 44, target.rect.top > 48 ? target.rect.top - 42 : target.rect.bottom + 8)),
        left: Math.max(8, Math.min(innerWidth - 44, target.atStart ? target.rect.left - 8 : target.rect.right - 8)),
      }}>
        <button ref={button} type="button" disabled={!state && !failed}
          onPointerDown={(event) => event.preventDefault()} onClick={() => void apply()}
          {...(target.remove ? uiLabel("移除高亮", "Remove highlight") : uiLabel("添加高亮", "Highlight text"))}>
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            {target.remove ? <path d="M6 6l12 12M18 6 6 18" /> :
              <path d="m5 14 5 5m-6 1h7m7.5-16.5 2 2a1.5 1.5 0 0 1 0 2.1L12 16l-5 2 2-5 8.4-8.5a1.5 1.5 0 0 1 2.1 0Z" />}
          </svg>
        </button>
        {(error || (failed && !state)) && <span role="status" className="reading-highlight-error">
          <UiText zh="保存失败，点击重试" en="Could not save. Click to retry." />
        </span>}
      </div>
    )}
  </>, document.body);
}

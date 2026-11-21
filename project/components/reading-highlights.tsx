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

const registryName = "lovismind-reading-highlight";
const activeRegistryName = "lovismind-reading-highlight-active";

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
type PaintedMark = { mark: ReadingHighlight; ranges: Range[]; element: HTMLElement };

function formulaForRange(range: Range) {
  const container = range.startContainer;
  if (!(container instanceof Element)) return null;
  const node = container.childNodes[range.startOffset];
  return node instanceof HTMLElement && node.matches(".katex") ? node : null;
}

/** A range over rendered KaTeX glyphs, which the browser paints fragment by fragment. */
function glyphRange(range: Range) {
  return range.startContainer instanceof Text &&
    Boolean(range.startContainer.parentElement?.closest(".katex-html"));
}

function formulaFontSize(node: Node, sizes: Map<Element, number>) {
  const formula = (node instanceof Element ? node : node.parentElement)?.closest(".katex");
  if (!formula) return 16;
  let size = sizes.get(formula);
  if (size === undefined) {
    size = Number.parseFloat(getComputedStyle(formula).fontSize) || 16;
    sizes.set(formula, size);
  }
  return size;
}

function addBoxes(range: Range, size: number, boxes: HighlightBox[]) {
  for (const rect of range.getClientRects()) {
    if (rect.width > 0 && rect.height > 0) {
      boxes.push({ top: rect.top, left: rect.left, right: rect.right, bottom: rect.bottom, size });
    }
  }
}

/** Glyph boxes for ranges that already resolved to text inside formulas. */
function formulaBoxes(ranges: readonly Range[]) {
  const boxes: HighlightBox[] = [];
  const sizes = new Map<Element, number>();
  for (const range of ranges) {
    if (!glyphRange(range)) continue;
    addBoxes(range, formulaFontSize(range.startContainer, sizes), boxes);
  }
  return boxes;
}

/** Glyph boxes for the formula part of a live drag selection. */
function selectionBoxes(range: Range, view: HTMLElement) {
  const boxes: HighlightBox[] = [];
  const sizes = new Map<Element, number>();
  // Read the view each time: the reader reuses the block while chapters change.
  for (const formula of view.querySelectorAll<HTMLElement>(".katex-html")) {
    if (!range.intersectsNode(formula)) continue;
    const size = formulaFontSize(formula, sizes);
    const walker = document.createTreeWalker(formula, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (!range.intersectsNode(node)) continue;
      const piece = document.createRange();
      piece.selectNodeContents(node);
      if (node === range.startContainer) piece.setStart(node, range.startOffset);
      if (node === range.endContainer) piece.setEnd(node, range.endOffset);
      if (!piece.collapsed) addBoxes(piece, size, boxes);
    }
  }
  return boxes;
}

function visibleBoxes(range: Range) {
  return Array.from(range.getClientRects()).filter((box) =>
    box.width > 0 && box.height > 0 && box.bottom > 0 && box.top < innerHeight &&
    box.right > 0 && box.left < innerWidth);
}

function visibleSelectionRect(range: Range, atStart = false) {
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
  const [fallback, setFallback] = useState<DOMRect[]>([]);
  const [activeFallback, setActiveFallback] = useState<DOMRect[]>([]);
  const [bands, setBands] = useState<HighlightBand[]>([]);
  const [activeBands, setActiveBands] = useState<HighlightBand[]>([]);
  // Bumped when the reader switches language, view or font size: the formula
  // geometry must be measured again even if the article's size is unchanged.
  const [revision, setRevision] = useState(0);
  const button = useRef<HTMLButtonElement>(null);
  const painted = useRef<PaintedMark[]>([]);

  useEffect(() => {
    const article = root.current;
    if (!article) return;
    painted.current = [];
    const saved = state?.highlights ?? [];
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
        if (ranges.length) painted.current.push({ mark, ranges, element });
      }
    }
    const ranges = painted.current.flatMap((item) => item.ranges);
    // Per mark, so two separate highlights on one math row never merge into one band.
    const groups = painted.current.map((item) => item.ranges.filter(glyphRange));
    const whole: Range[] = [];
    const text: Range[] = [];
    for (const range of ranges) {
      if (formulaForRange(range)) whole.push(range);
      else if (!glyphRange(range)) text.push(range);
    }
    const formulas = whole.map(formulaForRange).filter((element): element is HTMLElement => Boolean(element));
    formulas.forEach((element) => element.classList.add("reading-formula-highlight"));
    const clearFormulas = () => formulas.forEach((element) => element.classList.remove("reading-formula-highlight"));
    let paintFallback: (() => void) | null = null;
    if (typeof Highlight === "function" && CSS.highlights) {
      CSS.highlights.set(registryName, new Highlight(...text));
    } else {
      paintFallback = () => setFallback(text.flatMap((range) => Array.from(range.getClientRects())));
    }
    // Formula glyphs are painted as row bands: fragment rects would leave gaps
    // where KaTeX keeps its spacing, and each fraction row would get its own strip.
    const paint = () => {
      const next = groups.flatMap((group) => group.length ? groupHighlightBands(formulaBoxes(group)) : []);
      setBands((current) => sameBands(current, next) ? current : next);
      paintFallback?.();
    };
    paint();
    let frame = 0;
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(() => { frame = 0; paint(); });
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // A font-size or reading-view switch reflows the article without a resize event.
    const flow = typeof ResizeObserver === "function" ? new ResizeObserver(schedule) : null;
    flow?.observe(article);
    return () => {
      clearFormulas();
      CSS.highlights?.delete(registryName);
      flow?.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [root, state, pending, hidden, revision]);

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
    if (!target) {
      setActiveBands([]);
      delete document.documentElement.dataset.readingFormulaBand;
      return;
    }
    const ranges = target.ranges;
    const whole: Range[] = [];
    const glyphs: Range[] = [];
    const text: Range[] = [];
    for (const range of ranges) {
      if (formulaForRange(range)) whole.push(range);
      else if (glyphRange(range)) glyphs.push(range);
      else text.push(range);
    }
    const formulas = whole.map(formulaForRange).filter((element): element is HTMLElement => Boolean(element));
    formulas.forEach((element) => element.classList.add("reading-formula-active"));
    const clearFormulas = () => formulas.forEach((element) => element.classList.remove("reading-formula-active"));
    const supported = typeof Highlight === "function" && Boolean(CSS.highlights);
    if (supported) {
      if (text.length) {
        const highlight = new Highlight(...text);
        highlight.priority = 1;
        CSS.highlights.set(activeRegistryName, highlight);
      }
    }
    // The bands replace the native selection inside formulas: browser selection
    // over KaTeX paint cannot merge glyph fragments or skip invisible spacing.
    const paint = () => {
      const boxes = ranges.length ? formulaBoxes(glyphs) : selectionBoxes(target.range, target.element);
      const next = groupHighlightBands(boxes);
      setActiveBands((current) => sameBands(current, next) ? current : next);
      const html = document.documentElement;
      if (next.length) {
        if (!html.hasAttribute("data-reading-formula-band")) html.dataset.readingFormulaBand = "";
      } else if (html.hasAttribute("data-reading-formula-band")) {
        delete html.dataset.readingFormulaBand;
      }
      if (!supported) {
        setActiveFallback(text.flatMap((range) => Array.from(range.getClientRects())));
      }
    };
    paint();
    let frame = 0;
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(() => { frame = 0; paint(); });
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      clearFormulas();
      CSS.highlights?.delete(activeRegistryName);
      delete document.documentElement.dataset.readingFormulaBand;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [target]);

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
    let queued = 0;
    const schedule = () => {
      if (queued) return;
      queued = requestAnimationFrame(() => { queued = 0; selected(); });
    };
    const clickMark = (event: MouseEvent) => {
      if (busy.current || !window.getSelection()?.isCollapsed || !(event.target instanceof Element) ||
        event.target.closest("a, button")) return;
      for (const { mark, ranges, element } of painted.current) {
        const range = ranges.find((candidate) => Array.from(candidate.getClientRects()).some(
          (box) => box.width > 0 && event.clientX >= box.left && event.clientX <= box.right &&
            event.clientY >= box.top && event.clientY <= box.bottom));
        if (!range) continue;
        const bounds = range.getBoundingClientRect();
        const rect = visibleSelectionRect(range) ?? (bounds.width > 0 && bounds.height > 0 ? bounds : null);
        if (rect) {
          setError(false);
          setTarget({ mark, remove: true, rect, range, view: mark.view, element, ranges, atStart: false });
        }
        return;
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") clear();
      else if (event.shiftKey) selected();
    };
    const dismissOutside = (event: PointerEvent) => { if (!button.current?.contains(event.target as Node)) clear(); };
    const onPointerUp = () => {
      // Let the committed target win over a preview frame that was queued mid-drag.
      if (queued) {
        cancelAnimationFrame(queued);
        queued = 0;
      }
      selected();
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
    document.addEventListener("pointerup", onPointerUp);
    article.addEventListener("click", clickMark);
    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("keyup", onKey);
    window.addEventListener("scroll", reposition, { passive: true });
    window.addEventListener("resize", reposition);
    const observer = new MutationObserver(() => {
      clear();
      setRevision((value) => value + 1);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-lang", "data-reading-view", "data-font-size"] });
    return () => {
      document.removeEventListener("selectionchange", schedule);
      document.removeEventListener("pointerup", onPointerUp);
      article.removeEventListener("click", clickMark);
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("keyup", onKey);
      window.removeEventListener("scroll", reposition);
      window.removeEventListener("resize", reposition);
      cancelAnimationFrame(queued);
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

  if (!target && !fallback.length && !activeFallback.length && !bands.length && !activeBands.length) return null;
  return createPortal(<>
    {fallback.map((rect, index) => (
      <span key={index} className="reading-highlight-overlay" aria-hidden="true"
        style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }} />
    ))}
    {bands.map((band, index) => (
      <span key={`formula-${index}`} className="reading-highlight-overlay reading-highlight-overlay--formula"
        aria-hidden="true" style={{ top: band.top, left: band.left, width: band.width, height: band.height }} />
    ))}
    {activeFallback.map((rect, index) => (
      <span key={index} className="reading-highlight-overlay reading-highlight-overlay--active" aria-hidden="true"
        style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }} />
    ))}
    {activeBands.map((band, index) => (
      <span key={`active-formula-${index}`}
        className="reading-highlight-overlay reading-highlight-overlay--formula reading-highlight-overlay--active"
        aria-hidden="true" style={{ top: band.top, left: band.left, width: band.width, height: band.height }} />
    ))}
    {target && (
      <div className="reading-highlight-action" style={{
        top: Math.max(8, Math.min(innerHeight - 44, target.rect.top > 48 ? target.rect.top - 42 : target.rect.bottom + 8)),
        left: Math.max(8, Math.min(innerWidth - 44, target.atStart ? target.rect.left - 8 : target.rect.right - 8)),
      }}>
        <button ref={button} type="button" disabled={!state && !failed}
          onPointerDown={(event) => event.preventDefault()} onClick={() => void apply()}
          {...(target.remove ? uiLabel("移除高亮", "Remove highlight") : uiLabel("添加高亮", "Highlight text"))}>
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 14 5 5m-6 1h7m7.5-16.5 2 2a1.5 1.5 0 0 1 0 2.1L12 16l-5 2 2-5 8.4-8.5a1.5 1.5 0 0 1 2.1 0Z" />
            {target.remove && <path d="M16 21h5" />}
          </svg>
        </button>
        {(error || (failed && !state)) && <span role="status" className="reading-highlight-error">
          <UiText zh="保存失败，点击重试" en="Could not save. Click to retry." />
        </span>}
      </div>
    )}
  </>, document.body);
}

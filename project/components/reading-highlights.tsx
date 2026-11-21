"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { highlightRanges, highlightSelection, indexHighlightText, orderedRange } from "@/lib/highlight-anchor";
import type { HighlightIndex, HighlightIndexMode } from "@/lib/highlight-anchor";
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

function rangesForMark(element: HTMLElement, mark: ReadingHighlight) {
  return highlightRanges(indexHighlightText(element), mark);
}

function startsAtFocus(raw: Range) {
  const selection = window.getSelection();
  return Boolean(selection?.focusNode === raw.startContainer && selection.focusOffset === raw.startOffset);
}

function sameBoundaries(first: Range, second: Range) {
  return first.startContainer === second.startContainer && first.startOffset === second.startOffset &&
    first.endContainer === second.endContainer && first.endOffset === second.endOffset;
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
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const [fallback, setFallback] = useState<DOMRect[]>([]);
  const [activeFallback, setActiveFallback] = useState<DOMRect[]>([]);
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
    const formulas = ranges.map(formulaForRange).filter((element): element is HTMLElement => Boolean(element));
    formulas.forEach((element) => element.classList.add("reading-formula-highlight"));
    const clearFormulas = () => formulas.forEach((element) => element.classList.remove("reading-formula-highlight"));
    if (typeof Highlight === "function" && CSS.highlights) {
      CSS.highlights.set(registryName, new Highlight(...ranges.filter((range) => !formulaForRange(range))));
      return () => { CSS.highlights.delete(registryName); clearFormulas(); };
    }
    const update = () => setFallback(ranges.flatMap((range) => Array.from(range.getClientRects())));
    let frame = 0;
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(() => { frame = 0; update(); });
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      clearFormulas();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [root, state, pending, hidden]);

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
    const ranges = target?.ranges ?? [];
    const formulas = ranges.map(formulaForRange).filter((element): element is HTMLElement => Boolean(element));
    formulas.forEach((element) => element.classList.add("reading-formula-active"));
    const clearFormulas = () => formulas.forEach((element) => element.classList.remove("reading-formula-active"));
    if (typeof Highlight === "function" && CSS.highlights) {
      const textRanges = ranges.filter((range) => !formulaForRange(range));
      if (textRanges.length) {
        const highlight = new Highlight(...textRanges);
        highlight.priority = 1;
        CSS.highlights.set(activeRegistryName, highlight);
      }
      return () => { CSS.highlights.delete(activeRegistryName); clearFormulas(); };
    }
    const update = () => setActiveFallback(ranges.flatMap((range) => Array.from(range.getClientRects())));
    update();
    let frame = 0;
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(() => { frame = 0; update(); });
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      clearFormulas();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [target]);

  useEffect(() => {
    const article = root.current;
    if (!article) return;
    const clear = () => { setTarget(null); setError(false); };
    const viewFor = (range: Range) => {
      const container = range.startContainer;
      const element = (container instanceof Element ? container : container.parentElement)?.closest<HTMLElement>("[data-highlight-view]");
      if (!element || !article.contains(element) || !element.contains(range.endContainer)) return null;
      return element;
    };
    const targetFor = (raw: Range, commit: boolean) => {
      const range = orderedRange(raw);
      const atStart = startsAtFocus(raw);
      const element = viewFor(range);
      if (!element) { clear(); return; }
      const rect = visibleSelectionRect(range, atStart);
      if (!rect) { clear(); return; }
      const view = element.dataset.highlightView as HighlightView;
      const existing = painted.current.find((item) => item.mark.view === view && matchingMark(item.ranges, range));
      if (!commit) {
        setError(false);
        setTarget((current) => {
          if (current?.mark && sameBoundaries(current.range, range)) return current;
          return {
            mark: existing?.mark ?? null,
            remove: Boolean(existing),
            rect,
            range: range.cloneRange(),
            view,
            element,
            ranges: existing?.ranges ?? [],
            atStart,
          };
        });
        return;
      }
      const mark = existing?.mark ?? highlightSelection(element, range, view);
      if (!mark) { clear(); return; }
      const ranges = existing?.ranges ?? rangesForMark(element, mark);
      setError(false);
      setTarget({ mark, remove: Boolean(existing), rect, range: range.cloneRange(), view, element, ranges, atStart });
    };
    const selected = (commit: boolean) => {
      const selection = window.getSelection();
      const raw = selection?.rangeCount && !selection.isCollapsed ? selection.getRangeAt(0) : null;
      if (!raw) {
        // A click that follows pointerup must be allowed to open the remove pen.
        if (commit) clear();
        return;
      }
      if (busy || document.activeElement === button.current) return;
      targetFor(raw, commit);
    };
    let queued = 0;
    const schedule = () => {
      if (queued) return;
      queued = requestAnimationFrame(() => { queued = 0; selected(false); });
    };
    const clickMark = (event: MouseEvent) => {
      if (busy || !window.getSelection()?.isCollapsed || !(event.target instanceof Element) ||
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
      else if (event.shiftKey) selected(true);
    };
    const dismissOutside = (event: PointerEvent) => { if (!button.current?.contains(event.target as Node)) clear(); };
    const onPointerUp = () => {
      // Let the committed target win over a preview frame that was queued mid-drag.
      if (queued) {
        cancelAnimationFrame(queued);
        queued = 0;
      }
      selected(true);
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
    article.addEventListener("pointerup", onPointerUp);
    article.addEventListener("click", clickMark);
    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("keyup", onKey);
    window.addEventListener("scroll", reposition, { passive: true });
    window.addEventListener("resize", reposition);
    const observer = new MutationObserver(clear);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-lang", "data-reading-view", "data-font-size"] });
    return () => {
      document.removeEventListener("selectionchange", schedule);
      article.removeEventListener("pointerup", onPointerUp);
      article.removeEventListener("click", clickMark);
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("keyup", onKey);
      window.removeEventListener("scroll", reposition);
      window.removeEventListener("resize", reposition);
      cancelAnimationFrame(queued);
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [root, busy]);

  async function apply() {
    if (!target || busy) return;
    if (!state?.account) {
      refresh();
      return;
    }
    const previous = target;
    if (!previous.mark && previous.remove) return;
    const mark = previous.mark ?? highlightSelection(previous.element, previous.range, previous.view);
    if (!mark) { setTarget(null); return; }
    const ranges = previous.ranges.length ? previous.ranges : rangesForMark(previous.element, mark);
    const restoring: Target = { ...previous, mark, ranges };

    setBusy(true);
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
        setBusy(false);
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
      setBusy(false);
    }
  }

  if (!target && !fallback.length && !activeFallback.length) return null;
  return createPortal(<>
    {fallback.map((rect, index) => (
      <span key={index} className="reading-highlight-overlay" aria-hidden="true"
        style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }} />
    ))}
    {activeFallback.map((rect, index) => (
      <span key={index} className="reading-highlight-overlay reading-highlight-overlay--active" aria-hidden="true"
        style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }} />
    ))}
    {target && (
      <div className="reading-highlight-action" style={{
        top: Math.max(8, Math.min(innerHeight - 44, target.rect.top > 48 ? target.rect.top - 42 : target.rect.bottom + 8)),
        left: Math.max(8, Math.min(innerWidth - 44, target.atStart ? target.rect.left - 8 : target.rect.right - 8)),
      }}>
        <button ref={button} type="button" disabled={busy || (!state && !failed)}
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

"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { highlightRanges, highlightSelection, indexHighlightText } from "@/lib/highlight-anchor";
import { changeReadingState } from "@/lib/reading-state-client";
import type { HighlightView, ReadingHighlight, ReadingState } from "@/lib/reading-state-types";
import { uiLabel } from "@/lib/ui-language";
import { UiText } from "./ui-text";

const registryName = "lovismind-reading-highlight";

type Target = { mark: ReadingHighlight; remove: boolean; rect: DOMRect; range: Range };
type PaintedMark = { mark: ReadingHighlight; ranges: Range[] };

function formulaForRange(range: Range) {
  const node = range.startContainer.childNodes[range.startOffset];
  return node instanceof HTMLElement && node.matches(".katex") ? node : null;
}

function visibleSelectionRect(range: Range) {
  return Array.from(range.getClientRects()).findLast((box) =>
    box.width > 0 && box.height > 0 && box.bottom > 0 && box.top < innerHeight &&
    box.right > 0 && box.left < innerWidth);
}

function matchingMark(ranges: Range[], range: Range) {
  return ranges.some((candidate) =>
    candidate.isPointInRange(range.startContainer, range.startOffset) ||
    candidate.isPointInRange(range.endContainer, range.endOffset) ||
    range.isPointInRange(candidate.startContainer, candidate.startOffset));
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
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const [fallback, setFallback] = useState<DOMRect[]>([]);
  const button = useRef<HTMLButtonElement>(null);
  const painted = useRef<PaintedMark[]>([]);

  useEffect(() => {
    const article = root.current;
    if (!article) return;
    painted.current = [];
    for (const element of article.querySelectorAll<HTMLElement>("[data-highlight-view]")) {
      const marks = state?.highlights.filter((mark) => mark.view === element.dataset.highlightView) ?? [];
      if (!marks.length) continue;
      const index = indexHighlightText(element);
      for (const mark of marks) painted.current.push({ mark, ranges: highlightRanges(index, mark) });
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
  }, [root, state]);

  useEffect(() => {
    const article = root.current;
    if (!article) return;
    const clear = () => { setTarget(null); setError(false); };
    const selected = () => {
      if (busy || document.activeElement === button.current) return;
      const range = window.getSelection()?.rangeCount ? window.getSelection()!.getRangeAt(0) : null;
      if (!range || range.collapsed) { clear(); return; }
      const container = range.startContainer;
      const element = (container instanceof Element ? container : container.parentElement)?.closest<HTMLElement>("[data-highlight-view]");
      if (!element || !article.contains(element) || !element.contains(range.endContainer)) { clear(); return; }
      const rect = visibleSelectionRect(range);
      if (!rect) { clear(); return; }
      const existing = painted.current.find((item) => item.mark.view === element.dataset.highlightView && matchingMark(item.ranges, range));
      const mark = existing?.mark ?? highlightSelection(element, range, element.dataset.highlightView as HighlightView);
      if (mark) {
        setError(false);
        setTarget({ mark, rect, remove: Boolean(existing), range: range.cloneRange() });
      }
    };
    const clickMark = (event: MouseEvent) => {
      if (busy || !window.getSelection()?.isCollapsed || !(event.target instanceof Element) ||
        event.target.closest("a, button")) return;
      for (const { mark, ranges } of painted.current) {
        const range = ranges.find((candidate) => Array.from(candidate.getClientRects()).some(
          (rect) => rect.width > 0 && event.clientX >= rect.left && event.clientX <= rect.right &&
            event.clientY >= rect.top && event.clientY <= rect.bottom));
        if (!range) continue;
        const rect = visibleSelectionRect(range);
        if (rect) {
          setError(false);
          setTarget({ mark, rect, range, remove: true });
        }
        return;
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") clear();
      else if (event.shiftKey) selected();
    };
    const dismissOutside = (event: PointerEvent) => { if (!button.current?.contains(event.target as Node)) clear(); };
    let frame = 0;
    const reposition = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setTarget((value) => {
          if (!value) return value;
          const rect = visibleSelectionRect(value.range);
          if (!rect) return null;
          return rect.top === value.rect.top && rect.right === value.rect.right ? value : { ...value, rect };
        });
      });
    };
    const previewSelection = () => {
      const selection = window.getSelection();
      const range = selection?.rangeCount && !selection.isCollapsed ? selection.getRangeAt(0) : null;
      article.querySelectorAll<HTMLElement>(".katex").forEach((formula) => {
        formula.classList.toggle("reading-formula-selected", Boolean(range && range.intersectsNode(formula)));
      });
    };
    document.addEventListener("selectionchange", previewSelection);
    const observer = new MutationObserver(clear);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-lang", "data-reading-view", "data-font-size"] });
    article.addEventListener("pointerup", selected);
    article.addEventListener("click", clickMark);
    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("keyup", onKey);
    window.addEventListener("scroll", reposition, { passive: true });
    window.addEventListener("resize", reposition);
    return () => {
      document.removeEventListener("selectionchange", previewSelection);
      article.querySelectorAll(".reading-formula-selected").forEach((formula) => formula.classList.remove("reading-formula-selected"));
      article.removeEventListener("pointerup", selected);
      article.removeEventListener("click", clickMark);
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("keyup", onKey);
      window.removeEventListener("scroll", reposition);
      window.removeEventListener("resize", reposition);
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
    setBusy(true);
    setError(false);
    try {
      await changeReadingState(state.account, book, chapter, target.remove
        ? { action: "remove-highlight", id: target.mark.id }
        : { action: "highlight", mark: target.mark });
      window.getSelection()?.removeAllRanges();
      setTarget(null);
      refresh();
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  if (!target && !fallback.length) return null;
  return createPortal(<>
    {fallback.map((rect, index) => (
      <span key={index} className="reading-highlight-overlay" aria-hidden="true"
        style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }} />
    ))}
    {target && (
      <div className="reading-highlight-action" style={{
        top: Math.max(8, Math.min(innerHeight - 44, target.rect.top > 48 ? target.rect.top - 42 : target.rect.bottom + 8)),
        left: Math.max(8, Math.min(innerWidth - 44, target.rect.right - 8)),
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

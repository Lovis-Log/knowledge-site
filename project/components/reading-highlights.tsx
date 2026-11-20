"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { highlightRanges, highlightSelection, indexHighlightText } from "@/lib/highlight-anchor";
import { changeReadingState } from "@/lib/reading-state-client";
import type { HighlightView, ReadingHighlight, ReadingState } from "@/lib/reading-state-types";
import { uiLabel } from "@/lib/ui-language";
import { UiText } from "./ui-text";

const registryName = "lovismind-reading-highlight";

type Target = { mark: ReadingHighlight; remove: boolean; rect: DOMRect };
type PaintedMark = { mark: ReadingHighlight; ranges: Range[] };

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
    if (typeof Highlight === "function" && CSS.highlights) {
      CSS.highlights.set(registryName, new Highlight(...ranges));
      return () => { CSS.highlights.delete(registryName); };
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
      const rect = Array.from(range.getClientRects()).findLast((box) => box.width > 0 && box.height > 0);
      if (!rect) { clear(); return; }
      const existing = painted.current.find((item) => item.mark.view === element.dataset.highlightView && matchingMark(item.ranges, range));
      const mark = existing?.mark ?? highlightSelection(element, range, element.dataset.highlightView as HighlightView);
      if (mark) {
        setError(false);
        setTarget({ mark, rect, remove: Boolean(existing) });
      }
    };
    const clickMark = (event: MouseEvent) => {
      if (busy || !window.getSelection()?.isCollapsed || !(event.target instanceof Element) ||
        event.target.closest("a, button")) return;
      const item = painted.current.find(({ ranges }) => ranges.some((range) => Array.from(range.getClientRects()).some(
        (rect) => rect.width > 0 && event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom)));
      if (item) {
        setError(false);
        setTarget({ mark: item.mark, rect: new DOMRect(event.clientX, event.clientY, 0, 0), remove: true });
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") clear();
      else if (event.shiftKey) selected();
    };
    const dismissOutside = (event: PointerEvent) => { if (!button.current?.contains(event.target as Node)) clear(); };
    const observer = new MutationObserver(clear);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-lang", "data-reading-view", "data-font-size"] });
    article.addEventListener("pointerup", selected);
    article.addEventListener("click", clickMark);
    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("keyup", onKey);
    window.addEventListener("scroll", clear, { passive: true });
    window.addEventListener("resize", clear);
    return () => {
      article.removeEventListener("pointerup", selected);
      article.removeEventListener("click", clickMark);
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("keyup", onKey);
      window.removeEventListener("scroll", clear);
      window.removeEventListener("resize", clear);
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

"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { highlightBetween, highlightRanges, highlightSelection, indexHighlightText } from "@/lib/highlight-anchor";
import type { HighlightIndex, HighlightIndexMode } from "@/lib/highlight-anchor";
import { drawFormulaHighlights, type FormulaLayers } from "@/lib/highlight-geometry";
import type { HighlightQueueHandle } from "@/lib/reading-highlight-queue";
import type { HighlightView, ReadingHighlight, ReadingState } from "@/lib/reading-state-types";
import { uiLabel } from "@/lib/ui-language";
import { UiText } from "./ui-text";

type Target = {
  mark: ReadingHighlight;
  remove: boolean;
  rect: DOMRect;
  range: Range;
  element: HTMLElement;
  ranges: Range[];
  atStart: boolean;
};
type PaintedMark = { mark: ReadingHighlight; ranges: Range[]; element: HTMLElement };
type MathCaret = { node: Text; offset: number };
type MathPoint = { clientX: number; clientY: number };
type MathDrag = {
  formula: Element;
  origin: DOMRect;
  glyphs: { node: Text; rect: DOMRect }[];
  anchor: MathCaret;
  x: number;
  y: number;
};

const savedPaint = "lovismind-reading-highlight";
const selectionPaint = "lovismind-reading-selection";

function mathFormula({ clientX, clientY }: MathPoint) {
  return document.elementFromPoint(clientX, clientY)?.closest(".katex-display .katex-html");
}

function mathCaret({ formula, origin, glyphs }: Omit<MathDrag, "anchor" | "x" | "y">, point: MathPoint): MathCaret | undefined {
  const bounds = formula.getBoundingClientRect();
  const x = point.clientX - bounds.left + origin.left;
  const y = point.clientY - bounds.top + origin.top;
  let nearest: MathDrag["glyphs"][number] | undefined;
  let best = Infinity;
  for (const glyph of glyphs) {
    const { rect } = glyph;
    const across = Math.max(rect.left - x, 0, x - rect.right);
    const down = Math.max(rect.top - y, 0, y - rect.bottom);
    const center = Math.abs(y - (rect.top + rect.bottom) / 2);
    const score = across ** 2 + down ** 2 + center * 0.05;
    if (score < best) { best = score; nearest = glyph; }
  }
  if (!nearest) return;
  const { node, rect } = nearest;
  if (x <= rect.left) return { node, offset: 0 };
  if (x >= rect.right) return { node, offset: node.length };
  if (node.length === 1) return { node, offset: x - rect.left < rect.width / 2 ? 0 : 1 };

  // KaTeX can emit several letters in one text node. Use actual caret
  // positions so proportional type and multi-code-unit symbols stay precise.
  const range = new Range();
  const viewportX = point.clientX;
  let offset = 0, closest = Infinity, boundary = 0;
  for (const symbol of ["", ...node.data]) {
    boundary += symbol.length;
    range.setStart(node, boundary);
    range.collapse(true);
    const distance = Math.abs(viewportX - range.getBoundingClientRect().left);
    if (distance < closest) { closest = distance; offset = boundary; }
  }
  return { node, offset };
}

function startMathDrag(point: MathPoint): MathDrag | undefined {
  const formula = mathFormula(point);
  if (!formula) return;
  const walker = document.createTreeWalker(formula, NodeFilter.SHOW_TEXT);
  const glyphs: MathDrag["glyphs"] = [];
  const range = new Range();
  for (let node = walker.nextNode(); node instanceof Text; node = walker.nextNode()) {
    if (!node.data.trim() || node.parentElement?.closest(".vlist-s")) continue;
    range.selectNodeContents(node);
    const rect = range.getBoundingClientRect();
    if (rect.width && rect.height) glyphs.push({ node, rect });
  }
  const geometry = { formula, origin: formula.getBoundingClientRect(), glyphs };
  const anchor = mathCaret(geometry, point);
  if (anchor) return { ...geometry, anchor, x: point.clientX, y: point.clientY };
}

function paint(name: string, ranges: readonly Range[]) {
  if (!CSS.highlights || typeof Highlight !== "function") return false;
  if (ranges.length) {
    const highlight = new Highlight();
    for (const range of ranges) highlight.add(range);
    CSS.highlights.set(name, highlight);
  } else CSS.highlights.delete(name);
  return true;
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

function sameAnchor(a: ReadingHighlight, b: ReadingHighlight) {
  return a.format === b.format && a.start === b.start && a.quote === b.quote;
}

function sameRanges(a: readonly Range[], b: readonly Range[]) {
  return a.length === b.length && a.every((range, i) => {
    const other = b[i];
    return range.startContainer === other.startContainer && range.startOffset === other.startOffset &&
      range.endContainer === other.endContainer && range.endOffset === other.endOffset;
  });
}

export function ReadingHighlights({ root, account, queue, state, failed, authExpired, refresh }: {
  root: RefObject<HTMLDivElement | null>;
  account?: string;
  queue: HighlightQueueHandle;
  state: ReadingState | null;
  failed?: boolean;
  authExpired?: boolean;
  refresh: () => void;
}) {
  const [target, setTarget] = useState<Target | null>(null);
  const applying = useRef(false);
  const [revision, setRevision] = useState(0);
  const button = useRef<HTMLButtonElement>(null);
  const painted = useRef<PaintedMark[]>([]);
  const savedFormulas = useRef<FormulaLayers>(new Map());
  const previewFormulas = useRef<FormulaLayers>(new Map());
  const indexes = useRef(new WeakMap<HTMLElement, Map<HighlightIndexMode, HighlightIndex>>());
  const savedHighlights = state?.highlights;
  const activeElement = target?.element;
  const activeRanges = target?.remove ? undefined : target?.ranges;

  function getIndex(element: HTMLElement, mode: HighlightIndexMode = "visual") {
    let byMode = indexes.current.get(element);
    if (!byMode) {
      byMode = new Map();
      indexes.current.set(element, byMode);
    }
    let index = byMode.get(mode);
    if (!index) {
      index = indexHighlightText(element, mode);
      byMode.set(mode, index);
    }
    return index;
  }

  useEffect(() => {
    const article = root.current;
    if (!article) return;
    const marks = new Map(savedHighlights?.map((mark) => [mark.id, mark]));
    for (const change of [...queue.confirmed, ...queue.pending.map((write) => write.change)]) {
      if (change.action === "highlight") marks.set(change.mark.id, change.mark);
      else marks.delete(change.id);
    }
    const next: PaintedMark[] = [];
    for (const element of article.querySelectorAll<HTMLElement>("[data-highlight-view]")) {
      for (const mark of marks.values()) {
        if (mark.view !== element.dataset.highlightView) continue;
        const ranges = highlightRanges(getIndex(element), mark, (mode) => getIndex(element, mode));
        if (ranges.length) next.push({ mark, ranges, element });
      }
    }
    painted.current = next;
    const ranges = next.flatMap((item) => item.ranges);
    const layers = savedFormulas.current;
    const formulaMarks = next.map((item) => item.ranges);
    const renderFormulas = () => drawFormulaHighlights(layers, formulaMarks);
    renderFormulas();
    const registered = paint(savedPaint, ranges);
    let active = true;
    const resize = layers.size ? new ResizeObserver(renderFormulas) : null;
    if (layers.size && document.fonts.status === "loading")
      void document.fonts.ready.then(() => { if (active) renderFormulas(); });
    for (const formula of layers.keys()) resize?.observe(formula);
    return () => {
      active = false;
      resize?.disconnect();
      drawFormulaHighlights(layers, []);
      if (registered) CSS.highlights.delete(savedPaint);
    };
  }, [root, savedHighlights, queue.pending, queue.confirmed, revision]);

  const settled = useRef(queue.revision);
  const refreshRef = useRef(refresh);
  refreshRef.current = refresh;
  useEffect(() => {
    if (settled.current === queue.revision || queue.pending.length) return;
    settled.current = queue.revision;
    refreshRef.current();
  }, [queue.revision, queue.pending.length]);
  useEffect(() => {
    if (savedHighlights) queue.acknowledge(savedHighlights);
  }, [savedHighlights]); // Confirm only against a newly fetched server snapshot.

  useEffect(() => {
    if (!activeElement || !activeRanges?.length) return;
    const layers = previewFormulas.current;
    drawFormulaHighlights(layers, [activeRanges]);
    const registered = paint(selectionPaint, activeRanges);
    if (registered || layers.size) activeElement.setAttribute("data-reading-highlight-selection", "");
    return () => {
      activeElement.removeAttribute("data-reading-highlight-selection");
      drawFormulaHighlights(layers, []);
      if (registered) CSS.highlights.delete(selectionPaint);
    };
  }, [activeElement, activeRanges]);

  useEffect(() => {
    const article = root.current;
    if (!article) return;
    const clear = () => setTarget(null);
    const viewFor = (node: Node) => (node instanceof Element ? node : node.parentElement)
      ?.closest<HTMLElement>("[data-highlight-view]");
    let drag: MathDrag | undefined;
    let mathPreview: HTMLElement | undefined;
    let mathMark: ReadingHighlight | undefined;
    let mathFrame = 0;
    let mathFinished = false;

    const clearMathPreview = () => {
      if (!mathPreview) return;
      mathPreview.removeAttribute("data-reading-highlight-selection");
      CSS.highlights?.delete(selectionPaint);
      drawFormulaHighlights(previewFormulas.current, []);
      mathPreview = undefined;
      mathMark = undefined;
    };
    const mathSelection = (point: MathPoint) => {
      if (!drag || Math.hypot(drag.x - point.clientX, drag.y - point.clientY) < 3 ||
          mathFormula(point) !== drag.formula) return;
      const element = viewFor(drag.formula);
      const focus = mathCaret(drag, point);
      if (!element || !focus) return;
      const index = getIndex(element);
      const mark = highlightBetween(index, drag.anchor, focus, element.dataset.highlightView as HighlightView);
      if (!mark) return;
      return { element, index, mark, focus, atStart: point.clientX < drag.x };
    };
    const showTarget = (element: HTMLElement, index: HighlightIndex, mark: ReadingHighlight, range: Range, atStart: boolean) => {
      const ranges = highlightRanges(index, mark);
      const existing = painted.current.find((item) => item.element === element &&
        (sameAnchor(item.mark, mark) || sameRanges(item.ranges, ranges)));
      const rect = visibleSelectionRect(range, atStart);
      if (!rect) { clear(); return; }
      setTarget({ mark: existing?.mark ?? mark, remove: Boolean(existing), rect, range, element, ranges, atStart });
    };
    const selected = () => {
      if (mathFinished || document.activeElement === button.current) return;
      const selection = window.getSelection();
      if (!selection?.rangeCount || selection.isCollapsed) {
        setTarget((current) => current?.remove ? current : null);
        return;
      }
      const raw = selection.getRangeAt(0);
      const start = viewFor(raw.startContainer);
      const end = viewFor(raw.endContainer);
      const element = start ?? end;
      if (!element || !article.contains(element) || (start && end && start !== end)) { clear(); return; }
      const range = raw.cloneRange();
      if (!start) range.setStart(element, 0);
      if (!end) range.setEnd(element, element.childNodes.length);
      const index = getIndex(element);
      const mark = highlightSelection(index, range, element.dataset.highlightView as HighlightView);
      if (!mark) { clear(); return; }
      const atStart = selection.focusNode === raw.startContainer && selection.focusOffset === raw.startOffset;
      showTarget(element, index, mark, range, atStart);
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
      // Keyboard selections and touch handles get a quiet interval before anchoring.
      if (pointer !== null || queued) return;
      cancelSelection();
      settle = window.setTimeout(queueSelection, 120);
    };
    const clickMark = (event: MouseEvent) => {
      if (mathFinished || !window.getSelection()?.isCollapsed || !(event.target instanceof Element) ||
        event.target.closest("a, button")) return;
      const view = viewFor(event.target);
      if (!view) return;
      const hitElement = event.target;
      const ordered = painted.current.filter((item) => item.element === view)
        .sort((left, right) => left.mark.quote.length - right.mark.quote.length);
      for (const { mark, ranges, element } of ordered) {
        const range = ranges.find((part) => part.intersectsNode(hitElement) &&
          Array.from(part.getClientRects()).some((box) => event.clientX >= box.left &&
            event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom));
        if (!range) continue;
        const rect = visibleSelectionRect(range);
        if (rect) setTarget({ mark, remove: true, rect, range, element, ranges, atStart: false });
        return;
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        cancelSelection();
        drag = undefined;
        mathFinished = false;
        clear();
        clearMathPreview();
      } else if (event.shiftKey && !event.repeat && /^(Arrow|Home$|End$|Page)/.test(event.key)) {
        mathFinished = false;
        clear();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (button.current?.contains(event.target as Node)) return;
      cancelSelection();
      clear();
      drag = undefined;
      mathFinished = false;
      clearMathPreview();
      if (event.isPrimary && event.button === 0 && article.contains(event.target as Node)) {
        pointer = event.pointerId;
        if (event.pointerType === "mouse") drag = startMathDrag(event);
      }
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== pointer || !drag) return;
      cancelAnimationFrame(mathFrame);
      mathFrame = requestAnimationFrame(() => {
        const selection = mathSelection(event);
        if (!selection) { clearMathPreview(); return; }
        if (mathMark && sameAnchor(mathMark, selection.mark)) return;
        const ranges = highlightRanges(selection.index, selection.mark);
        drawFormulaHighlights(previewFormulas.current, [ranges]);
        paint(selectionPaint, ranges);
        mathPreview = selection.element;
        mathMark = selection.mark;
        mathPreview.setAttribute("data-reading-highlight-selection", "");
      });
    };
    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerId !== pointer) return;
      pointer = null;
      cancelAnimationFrame(mathFrame);
      clearMathPreview();
      const selection = event.type === "pointerup" ? mathSelection(event) : undefined;
      drag = undefined;
      if (!selection) { queueSelection(); return; }
      mathFinished = true;
      const range = new Range();
      range.setStart(selection.focus.node, selection.focus.offset);
      range.collapse(true);
      showTarget(selection.element, selection.index, selection.mark, range, selection.atStart);
    };
    const onBlur = () => {
      pointer = null;
      drag = undefined;
      cancelSelection();
      cancelAnimationFrame(mathFrame);
      clearMathPreview();
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
    document.addEventListener("pointermove", onPointerMove, { capture: true, passive: true });
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
    const content = new MutationObserver((changes) => {
      if (changes.every((change) => change.type === "childList" &&
        [...change.addedNodes, ...change.removedNodes].every((node) =>
          node instanceof Element && node.classList.contains("reading-math-highlight")))) return;
      indexes.current = new WeakMap();
      clear();
      setRevision((value) => value + 1);
    });
    content.observe(article, { childList: true, characterData: true, subtree: true });
    return () => {
      document.removeEventListener("selectionchange", schedule);
      document.removeEventListener("pointermove", onPointerMove, true);
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
      cancelAnimationFrame(mathFrame);
      clearMathPreview();
      observer.disconnect();
      content.disconnect();
    };
  }, [root]);

  function apply() {
    if (!target || applying.current) return;
    if (!account) {
      refresh();
      return;
    }
    applying.current = true;
    queueMicrotask(() => { applying.current = false; });
    const { mark, remove } = target;
    if (queue.enqueue(remove ? { action: "remove-highlight", id: mark.id } : { action: "highlight", mark })) {
      window.getSelection()?.removeAllRanges();
      setTarget(null);
    }
  }

  const notice = !authExpired && (queue.problem || (queue.pending.length ? "pending" : failed && !state ? "unavailable" : undefined));
  const noticeText = notice === "full"
    ? <UiText zh="待同步高亮已满，点击重试" en="Highlight queue full. Tap to retry." />
    : notice === "rejected"
      ? <UiText zh="高亮未保存，点击关闭" en="Highlight not saved. Tap to dismiss." />
      : notice === "retry" || notice === "pending"
        ? <UiText zh="高亮待同步，点击重试" en="Highlight pending. Tap to retry." />
        : <UiText zh="高亮暂不可用，点击重试" en="Highlights unavailable. Tap to retry." />;
  const noticeAction = notice === "unavailable" ? refresh : notice === "rejected" ? queue.dismiss : queue.retry;

  if (!target && !notice) return null;
  return createPortal(<>
    {target && (
      <div className="reading-highlight-action" style={{
        top: Math.max(8, Math.min(innerHeight - 44, target.rect.top > 48 ? target.rect.top - 42 : target.rect.bottom + 8)),
        left: Math.max(8, Math.min(innerWidth - 44, target.atStart ? target.rect.left - 8 : target.rect.right - 8)),
      }}>
        <button ref={button} type="button" disabled={!account}
          onPointerDown={(event) => event.preventDefault()} onClick={apply}
          {...(target.remove ? uiLabel("移除高亮", "Remove highlight") : uiLabel("添加高亮", "Highlight text"))}>
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            {target.remove ? <path d="M6 6l12 12M18 6 6 18" /> :
              <path d="m5 14 5 5m-6 1h7m7.5-16.5 2 2a1.5 1.5 0 0 1 0 2.1L12 16l-5 2 2-5 8.4-8.5a1.5 1.5 0 0 1 2.1 0Z" />}
          </svg>
        </button>
      </div>
    )}
    {notice && (
      <div className="reading-highlight-action" style={{ left: 12, bottom: 12 }}>
        <span role="status" className="reading-highlight-error"
          style={{ position: "static", inset: "auto", maxWidth: 260 }}>
          <button type="button" onClick={noticeAction} style={{
            width: "auto", height: "auto", padding: 0, border: 0, background: "transparent",
            color: "inherit", font: "inherit", textAlign: "left",
          }}>
            {noticeText}
          </button>
        </span>
      </div>
    )}
  </>, document.body);
}

"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { UiText } from "@/components/ui-text";

export function BookShelf({ children, headingId }: { children: ReactNode; headingId: string }) {
  const shelfRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const shelf = shelfRef.current;
    const hint = hintRef.current;
    const thumb = thumbRef.current;
    if (!shelf || !hint || !thumb) return;

    let frame: number | undefined;
    const update = () => {
      frame = undefined;
      const visible = shelf.clientWidth;
      const total = shelf.scrollWidth;
      const maxOffset = total - visible;
      const offset = Math.max(0, Math.min(shelf.scrollLeft, maxOffset));
      hint.dataset.overflow = String(visible > 0 && maxOffset > 1);
      thumb.style.width = `${total > 0 ? visible / total * 100 : 100}%`;
      thumb.style.transform = `translateX(${visible > 0 ? offset / visible * 100 : 0}%)`;
    };
    const scheduleUpdate = () => {
      if (frame === undefined) frame = requestAnimationFrame(update);
    };

    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(shelf);
    shelf.addEventListener("scroll", scheduleUpdate, { passive: true });
    update();

    return () => {
      shelf.removeEventListener("scroll", scheduleUpdate);
      observer.disconnect();
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }, [children]);

  return (
    <>
      <div ref={shelfRef} className="library__grid book-shelf" role="region" aria-labelledby={headingId} tabIndex={0}>
        {children}
      </div>
      <div ref={hintRef} className="book-shelf__hint" data-overflow="false">
        <p><UiText zh="左右滑动选书" /><span aria-hidden="true"> ↔</span></p>
        <div className="book-shelf__track" aria-hidden="true">
          <span ref={thumbRef} className="book-shelf__thumb" />
        </div>
      </div>
    </>
  );
}

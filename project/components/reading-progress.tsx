"use client";

import { useEffect, useRef, useState } from "react";
import { readProgress, writeLastRead, writeProgress } from "@/lib/progress";

interface ReadingProgressProps {
  bookSlug: string;
  chapterSlug: string;
}

function scrollMax(): number {
  return document.documentElement.scrollHeight - window.innerHeight;
}

function currentPercent(): number {
  const max = scrollMax();
  if (max <= 0) return 0;
  return Math.min(100, Math.max(0, (window.scrollY / max) * 100));
}

export function ReadingProgress({ bookSlug, chapterSlug }: ReadingProgressProps) {
  const [percent, setPercent] = useState(0);
  const key = `${bookSlug}/${chapterSlug}`;
  const lastSaved = useRef(0);
  // 恢复滚动位置之前不写进度，避免初始的 scrollY=0 覆盖已保存的位置
  const ready = useRef(false);

  useEffect(() => {
    ready.current = false;
    writeLastRead({ book: bookSlug, chapter: chapterSlug, updatedAt: new Date().toISOString() });

    const saved = readProgress()[key];
    const shouldRestore = typeof saved === "number" && saved > 2 && saved < 98;

    if (!shouldRestore) {
      ready.current = true;
      return;
    }

    const first = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const max = scrollMax();
        if (max <= 0) {
          ready.current = true;
          return;
        }
        const root = document.documentElement;
        const previous = root.style.scrollBehavior;
        root.style.scrollBehavior = "auto";
        window.scrollTo(0, (saved / 100) * max);
        requestAnimationFrame(() => {
          root.style.scrollBehavior = previous;
          ready.current = true;
        });
      });
    });

    return () => cancelAnimationFrame(first);
  }, [bookSlug, chapterSlug, key]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const next = currentPercent();
      setPercent(next);

      if (!ready.current) return;
      const now = Date.now();
      if (now - lastSaved.current > 400) {
        lastSaved.current = now;
        writeProgress(key, next);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [key]);

  useEffect(() => {
    return () => {
      if (!ready.current) return;
      writeProgress(key, currentPercent());
    };
  }, [key]);

  return (
    <div className="reading-progress" aria-hidden="true">
      <span style={{ width: `${percent}%` }} />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { changeReadingState, saveReadingPosition } from "@/lib/reading-state-client";
import type { ReadingProgressEntry } from "@/lib/reading-state-types";
import { uiLabel } from "@/lib/ui-language";
import { UiText } from "./ui-text";

function scrollMax() {
  return document.documentElement.scrollHeight - window.innerHeight;
}

function currentPercent() {
  const max = scrollMax();
  return max <= 0 ? 100 : Math.min(100, Math.max(0, window.scrollY / max * 100));
}

export function ReadingProgress({ book, chapter, account, entry }: {
  book: string;
  chapter: string;
  account?: string;
  entry?: ReadingProgressEntry;
}) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let frame = 0;
    let restore = 0;
    let saveTimer = 0;
    let changed = false;
    let ready = !account;
    let lastScrollY = window.scrollY;
    let current = currentPercent();
    let lastRecorded = current;
    let furthest = entry?.furthest ?? 0;
    let observedAt = entry?.observedAt ?? 0;
    let dirty = false;

    const flush = () => {
      window.clearTimeout(saveTimer);
      saveTimer = 0;
      if (!account || !dirty) return;
      dirty = false;
      saveReadingPosition(account, { book, chapter, resume: lastRecorded, furthest, observedAt, lastReadAt: observedAt });
    };

    const update = (scroll: boolean) => {
      current = currentPercent();
      setPercent(current);
      const newScrollY = window.scrollY;
      if (scroll && newScrollY !== lastScrollY) changed = true;
      if (scroll && ready && changed && account && newScrollY !== lastScrollY) {
        lastRecorded = current;
        furthest = Math.max(furthest, current);
        observedAt = Math.max(Date.now(), observedAt + 1);
        dirty = true;
        if (!saveTimer) saveTimer = window.setTimeout(flush, 3500);
      }
      lastScrollY = newScrollY;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(() => {
        frame = 0;
        update(true);
      });
    };
    const onResize = () => update(false);
    const onLeavingPage = () => { update(true); flush(); };
    const onHidden = () => { if (document.visibilityState === "hidden") onLeavingPage(); };
    const observer = new ResizeObserver(onResize);
    const article = document.querySelector(".reading-main");
    if (article) observer.observe(article);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("pagehide", onLeavingPage);
    document.addEventListener("visibilitychange", onHidden);
    update(false);

    if (account) {
      void changeReadingState(account, book, chapter, { action: "open" }).catch(() => {});
      restore = requestAnimationFrame(() => {
        if (!changed && !window.location.hash && window.scrollY < 3 && entry && entry.resume > 2) {
          window.scrollTo({ top: scrollMax() * entry.resume / 100, behavior: "instant" });
        }
        update(false);
        ready = true;
      });
    }

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(restore);
      flush();
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pagehide", onLeavingPage);
      document.removeEventListener("visibilitychange", onHidden);
    };
    // Restore only on entering the chapter, without interrupting reading on a background refresh.
  }, [account, book, chapter]);

  const shown = percent >= 100 ? 100 : Math.floor(percent);
  return (
    <div className="chapter-progress">
      <div className="chapter-progress__label" aria-hidden="true">
        <UiText zh="阅读进度" en="Reading progress" /><span>{shown}%</span>
      </div>
      <div
        className="chapter-progress__track"
        role="progressbar"
        {...uiLabel("阅读进度", "Reading progress")}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={shown}
      >
        <span style={{ width: shown + "%" }} />
      </div>
    </div>
  );
}

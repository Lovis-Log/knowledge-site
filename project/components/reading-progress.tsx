"use client";

import { useEffect, useRef, useState } from "react";
import { changeReadingState, saveReadingPosition } from "@/lib/reading-state-client";
import { nextObservedAt } from "@/lib/reading-queue-policy";
import type { ReadingProgressEntry } from "@/lib/reading-state-types";
import { uiLabel } from "@/lib/ui-language";
import { UiText } from "./ui-text";

function scrollMax(article: Element) {
  const end = article.getBoundingClientRect().bottom + window.scrollY;
  return Math.max(0, end - window.innerHeight);
}

function currentPercent(max: number) {
  if (max === 0) return 100;
  return Math.min(100, Math.max(0, window.scrollY / max * 100));
}

type SyncProgress = (account: string | undefined, saved: ReadingProgressEntry | undefined) => void;

export function ReadingProgress({ book, chapter, account, entry }: {
  book: string;
  chapter: string;
  account?: string;
  entry?: ReadingProgressEntry;
}) {
  const [percent, setPercent] = useState(0);
  const syncProgress = useRef<SyncProgress | null>(null);

  useEffect(() => {
    const article = document.querySelector(".reading-main");
    if (!article) return;
    const pathname = window.location.pathname;
    let owner: string | undefined;
    let canOpen = false;
    let opened = false;
    let saved: ReadingProgressEntry | undefined;
    let restorePercent: number | undefined;
    let mayRestore = true;
    let lastScrollY = window.scrollY;
    let furthest = 0;
    let observedAt = 0;
    let dirty: ReadingProgressEntry | undefined;
    let saveTimer = 0;

    const isCurrentArticle = () => article.isConnected && window.location.pathname === pathname;
    const flush = () => {
      window.clearTimeout(saveTimer);
      saveTimer = 0;
      if (!owner || !dirty) return;
      saveReadingPosition(owner, dirty);
      dirty = undefined;
    };

    const updateLayout = () => {
      if (!isCurrentArticle()) return;
      const max = scrollMax(article);
      if (restorePercent !== undefined && document.visibilityState === "visible") {
        const target = max * restorePercent / 100;
        if (Math.abs(window.scrollY - target) > 1)
          window.scrollTo({ top: target, behavior: "instant" });
        lastScrollY = window.scrollY;
      }
      setPercent(currentPercent(max));
    };

    function restore() {
      if (!mayRestore || !saved || document.visibilityState !== "visible") return;
      mayRestore = false;
      if (!window.location.hash && window.scrollY < 3 && saved.resume > 2) {
        restorePercent = saved.resume;
        updateLayout();
      }
    }

    function open() {
      if (!owner || !canOpen || opened || document.visibilityState !== "visible") return;
      opened = true;
      void changeReadingState(owner, book, chapter, { action: "open" }).catch(() => {});
    }

    function stopRestoring() {
      mayRestore = false;
      restorePercent = undefined;
    }

    const onScroll = () => {
      if (!isCurrentArticle() || document.visibilityState !== "visible") return;
      const y = window.scrollY;
      const position = currentPercent(scrollMax(article));
      setPercent(position);
      if (y === lastScrollY) return;
      lastScrollY = y;
      // Layout growth and scroll anchoring must not replace the saved resume point.
      if (restorePercent !== undefined) return;
      stopRestoring();
      furthest = Math.max(furthest, position);
      observedAt = nextObservedAt(observedAt);
      dirty = { book, chapter, resume: position, furthest, observedAt, lastReadAt: Date.now() };
      if (!saveTimer) saveTimer = window.setTimeout(flush, 3500);
    };

    const onKey = (event: KeyboardEvent) => {
      if (/^(Arrow|Page|Home$|End$| $)/.test(event.key)) stopRestoring();
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        open();
        restore();
        updateLayout();
      } else flush();
    };

    syncProgress.current = (nextOwner, entry) => {
      canOpen = Boolean(nextOwner);
      if (nextOwner && owner && owner !== nextOwner) {
        // A pending position belongs to the account that observed it.
        flush();
        opened = false;
        furthest = 0;
        observedAt = 0;
        restorePercent = undefined;
        mayRestore = true;
        lastScrollY = window.scrollY;
      }
      if (nextOwner) owner = nextOwner;
      saved = entry;
      furthest = Math.max(furthest, entry?.furthest ?? 0);
      observedAt = Math.max(observedAt, entry?.observedAt ?? 0);
      if (dirty && entry && dirty.observedAt <= entry.observedAt) {
        observedAt = nextObservedAt(observedAt);
        dirty = { ...dirty, observedAt, furthest };
      }
      open();
      restore();
      flush();
    };

    const observer = new ResizeObserver(updateLayout);
    observer.observe(article);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateLayout);
    window.addEventListener("pagehide", flush);
    window.addEventListener("wheel", stopRestoring, { passive: true });
    window.addEventListener("touchstart", stopRestoring, { passive: true });
    window.addEventListener("pointerdown", stopRestoring, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", stopRestoring);
    document.addEventListener("visibilitychange", onVisibility);
    updateLayout();
    return () => {
      syncProgress.current = null;
      // Routing may already have moved the viewport or detached the chapter.
      flush();
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateLayout);
      window.removeEventListener("pagehide", flush);
      window.removeEventListener("wheel", stopRestoring);
      window.removeEventListener("touchstart", stopRestoring);
      window.removeEventListener("pointerdown", stopRestoring);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", stopRestoring);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [book, chapter]);

  useEffect(() => { syncProgress.current?.(account, entry); }, [account, entry, book, chapter]);

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

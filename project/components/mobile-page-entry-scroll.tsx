"use client";

import { useEffect } from "react";

/** Reveal mobile page controls after routing, while preserving explicit anchors. */
export function MobilePageEntryScroll({ pageKey }: { pageKey: string }) {
  useEffect(() => {
    if (!window.matchMedia("(max-width: 767px)").matches || window.location.hash) return;
    const frame = requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }));
    return () => cancelAnimationFrame(frame);
  }, [pageKey]);

  return null;
}

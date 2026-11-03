"use client";

import { useEffect } from "react";

/** Let the router finish its scroll handling, then reveal the mobile category nav. */
export function CategoryEntryScroll({ category }: { category: string }) {
  useEffect(() => {
    if (!window.matchMedia("(max-width: 767px)").matches || window.location.hash) return;
    const frame = requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }));
    return () => cancelAnimationFrame(frame);
  }, [category]);

  return null;
}

"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

/** Animate the page when its content mounts or returns from the router cache. */
export function PageEntry({ children, className, stagger = false }: { children: ReactNode; className: string; stagger?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = stagger ? root.current?.querySelectorAll<HTMLElement>("[data-entry-item]") : root.current ? [root.current] : [];
    const animations = Array.from(targets ?? [], (target, index) => target.animate(
      [{ opacity: 0.45, transform: "translateY(6px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: stagger ? 300 : 220, delay: stagger ? index * 45 : 0, easing: "ease-out", fill: "backwards" },
    ));
    return () => animations.forEach((animation) => animation.cancel());
  }, [stagger]);
  return <div ref={root} className={className} data-page-entry>{children}</div>;
}

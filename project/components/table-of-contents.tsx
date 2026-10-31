"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (!headings.length) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      // 双语页面两版正文同时在 DOM 中，只统计当前可见的那一版
      const visible = headings.filter((heading) => heading.getClientRects().length > 0);
      if (!visible.length) return;

      let current = "";
      for (const heading of visible) {
        if (heading.getBoundingClientRect().top <= 120) current = heading.id;
      }
      setActiveId(current || visible[0].id);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const observer = new MutationObserver(onScroll);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-lang"] });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  if (!items.length) return null;

  return (
    <nav className="toc" aria-label="篇内目录">
      <p className="toc__title">本篇目录</p>
      <ul className="toc__list">
        {items.map((item) => (
          <li key={item.id} className={`toc__item toc__item--h${item.depth}`}>
            <a
              href={`#${item.id}`}
              className={activeId === item.id ? "toc__link is-active" : "toc__link"}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

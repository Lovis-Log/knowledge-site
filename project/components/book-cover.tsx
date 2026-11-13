"use client";

import { useEffect, useRef, useState } from "react";
import type { Book } from "@/content/types";
import { bookTitle } from "@/lib/book-titles";

function CoverArt({ slug }: { slug: string }) {
  if (slug === "cmu-ai-agents") {
    return (
      <svg className="book-cover__art" viewBox="0 0 300 400" aria-hidden="true" focusable="false">
        <g
          stroke="var(--cover-art-ink)"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.7"
        >
          <path d="M85 84H215" />
          <path d="M215 84v104" />
          <path d="M215 188H85" />
          <path d="M85 188V84" />
        </g>
        {[
          [85, 84],
          [215, 84],
          [215, 188],
          [85, 188],
        ].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="10" fill="var(--cover-art-accent)" opacity="0.28" />
            <circle cx={cx} cy={cy} r="5" fill="var(--cover-art-accent)" />
          </g>
        ))}
        <g fill="var(--cover-art-ink)">
          <path d="M146 78l10 6-10 6z" />
          <path d="M209 132l6 10 6-10z" />
          <path d="M154 182l-10 6 10 6z" />
          <path d="M79 142l6-10 6 10z" />
        </g>
        <g stroke="var(--cover-art-ink)" strokeWidth="1" opacity="0.25">
          <path d="M118 110h64" strokeDasharray="3 6" />
          <path d="M118 162h64" strokeDasharray="3 6" />
        </g>
      </svg>
    );
  }

  if (slug === "mit-linear-algebra") {
    const dots = [55, 95, 135].flatMap((x) =>
      [72, 112, 152].map((y) => [x, y] as const),
    );
    return (
      <svg className="book-cover__art" viewBox="0 0 300 400" aria-hidden="true" focusable="false">
        {dots.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.6" fill="var(--cover-art-ink)" opacity="0.5" />
        ))}
        <path
          d="M178 214L268 154L288 74L198 134Z"
          fill="var(--cover-art-accent)"
          fillOpacity="0.22"
          stroke="var(--cover-art-accent)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <g stroke="var(--cover-art-accent)" strokeWidth="1.4" strokeLinecap="round" opacity="0.85">
          <path d="M178 214l110-80" strokeDasharray="4 5" />
          <path d="M178 214l10-140" strokeDasharray="4 5" />
        </g>
        <g fill="var(--cover-art-accent)">
          <path d="M178 214l10 6-2-12z" />
          <path d="M178 214l-8 8 12-1z" />
        </g>
      </svg>
    );
  }

  if (slug === "vibe-coding") {
    return (
      <svg className="book-cover__art" viewBox="0 0 300 400" aria-hidden="true" focusable="false">
        <rect
          x="52"
          y="58"
          width="196"
          height="142"
          rx="10"
          fill="none"
          stroke="var(--cover-art-ink)"
          strokeWidth="1.6"
          opacity="0.75"
        />
        <g fill="var(--cover-art-ink)" opacity="0.55">
          <circle cx="68" cy="74" r="2.6" />
          <circle cx="78" cy="74" r="2.6" />
          <circle cx="88" cy="74" r="2.6" />
        </g>
        <g stroke="var(--cover-art-ink)" strokeWidth="3" strokeLinecap="round" opacity="0.45">
          <path d="M70 102h74" />
          <path d="M82 120h96" />
          <path d="M82 138h52" />
        </g>
        <rect x="146" y="130" width="9" height="16" rx="2" fill="var(--cover-art-accent)" />
        <g
          stroke="var(--cover-art-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.9"
        >
          <path d="M110 246l12 10-12 10" />
          <path d="M136 246l12 10-12 10" />
          <path d="M162 246l12 10-12 10" />
        </g>
      </svg>
    );
  }

  return (
    <svg className="book-cover__art" viewBox="0 0 300 400" aria-hidden="true" focusable="false">
      <path
        d="M78 96h64a20 20 0 0 1 20 20v120a16 16 0 0 0-16-16H78z"
        fill="none"
        stroke="var(--cover-art-ink)"
        strokeWidth="1.6"
        opacity="0.7"
      />
      <path
        d="M222 96h-64a20 20 0 0 0-20 20v120a16 16 0 0 1 16-16h68z"
        fill="none"
        stroke="var(--cover-art-ink)"
        strokeWidth="1.6"
        opacity="0.7"
      />
      <circle cx="150" cy="150" r="6" fill="var(--cover-art-accent)" />
    </svg>
  );
}

const COVER_ART: Record<string, string> = {
  "english-news-reading": "/covers/editorial-news.webp",
  "cmu-ai-agents": "/covers/editorial-agents.webp",
  "mit-linear-algebra": "/covers/editorial-math.webp",
  "vibe-coding": "/covers/editorial-coding.webp",
  "llm-knowledge-base": "/covers/editorial-knowledge.webp",
};

const thumbSources = new Set([
  "/covers/editorial-3b1b-calculus-v1.webp",
  "/covers/editorial-3b1b-differential-equations-v1.webp",
  "/covers/editorial-3b1b-linear-algebra-v1.webp",
  "/covers/editorial-agent-engineering-v1.webp",
  "/covers/editorial-agents.webp",
  "/covers/editorial-coding.webp",
  "/covers/editorial-cpp-programming-v2.webp",
  "/covers/editorial-finance-and-business-v1.webp",
  "/covers/editorial-harvard-python-v3.webp",
  "/covers/editorial-knowledge.webp",
  "/covers/editorial-llm-principles-v1.webp",
  "/covers/editorial-math.webp",
  "/covers/editorial-mit-discrete-mathematics-v2.webp",
  "/covers/editorial-mit-game-theory-v1.webp",
  "/covers/editorial-mit-real-analysis-v1.webp",
  "/covers/editorial-news.webp",
  "/covers/editorial-personal-selection-v1.webp",
  "/covers/editorial-product-design-v1.webp",
  "/covers/editorial-python-ai-v3.webp",
  "/covers/editorial-society-and-reasoning-v1.webp"
]);

export function BookCover({
  book,
  size = "md",
  priority = false,
}: {
  book: Book;
  size?: "sm" | "md";
  priority?: boolean;
}) {
  const english = bookTitle(book).en;
  const long = english.length > 24;
  const src = book.coverImage || COVER_ART[book.slug];
  const [failed, setFailed] = useState<string | null>(null);
  const image = useRef<HTMLImageElement>(null);
  useEffect(() => {
    // A failed request may finish before the client attaches the error handler.
    if (src && image.current?.complete && image.current.naturalWidth === 0)
      setFailed(src);
  }, [src]);
  const thumbs = src && thumbSources.has(src);
  const thumbnail = (width: number) => src.replace(/\.webp$/, `-${width}.webp`);

  return (
    <div className={`book-cover book-cover--${size}`} data-book={book.slug}>
      <span className="book-cover__type">
        <span
          className={`book-cover__title${long ? " book-cover__title--long" : ""}`}
          lang="en"
        >
          {english}
        </span>
      </span>
      <span className="book-cover__plate">
        {src && failed !== src ? (
          <img
            ref={image}
            className="book-cover__img"
            src={thumbs ? thumbnail(240) : src}
            srcSet={thumbs ? `${thumbnail(240)} 240w, ${thumbnail(480)} 480w` : undefined}
            sizes={thumbs ? (size === "sm" ? "120px" : "(max-width: 767px) 45vw, 260px") : undefined}
            alt=""
            decoding="async"
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            onError={() => setFailed(src)}
          />
        ) : (
          <CoverArt slug={book.slug} />
        )}
      </span>
      <span className="book-cover__imprint">
        <span className="book-cover__imprint-full" lang="en">
          Lovismind · Press
        </span>
        <span className="book-cover__imprint-short" lang="en">
          Lovismind
        </span>
      </span>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ZoomImageProps {
  src?: string;
  alt?: string;
  title?: string;
}

export function ZoomImage({ src, alt, title }: ZoomImageProps) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!src) return null;

  return (
    <>
      <button
        type="button"
        className="zoomable"
        onClick={() => setOpen(true)}
        aria-label={alt ? `放大图片：${alt}` : "放大图片"}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt ?? ""} title={title} loading="lazy" />
      </button>
      {mounted && open
        ? createPortal(
            <div
              className="lightbox"
              role="dialog"
              aria-modal="true"
              aria-label={alt ?? "图片预览"}
              onClick={() => setOpen(false)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={alt ?? ""} />
              <span className="lightbox__hint">点击任意处或按 Esc 关闭</span>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

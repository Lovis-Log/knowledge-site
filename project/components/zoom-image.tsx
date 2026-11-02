"use client";

import { UiText } from "./ui-text";
import { uiLabel } from "@/lib/ui-language";
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
        {...uiLabel(alt ? `放大图片：${alt}` : "放大图片", alt ? `Enlarge image: ${alt}` : "Enlarge image")}
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
              {...uiLabel(alt ?? "图片预览", alt ?? "Image preview")}
              onClick={() => setOpen(false)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={alt ?? ""} />
              <span className="lightbox__hint"><UiText zh="点击任意处或按 Esc 关闭" en="Click anywhere or press Esc to close" /></span>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

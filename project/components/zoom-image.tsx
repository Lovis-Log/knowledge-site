"use client";

import { uiLabel } from "@/lib/ui-language";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ZoomImageProps {
  src?: string;
  alt?: string;
  title?: string;
}

export function ZoomImage({ src, alt, title }: ZoomImageProps) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const view = useRef({ scale: 1, x: 0, y: 0 });

  function paint() {
    const { scale, x, y } = view.current;
    if (image.current) image.current.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  }
  function zoom(factor: number) {
    view.current.scale = Math.min(5, Math.max(0.5, view.current.scale * factor));
    paint();
  }
  function reset() { view.current = { scale: 1, x: 0, y: 0 }; paint(); }

  useEffect(() => {
    if (!open) return;
    const panel = dialog.current;
    const canvas = stage.current;
    if (!panel || !canvas) return;
    panel.showModal();
    reset();
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? canvas.clientHeight : 1);
      zoom(Math.exp(-Math.max(-100, Math.min(100, delta)) * 0.002));
    };
    let drag: { id: number; x: number; y: number } | null = null;
    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY };
      canvas.setPointerCapture(event.pointerId);
      canvas.dataset.dragging = "true";
    };
    const onMove = (event: PointerEvent) => {
      if (!drag || drag.id !== event.pointerId) return;
      view.current.x += event.clientX - drag.x;
      view.current.y += event.clientY - drag.y;
      drag.x = event.clientX; drag.y = event.clientY;
      paint();
    };
    const onUp = () => { drag = null; delete canvas.dataset.dragging; };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "+" || event.key === "=") { event.preventDefault(); zoom(1.2); }
      if (event.key === "-") { event.preventDefault(); zoom(1 / 1.2); }
      if (event.key === "0") { event.preventDefault(); reset(); }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.addEventListener("wheel", onWheel, { passive: false });
    panel.addEventListener("keydown", onKey);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("lostpointercapture", onUp);
    return () => {
      panel.close();
      document.body.style.overflow = previousOverflow;
      panel.removeEventListener("wheel", onWheel);
      panel.removeEventListener("keydown", onKey);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("lostpointercapture", onUp);
      trigger.current?.focus({ preventScroll: true });
    };
  }, [open]);

  if (!src) return null;

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="zoomable"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        {...uiLabel(alt ? `放大图片：${alt}` : "放大图片", alt ? `Enlarge image: ${alt}` : "Enlarge image")}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt ?? ""} title={title} loading="lazy" />
        <span className="zoomable__icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5M7.5 10.5h6m-3-3v6" /></svg>
        </span>
      </button>
      {open
        ? createPortal(
            <dialog
              ref={dialog}
              className="lightbox"
              {...uiLabel(alt || "图片预览", alt || "Image preview")}
              onCancel={event => { event.preventDefault(); setOpen(false); }}
            >
              <div ref={stage} className="lightbox__stage">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img ref={image} src={src} alt={alt ?? ""} draggable={false} />
              </div>
              <div className="lightbox__controls">
                <button type="button" onClick={() => zoom(1 / 1.2)} {...uiLabel("缩小", "Zoom out")}>
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M5 12h14" /></svg>
                </button>
                <button type="button" onClick={reset} {...uiLabel("还原大小", "Reset zoom")}>
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10a9 9 0 1 1 2.7 8M3 4v6h6" /></svg>
                </button>
                <button type="button" onClick={() => zoom(1.2)} {...uiLabel("放大", "Zoom in")}>
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M5 12h14M12 5v14" /></svg>
                </button>
                <button type="button" autoFocus onClick={() => setOpen(false)} {...uiLabel("关闭图片", "Close image")}>
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="m6 6 12 12M18 6 6 18" /></svg>
                </button>
              </div>
            </dialog>,
            document.body,
          )
        : null}
    </>
  );
}

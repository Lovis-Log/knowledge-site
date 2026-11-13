"use client";

import { useEffect, useRef } from 'react';

export function BookCursor() {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = cursor.current?.closest<HTMLElement>('.library-page');
    const element = cursor.current;
    const enabled = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    if (!element || !root) return;
    let frame = 0, x = 0, y = 0, targetX = 0, targetY = 0, visible = false;
    function animate() {
      x += (targetX - x) * .25;
      y += (targetY - y) * .25;
      element!.style.transform = `translate3d(${x}px,${y}px,0)`;
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > .2) frame = requestAnimationFrame(animate);
      else frame = 0;
    }
    function hide() { visible = false; element!.dataset.visible = 'false'; element!.dataset.pressed = 'false'; }
    function move(event: PointerEvent) {
      targetX = event.clientX; targetY = event.clientY;
      const link = event.target instanceof Element ? event.target.closest('.book-card a') : null;
      if (!enabled.matches || event.pointerType !== 'mouse' || !link || !root!.contains(link)) { hide(); return; }
      if (!visible) { x = targetX; y = targetY; visible = true; }
      element!.dataset.visible = 'true';
      if (!frame) frame = requestAnimationFrame(animate);
    }
    function press() { if (visible) element!.dataset.pressed = 'true'; }
    function release() { element!.dataset.pressed = 'false'; }
    function scroll() {
      const link = document.elementFromPoint(targetX, targetY)?.closest('.book-card a');
      if (!enabled.matches || !link || !root!.contains(link)) { hide(); return; }
      if (!visible) { x = targetX; y = targetY; visible = true; }
      element!.dataset.visible = 'true';
      if (!frame) frame = requestAnimationFrame(animate);
    }
    function configure() { root!.dataset.bookCursor = enabled.matches ? 'ready' : ''; hide(); }
    configure();
    enabled.addEventListener('change', configure);
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerdown', press, { passive: true });
    document.addEventListener('pointerup', release, { passive: true });
    document.documentElement.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    window.addEventListener('scroll', scroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      delete root!.dataset.bookCursor;
      enabled.removeEventListener('change', configure);
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerdown', press);
      document.removeEventListener('pointerup', release);
      document.documentElement.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
      window.removeEventListener('scroll', scroll);
    };
  }, []);
  return <div ref={cursor} className="book-cursor" aria-hidden="true" data-visible="false">
    <span className="book-cursor__ring"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M6 18 18 6M6 6h12v12" /></svg></span>
  </div>;
}

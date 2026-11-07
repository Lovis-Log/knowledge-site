"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState, type ComponentProps } from "react";
import { UiText } from "./ui-text";

const navigationEvent = "lovismind:navigate";
type Navigation = { href: string; resetScroll?: boolean; fullDocument?: boolean };
type Pending = Navigation & { phase: "pending" | "complete" };

export function startNavigation(href: string, options: Omit<Navigation, "href"> = {}) {
  window.dispatchEvent(new CustomEvent<Navigation>(navigationEvent, { detail: { href, ...options } }));
}

export function ReaderLink({ href, onNavigate, scroll, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  return <Link {...props} href={href} scroll={scroll ?? false} onNavigate={(event) => {
    let cancelled = false;
    onNavigate?.({ preventDefault() { cancelled = true; event.preventDefault(); } });
    if (cancelled) return;
    const target = new URL(href, location.href);
    if (target.origin !== location.origin) return;
    if (target.pathname.replace(/\/$/, "") === location.pathname.replace(/\/$/, "")) {
      if (target.hash && scroll !== false) document.getElementById(decodeURIComponent(target.hash.slice(1)))?.scrollIntoView();
      return;
    }
    startNavigation(target.pathname + target.search + target.hash, { resetScroll: scroll !== false });
  }} />;
}

export function NavigationFeedback() {
  const pathname = usePathname();
  const [pending, setPending] = useState<Pending | null>(null);
  const [slow, setSlow] = useState(false);
  const current = useRef<Pending | null>(null);
  const previous = useRef(pathname);

  useEffect(() => {
    const navigate = (event: Event) => {
      const next: Pending = { ...(event as CustomEvent<Navigation>).detail, phase: "pending" };
      current.current = next;
      setSlow(false);
      setPending(next);
    };
    const cancel = () => { current.current = null; setPending(null); setSlow(false); };
    // History traversal owns its scroll position; it must not inherit a click.
    window.addEventListener(navigationEvent, navigate);
    window.addEventListener("popstate", cancel);
    window.addEventListener("pageshow", cancel);
    return () => {
      window.removeEventListener(navigationEvent, navigate);
      window.removeEventListener("popstate", cancel);
      window.removeEventListener("pageshow", cancel);
    };
  }, []);

  useEffect(() => {
    if (!pending) return;
    const timeout = window.setTimeout(() => {
      if (current.current !== pending) return;
      if (pending.phase === "pending") setSlow(true);
      else { current.current = null; setPending(null); }
    }, pending.phase === "pending" ? 8000 : 160);
    return () => window.clearTimeout(timeout);
  }, [pending]);

  useLayoutEffect(() => {
    const changed = previous.current !== pathname;
    previous.current = pathname;
    const navigation = current.current;
    if (changed && navigation && new URL(navigation.href, location.origin).pathname.replace(/\/$/, "") === pathname.replace(/\/$/, "")) {
      // Run before article effects restore reading progress. Preserve anchors
      // and let the browser handle back/forward restoration.
      if (navigation.resetScroll && !location.hash) window.scrollTo({ top: 0, behavior: "instant" });
      const complete: Pending = { ...navigation, phase: "complete" };
      current.current = complete;
      setSlow(false);
      setPending(complete);
    }
    const hasPageEntry = ["/about/", "/guestbook/", "/library/"].includes(pathname);
    if (!hasPageEntry && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const animation = document.querySelector("#main")?.animate([{ opacity: 0.86 }, { opacity: 1 }], { duration: 180, easing: "ease-out" });
      return () => animation?.cancel();
    }
  }, [pathname]);

  if (!pending) return null;
  return <div className="navigation-feedback" data-phase={pending.phase}>
    <div className="navigation-feedback__line" aria-hidden="true" />
    <span className={slow ? undefined : "reader-sr-only"} role="status">
      {pending.fullDocument ? <UiText zh="正在进入书库…" en="Opening your library…" /> : <UiText zh="正在打开页面…" en="Opening page…" />}
    </span>
    {slow && <a href={pending.href}><UiText zh="直接打开" en="Open directly" /></a>}
  </div>;
}

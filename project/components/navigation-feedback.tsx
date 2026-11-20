"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState, type ComponentProps } from "react";
import { RocketLoader } from "./rocket-loader";
import { UiText } from "./ui-text";

const navigationEvent = "lovismind:navigate";
type Navigation = { href: string; resetScroll?: boolean; fullDocument?: boolean };
type Pending = Navigation & { phase: "pending" | "complete" };
type AnchorDocument = { getElementById(id: string): { scrollIntoView(): void } | null };

// Hash values come from links and may be malformed; a bad escape must not break navigation.
export function anchorIdFromHash(hash: string) {
  if (!hash.startsWith("#") || hash.length < 2) return null;
  try {
    return decodeURIComponent(hash.slice(1)) || null;
  } catch {
    return null;
  }
}

export function scrollToAnchor(hash: string, document: AnchorDocument) {
  const id = anchorIdFromHash(hash);
  const element = id ? document.getElementById(id) : null;
  if (!element) return false;
  element.scrollIntoView();
  return true;
}

// Only chapter routes get the compact rocket; the book shelf and other
// destinations keep the slim progress line.
export function isReaderChapterHref(href: string, base: string) {
  try {
    const origin = new URL(base).origin;
    const target = new URL(href, base);
    return target.origin === origin && /^\/books\/[^/]+\/[^/]+\/?$/.test(target.pathname);
  } catch {
    return false;
  }
}

export function isReaderChapterNavigation(href: string, base: string, fullDocument = false) {
  return !fullDocument && isReaderChapterHref(href, base);
}

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
      if (target.hash && scroll !== false) scrollToAnchor(target.hash, document);
      return;
    }
    startNavigation(target.pathname + target.search + target.hash, { resetScroll: scroll !== false });
  }} />;
}

export function NavigationFeedback() {
  const pathname = usePathname();
  const [pending, setPending] = useState<Pending | null>(null);
  const [slow, setSlow] = useState(false);
  const [rocket, setRocket] = useState(false);
  const current = useRef<Pending | null>(null);
  const previous = useRef(pathname);

  useEffect(() => {
    const navigate = (event: Event) => {
      const next: Pending = { ...(event as CustomEvent<Navigation>).detail, phase: "pending" };
      current.current = next;
      setSlow(false);
      setRocket(false);
      setPending(next);
    };
    const cancel = () => { current.current = null; setPending(null); setSlow(false); setRocket(false); };
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

  // Reader chapters are the only navigation that earns the compact rocket.
  // The delay keeps a fast prefetched transition from flashing it.
  useEffect(() => {
    if (
      !pending ||
      pending.phase !== "pending" ||
      !isReaderChapterNavigation(pending.href, location.origin, pending.fullDocument) ||
      document.querySelector("#main .route-loading .rocket-loader")
    ) {
      setRocket(false);
      return;
    }
    const timeout = window.setTimeout(() => {
      if (current.current !== pending) return;
      setRocket(true);
    }, 200);
    return () => window.clearTimeout(timeout);
  }, [pending]);

  // The route-level loading fallback has its own rocket. Drop the compact one
  // as soon as that fallback mounts instead of showing two at once; the CSS
  // :has() guard covers the first frame before this observer runs.
  useEffect(() => {
    if (!rocket) return;
    const main = document.querySelector("#main");
    if (!main) return;
    const dismiss = () => {
      if (main.querySelector(".route-loading .rocket-loader")) setRocket(false);
    };
    dismiss();
    const observer = new MutationObserver(dismiss);
    observer.observe(main, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [rocket]);

  useLayoutEffect(() => {
    const changed = previous.current !== pathname;
    previous.current = pathname;
    const navigation = current.current;
    if (changed && navigation) {
      const destination = new URL(navigation.href, location.origin);
      if (destination.pathname.replace(/\/$/, "") === pathname.replace(/\/$/, "")) {
        // The destination route has committed, so its headings are in the DOM.
        // Run before article effects restore reading progress, preserve anchors,
        // and let the browser handle back/forward restoration.
        if (navigation.resetScroll) {
          if (destination.hash) scrollToAnchor(destination.hash, document);
          else if (!location.hash) window.scrollTo({ top: 0, behavior: "instant" });
        }
        const complete: Pending = { ...navigation, phase: "complete" };
        current.current = complete;
        setSlow(false);
        setRocket(false);
        setPending(complete);
      }
    }
    const hasPageEntry = ["/about/", "/guestbook/", "/library/", "/submissions/"].includes(pathname);
    if (!hasPageEntry && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const animation = document.querySelector("#main")?.animate([{ opacity: 0.86 }, { opacity: 1 }], { duration: 180, easing: "ease-out" });
      return () => animation?.cancel();
    }
  }, [pathname]);

  if (!pending) return null;
  return <div className="navigation-feedback" data-phase={pending.phase}>
    <div className="navigation-feedback__line" aria-hidden="true" />
    {rocket && <div className="navigation-feedback__rocket" aria-hidden="true"><RocketLoader compact /></div>}
    <span className={slow ? undefined : "reader-sr-only"} role="status">
      {pending.fullDocument ? <UiText zh="正在进入书库…" en="Opening your library…" /> : <UiText zh="正在打开页面…" en="Opening page…" />}
    </span>
    {slow && <a href={pending.href}><UiText zh="直接打开" en="Open directly" /></a>}
  </div>;
}

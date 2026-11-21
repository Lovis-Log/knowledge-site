"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState, type ComponentProps } from "react";
import { RocketLoader } from "./rocket-loader";
import { UiText } from "./ui-text";

const navigationEvent = "lovismind:navigate";
type Navigation = { href: string; resetScroll?: boolean };
type Pending = Navigation & { phase: "pending" | "complete" };
type AnchorDocument = { getElementById(id: string): { scrollIntoView(): void } | null };
const rocketDelay = 200;

function pagePath(pathname: string) {
  return pathname.replace(/\/$/, "");
}

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

export function pageNavigationTarget(href: string, base: string) {
  try {
    const current = new URL(base);
    const target = new URL(href, base);
    if (target.origin === current.origin && target.protocol === current.protocol &&
        pagePath(target.pathname) !== pagePath(current.pathname)) return target;
  } catch {
    return null;
  }
  return null;
}

export function startNavigation(href: string, options: Omit<Navigation, "href"> = {}) {
  window.dispatchEvent(new CustomEvent<Navigation>(navigationEvent, { detail: { href, ...options } }));
}

export function navigateDocument(href: string, mode: "assign" | "replace" = "assign") {
  startNavigation(href);
  window.location[mode](href);
}

export function ReaderLink({ href, onNavigate, scroll, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  return <Link {...props} href={href} scroll={scroll ?? false} onNavigate={(event) => {
    let cancelled = false;
    onNavigate?.({ preventDefault() { cancelled = true; event.preventDefault(); } });
    if (cancelled) return;
    const target = new URL(href, location.href);
    if (target.origin !== location.origin) return;
    if (pagePath(target.pathname) === pagePath(location.pathname)) {
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
    const begin = (navigation: Navigation, base = location.href) => {
      const target = pageNavigationTarget(navigation.href, base);
      if (!target) return;
      const href = target.pathname + target.search + target.hash;
      if (current.current?.phase === "pending" && current.current.href === href) return;
      const next: Pending = { ...navigation, href, phase: "pending" };
      current.current = next;
      setSlow(false);
      setRocket(false);
      setPending(next);
    };
    const cancel = () => { current.current = null; setPending(null); setSlow(false); setRocket(false); };
    const navigate = (event: Event) => begin((event as CustomEvent<Navigation>).detail);
    const nativeLink = (event: MouseEvent) => {
      // Next links have already handled their click by the time it reaches window.
      if (event.defaultPrevented || event.button !== 0 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey ||
          !(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]:not([download])");
      if (!link || (link.target && link.target.toLowerCase() !== "_self")) return;
      begin({ href: link.href });
    };
    const history = () => {
      cancel();
      // Start from the last rendered route and let history restore its own scroll.
      begin({ href: location.href }, new URL(previous.current, location.origin).href);
    };
    window.addEventListener(navigationEvent, navigate);
    window.addEventListener("click", nativeLink);
    window.addEventListener("popstate", history);
    window.addEventListener("pageshow", cancel);
    return () => {
      window.removeEventListener(navigationEvent, navigate);
      window.removeEventListener("click", nativeLink);
      window.removeEventListener("popstate", history);
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

  useEffect(() => {
    if (pending?.phase !== "pending") return;
    const timeout = window.setTimeout(() => {
      if (current.current !== pending) return;
      setRocket(true);
    }, rocketDelay);
    return () => window.clearTimeout(timeout);
  }, [pending]);

  useLayoutEffect(() => {
    const changed = previous.current !== pathname;
    previous.current = pathname;
    const navigation = current.current;
    if (changed && navigation) {
      const destination = new URL(navigation.href, location.origin);
      if (pagePath(destination.pathname) === pagePath(pathname)) {
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
      } else {
        current.current = null;
        setPending(null);
        setSlow(false);
        setRocket(false);
      }
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
    {rocket && <div className="navigation-feedback__rocket" aria-hidden="true"><RocketLoader compact /></div>}
    <span className={slow ? undefined : "reader-sr-only"} role="status">
      <UiText zh="正在打开页面…" en="Opening page…" />
    </span>
    {slow && <a href={pending.href}><UiText zh="直接打开" en="Open directly" /></a>}
  </div>;
}

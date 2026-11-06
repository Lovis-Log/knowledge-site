"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ComponentProps } from "react";
import { UiText } from "./ui-text";

const navigationEvent = "lovismind:navigate";

export function ReaderLink({ href, onNavigate, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  return <Link {...props} href={href} onNavigate={(event) => {
    let cancelled = false;
    onNavigate?.({ preventDefault() { cancelled = true; event.preventDefault(); } });
    if (cancelled) return;
    const target = new URL(href, location.href);
    if (target.origin !== location.origin || target.pathname.replace(/\/$/, "") === location.pathname.replace(/\/$/, "")) return;
    window.dispatchEvent(new CustomEvent(navigationEvent, { detail: target.pathname + target.search + target.hash }));
  }} />;
}

export function NavigationFeedback() {
  const pathname = usePathname();
  const previous = useRef(pathname);
  const [pending, setPending] = useState<{ href: string; origin: string } | null>(null);
  const [slowTarget, setSlowTarget] = useState<typeof pending>(null);
  const active = pending?.origin === pathname ? pending : null;

  const slow = active !== null && slowTarget === active;

  useEffect(() => {
    const navigate = (event: Event) => {
      const href = (event as CustomEvent<string>).detail;
      setPending((current) => current?.href === href && current.origin === pathname ? current : { href, origin: pathname });
    };
    window.addEventListener(navigationEvent, navigate);
    return () => window.removeEventListener(navigationEvent, navigate);
  }, [pathname]);

  useEffect(() => {
    if (!active) return;
    const timeout = window.setTimeout(() => setSlowTarget(active), 8000);
    return () => window.clearTimeout(timeout);
  }, [active]);

  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    setPending(null);
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const animation = document.querySelector("#main")?.animate([{ opacity: 0.84 }, { opacity: 1 }], { duration: 150, easing: "ease-out" });
      return () => animation?.cancel();
    }
  }, [pathname]);

  if (!active) return null;
  return <div className="navigation-feedback">
    <div className="navigation-feedback__line" aria-hidden="true" />
    <span className={slow ? undefined : "reader-sr-only"} role="status">
      <UiText zh="正在打开页面…" en="Opening page…" />
    </span>
    {slow && <a href={active.href}><UiText zh="直接打开" en="Open directly" /></a>}
  </div>;
}

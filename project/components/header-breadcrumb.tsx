"use client";

import { UiText } from "@/components/ui-text";
import { uiLabel } from "@/lib/ui-language";

import { Fragment, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Crumb } from "@/lib/crumbs";

export function HeaderBreadcrumb({ crumbs }: { crumbs: Record<string, Crumb[]> }) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const refreshedPath = useRef<string | null>(null);
  const key = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const exactItems = crumbs[key];
  const parentItems = crumbs[key.slice(0, key.lastIndexOf("/"))];
  const items = exactItems ?? parentItems;

  useEffect(() => {
    // Shared layouts survive navigation. A moved/new chapter may not be in
    // the index captured before the external Markdown edit.
    if (key === "/" || exactItems?.length || !parentItems?.length) return;
    if (refreshedPath.current === key) return;
    refreshedPath.current = key;
    router.refresh();
  }, [key, exactItems, parentItems, router]);

  if (!items?.length) return null;

  return (
    <nav className="breadcrumb" {...uiLabel("面包屑")}>
      {items.map((item, index) => {
        const last = index === items.length - 1;
        return (
          <Fragment key={item.href}>
            {index > 0 && (
              <span className="breadcrumb__sep" aria-hidden="true">
                /
              </span>
            )}
            {last ? (
              <span className="breadcrumb__current" aria-current="page">
                <UiText zh={item.label} en={item.labelEn ?? item.label} />
              </span>
            ) : (
              <Link href={item.href}><UiText zh={item.label} en={item.labelEn ?? item.label} /></Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}

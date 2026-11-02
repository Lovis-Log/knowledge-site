"use client";

import { UiText } from "@/components/ui-text";
import { uiLabel } from "@/lib/ui-language";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Crumb } from "@/lib/crumbs";

export function HeaderBreadcrumb({ crumbs }: { crumbs: Record<string, Crumb[]> }) {
  const pathname = usePathname() || "/";
  const key = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const items = crumbs[key];

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

import Link from "next/link";
import type { Crumb } from "@/lib/crumbs";
import { site } from "@/lib/site";
import { HeaderBreadcrumb } from "./header-breadcrumb";

export function SiteHeader({ crumbs }: { crumbs: Record<string, Crumb[]> }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand">
          <img
            className="brand__mark"
            src="/brand/lovismind-mark.png"
            alt=""
            width={30}
            height={30}
          />
          <span className="brand__word">{site.name}</span>
        </Link>
        <HeaderBreadcrumb crumbs={crumbs} />
        <nav className="site-nav" aria-label="主导航">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

import Link from "next/link";
import type { Crumb } from "@/lib/crumbs";
import { site } from "@/lib/site";
import { HeaderBreadcrumb } from "./header-breadcrumb";
import { DonateButton } from "./donate-button";

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
              <svg className="site-nav__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                {item.href === "/" ? (
                  <>
                    <path d="M12 5.5C9 3.5 5.5 3.5 3 4.5v15c2.5-1 6-1 9 1 3-2 6.5-2 9-1v-15c-2.5-1-6-1-9 1Z" />
                    <path d="M12 5.5v15" />
                  </>
                ) : (
                  <>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 11v5m0-9v.5" />
                  </>
                )}
              </svg>
              {item.label}
            </Link>
          ))}
          <DonateButton />
        </nav>
      </div>
    </header>
  );
}

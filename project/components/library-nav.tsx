import Link from "next/link";
import { getSections } from "@/lib/notes";

export function LibraryNav({ active = "home" }: { active?: string }) {
  const items = [
    { slug: "home", name: "首页", href: "/" },
    ...getSections().map((section) => ({
      ...section,
      href: `/categories/${section.slug}/`,
    })),
  ];

  return (
    <nav className="library-nav" aria-label="内容分类">
      {items.map((item) => (
        <Link key={item.slug} href={item.href} aria-current={active === item.slug ? "page" : undefined}>
          {item.name}
        </Link>
      ))}
    </nav>
  );
}

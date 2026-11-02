import { UiText } from "@/components/ui-text";
import { taxonomyEnglish, uiLabel } from "@/lib/ui-language";
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
    <nav className="library-nav" {...uiLabel("内容分类")}>
      {items.map((item) => (
        <Link key={item.slug} href={item.href} aria-current={active === item.slug ? "page" : undefined}>
          <UiText zh={item.name} en={taxonomyEnglish[item.slug]?.name} />
        </Link>
      ))}
    </nav>
  );
}

import { UiText } from "@/components/ui-text";
import { uiLabel } from "@/lib/ui-language";
import Link from "next/link";
import {useContent} from "@/content/client";

export function LibraryNav({ active = "home" }: { active?: string }) {
  const {getSections,taxonomyEnglish}=useContent();
  const items = [
    { slug: "home", name: "书库", href: "/library/" },
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

import { getPageCatalog } from "@/content/catalog";
import { getLibrarySections } from "@/content";
import { ProtectedContent } from "@/content/client";
import CategoryView from "@/components/category-view";
export const dynamicParams = false;
export function generateStaticParams() {
  return getLibrarySections().map((s) => ({ category: s.slug }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return (
    <ProtectedContent catalog={getPageCatalog({ category })}>
      <CategoryView category={category} />
    </ProtectedContent>
  );
}

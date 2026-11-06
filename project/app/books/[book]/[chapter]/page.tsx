import { getPageCatalog } from "@/content/catalog";
import { getAllBooks } from "@/content";
import { ProtectedContent } from "@/content/client";
import ChapterView from "@/components/chapter-view";
export const dynamicParams = false;
export function generateStaticParams() {
  return getAllBooks().flatMap((b) =>
    b.chapters.map((c) => ({ book: b.slug, chapter: c.slug })),
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ book: string; chapter: string }>;
}) {
  const { book, chapter } = await params;
  return (
    <ProtectedContent catalog={getPageCatalog({ book, chapter })}>
      <ChapterView bookSlug={book} chapterSlug={chapter} />
    </ProtectedContent>
  );
}

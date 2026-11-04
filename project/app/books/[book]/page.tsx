import { getAllBooks } from "@/content";
import { ProtectedContent } from "@/content/client";
import BookView from "@/components/book-view";
export const dynamicParams = false;
export function generateStaticParams() {
  return getAllBooks().map((b) => ({ book: b.slug }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ book: string }>;
}) {
  const { book } = await params;
  return (
    <ProtectedContent>
      <BookView slug={book} />
    </ProtectedContent>
  );
}

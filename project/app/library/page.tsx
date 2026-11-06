import { getPageCatalog } from "@/content/catalog";
import { ProtectedContent } from "@/content/client";
import LibraryView from "@/components/library-view";
export default function Page() {
  return (
    <ProtectedContent catalog={getPageCatalog()}>
      <LibraryView />
    </ProtectedContent>
  );
}

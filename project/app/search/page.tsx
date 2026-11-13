import { getAllBooks } from '@/content';
import { getTaxonomy } from '@/lib/notes';
import { SearchView } from '@/components/search-view';
import { bookTitle } from '@/lib/book-titles';
export default function Page() {
    const entries = getAllBooks().flatMap(b => b.chapters.map(c => ({ book: b.slug, bookTitle: Object.values(bookTitle(b)).join(' '), bookTitles: bookTitle(b), chapter: c.slug, category: b.category, titles: [c.versions.zh?.title ?? c.versions.en?.title ?? '', c.versions.en?.title ?? c.versions.zh?.title ?? ''], summaries: [c.versions.zh?.summary ?? c.versions.en?.summary ?? '', c.versions.en?.summary ?? c.versions.zh?.summary ?? ''], tags: c.tags ?? [] })));
    return <SearchView entries={entries} categories={getTaxonomy().map(c => ({ slug: c.slug, name: c.name }))}/>;
}

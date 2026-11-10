import { getAllBooks } from '@/content';
import { getTaxonomy } from '@/lib/notes';
import { SearchView } from '@/components/search-view';
export default function Page() {
    const entries = getAllBooks().flatMap(b => b.chapters.map(c => ({ book: b.slug, bookTitle: b.title, chapter: c.slug, category: b.category, titles: [c.versions.zh, c.versions.en].filter(v => v !== undefined).map(v => v.title), summaries: [c.versions.zh, c.versions.en].filter(v => v !== undefined).map(v => v.summary ?? ''), tags: c.tags ?? [] })));
    return <SearchView entries={entries} categories={getTaxonomy().map(c => ({ slug: c.slug, name: c.name }))}/>;
}

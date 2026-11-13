import { tagLabel } from './tag-labels';
import { canonicalTag, tagAliases } from './tag-aliases';
export type SearchEntry = {
    book: string;
    bookTitle: string;
    bookTitles?: { zh: string; en: string };
    chapter: string;
    category: string;
    titles: string[];
    summaries: string[];
    tags: string[];
};
const normalize = (s: string) => s.normalize('NFKC').toLowerCase();
export function searchEntries(entries: SearchEntry[], query: string, category = '', tag = '') {
    const tokens = normalize(query).trim().split(/\s+/).filter(Boolean);
    return entries.filter(e => !category || e.category === category).filter(e => !tag || e.tags.some(t => canonicalTag(t) === canonicalTag(tag))).map(e => {
        const titles = normalize([e.bookTitle, ...e.titles].join(' '));
        const tags = e.tags.flatMap(t => { const c = canonicalTag(t), label = tagLabel(t); return [t, c, label.zh, label.en, ...Object.keys(tagAliases).filter(a => canonicalTag(a) === c)]; });
        const all = normalize([titles, ...e.summaries, ...tags].join(' '));
        return { entry: e, score: tokens.every(t => all.includes(t)) ? tokens.reduce((n, t) => n + (titles.includes(t) ? 2 : 1), 0) : -1 };
    }).filter(x => x.score >= 0).sort((a, b) => b.score - a.score).map(x => x.entry);
}

"use client";
import { useEffect, useMemo, useState } from 'react';
import { ReaderLink as Link } from './navigation-feedback';
import { UiText } from './ui-text';
import { searchEntries, type SearchEntry } from '@/lib/search';
import { tagLabel } from '@/lib/tag-labels';
export function SearchView({ entries, categories }: {
    entries: SearchEntry[];
    categories: {
        slug: string;
        name: string;
    }[];
}) {
    const [query, setQuery] = useState(''), [category, setCategory] = useState(''), [tag, setTag] = useState(''), [limit, setLimit] = useState(20);
    useEffect(() => { const read = () => { const q = new URLSearchParams(location.search); setCategory(q.get('category') ?? ''); setTag(q.get('tag') ?? ''); }; read(); window.addEventListener('popstate', read); return () => window.removeEventListener('popstate', read); }, []);
    function filter(c: string, t: string) { setCategory(c); setTag(t); setLimit(20); const q = new URLSearchParams(); if (c)
        q.set('category', c); if (t)
        q.set('tag', t); history.replaceState(history.state, '', location.pathname + (q.size ? '?' + q : '')); }
    const results = useMemo(() => searchEntries(entries, query, category, tag), [entries, query, category, tag]);
    return <section className="shell feature-page"><h1><UiText zh="搜索笔记" en="Search notes"/></h1><p><UiText zh="搜索书名、标题、摘要与标签；关键词只在当前页面中处理。" en="Search books, titles, summaries and tags. Keywords stay on this page."/></p>
 <label><UiText zh="关键词" en="Keywords"/><input type="search" value={query} onChange={e => { setQuery(e.target.value); setLimit(20); }}/></label>
 <label><UiText zh="分类" en="Category"/><select value={category} onChange={e => filter(e.target.value, tag)}><option value="">全部 / All</option>{categories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
 {tag && <p><UiText zh="标签：" en="Tag: "/>{tagLabel(tag).zh}</p>}<button onClick={() => { setQuery(''); filter('', ''); }}>清除筛选 / Clear</button>
 <p role="status">{results.length} <UiText zh="个章节" en="chapters"/></p>{!results.length && <p><UiText zh="没有匹配内容，请缩短关键词或清除筛选。" en="No matches. Try fewer keywords or clear filters."/></p>}
 <ul className="reader-items">{results.slice(0, limit).map(e => <li className="reader-item" key={e.book + '/' + e.chapter}><Link prefetch={false} href={'/books/' + e.book + '/' + e.chapter + '/'}><strong><UiText zh={e.titles[0]} en={e.titles[1] ?? e.titles[0]}/></strong></Link><p>{e.bookTitle}</p><p><UiText zh={e.summaries[0]} en={e.summaries[1] ?? e.summaries[0]}/></p><p>{e.tags.map(t => <button key={t} className="tag" onClick={() => filter(category, t)}><UiText {...tagLabel(t)}/></button>)}</p></li>)}</ul>{results.length > limit && <button onClick={() => setLimit(n => n + 20)}>更多 / More</button>}</section>;
}

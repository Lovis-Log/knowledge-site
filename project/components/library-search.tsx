"use client";

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useContent } from '@/content/client';
import { searchEntries } from '@/lib/search';
import { uiLabel, uiPlaceholder } from '@/lib/ui-language';
import { bookTitle } from '@/lib/book-titles';
import { UiText } from './ui-text';
import './library-search.css';

export function LibrarySearch() {
  const { books } = useContent();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const entries = useMemo(() => books.flatMap(book => book.chapters.map(chapter => ({
    book: book.slug, bookTitle: Object.values(bookTitle(book)).join(' '), category: book.category,
    chapter: chapter.slug,
    titles: [chapter.versions.zh?.title ?? chapter.versions.en?.title ?? '', chapter.versions.en?.title ?? chapter.versions.zh?.title ?? ''],
    summaries: Object.values(chapter.versions).map(version => version?.summary ?? ''), tags: chapter.tags ?? [],
  }))), [books]);
  const results = useMemo(() => query.trim() ? searchEntries(entries, query).slice(0, 6) : [], [entries, query]);
  const expanded = open && Boolean(query.trim());
  function go(index: number) {
    const entry = results[index];
    setOpen(false);
    router.push(entry ? `/books/${entry.book}/${entry.chapter}/` : `/search/?q=${encodeURIComponent(query.trim())}`);
  }
  return <div className="library-search" onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
  }}>
    <form role="search" onSubmit={event => { event.preventDefault(); go(active); }}>
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
      <input type="search" role="combobox" autoComplete="off" value={query}
        {...uiLabel('搜索笔记', 'Search notes')} {...uiPlaceholder('搜索书籍、章节或标签…', 'Search books, chapters or tags…')}
        aria-autocomplete="list" aria-expanded={expanded} aria-controls="library-search-options"
        aria-activedescendant={expanded && active >= 0 ? `library-result-${active}` : undefined}
        onFocus={() => setOpen(true)} onChange={event => { setQuery(event.target.value); setOpen(true); setActive(-1); }}
        onKeyDown={event => {
          if (event.nativeEvent.isComposing) return;
          if (event.key === 'Escape') { setOpen(false); setActive(-1); }
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault(); setOpen(true);
            setActive(index => results.length ? (index < 0 ? (event.key === 'ArrowDown' ? 0 : results.length - 1) : (index + (event.key === 'ArrowDown' ? 1 : -1) + results.length) % results.length) : -1);
          }
        }} />
      <button type="submit"><UiText zh="搜索" en="Search" /></button>
    </form>
    <div hidden={!expanded} className="library-search__suggestions">
      <ul id="library-search-options" role="listbox" {...uiLabel('搜索候选', 'Search suggestions')}>
        {results.map((entry, index) => <li key={entry.book + entry.chapter} id={`library-result-${index}`} role="option"
          aria-selected={active === index} onMouseDown={event => event.preventDefault()} onClick={() => go(index)}
          onMouseEnter={() => setActive(index)}>
          <strong><UiText zh={entry.titles[0]} en={entry.titles[1]} /></strong>
          <small><UiText {...bookTitle(books.find(book => book.slug === entry.book)!)} /></small>
        </li>)}
      </ul>
      {!results.length && <p role="status"><UiText zh="没有匹配结果，试试其他关键词。" en="No matches. Try another keyword." /></p>}
      <button type="button" className="library-search__all" onMouseDown={event => event.preventDefault()} onClick={() => go(-1)}><UiText zh="查看全部搜索结果 →" en="View all results →" /></button>
    </div>
  </div>;
}

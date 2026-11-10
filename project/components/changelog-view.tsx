"use client";
import { useEffect, useState } from 'react';
import { UiText } from './ui-text';
import { ReaderLink as Link } from './navigation-feedback';
export type Change = {
    date: string;
    features: {
        zh: string;
        en: string;
    }[];
    content: {
        title: string;
        href?: string;
        kind: string;
    }[];
};
export function AboutTabs({ children, entries }: {
    children: React.ReactNode;
    entries: Change[];
}) { const [log, setLog] = useState(false); useEffect(() => { const read = () => setLog(location.hash === '#updates'); read(); window.addEventListener('hashchange', read); return () => window.removeEventListener('hashchange', read); }, []); return <><nav className="feature-tabs" aria-label="关于 / About"><a href="#intro" onClick={() => setLog(false)} aria-current={!log ? 'page' : undefined}><UiText zh="介绍" en="Introduction"/></a><a href="#updates" onClick={() => setLog(true)} aria-current={log ? 'page' : undefined}><UiText zh="更新日志" en="Updates"/></a></nav>{log ? <section id="updates"><h2><UiText zh="更新日志" en="Updates"/></h2>{entries.map((e, i) => <article className="reader-item" key={e.date + i}><h3>{e.date}</h3><ul>{e.features.map((f, i) => <li key={i}><UiText {...f}/></li>)}</ul><ul>{e.content.map((c, i) => <li key={i}>{c.kind} · {c.href ? <Link href={c.href}>{c.title}</Link> : c.title}</li>)}</ul></article>)}</section> : <div id="intro">{children}</div>}</>; }

"use client";

import { useEffect, useState, type ReactNode } from 'react';
import { UiText } from './ui-text';
import { ReaderLink as Link } from './navigation-feedback';
import { SiteUptime } from './site-uptime';
import { PageEntry } from './page-entry';
import styles from './changelog.module.css';

export type Change = {
  date: string;
  version: string;
  features: { zh: string; en: string }[];
  content: { title: string; href?: string; kind: string }[];
};

export function AboutTabs({ children, entries }: { children: ReactNode; entries: Change[] }) {
  const [log, setLog] = useState(false);
  useEffect(() => {
    const read = () => setLog(location.hash === '#updates');
    read();
    window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, []);

  return <>
    <div className="about-tools">
      <nav className="feature-tabs" aria-label="关于 / About">
        <a href="#intro" onClick={() => setLog(false)} aria-current={!log ? 'page' : undefined}><UiText zh="介绍" en="Introduction" /></a>
        <a href="#updates" onClick={() => setLog(true)} aria-current={log ? 'page' : undefined}><UiText zh="更新日志" en="Updates" /></a>
      </nav>
      <SiteUptime />
    </div>
    {log ? <PageEntry className={styles.log} stagger>
      <section id="updates">
        <header className={styles.heading}>
          <h2><UiText zh="更新日志" en="Release notes" /></h2>
          {entries[0] && <p><UiText zh="当前版本" en="Current version" /> <strong>v{entries[0].version}</strong></p>}
        </header>
        <ol className={styles.timeline}>
          {entries.map((entry, index) => <li className={styles.release} key={entry.version} data-entry-item>
            <div className={styles.meta}>
              <h3>v{entry.version}</h3>
              {index === 0 && <span className={styles.current}><UiText zh="当前版本" en="Current" /></span>}
              <time dateTime={entry.date}>{entry.date.replaceAll('-', '.')}</time>
            </div>
            <article className={styles.card}>
              {entry.features.length > 0 && <ul>{entry.features.map((feature, i) => <li key={i}><UiText {...feature} /></li>)}</ul>}
              {entry.content.length > 0 && <ul>{entry.content.map((item, i) => <li key={i}>
                <span className={styles.kind}>{item.kind}</span>{' '}
                {item.href ? <Link href={item.href}>{item.title}</Link> : item.title}
              </li>)}</ul>}
            </article>
          </li>)}
        </ol>
      </section>
    </PageEntry> : <div id="intro">{children}</div>}
  </>;
}

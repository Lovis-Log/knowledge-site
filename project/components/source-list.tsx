import type { Source, SourceKind } from "@/content/types";

const KIND_LABEL: Record<SourceKind, string> = {
  video: "视频",
  blog: "博客",
  podcast: "播客",
  article: "文章",
};

export function SourceList({ sources }: { sources: Source[] }) {
  if (!sources.length) return null;

  return (
    <section className="sources" aria-labelledby="sources-heading">
      <h2 id="sources-heading" className="sources__heading">
        来源
      </h2>
      <ul className="sources__list">
        {sources.map((source) => (
          <li key={source.url} className="sources__item">
            <span className="sources__kind">{KIND_LABEL[source.kind]}</span>
            <a href={source.url} target="_blank" rel="noreferrer noopener">
              {source.title}
            </a>
            {(source.author || source.publishedAt) && (
              <span className="sources__meta">
                {[source.author, source.publishedAt].filter(Boolean).join(" · ")}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

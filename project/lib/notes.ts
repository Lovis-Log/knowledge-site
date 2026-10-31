import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  Book,
  BookLink,
  Chapter,
  ChapterVersion,
  Lang,
  Source,
  SourceKind,
} from "@/content/types";

const CHAPTER_FILE = /^(\d{2,3})\s*-\s*(.+?)\.(zh|en)\.md$/;
const SOURCE_KINDS: SourceKind[] = ["video", "blog", "podcast", "article"];

export interface TaxonomyCategory {
  slug: string;
  name: string;
  description?: string;
}

function siteDir(): string {
  if (process.env.KNOWLEDGE_SITE_DIR) {
    return path.resolve(process.env.KNOWLEDGE_SITE_DIR);
  }
  return path.resolve(process.cwd(), "..", "Knowledge Site");
}

function asDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return typeof value === "string" ? value : "";
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toSources(value: unknown): Source[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const kind = record.kind as SourceKind;
    if (!record.title || !record.url || !SOURCE_KINDS.includes(kind)) return [];
    return [
      {
        kind,
        title: String(record.title),
        url: String(record.url),
        author: record.author ? String(record.author) : undefined,
        publishedAt: record.publishedAt ? asDateString(record.publishedAt) : undefined,
      },
    ];
  });
}

function toBookLinks(value: unknown): BookLink[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    if (!record.url) return [];
    const url = String(record.url);
    const label = record.label
      ? String(record.label)
      : url.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return [{ label, url }];
  });
}

function readChapterFile(file: string) {
  const parsed = matter(fs.readFileSync(file, "utf8"));
  const data = parsed.data as Record<string, unknown>;
  return { data, body: parsed.content.trim() };
}

function loadBook(bookDir: string, folder: string): Book | null {
  const bookFile = path.join(bookDir, "_book.md");
  const bookMeta = fs.existsSync(bookFile)
    ? (matter(fs.readFileSync(bookFile, "utf8")).data as Record<string, unknown>)
    : {};

  type Acc = {
    slug: string;
    number: number;
    updatedAt: string;
    publishedAt: string;
    sources: Source[];
    contentType?: string;
    tags: string[];
    versions: Partial<Record<Lang, ChapterVersion>>;
  };

  const bySlug = new Map<string, Acc>();

  for (const entry of fs.readdirSync(bookDir, { withFileTypes: true })) {
    if (!entry.isFile() || entry.name === "_book.md" || entry.name === "README.md") continue;
    const match = CHAPTER_FILE.exec(entry.name);
    if (!match) continue;

    const number = Number.parseInt(match[1], 10);
    const lang = match[3] as Lang;
    const { data, body } = readChapterFile(path.join(bookDir, entry.name));
    const slug = String(data.slug ?? match[2]);
    const title = String(data.title ?? match[2]);
    const updatedAt = asDateString(data.updatedAt);
    const publishedAt = asDateString(data.publishedAt);

    let acc = bySlug.get(slug);
    if (!acc) {
      acc = {
        slug,
        number,
        updatedAt,
        publishedAt,
        sources: toSources(data.sources),
        contentType: data.content_type ? String(data.content_type) : undefined,
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        versions: {},
      };
      bySlug.set(slug, acc);
    }

    acc.number = Math.min(acc.number, number);
    if (updatedAt > acc.updatedAt) acc.updatedAt = updatedAt;
    if (!acc.publishedAt && publishedAt) acc.publishedAt = publishedAt;
    if (!acc.sources.length) acc.sources = toSources(data.sources);
    if (!acc.contentType && data.content_type) acc.contentType = String(data.content_type);
    if (!acc.tags.length && Array.isArray(data.tags)) acc.tags = data.tags.map(String);

    acc.versions[lang] = {
      title,
      summary: data.summary ? String(data.summary) : undefined,
      body,
    };
  }

  const chapters: Chapter[] = [...bySlug.values()]
    .filter((chapter) => Object.keys(chapter.versions).length > 0)
    .sort((a, b) => a.number - b.number || a.slug.localeCompare(b.slug))
    .map((chapter) => ({
      slug: chapter.slug,
      number: chapter.number,
      updatedAt: chapter.updatedAt,
      publishedAt:
        chapter.publishedAt ||
        chapter.sources
          .map((source) => source.publishedAt)
          .filter((date): date is string => Boolean(date))
          .sort()[0] ||
        undefined,
      sources: chapter.sources,
      contentType: chapter.contentType,
      tags: chapter.tags,
      versions: chapter.versions as Chapter["versions"],
    }));

  if (!chapters.length) return null;

  const newestChapter = chapters.reduce(
    (latest, chapter) => (chapter.updatedAt > latest ? chapter.updatedAt : latest),
    "",
  );

  return {
    slug: String(bookMeta.slug ?? slugify(folder)),
    title: String(bookMeta.title ?? folder),
    subtitle: bookMeta.subtitle ? String(bookMeta.subtitle) : undefined,
    description: bookMeta.description ? String(bookMeta.description) : "",
    longDescription: bookMeta.longDescription ? String(bookMeta.longDescription) : undefined,
    coverImage: bookMeta.coverImage ? String(bookMeta.coverImage) : undefined,
    category: bookMeta.category ? String(bookMeta.category) : "uncategorized",
    updatedAt: asDateString(bookMeta.updatedAt) || newestChapter,
    author: bookMeta.author ? String(bookMeta.author) : undefined,
    links: toBookLinks(bookMeta.links),
    collection: bookMeta.collection === true,
    contentType: bookMeta.content_type ? String(bookMeta.content_type) : undefined,
    chapters,
  };
}

export function loadBooks(): Book[] {
  const root = siteDir();
  if (!fs.existsSync(root)) return [];

  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => loadBook(path.join(root, entry.name), entry.name))
    .filter((book): book is Book => book !== null);
}

export function getTaxonomy(): TaxonomyCategory[] {
  const file = path.join(siteDir(), "taxonomy.json");
  if (!fs.existsSync(file)) return [];
  const parsed = JSON.parse(fs.readFileSync(file, "utf8")) as {
    categories?: TaxonomyCategory[];
  };
  return Array.isArray(parsed.categories) ? parsed.categories : [];
}

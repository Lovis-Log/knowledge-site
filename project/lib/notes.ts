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
const TRANSLATION_FILE = /^(\d{2,3})\s*-\s*(.+?)\.translation\.md$/;
const SOURCE_KINDS: SourceKind[] = ["video", "blog", "podcast", "article"];

export interface TaxonomyCategory {
  slug: string;
  section: string;
  name: string;
  description?: string;
}

export interface TaxonomySection {
  slug: string;
  name: string;
  description: string;
  featuredBooks?: string[];
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

/** 章节类型打平时，靠前的更具体，优先作为书本级标签 */
const CONTENT_TYPE_PRIORITY = [
  "video-course",
  "technical-tutorial",
  "science-explainer",
  "podcast-interview",
  "news",
  "opinion",
  "social-post",
  "reference",
];

function sourceOrigin(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function deriveContentType(chapters: Chapter[]): string | undefined {
  const counts = new Map<string, { count: number; first: number }>();
  chapters.forEach((chapter, index) => {
    if (!chapter.contentType) return;
    const entry = counts.get(chapter.contentType) ?? { count: 0, first: index };
    entry.count += 1;
    counts.set(chapter.contentType, entry);
  });
  if (!counts.size) return undefined;

  const rank = (type: string) => {
    const position = CONTENT_TYPE_PRIORITY.indexOf(type);
    return position === -1 ? CONTENT_TYPE_PRIORITY.length : position;
  };
  return [...counts.entries()].sort(
    (a, b) => b[1].count - a[1].count || rank(a[0]) - rank(b[0]) || a[1].first - b[1].first,
  )[0][0];
}

/** 各章的主来源分散在不同站点，视为多来源汇编；课程附带的论文/主页不算 */
function deriveCollection(chapters: Chapter[]): boolean {
  const origins = new Set(
    chapters
      .map((chapter) => chapter.sources[0])
      .filter((source): source is Source => Boolean(source))
      .map((source) => sourceOrigin(source.url)),
  );
  return origins.size > 1;
}

/** 「作者, 频道/机构」只保留人名部分 */
function primaryAuthor(author: string): string {
  return author.split(/[,，、;；]/)[0].trim();
}

/** 来源站点对应的机构名，用于没有个人署名的书 */
const ORG_BY_HOST: Record<string, string> = {
  "anthropic.com": "Anthropic",
  "claude.com": "Anthropic",
  "openai.com": "OpenAI",
  "youtube.com": "YouTube",
  "youtu.be": "YouTube",
  "arxiv.org": "arXiv",
  "github.com": "GitHub",
  "x.com": "X",
  "medium.com": "Medium",
  "substack.com": "Substack",
};

/** 报社/通讯社：整本书署机构，而不是单篇记者的名字 */
const PRESS_BY_HOST: Record<string, string> = {
  "bbc.com": "BBC",
  "bbc.co.uk": "BBC",
  "theguardian.com": "The Guardian",
  "nytimes.com": "The New York Times",
  "reuters.com": "Reuters",
  "wsj.com": "The Wall Street Journal",
  "ft.com": "Financial Times",
  "economist.com": "The Economist",
  "apnews.com": "AP",
  "cnn.com": "CNN",
  "nypost.com": "New York Post",
};

function matchHostKey(keys: string[], origin: string): string | undefined {
  const host = origin.toLowerCase();
  return keys
    .filter((candidate) => host === candidate || host.endsWith(`.${candidate}`))
    .sort((a, b) => b.length - a.length)[0];
}

function matchHost(table: Record<string, string>, origin: string): string | undefined {
  const key = matchHostKey(Object.keys(table), origin);
  return key ? table[key] : undefined;
}

function organizationFor(origin: string): string {
  const host = origin.toLowerCase();
  const known = matchHost(ORG_BY_HOST, origin);
  if (known) return known;
  const parts = host.split(".");
  return parts.length > 2 ? parts.slice(-2).join(".") : host;
}

/** 平台类站点，署名归上传者（频道、作者账号） */
const PLATFORM_HOSTS = ["youtube.com", "youtu.be", "medium.com", "substack.com", "x.com"];

function rankNames(names: string[]): string | undefined {
  const order: string[] = [];
  const counts = new Map<string, number>();
  for (const name of names) {
    if (!name) continue;
    if (!counts.has(name)) order.push(name);
    counts.set(name, (counts.get(name) ?? 0) + 1);
  }
  if (!order.length) return undefined;
  return order.sort((a, b) => counts.get(b)! - counts.get(a)!).join("、");
}

/** 单条来源的署名：报社与机构站点署机构，平台类站点署频道或个人 */
function creditFor(source: Source): string | undefined {
  const origin = sourceOrigin(source.url);
  const press = matchHost(PRESS_BY_HOST, origin);
  if (press) return press;
  if (!matchHostKey(PLATFORM_HOSTS, origin)) {
    const org = matchHost(ORG_BY_HOST, origin);
    if (org) return org;
  }
  if (source.author) return primaryAuthor(source.author);
  return organizationFor(origin);
}

function deriveAuthor(chapters: Chapter[]): string | undefined {
  return rankNames(
    chapters.flatMap((chapter) => chapter.sources.map((source) => creditFor(source) ?? "")),
  );
}

/** 按来源链接去重取入口链接；卡片展示两条，第三条起用「等」收尾 */
const MAX_BOOK_LINKS = 3;

function deriveLinks(chapters: Chapter[]): BookLink[] {
  const seen = new Set<string>();
  const links: BookLink[] = [];
  for (const chapter of chapters) {
    for (const source of chapter.sources) {
      const key = linkKey(source.url);
      if (seen.has(key)) continue;
      seen.add(key);
      links.push({ label: source.title, url: source.url, chapterNumber: chapter.number });
      if (links.length >= MAX_BOOK_LINKS) return links;
    }
  }
  return links;
}

/** 忽略时间戳等查询参数，把同一支视频/同一篇文章视为同一链接 */
function linkKey(url: string): string {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    const video = parsed.searchParams.get("v");
    if (video) return `${host}/watch?v=${video}`;
    if (host === "youtu.be") return `youtu.be${parsed.pathname}`;
    return `${host}${parsed.pathname.replace(/\/$/, "")}`;
  } catch {
    return url;
  }
}

/** 手写链接也标上章节号；对不上任何章节来源的保持原样 */
function withChapterNumbers(links: BookLink[], chapters: Chapter[]): BookLink[] {
  const byUrl = new Map<string, number>();
  for (const chapter of chapters) {
    for (const source of chapter.sources) {
      const key = linkKey(source.url);
      if (!byUrl.has(key)) byUrl.set(key, chapter.number);
    }
  }
  return links.map((link) => {
    const number = byUrl.get(linkKey(link.url));
    return number === undefined ? link : { ...link, chapterNumber: number };
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
    translation?: ChapterVersion;
  };

  const bySlug = new Map<string, Acc>();

  for (const entry of fs.readdirSync(bookDir, { withFileTypes: true })) {
    if (!entry.isFile() || entry.name === "_book.md" || entry.name === "README.md") continue;
    const match = CHAPTER_FILE.exec(entry.name) ?? TRANSLATION_FILE.exec(entry.name);
    if (!match) continue;

    const number = Number.parseInt(match[1], 10);
    const lang = match[3] as Lang | undefined;
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

    const version = { title, summary: data.summary ? String(data.summary) : undefined, body };
    if (lang) acc.versions[lang] = version;
    else acc.translation = version;
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
      translation: chapter.translation,
    }));

  if (!chapters.length) return null;

  const newestChapter = chapters.reduce(
    (latest, chapter) => (chapter.updatedAt > latest ? chapter.updatedAt : latest),
    "",
  );

  const explicitCollection = bookMeta.collection === true;
  const explicitLinks = toBookLinks(bookMeta.links);

  return {
    slug: String(bookMeta.slug ?? slugify(folder)),
    title: String(bookMeta.title ?? folder),
    subtitle: bookMeta.subtitle ? String(bookMeta.subtitle) : undefined,
    description: bookMeta.description ? String(bookMeta.description) : "",
    longDescription: bookMeta.longDescription ? String(bookMeta.longDescription) : undefined,
    coverImage: bookMeta.coverImage ? String(bookMeta.coverImage) : undefined,
    category: bookMeta.category ? String(bookMeta.category) : "uncategorized",
    updatedAt: asDateString(bookMeta.updatedAt) || newestChapter,
    author: bookMeta.author ? String(bookMeta.author) : deriveAuthor(chapters),
    links: withChapterNumbers(
      explicitLinks.length ? explicitLinks : deriveLinks(chapters),
      chapters,
    ),
    collection: explicitCollection || deriveCollection(chapters),
    contentType: bookMeta.content_type
      ? String(bookMeta.content_type)
      : deriveContentType(chapters),
    chapters,
  };
}

export function loadBooks(): Book[] {
  const root = siteDir();
  if (!fs.existsSync(root)) return [];
  const books: Book[] = [];
  function visit(directory: string) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    const isBook = entries.some((entry) => entry.isFile() &&
      (entry.name === "_book.md" || CHAPTER_FILE.test(entry.name)));
    if (directory !== root && isBook) {
      const book = loadBook(directory, path.basename(directory));
      if (book) books.push(book);
      return;
    }
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith(".")) {
        visit(path.join(directory, entry.name));
      }
    }
  }
  visit(root);
  return books;
}

export function getTaxonomy(): TaxonomyCategory[] {
  const file = path.join(siteDir(), "taxonomy.json");
  if (!fs.existsSync(file)) return [];
  const parsed = JSON.parse(fs.readFileSync(file, "utf8")) as {
    categories?: TaxonomyCategory[];
  };
  return Array.isArray(parsed.categories) ? parsed.categories : [];
}

export function getSections(): TaxonomySection[] {
  const file = path.join(siteDir(), "taxonomy.json");
  if (!fs.existsSync(file)) return [];
  const parsed = JSON.parse(fs.readFileSync(file, "utf8")) as {
    sections?: TaxonomySection[];
  };
  return Array.isArray(parsed.sections) ? parsed.sections : [];
}

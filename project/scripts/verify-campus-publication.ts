import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

/**
 * Structural checks for campus-course publication.
 *
 * This gate only reads the content API, local CSS and local files. It never
 * logs in, uploads, or checks a Google Drive permission. A structurally valid
 * `/file/d/<id>/view` link still has to be opened by hand to confirm that
 * readers can view it without an automatic download.
 */

export const CAMPUS_CATEGORY = "campus-courses";
export const STRICT_DRIVE_BOOK_SLUGS = [
  "campus-basic-physics",
  "campus-linear-algebra-analytic-geometry",
] as const;

const REQUIRED_COVER_TOKENS = ["bg", "ink", "accent"] as const;
const MINIMUM_COVER_CONTRAST = 4.5;

export interface CampusLinkSnapshot {
  label?: string;
  url: string;
}

export interface CampusChapterSnapshot {
  slug: string;
  sources?: readonly CampusLinkSnapshot[];
  /** All language bodies for the chapter. */
  bodies?: readonly string[];
}

export interface CampusBookSnapshot {
  slug: string;
  category: string;
  coverImage?: string;
  links?: readonly CampusLinkSnapshot[];
  chapters: readonly CampusChapterSnapshot[];
}

export interface CampusPublicationSnapshot {
  books: readonly CampusBookSnapshot[];
  css: string;
  /** Public paths such as `/covers/editorial-foo.webp`. */
  coverFiles: readonly string[];
  /** Cover sources registered for responsive `-240`/`-480` variants. */
  registeredThumbnails?: readonly string[];
}

export interface CoverPalette {
  bg?: string;
  ink?: string;
  accent?: string;
}

export type LinkKind =
  | "drive-preview"
  | "drive-folder"
  | "docs-preview"
  | "google-download"
  | "local-machine"
  | "site-material-download"
  | "figure"
  | "external"
  | "unknown";

type CoverToken = (typeof REQUIRED_COVER_TOKENS)[number];

export function parseCoverPalettes(css: string): Map<string, CoverPalette> {
  const palettes = new Map<string, CoverPalette>();
  const block = /\[data-book\s*=\s*["']([^"']+)["']\]\s*\{([^}]*)\}/g;
  for (const match of css.matchAll(block)) {
    const palette = palettes.get(match[1]) ?? {};
    for (const token of REQUIRED_COVER_TOKENS) {
      const value = new RegExp(`--cover-${token}\\s*:\\s*([^;]+)`).exec(match[2]);
      if (value) palette[token] = value[1].trim().split(/\s+/)[0];
    }
    palettes.set(match[1], palette);
  }
  return palettes;
}

/** Expand `#abc` to `#aabbcc`; reject colours whose contrast cannot be checked. */
export function normalizeHexColor(value: string): string | null {
  const match = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value.trim());
  if (!match) return null;
  const hex = match[1].toLowerCase();
  return `#${hex.length === 3 ? [...hex].map((digit) => digit + digit).join("") : hex}`;
}

function hexToRgb(hex: string): [number, number, number] {
  const normalized = normalizeHexColor(hex);
  if (!normalized) throw new Error(`Unsupported hex colour: ${hex}`);
  return [
    Number.parseInt(normalized.slice(1, 3), 16),
    Number.parseInt(normalized.slice(3, 5), 16),
    Number.parseInt(normalized.slice(5, 7), 16),
  ];
}

export function relativeLuminance(hex: string): number {
  const channels = hexToRgb(hex).map((value) => {
    const channel = value / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

export function contrastRatio(first: string, second: string): number {
  const a = relativeLuminance(first);
  const b = relativeLuminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

export function isRasterCoverPath(value: string): boolean {
  return /\.(?:webp|png|jpe?g)$/i.test(value.split(/[?#]/)[0]);
}

export function isSvgCoverPath(value: string): boolean {
  return /\.svg$/i.test(value.split(/[?#]/)[0]);
}

export function coverThumbnailPaths(
  value: string,
): { 240: string; 480: string } | null {
  const path = value.split(/[?#]/)[0];
  if (!/\.webp$/i.test(path)) return null;
  return {
    240: path.replace(/\.webp$/i, "-240.webp"),
    480: path.replace(/\.webp$/i, "-480.webp"),
  };
}

/** Read the responsive-cover allowlist from the cover component without importing it. */
export function parseRegisteredCoverThumbnails(source: string): string[] {
  const set = /const\s+thumbSources\s*=\s*new\s+Set(?:<[^>]+>)?\s*\(\s*\[([\s\S]*?)\]\s*\)/.exec(
    source,
  );
  if (!set) return [];
  return [...set[1].matchAll(/["']([^"']+\.webp)["']/gi)].map(
    (match) => match[1],
  );
}

function parseUrl(value: string): URL | null {
  try {
    return new URL(value, "https://lovismind.invalid");
  } catch {
    return null;
  }
}

function hostOf(url: URL): string {
  return url.hostname.replace(/^www\./i, "").toLowerCase();
}

function isGoogleHost(host: string): boolean {
  return (
    host === "drive.google.com" ||
    host === "docs.google.com" ||
    host === "drive.usercontent.google.com" ||
    host.endsWith(".google.com")
  );
}

/** Machine-local paths and file URLs can never be followed by a reader. */
export function isLocalMachinePath(value: string): boolean {
  const path = value.trim();
  return (
    /^file:/i.test(path) ||
    /^[a-z]:[\\/]/i.test(path) ||
    /^\\\\/.test(path) ||
    /^~[\\/]/.test(path) ||
    /^\/(?:Users|home|root|mnt|Volumes)\//i.test(path)
  );
}

/** Google's direct-download endpoints and download confirmations. */
export function isGoogleDownloadUrl(value: string): boolean {
  const url = parseUrl(value);
  if (!url) return false;
  const host = hostOf(url);
  if (!isGoogleHost(host)) return false;
  if (url.searchParams.get("export") === "download") return true;
  if (url.searchParams.get("confirm") === "t") return true;
  if (url.searchParams.get("download") === "1") return true;
  if (host === "drive.google.com" && /^\/uc(?:\/|$)/.test(url.pathname)) {
    return true;
  }
  if (
    host === "drive.usercontent.google.com" &&
    /^\/download(?:\/|$)/.test(url.pathname)
  ) {
    return true;
  }
  return host === "docs.google.com" && /\/export(?:\/|$)/.test(url.pathname);
}

export function isDriveFilePreviewUrl(value: string): boolean {
  const url = parseUrl(value);
  if (!url || hostOf(url) !== "drive.google.com") return false;
  return /^\/file\/d\/[A-Za-z0-9_-]+\/(?:view|preview)\/?$/.test(url.pathname);
}

export function isDriveFolderUrl(value: string): boolean {
  const url = parseUrl(value);
  if (!url || hostOf(url) !== "drive.google.com") return false;
  return /^\/(?:drive\/)?(?:u\/\d+\/)?folders\/[A-Za-z0-9_-]+\/?$/.test(
    url.pathname,
  );
}

export function isDocsPreviewUrl(value: string): boolean {
  const url = parseUrl(value);
  if (!url || hostOf(url) !== "docs.google.com") return false;
  return /^\/(?:document|presentation|spreadsheets|file)\/d\/[A-Za-z0-9_-]+\/(?:view|preview|edit)\/?$/.test(
    url.pathname,
  );
}

export function isDrivePreviewUrl(value: string): boolean {
  return isDriveFilePreviewUrl(value) || isDocsPreviewUrl(value);
}

/**
 * `/site/course-materials/.../figures/...` is a body illustration and stays
 * valid. Any other course-materials file is an in-site original download.
 */
export function siteMaterialKind(
  value: string,
): "figure" | "download" | null {
  const raw = value.trim();
  let pathname: string;
  if (raw.startsWith("/") && !raw.startsWith("//")) {
    pathname = raw.split(/[?#]/)[0];
  } else {
    const url = parseUrl(raw);
    if (!url || !/^https?:$/.test(url.protocol)) return null;
    pathname = url.pathname;
  }
  pathname = pathname.replace(/^\/site(?=\/)/i, "");
  if (!/^\/course-materials\//i.test(pathname)) return null;
  return /\/figures(?:\/|$)/i.test(pathname) ? "figure" : "download";
}

export function classifyLink(value: string): LinkKind {
  const link = value.trim();
  if (!link) return "unknown";
  if (isLocalMachinePath(link)) return "local-machine";
  const material = siteMaterialKind(link);
  if (material === "figure") return "figure";
  if (material === "download") return "site-material-download";
  if (isGoogleDownloadUrl(link)) return "google-download";
  if (isDriveFilePreviewUrl(link)) return "drive-preview";
  if (isDriveFolderUrl(link)) return "drive-folder";
  if (isDocsPreviewUrl(link)) return "docs-preview";
  if (/^https?:\/\//i.test(link)) return "external";
  return "unknown";
}

function stripCode(markdown: string): string {
  return markdown
    .replace(/^ {0,3}(`{3,}|~{3,})[^\n]*\n[\s\S]*?^ {0,3}\1\s*$/gm, "")
    .replace(/`[^`\n]*`/g, "");
}

/** Extract both normal and image link targets, including `<...>` targets with spaces. */
export function extractMarkdownLinkTargets(markdown: string): string[] {
  const targets: string[] = [];
  const link = /!?\[[^\]]*\]\(\s*(<[^>\n]*>|[^)\s]+)(?:\s+["'][^"']*["'])?\s*\)/g;
  for (const match of stripCode(markdown).matchAll(link)) {
    const target = match[1].startsWith("<")
      ? match[1].slice(1, -1)
      : match[1];
    targets.push(target.trim());
  }
  return targets;
}

function checkCover(
  book: CampusBookSnapshot,
  coverFiles: Set<string>,
  registered: Set<string>,
  issues: string[],
): void {
  const coverImage = book.coverImage?.trim();
  if (!coverImage) {
    issues.push(`${book.slug}: missing coverImage for the campus shelf`);
    return;
  }
  if (isSvgCoverPath(coverImage)) {
    issues.push(
      `${book.slug}: coverImage ${coverImage} is an SVG line drawing; campus covers must be raster illustrations`,
    );
    return;
  }
  if (!isRasterCoverPath(coverImage)) {
    issues.push(
      `${book.slug}: coverImage ${coverImage} must be webp, png or jpeg`,
    );
    return;
  }
  const path = coverImage.split(/[?#]/)[0];
  if (!path.startsWith("/covers/")) {
    issues.push(
      `${book.slug}: coverImage ${coverImage} must live under public/covers`,
    );
    return;
  }
  if (!coverFiles.has(path)) {
    issues.push(`${book.slug}: cover file public${path} does not exist`);
    return;
  }
  const thumbnails = coverThumbnailPaths(path);
  if (!thumbnails) return;
  const registeredThumb =
    registered.has(path) ||
    coverFiles.has(thumbnails[240]) ||
    coverFiles.has(thumbnails[480]);
  if (!registeredThumb) return;
  for (const width of [240, 480] as const) {
    if (!coverFiles.has(thumbnails[width])) {
      issues.push(
        `${book.slug}: responsive cover ${thumbnails[width]} is registered but missing`,
      );
    }
  }
}

function checkPalettes(
  books: readonly CampusBookSnapshot[],
  css: string,
  issues: string[],
): void {
  const palettes = parseCoverPalettes(css);
  const backgrounds = new Map<string, string>();
  for (const book of books) {
    const palette = palettes.get(book.slug);
    if (!palette) {
      issues.push(
        `${book.slug}: add an explicit [data-book="${book.slug}"] cover palette to app/globals.css`,
      );
      continue;
    }
    for (const token of REQUIRED_COVER_TOKENS) {
      const value = palette[token];
      if (!value) {
        issues.push(
          `${book.slug}: cover palette is missing --cover-${token}`,
        );
      } else if (!normalizeHexColor(value)) {
        issues.push(
          `${book.slug}: --cover-${token} must be a 3 or 6 digit hex colour, got ${value}`,
        );
      }
    }
    const background = palette.bg && normalizeHexColor(palette.bg);
    const ink = palette.ink && normalizeHexColor(palette.ink);
    if (background && ink) {
      const ratio = contrastRatio(background, ink);
      if (ratio < MINIMUM_COVER_CONTRAST) {
        issues.push(
          `${book.slug}: --cover-ink/--cover-bg contrast ${ratio.toFixed(2)} is below ${MINIMUM_COVER_CONTRAST}`,
        );
      }
    }
    if (background) {
      const duplicate = backgrounds.get(background);
      if (duplicate) {
        issues.push(
          `${book.slug} and ${duplicate} share the cover background ${background}; every campus book needs a distinct cover colour`,
        );
      } else {
        backgrounds.set(background, book.slug);
      }
    }
  }
}

function checkForbiddenLinks(
  urls: readonly string[],
  where: string,
  rejectSiteDownloads: boolean,
  issues: string[],
): void {
  for (const url of urls) {
    const kind = classifyLink(url);
    if (kind === "local-machine") {
      issues.push(
        `${where}: local machine path or file URL is not publishable (${url})`,
      );
    } else if (kind === "google-download") {
      issues.push(
        `${where}: Google Drive download link is not a preview (${url})`,
      );
    } else if (kind === "site-material-download" && rejectSiteDownloads) {
      issues.push(
        `${where}: in-site course-materials download is not allowed; use a Google Drive preview (${url})`,
      );
    }
  }
}

export function validateCampusPublication(
  snapshot: CampusPublicationSnapshot,
): string[] {
  const issues: string[] = [];
  const books = snapshot.books.filter(
    (book) => book.category === CAMPUS_CATEGORY,
  );
  if (!books.length) {
    issues.push(`no books found in category ${CAMPUS_CATEGORY}`);
    return issues;
  }

  const coverFiles = new Set(snapshot.coverFiles);
  const registered = new Set(snapshot.registeredThumbnails ?? []);

  for (const book of books) {
    checkCover(book, coverFiles, registered, issues);
  }
  checkPalettes(books, snapshot.css, issues);

  for (const book of books) {
    const declared = [
      ...(book.links ?? []).map((link) => ({
        url: link.url,
        where: `${book.slug} _book.md links`,
      })),
      ...book.chapters.flatMap((chapter) =>
        (chapter.sources ?? []).map((source) => ({
          url: source.url,
          where: `${book.slug}/${chapter.slug} sources`,
        })),
      ),
    ];
    const bodyLinks = book.chapters.map((chapter) => ({
      where: `${book.slug}/${chapter.slug} body`,
      urls: (chapter.bodies ?? []).flatMap(extractMarkdownLinkTargets),
    }));
    const hasOriginalEvidence =
      declared.length > 0 ||
      [...declared.map((link) => link.url), ...bodyLinks.flatMap((body) => body.urls)]
        .some((url) => {
          const kind = classifyLink(url);
          return (
            kind === "drive-preview" ||
            kind === "drive-folder" ||
            kind === "docs-preview"
          );
        });

    for (const link of declared) {
      checkForbiddenLinks([link.url], link.where, true, issues);
    }
    for (const body of bodyLinks) {
      checkForbiddenLinks(
        body.urls,
        body.where,
        hasOriginalEvidence,
        issues,
      );
    }

    if (
      (STRICT_DRIVE_BOOK_SLUGS as readonly string[]).includes(book.slug)
    ) {
      if (!(book.links ?? []).some((link) => isDriveFolderUrl(link.url))) {
        issues.push(
          `${book.slug}: _book.md needs a Google Drive course-folder link (drive.google.com/drive/folders/<id>)`,
        );
      }
      for (const chapter of book.chapters) {
        if (
          book.slug === "campus-linear-algebra-analytic-geometry" &&
          chapter.slug === "homework-01"
        ) {
          if (!(chapter.sources ?? []).some((source) => isDriveFolderUrl(source.url))) {
            issues.push(`${book.slug}/${chapter.slug}: missing Google Drive folder for the original screenshots`);
          }
          continue;
        }
        const links = [
          ...(chapter.sources ?? []).map((source) => source.url),
          ...(chapter.bodies ?? []).flatMap(extractMarkdownLinkTargets),
        ];
        if (!links.some(isDrivePreviewUrl)) {
          issues.push(
            `${book.slug}/${chapter.slug}: missing Google Drive preview link (drive.google.com/file/d/<id>/view or a docs.google.com preview)`,
          );
        }
      }
    }
  }

  return issues;
}

async function workspaceSnapshot(): Promise<CampusPublicationSnapshot> {
  // Imported lazily so the pure validation helpers (and their tests) do not
  // need the site's React/content runtime just to be loaded.
  const { getAllBooks } = await import("../content/index");
  const projectDir = fileURLToPath(new URL("..", import.meta.url));
  const books = getAllBooks().map((book) => ({
    slug: book.slug,
    category: book.category,
    coverImage: book.coverImage,
    links: book.links?.map(({ label, url }) => ({ label, url })),
    chapters: book.chapters.map((chapter) => ({
      slug: chapter.slug,
      sources: chapter.sources.map(({ url }) => ({ url })),
      bodies: [
        ...Object.values(chapter.versions).flatMap((version) =>
          version ? [version.body] : [],
        ),
        ...(chapter.translation ? [chapter.translation.body] : []),
      ],
    })),
  }));

  const coversDir = join(projectDir, "public/covers");
  const coverFiles = existsSync(coversDir)
    ? readdirSync(coversDir).map((name) => `/covers/${name}`)
    : [];
  const coverComponent = join(projectDir, "components/book-cover.tsx");
  const registeredThumbnails = existsSync(coverComponent)
    ? parseRegisteredCoverThumbnails(readFileSync(coverComponent, "utf8"))
    : [];

  return {
    books,
    css: readFileSync(join(projectDir, "app/globals.css"), "utf8"),
    coverFiles,
    registeredThumbnails,
  };
}

export async function main(): Promise<void> {
  const snapshot = await workspaceSnapshot();
  const issues = validateCampusPublication(snapshot);
  if (issues.length) {
    console.error(
      `Campus publication verification failed (${issues.length} issue${issues.length === 1 ? "" : "s"}):\n- ${issues.join("\n- ")}`,
    );
    process.exitCode = 1;
    return;
  }
  const books = snapshot.books.filter(
    (book) => book.category === CAMPUS_CATEGORY,
  );
  const chapters = books.reduce(
    (total, book) => total + book.chapters.length,
    0,
  );
  console.log(
    `Campus publication verified: ${books.length} campus books, ${chapters} chapters; raster covers, distinct cover palettes and Drive preview links are structurally valid. Open each Drive preview manually to confirm reader/anyone permissions.`,
  );
}

if (
  process.argv[1] &&
  pathToFileURL(process.argv[1]).href === import.meta.url
) {
  main().catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  });
}

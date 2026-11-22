import type { ReadingHighlight, ReadingProgressEntry } from "../lib/reading-state-types";

type Target = { book: string; chapter: string };
type Fail = (status: number, code: string, message: string) => never;
const progressColumns = "book,chapter,resume,furthest,observed_at AS observedAt,last_read_at AS lastReadAt";
const highlightLimit = 250;
// Filter against the current catalog before limiting the results so any number
// of retired chapters can be skipped, including for clients that read only progress[0].
const recentLimit = 8;

export async function getReadingState(
  db: D1DatabaseSession,
  account: string,
  target: Target | null,
  availableChapters?: string,
) {
  if (!target) {
    const positions = await db.prepare(`
      SELECT ${progressColumns} FROM reading_progress WHERE user_id=?
        AND book||'/'||chapter IN (SELECT value FROM json_each(?))
      ORDER BY last_read_at DESC, observed_at DESC, book, chapter LIMIT ${recentLimit}
    `).bind(account, availableChapters ?? "[]").all<ReadingProgressEntry>();
    return { account, progress: positions.results, highlights: [] };
  }
  const progress = db.prepare(
    "SELECT " + progressColumns + " FROM reading_progress WHERE user_id=? AND book=?" + (target.chapter ? " AND chapter=?" : ""),
  ).bind(account, target.book, ...(target.chapter ? [target.chapter] : []));
  const highlights = target.chapter
    ? db.prepare("SELECT id,view,start,quote,prefix,suffix FROM reading_highlights WHERE user_id=? AND book=? AND chapter=? ORDER BY start,id")
      .bind(account, target.book, target.chapter)
    : null;
  if (!highlights) return { account, progress: (await progress.all<ReadingProgressEntry>()).results, highlights: [] };
  const [positions, marks] = await Promise.all([progress.all<ReadingProgressEntry>(), highlights.all<ReadingHighlight>()]);
  return { account, progress: positions.results, highlights: marks.results };
}

export async function importReadingProgress(
  db: D1DatabaseSession,
  account: string,
  entries: { book: string; chapter: string; percent: number; openedAt: number }[],
) {
  if (!entries.length) return;
  await db.batch(entries.map(({ book, chapter, percent, openedAt }) => db.prepare(`
    INSERT INTO reading_progress(user_id,book,chapter,resume,furthest,observed_at,last_read_at)
    VALUES(?,?,?,?,?,1,?)
    ON CONFLICT(user_id,book,chapter) DO UPDATE SET
      resume=CASE WHEN observed_at=0 THEN excluded.resume ELSE resume END,
      observed_at=MAX(observed_at,1),
      furthest=MAX(furthest,excluded.furthest),
      last_read_at=MAX(last_read_at,excluded.last_read_at)
  `).bind(account, book, chapter, percent, percent, openedAt)));
}

export async function saveReadingState(
  db: D1DatabaseSession,
  account: string,
  { book, chapter }: Target,
  data: Record<string, unknown>,
  fail: Fail,
) {
  if (data.account !== account)
    fail(409, "ACCOUNT_CHANGED", "账号已切换 / Account changed");
  const invalid = () => fail(400, "INVALID_READING_STATE", "阅读记录无效 / Invalid reading state");
  if (data.action === "progress") {
    const { resume, furthest, observedAt } = data;
    const now = Date.now();
    if (typeof resume !== "number" || !Number.isFinite(resume) || resume < 0 || resume > 100 ||
      typeof furthest !== "number" || !Number.isFinite(furthest) || furthest < resume || furthest > 100 ||
      typeof observedAt !== "number" || !Number.isSafeInteger(observedAt) || observedAt < 0) return invalid();
    const time = Math.min(observedAt, now);
    await db.prepare(`
      INSERT INTO reading_progress(user_id,book,chapter,resume,furthest,observed_at,last_read_at)
      VALUES(?,?,?,?,?,?,?)
      ON CONFLICT(user_id,book,chapter) DO UPDATE SET
        resume=CASE WHEN excluded.observed_at >= observed_at THEN excluded.resume ELSE resume END,
        observed_at=MAX(observed_at, excluded.observed_at),
        furthest=MAX(furthest, excluded.furthest),
        last_read_at=MAX(last_read_at, excluded.last_read_at)
    `).bind(account, book, chapter, resume, furthest, time, time).run();
  } else if (data.action === "open") {
    await db.prepare(`
      INSERT INTO reading_progress(user_id,book,chapter,resume,furthest,observed_at,last_read_at)
      VALUES(?,?,?,0,0,0,?)
      ON CONFLICT(user_id,book,chapter) DO UPDATE SET last_read_at=MAX(last_read_at,excluded.last_read_at)
    `).bind(account, book, chapter, Date.now()).run();
  } else {
    const mark = data.mark as Partial<ReadingHighlight> | undefined;
    const id = data.action === "highlight" ? mark?.id : data.id;
    if (typeof id !== "string" || !/^[a-f0-9-]{36}$/i.test(id)) return invalid();
    if (data.action === "highlight") {
      if (!mark || (mark.view !== "zh" && mark.view !== "en" && mark.view !== "translation") ||
        typeof mark.start !== "number" || !Number.isSafeInteger(mark.start) || mark.start < 0 || mark.start > 10_000_000 ||
        typeof mark.quote !== "string" || !mark.quote.trim() || mark.quote.length > 1200 ||
        typeof mark.prefix !== "string" || mark.prefix.length > 32 ||
        typeof mark.suffix !== "string" || mark.suffix.length > 32) return invalid();
      const inserted = await db.prepare(`
        INSERT INTO reading_highlights(user_id,book,chapter,id,view,start,quote,prefix,suffix)
        SELECT ?,?,?,?,?,?,?,?,?
        WHERE (SELECT COUNT(*) FROM reading_highlights WHERE user_id=? AND book=? AND chapter=?) < ?
        ON CONFLICT DO NOTHING
      `).bind(account, book, chapter, id, mark.view, mark.start, mark.quote, mark.prefix, mark.suffix,
        account, book, chapter, highlightLimit).run();
      if (!inserted.meta.changes && !await db.prepare("SELECT 1 FROM reading_highlights WHERE user_id=? AND book=? AND chapter=? AND id=?")
        .bind(account, book, chapter, id).first())
        fail(409, "HIGHLIGHT_LIMIT", "本章高亮已达上限 / Chapter highlight limit reached");
    } else if (data.action === "remove-highlight") {
      await db.prepare("DELETE FROM reading_highlights WHERE user_id=? AND book=? AND chapter=? AND id=?")
        .bind(account, book, chapter, id).run();
    } else return invalid();
  }
  return { ok: true };
}

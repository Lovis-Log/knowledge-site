const requiredTables = [
  "content_versions", "content_current", "users", "sessions", "invites", "reset_tokens",
  "review_logs", "rate_limits", "favorites",
  "reading_progress", "reading_highlights",
];
// SQLite resolves every referenced table and column when preparing this statement.
// WHERE 0 lets readiness check the schema without scanning personal data.
const verifySchema = [
  ...requiredTables.map((table) => `SELECT 1 FROM ${table} WHERE 0`),
  "SELECT placeholder FROM guestbook_entries WHERE 0",
  "SELECT version FROM submissions WHERE 0",
].join(" UNION ALL ");

export async function releaseReady(db: D1DatabaseSession, version: string): Promise<boolean> {
  try {
    const [catalog] = await db.batch<{ ready: number }>([
      db.prepare("SELECT json_valid(json) AS ready FROM content_entries WHERE version_id=? AND key='catalog'").bind(version),
      db.prepare(verifySchema),
    ]);
    return catalog.results[0]?.ready === 1;
  } catch {
    return false;
  }
}

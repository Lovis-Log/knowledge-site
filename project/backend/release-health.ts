const requiredTables = [
  "content_versions", "content_current", "users", "sessions", "invites", "reset_tokens",
  "review_logs", "rate_limits", "favorites", "guestbook_entries", "submissions",
  "reading_progress", "reading_highlights",
];
// SQLite resolves every referenced table and column when preparing this statement.
// WHERE 0 lets readiness check the schema without scanning personal data.
const verifySchema = `
  SELECT guestbook_entries.placeholder, submissions.version
  FROM ${requiredTables.join(" CROSS JOIN ")} WHERE 0
`;

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

// Windows checkouts may use CRLF while Pages builds on Linux. The same source
// must produce identical content IDs regardless of line endings or object key order.
export function contentJson(value: unknown): string {
  return JSON.stringify(value, (_key, entry: unknown) => {
    if (typeof entry === "string") return entry.replace(/\r\n/g, "\n");
    if (entry && typeof entry === "object" && !Array.isArray(entry))
      return Object.fromEntries(Object.entries(entry).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0));
    return entry;
  });
}

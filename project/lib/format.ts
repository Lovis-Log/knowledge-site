export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

export function paddedNumber(n: number): string {
  return String(n).padStart(2, "0");
}

/** 作者多于 max 位时只列前几位，末尾加「等」 */
export function formatAuthors(author: string, max = 2): string {
  const names = author
    .split(/[,，、;；]/)
    .map((name) => name.trim())
    .filter(Boolean);
  if (!names.length) return author.trim();
  if (names.length <= max) return names.join("、");
  return `${names.slice(0, max).join("、")} 等`;
}

/**
 * Editorial labels share one blockquote chrome. Key takeaways keep the warm
 * card treatment; supplemental proofs get a distinct vertical rule instead.
 */
export type NoteEmphasis = "key" | "proof";

const KEY_LABELS = /^(关键结论|理解关键|注意|易错点|易混点)$/;

export function noteEmphasis(label: string): NoteEmphasis | undefined {
  const value = label.trim();
  // Both `**补充证明**：` and `**补充证明：**` are used in the notes.
  if (/^补充证明\s*[：:]?$/.test(value)) return "proof";
  return KEY_LABELS.test(value) ? "key" : undefined;
}

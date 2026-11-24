/**
 * Problem statements and key takeaways use the warm card treatment.
 * Supplemental proofs use a vertical rule.
 */
export type NoteEmphasis = "key" | "proof";

const KEY_LABELS = /^(题目|关键结论|理解关键|注意|易错点|易混点)$/;

export function noteEmphasis(label: string): NoteEmphasis | undefined {
  const value = label.trim();
  // Both `**补充证明**：` and `**补充证明：**` are used in the notes.
  if (/^补充证明\s*[：:]?$/.test(value)) return "proof";
  return KEY_LABELS.test(value) ? "key" : undefined;
}

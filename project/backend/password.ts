import { bytesToHex, hexToBytes } from "@noble/hashes/utils.js";
import { timingSafeEqual, scryptSync } from "node:crypto";

// v1 parameters are immutable: existing hashes must remain verifiable.
const legacyOptions = { N: 32768, r: 8, p: 3, maxmem: 64 * 1024 * 1024 };
// Deliberately reduced work factor for this user's small friends-only site.
// This is below general password-storage recommendations, not a security minimum.
export const PASSWORD_HASH_COST = { N: 512, r: 8, p: 1 } as const;
const options = { ...PASSWORD_HASH_COST, maxmem: 4 * 1024 * 1024 };
export function randomToken() {
  return bytesToHex(crypto.getRandomValues(new Uint8Array(32)));
}
export async function digest(value: string) {
  return bytesToHex(
    new Uint8Array(
      await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)),
    ),
  );
}
export function equal(a: string, b: string) {
  // Only fixed-size, encoded hashes/tokens enter this function.
  if (a.length !== b.length) return false;
  return timingSafeEqual(
    new TextEncoder().encode(a),
    new TextEncoder().encode(b),
  );
}
export async function hashPassword(password: string) {
  const salt = bytesToHex(crypto.getRandomValues(new Uint8Array(16)));
  const hash = scryptSync(password, hexToBytes(salt), 32, options);
  return `scrypt-v2$${salt}$${bytesToHex(hash)}`;
}
export function needsPasswordUpgrade(encoded: string) {
  return encoded.startsWith("scrypt-v1$");
}
export async function verifyPassword(
  password: string,
  encoded: string | undefined,
) {
  // Unknown usernames use the same work factor as current accounts.
  const [version, salt, expected] = (
    encoded ?? `scrypt-v2$${"00".repeat(16)}$${"00".repeat(32)}`
  ).split("$");
  if (
    !["scrypt-v1", "scrypt-v2"].includes(version) ||
    !/^[a-f0-9]{32}$/.test(salt) ||
    !/^[a-f0-9]{64}$/.test(expected)
  )
    return false;
  if (encoded?.split("$").length !== 3 && encoded !== undefined) return false;
  const actual = bytesToHex(
    scryptSync(
      password,
      hexToBytes(salt),
      32,
      version === "scrypt-v1" ? legacyOptions : options,
    ),
  );
  return equal(actual, expected) && Boolean(encoded);
}

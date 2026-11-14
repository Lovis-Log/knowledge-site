import { digest } from "./password";

const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
const shortCode = /^[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}$/i;
const encoder = new TextEncoder();
export const INVITE_HASH_PREFIX = "hmac-sha256:v1:";
// The HMAC key is derived from the existing encryption secret with HKDF.
// Keep this label stable: changing it invalidates every stored keyed hash.
const hashKeyInfo = "lovismind:invite-code-hash:v1";

export class InviteStorageError extends Error {}

export function generateInviteCode() {
  return Array.from(crypto.getRandomValues(new Uint8Array(6)), (byte) => alphabet[byte & 31]).join("");
}

export function isShortInviteCode(code: string) {
  return shortCode.test(code);
}

export function normalizeInviteCode(code: string) {
  // Legacy 64-character tokens retain their exact hashing behavior.
  return isShortInviteCode(code) ? code.toUpperCase() : code;
}

function keyMaterial(secret: string | undefined): Uint8Array<ArrayBuffer> {
  if (!secret || !/^[A-Za-z0-9+/]{43}=$/.test(secret)) {
    throw new InviteStorageError("INVITE_KEY_UNAVAILABLE");
  }
  const bytes = Uint8Array.from(atob(secret), (char) => char.charCodeAt(0));
  if (bytes.length !== 32) throw new InviteStorageError("INVITE_KEY_UNAVAILABLE");
  return bytes;
}

function importEncryptionKey(material: Uint8Array<ArrayBuffer>) {
  return crypto.subtle.importKey("raw", material, "AES-GCM", false, ["encrypt", "decrypt"]);
}

export type InviteKeys = { encryption: CryptoKey; hash: CryptoKey };

export async function importInviteKey(secret: string | undefined) {
  return importEncryptionKey(keyMaterial(secret));
}

export async function importInviteKeys(secret: string | undefined): Promise<InviteKeys> {
  const material = keyMaterial(secret);
  // Importing the same raw bytes as AES-GCM and HKDF keys keeps the two uses
  // separate; the HMAC key is an HKDF output, never the AES CryptoKey itself.
  const [encryption, hkdf] = await Promise.all([
    importEncryptionKey(material),
    crypto.subtle.importKey("raw", material, "HKDF", false, ["deriveKey"]),
  ]);
  const hash = await crypto.subtle.deriveKey(
    {
      name: "HKDF",
      hash: "SHA-256",
      salt: encoder.encode("lovismind:invite-key-derivation:v1"),
      info: encoder.encode(hashKeyInfo),
    },
    hkdf,
    { name: "HMAC", hash: "SHA-256", length: 256 },
    false,
    ["sign"],
  );
  return { encryption, hash };
}

export async function importInviteKeysIfConfigured(secret: string | undefined) {
  try {
    return await importInviteKeys(secret);
  } catch (error) {
    // Registration must keep accepting legacy SHA hashes when the key is
    // absent, so a missing or malformed secret only disables keyed lookups.
    if (error instanceof InviteStorageError) return null;
    throw error;
  }
}

function base64(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes));
}

export async function encryptInvite(code: string, id: string, key: CryptoKey) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv, additionalData: encoder.encode(`lovismind:invite:${id}`) },
    key,
    encoder.encode(code),
  );
  return `v1:${base64(iv)}:${base64(new Uint8Array(ciphertext))}`;
}

export async function decryptInvite(value: string, id: string, key: CryptoKey) {
  try {
    const [version, iv, ciphertext, extra] = value.split(":");
    if (version !== "v1" || !iv || !ciphertext || extra !== undefined) throw new Error();
    const decoded = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: Uint8Array.from(atob(iv), (char) => char.charCodeAt(0)),
        additionalData: encoder.encode(`lovismind:invite:${id}`),
      },
      key,
      Uint8Array.from(atob(ciphertext), (char) => char.charCodeAt(0)),
    );
    return new TextDecoder().decode(decoded);
  } catch {
    throw new InviteStorageError("INVITE_DECRYPT_FAILED");
  }
}

export async function hashInviteCode(code: string, keys: InviteKeys) {
  const signature = new Uint8Array(
    await crypto.subtle.sign("HMAC", keys.hash, encoder.encode(normalizeInviteCode(code))),
  );
  return INVITE_HASH_PREFIX + Array.from(signature, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function inviteCodeHashes(code: string, keys: InviteKeys | null) {
  const normalized = normalizeInviteCode(code);
  // Keyless SHA-256 stays a lookup candidate so legacy long codes and short
  // codes created before the keyed hashes were introduced keep working.
  const hashes = [await digest(normalized)];
  if (keys && isShortInviteCode(normalized)) hashes.unshift(await hashInviteCode(normalized, keys));
  return hashes;
}

export async function storeInvite(
  db: Pick<D1DatabaseSession, "prepare">,
  params: { maxUses: number; expiresAt: number; adminId: string; createdAt: number },
  keys: InviteKeys,
  createCode = generateInviteCode,
) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = createCode();
    const id = crypto.randomUUID();
    const [hash, ciphertext] = await Promise.all([
      hashInviteCode(code, keys),
      encryptInvite(code, id, keys.encryption),
    ]);
    const inserted = await db.prepare(
      "INSERT INTO invites(id,code_hash,code_ciphertext,expires_at,max_uses,created_by,created_at) VALUES(?,?,?,?,?,?,?) ON CONFLICT(code_hash) DO NOTHING RETURNING id",
    ).bind(id, hash, ciphertext, params.expiresAt, params.maxUses, params.adminId, params.createdAt).first<{ id: string }>();
    if (inserted) return { id, code };
  }
  throw new InviteStorageError("INVITE_GENERATION_BUSY");
}

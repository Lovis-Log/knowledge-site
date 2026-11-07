import { digest } from "./password";

const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
const encoder = new TextEncoder();

export class InviteStorageError extends Error {}

export function generateInviteCode() {
  return Array.from(crypto.getRandomValues(new Uint8Array(6)), (byte) => alphabet[byte & 31]).join("");
}

export function normalizeInviteCode(code: string) {
  // Legacy 64-character tokens retain their exact hashing behavior.
  return /^[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}$/i.test(code) ? code.toUpperCase() : code;
}

export async function importInviteKey(secret: string | undefined) {
  if (!secret || !/^[A-Za-z0-9+/]{43}=$/.test(secret)) {
    throw new InviteStorageError("INVITE_KEY_UNAVAILABLE");
  }
  const bytes = Uint8Array.from(atob(secret), (char) => char.charCodeAt(0));
  if (bytes.length !== 32) throw new InviteStorageError("INVITE_KEY_UNAVAILABLE");
  return crypto.subtle.importKey("raw", bytes, "AES-GCM", false, ["encrypt", "decrypt"]);
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

export async function storeInvite(
  db: Pick<D1DatabaseSession, "prepare">,
  params: { maxUses: number; expiresAt: number; adminId: string; createdAt: number },
  key: CryptoKey,
  createCode = generateInviteCode,
) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = createCode();
    const id = crypto.randomUUID();
    const [hash, ciphertext] = await Promise.all([digest(code), encryptInvite(code, id, key)]);
    const inserted = await db.prepare(
      "INSERT INTO invites(id,code_hash,code_ciphertext,expires_at,max_uses,created_by,created_at) VALUES(?,?,?,?,?,?,?) ON CONFLICT(code_hash) DO NOTHING RETURNING id",
    ).bind(id, hash, ciphertext, params.expiresAt, params.maxUses, params.adminId, params.createdAt).first<{ id: string }>();
    if (inserted) return { id, code };
  }
  throw new InviteStorageError("INVITE_GENERATION_BUSY");
}

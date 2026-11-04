import { test } from "node:test";
import assert from "node:assert/strict";
import { scrypt } from "@noble/hashes/scrypt.js";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils.js";
import {
  hashPassword,
  verifyPassword,
  needsPasswordUpgrade,
  PASSWORD_HASH_COST,
} from "../password";

test("native verification accepts the previous JavaScript scrypt format", async () => {
  const password = "Legacy password 示例",
    salt = "000102030405060708090a0b0c0d0e0f";
  const oldHash = `scrypt-v1$${salt}$${bytesToHex(scrypt(password, hexToBytes(salt), { N: 32768, r: 8, p: 3, dkLen: 32, maxmem: 64 * 1024 * 1024 }))}`;
  assert.equal(await verifyPassword(password, oldHash), true);
  assert.equal(await verifyPassword("wrong password", oldHash), false);
  assert.equal(needsPasswordUpgrade(oldHash), true);
});
test("new hashes use reduced parameters, independent salts and the new version", async () => {
  assert.deepEqual(PASSWORD_HASH_COST, { N: 512, r: 8, p: 1 });
  const first = await hashPassword("Mixed ! password"),
    second = await hashPassword("Mixed ! password");
  assert.match(first, /^scrypt-v2\$[a-f0-9]{32}\$[a-f0-9]{64}$/);
  assert.notEqual(first, second);
  assert.equal(await verifyPassword("Mixed ! password", first), true);
  assert.equal(await verifyPassword("wrong password", first), false);
  assert.equal(needsPasswordUpgrade(first), false);
});
test("unknown and malformed hashes never authenticate", async () => {
  for (const encoded of [
    undefined,
    "",
    "scrypt-v9$00$00",
    "scrypt-v2$xx$zz",
    `scrypt-v2$${"00".repeat(16)}$${"00".repeat(32)}$extra`,
  ])
    assert.equal(await verifyPassword("example", encoded), false);
});

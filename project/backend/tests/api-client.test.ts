import { test } from "node:test";
import assert from "node:assert/strict";
import { api, ApiError } from "../../lib/api";

test("Cloudflare JSON resource-limit responses receive a clear message", async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () =>
      Response.json(
        {
          title: "Error 1102: Worker exceeded resource limits",
          status: 503,
          error_code: 1102,
        },
        { status: 503 },
      );
    await assert.rejects(
      api("/api/auth/me"),
      (error) =>
        error instanceof ApiError &&
        error.code === "RESOURCE_LIMITED" &&
        error.status === 503 &&
        error.message.includes("服务器资源暂时不足"),
    );
  } finally {
    globalThis.fetch = original;
  }
});

test("platform HTML resource-limit errors become a readable failure", async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () =>
      new Response("<html>Error 1102: Worker exceeded resource limits</html>", {
        status: 500,
        headers: { "Content-Type": "text/html" },
      });
    await assert.rejects(
      api("/api/auth/me"),
      (error) =>
        error instanceof ApiError &&
        error.code === "SERVICE_UNAVAILABLE" &&
        error.status === 500 &&
        !error.message.includes("Unexpected token"),
    );
  } finally {
    globalThis.fetch = original;
  }
});
test("JSON account-status errors retain their status and message", async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () =>
      Response.json(
        {
          code: "ACCOUNT_STATUS",
          status: "pending",
          message: "Waiting for review",
        },
        { status: 403 },
      );
    await assert.rejects(
      api("/api/auth/me"),
      (error) =>
        error instanceof ApiError &&
        error.accountStatus === "pending" &&
        error.message === "Waiting for review",
    );
  } finally {
    globalThis.fetch = original;
  }
});
test("malformed CSRF responses stop mutations before submission", async () => {
  const original = globalThis.fetch;
  let calls = 0;
  try {
    globalThis.fetch = async () => {
      calls++;
      return Response.json({ token: 42 });
    };
    await assert.rejects(
      api("/api/auth/login", "POST", {}),
      (error) =>
        error instanceof ApiError && error.code === "SERVICE_UNAVAILABLE",
    );
    assert.equal(calls, 1);
  } finally {
    globalThis.fetch = original;
  }
});

test("mutations reuse CSRF and retry only a rejected token", async () => {
  const original = globalThis.fetch;
  const tokens = ["a".repeat(64), "b".repeat(64)];
  let reads = 0;
  let writes = 0;
  try {
    globalThis.fetch = async (input, init) => {
      if (input === "/api/auth/csrf") return Response.json({ token: tokens[reads++] });
      const token = new Headers(init?.headers).get("X-CSRF-Token");
      writes++;
      return writes === 3
        ? Response.json({ code: "CSRF_FAILED" }, { status: 403 })
        : Response.json({ token });
    };
    assert.deepEqual(await api("/api/favorites", "POST", {}), { token: tokens[0] });
    assert.deepEqual(await api("/api/favorites", "POST", {}), { token: tokens[0] });
    assert.deepEqual(await api("/api/favorites", "POST", {}), { token: tokens[1] });
    assert.equal(reads, 2);
    assert.equal(writes, 4);
  } finally {
    globalThis.fetch = original;
  }
});

test("posting limits retain Retry-After without automatically retrying a write", async () => {
  const original = globalThis.fetch;
  let writes = 0;
  try {
    globalThis.fetch = async (input) => {
      if (input === "/api/auth/csrf") return Response.json({ token: "c".repeat(64) });
      writes++;
      return Response.json({ code: "GUESTBOOK_RATE_LIMITED", message: "Please wait" }, {
        status: 429, headers: { "Retry-After": "3" },
      });
    };
    await assert.rejects(api("/api/guestbook", "POST", { action: "publish", message: "Keep my draft" }),
      (error) => error instanceof ApiError && error.code === "GUESTBOOK_RATE_LIMITED" && error.retryAfter === 3);
    assert.equal(writes, 1);
  } finally { globalThis.fetch = original; }
});

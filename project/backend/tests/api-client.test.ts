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

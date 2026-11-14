import { test } from "node:test";
import assert from "node:assert/strict";
import { registerHooks } from "node:module";

import { anchorIdFromHash, scrollToAnchor } from "../../components/navigation-feedback";
import { isAuthError, loginRedirectHref } from "../../components/session-recovery";
import { ApiError } from "../../lib/api";

// These components import CSS modules, which the browser bundler handles but Node does not.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.endsWith(".css"))
      return { url: new URL(specifier, context.parentURL).href, format: "module", shortCircuit: true };
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url.endsWith(".css")) return { format: "module", source: "export default {};", shortCircuit: true };
    return nextLoad(url, context);
  },
});

const guestbook = await import("../../components/guestbook");
const submissions = await import("../../components/submissions");

test("reader links decode anchors without throwing on malformed hashes", () => {
  assert.equal(anchorIdFromHash("#%E6%96%B9%E6%B3%95"), "方法");
  assert.equal(anchorIdFromHash("#plain"), "plain");
  assert.equal(anchorIdFromHash("#"), null);
  assert.equal(anchorIdFromHash(""), null);
  assert.doesNotThrow(() => anchorIdFromHash("#%E0%A4%A"));
  assert.equal(anchorIdFromHash("#%E0%A4%A"), null);
});

test("reader links scroll only to headings that exist in the committed page", () => {
  const scrolled: string[] = [];
  let lookups = 0;
  const page = {
    getElementById(id: string) {
      lookups++;
      return id === "方法" ? { scrollIntoView: () => scrolled.push(id) } : null;
    },
  };

  assert.equal(scrollToAnchor("#%E6%96%B9%E6%B3%95", page), true);
  assert.deepEqual(scrolled, ["方法"]);
  assert.equal(scrollToAnchor("#missing", page), false);
  assert.deepEqual(scrolled, ["方法"]);

  const beforeMalformed = lookups;
  assert.equal(scrollToAnchor("#%E0%A4%A", page), false);
  assert.equal(lookups, beforeMalformed, "a malformed hash must not be looked up");
});

test("session recovery returns to the exact page, query and hash", () => {
  const next = "/guestbook/?before=12#reply-9";
  const href = loginRedirectHref({ pathname: "/guestbook/", search: "?before=12", hash: "#reply-9" });
  assert.equal(href, "/login/?next=" + encodeURIComponent(next));

  const parsed = new URL(href, "https://example.test");
  assert.equal(parsed.pathname, "/login/");
  assert.equal(parsed.searchParams.get("next"), next);
  assert.equal(loginRedirectHref({ pathname: "/favorites/" }), "/login/?next=%2Ffavorites%2F");
  assert.equal(isAuthError(new ApiError(401, "UNAUTHORIZED", "expired")), true);
  assert.equal(isAuthError(new ApiError(403, "FORBIDDEN", "denied")), false);
  assert.equal(isAuthError(new Error("offline")), false);
});

test("a deleted guestbook reply target keeps the draft and blocks submission", () => {
  const draft = { targetId: 7, missing: false };
  const deleted = guestbook.replyDraftAfterError(draft, true, new ApiError(404, "NOT_FOUND", "gone"));

  assert.deepEqual(deleted, { targetId: 7, missing: true });
  assert.equal(guestbook.canSubmitReply(deleted, "kept draft"), false);
  assert.equal(guestbook.canSubmitReply(deleted, "   "), false);

  const transient = guestbook.replyDraftAfterError(draft, true, new Error("network"));
  assert.deepEqual(transient, draft);
  assert.equal(guestbook.canSubmitReply(transient, "kept draft"), true);

  const cancelled = guestbook.replyDraftAfterCancel();
  assert.deepEqual(cancelled, { targetId: null, missing: false });
  assert.equal(guestbook.canSubmitReply(cancelled, "kept draft"), true);
  assert.equal(guestbook.canSubmitReply(cancelled, "   "), false);
});

test("submissions retry reuses the idempotency key until the draft changes", () => {
  let generated = 0;
  const make = () => `request-${++generated}`;

  const first = submissions.nextSubmissionRequestId("", make);
  assert.equal(first, "request-1");
  assert.equal(submissions.nextSubmissionRequestId(first, make), "request-1");
  assert.equal(generated, 1, "a retry must not create a second key");

  const edited = submissions.nextSubmissionRequestId("", make);
  assert.equal(edited, "request-2");
  assert.equal(submissions.nextSubmissionRequestId(edited, make), "request-2");
  assert.equal(generated, 2);
});

test("submission failures keep the action that failed instead of only refreshing", () => {
  const retry = { path: "/api/admin/submissions", data: { id: 9, status: "adopted" } };
  const action = submissions.submissionFailure("action", new Error("save failed"), retry);
  assert.equal(action.kind, "action");
  assert.equal(action.message, "save failed");
  assert.equal(action.retry, retry);

  const load = submissions.submissionFailure("load", new Error("offline"));
  assert.equal(load.kind, "load");
  assert.equal(load.retry, undefined);
  assert.notEqual(load.kind, action.kind);

  const expired = submissions.submissionFailure("submit", new ApiError(401, "UNAUTHORIZED", "sign in"));
  assert.equal(expired.kind, "submit");
  assert.equal(expired.authExpired, true);
  assert.equal(expired.message, "sign in");
});

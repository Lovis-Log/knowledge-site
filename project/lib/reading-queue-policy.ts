import { ApiError } from "./api";

export type ReadingFailureKind = "auth" | "account" | "terminal" | "transient";

/** Terminal failures cannot succeed by replaying the same write. */
export function classifyReadingFailure(error: unknown): ReadingFailureKind {
  if (!(error instanceof ApiError)) return "transient";
  if (error.status === 401 || error.status === 403) return "auth";
  if (error.status === 409) return error.code === "ACCOUNT_CHANGED" ? "account" : "terminal";
  if (error.status >= 400 && error.status < 500 && error.status !== 408 && error.status !== 429)
    return "terminal";
  return "transient";
}

const retryDelays = [2000, 5000, 15000, 30000, 60000, 120000];

/** Bounded backoff: retries slow down and never run in a tight loop. */
export function readingRetryDelay(attempt: number) {
  return retryDelays[Math.min(Math.max(attempt, 1), retryDelays.length) - 1];
}

/** A monotonic client clock: a device whose clock runs behind still moves forward. */
export function nextObservedAt(previous: number, now = Date.now()) {
  return Math.max(now, previous + 1);
}

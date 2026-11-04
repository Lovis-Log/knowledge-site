export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public accountStatus?: string,
  ) {
    super(message);
  }
}
async function responseJson(response: Response) {
  try {
    const result: unknown = await response.json();
    if (!result || typeof result !== "object" || Array.isArray(result))
      throw new Error("Invalid API response");
    return result as Record<string, unknown>;
  } catch {
    throw new ApiError(
      response.ok ? 502 : response.status,
      "SERVICE_UNAVAILABLE",
      "服务暂时不可用，请稍后重试 / Service temporarily unavailable; please try again later",
    );
  }
}
export async function api<T>(
  path: string,
  method = "GET",
  data?: unknown,
): Promise<T> {
  const headers: Record<string, string> = {};
  if (method !== "GET") {
    const csrf = await fetch("/api/auth/csrf", {
      cache: "no-store",
      credentials: "same-origin",
    });
    if (!csrf.ok)
      throw new ApiError(
        csrf.status,
        "SERVICE_UNAVAILABLE",
        "服务暂时不可用，请稍后重试 / Service temporarily unavailable; please try again later",
      );
    const { token } = await responseJson(csrf);
    if (typeof token !== "string" || !/^[a-f0-9]{64}$/.test(token))
      throw new ApiError(
        502,
        "SERVICE_UNAVAILABLE",
        "服务暂时不可用，请刷新页面重试 / Service unavailable; refresh and try again",
      );
    headers["X-CSRF-Token"] = token;
    headers["Content-Type"] = "application/json";
  }
  const response = await fetch(path, {
    method,
    headers,
    credentials: "same-origin",
    cache: "no-store",
    body: data === undefined ? undefined : JSON.stringify(data),
  });
  const result = await responseJson(response);
  if (!response.ok && result.error_code === 1102)
    throw new ApiError(
      response.status,
      "RESOURCE_LIMITED",
      "服务器资源暂时不足，请稍后重试 / Server resource limit reached; please try again later",
    );
  if (!response.ok)
    throw new ApiError(
      response.status,
      typeof result.code === "string" ? result.code : "ERROR",
      typeof result.message === "string"
        ? result.message
        : "请求失败 / Request failed",
      typeof result.status === "string" ? result.status : undefined,
    );
  return result as T;
}
export function safeNext(value: string | null) {
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    /[\r\n]/.test(value)
  )
    return "/library/";
  const url = new URL(value, window.location.origin);
  return url.origin === window.location.origin &&
    !["/login/", "/register/", "/reset-password/"].includes(url.pathname)
    ? url.pathname + url.search + url.hash
    : "/library/";
}

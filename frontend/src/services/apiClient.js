/**
 * apiClient.js
 * What:  The only file that talks to the backend. Builds the URL, sends the request,
 *        unwraps the standard response shape and turns every failure into an ApiError.
 * Used by: every *.service.js file
 * Talks to: the backend under API_BASE_URL (for example /api/v1), utils/api-error.js
 */
import { API_BASE_URL } from "@/constants/env.js";
import { ApiError } from "@/utils/api-error.js";

const REQUEST_TIMEOUT_MS = 10000;

// Builds "/api/v1/path?x=1". Empty values are skipped so "?category=" never reaches the server.
function buildUrl(path, params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "")
      query.set(key, String(value));
  });
  const text = query.toString();
  return `${API_BASE_URL}${path}${text ? `?${text}` : ""}`;
}

// Makes one abort switch that fires on timeout OR when the caller cancels.
// WHY: React Query cancels outdated requests (mandate Section 8.2), and we never wait forever.
function createAbort(callerSignal) {
  const controller = new AbortController();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, REQUEST_TIMEOUT_MS);
  const forwardCancel = () => controller.abort();
  if (callerSignal?.aborted) controller.abort();
  else callerSignal?.addEventListener("abort", forwardCancel, { once: true });

  return {
    signal: controller.signal,
    wasTimeout: () => timedOut,
    cleanup: () => {
      clearTimeout(timer);
      callerSignal?.removeEventListener("abort", forwardCancel);
    },
  };
}

// Reads the standard envelope { success, data, error, requestId } (mandate Section 4).
// Returns "data" on success, throws ApiError otherwise.
async function readEnvelope(response) {
  let payload = null;
  try {
    payload = await response.json();
  } catch (error) {
    // A body that is not JSON (for example an HTML error page) is handled below.
    if (error.name !== "SyntaxError") throw error;
  }

  if (response.ok && payload?.success === true) return payload.data;
  if (payload?.error) {
    throw new ApiError({
      code: payload.error.code,
      message: payload.error.message,
      status: response.status,
      requestId: payload.requestId ?? null,
    });
  }
  throw new ApiError({
    code: "BAD_RESPONSE",
    message: "The server sent an answer we could not read. Please try again.",
    status: response.status,
  });
}

// Sends one request and returns the unwrapped data.
async function request(method, path, { params, body, signal } = {}) {
  const abort = createAbort(signal);
  try {
    const response = await fetch(buildUrl(path, params), {
      method,
      headers: {
        Accept: "application/json",
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: abort.signal,
    });
    return await readEnvelope(response);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (abort.wasTimeout()) {
      throw new ApiError({
        code: "TIMEOUT",
        message: "The server took too long to answer. Please try again.",
      });
    }
    // The caller cancelled on purpose. Pass it through untouched so React Query ignores it.
    if (signal?.aborted) throw error;
    throw new ApiError({
      code: "NETWORK_ERROR",
      message: "Cannot reach the server. Check your connection and try again.",
    });
  } finally {
    abort.cleanup();
  }
}

// Reads data. Example: apiGet('/projects', { params: { category: 'tech' }, signal })
export function apiGet(path, options) {
  return request("GET", path, options);
}

// Sends data. Example: apiPost('/contact-messages', { name, email }, { signal })
export function apiPost(path, body, options = {}) {
  return request("POST", path, { ...options, body });
}

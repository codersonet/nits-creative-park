/**
 * apiClient.test.js
 * What:  Checks the API client: URLs, the response envelope and every kind of failure.
 * Used by: npm test
 * Talks to: services/apiClient.js (with a fake fetch)
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { apiGet, apiPost } from '@/services/apiClient.js';
import { ApiError } from '@/utils/api-error.js';

// Builds a fake fetch answer.
function reply(status, body, notJson = false) {
  return {
    ok: status < 400,
    status,
    json: async () => {
      if (notJson) throw new SyntaxError('bad json');
      return body;
    },
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe('apiClient', () => {
  it('builds the URL, skips empty parameters and returns the data', async () => {
    const fetchMock = vi.fn(async () => reply(200, { success: true, data: { ok: 1 }, error: null }));
    vi.stubGlobal('fetch', fetchMock);
    const data = await apiGet('/projects', { params: { category: '', page: 2 } });
    expect(data).toEqual({ ok: 1 });
    expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/projects?page=2');
  });

  it('sends a JSON body with POST', async () => {
    const fetchMock = vi.fn(async () => reply(201, { success: true, data: {}, error: null }));
    vi.stubGlobal('fetch', fetchMock);
    await apiPost('/contact-messages', { name: 'A' });
    const init = fetchMock.mock.calls[0][1];
    expect(init.method).toBe('POST');
    expect(init.headers['Content-Type']).toBe('application/json');
    expect(JSON.parse(init.body)).toEqual({ name: 'A' });
  });

  it('turns the error envelope into an ApiError', async () => {
    const body = { success: false, data: null, error: { code: 'NOT_FOUND', message: 'No such thing' }, requestId: 'r9' };
    vi.stubGlobal('fetch', vi.fn(async () => reply(404, body)));
    await expect(apiGet('/x')).rejects.toMatchObject({ code: 'NOT_FOUND', status: 404, requestId: 'r9' });
  });

  it('reports a body that is not JSON as BAD_RESPONSE', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => reply(502, null, true)));
    await expect(apiGet('/x')).rejects.toMatchObject({ code: 'BAD_RESPONSE', status: 502 });
  });

  it('reports a missing connection as NETWORK_ERROR', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new TypeError('Failed to fetch'); }));
    await expect(apiGet('/x')).rejects.toMatchObject({ code: 'NETWORK_ERROR' });
  });

  it('passes a deliberate cancel through untouched', async () => {
    vi.stubGlobal('fetch', vi.fn((url, { signal }) => new Promise((_, reject) => {
      signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
    })));
    const controller = new AbortController();
    const pending = apiGet('/x', { signal: controller.signal });
    controller.abort();
    const error = await pending.catch((caught) => caught);
    expect(error.name).toBe('AbortError');
    expect(error).not.toBeInstanceOf(ApiError);
  });

  it('turns a stalled request into TIMEOUT', async () => {
    vi.useFakeTimers();
    vi.stubGlobal('fetch', vi.fn((url, { signal }) => new Promise((_, reject) => {
      signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
    })));
    const assertion = expect(apiGet('/slow')).rejects.toMatchObject({ code: 'TIMEOUT' });
    await vi.advanceTimersByTimeAsync(10001);
    await assertion;
  });
});

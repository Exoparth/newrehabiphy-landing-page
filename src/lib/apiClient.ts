// HTTP client for the Rehabiphy backend. The public website never logs in, so
// this is read-only and deliberately attaches no Authorization header — only
// the backend's unauthenticated GET endpoints are meant to be called through it.

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://api.rehabiphy.com').replace(/\/+$/, '');

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

type Params = Record<string, string | number | undefined | null>;

interface RequestOptions {
  signal?: AbortSignal;
}

async function get<T>(path: string, params?: Params, options: RequestOptions = {}): Promise<T> {
  const url = new URL(`${BASE_URL}/v1${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, String(value));
    });
  }

  let res: Response;
  try {
    res = await fetch(url, { signal: options.signal, headers: { Accept: 'application/json' } });
  } catch (err) {
    if ((err as Error).name === 'AbortError') throw err;
    throw new ApiError('Could not reach the server. Please check your connection and try again.', 0);
  }

  let payload: { success?: boolean; data?: T; message?: string } | null = null;
  try {
    payload = await res.json();
  } catch {
    /* non-JSON body */
  }

  if (!res.ok) {
    throw new ApiError(payload?.message || `Request failed (${res.status})`, res.status);
  }

  return (payload?.data ?? payload) as T;
}

export const apiClient = { get };

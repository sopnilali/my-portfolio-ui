const API_BASE = `${process.env.NEXT_PUBLIC_BASE_API}/api`;

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

/** Request options including optional timeout (not passed to native `fetch`). */
export type FetchJsonInit = RequestInit & {
  timeoutMs?: number;
};

function resolveDefaultTimeoutMs(): number {
  const raw = process.env.API_FETCH_TIMEOUT_MS;
  const n = raw ? Number(raw) : NaN;
  if (Number.isFinite(n) && n >= 3000 && n <= 120000) {
    return n;
  }
  return 30000;
}

export async function fetchJson<T>(
  path: string,
  init?: FetchJsonInit,
): Promise<T> {
  const { timeoutMs: timeoutOverride, ...requestInit } = init ?? {};
  const timeoutMs =
    typeof timeoutOverride === 'number' &&
    Number.isFinite(timeoutOverride) &&
    timeoutOverride >= 1000
      ? Math.min(Math.max(timeoutOverride, 1000), 120000)
      : resolveDefaultTimeoutMs();

  const url = `${API_BASE}${path}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const isServer = typeof window === 'undefined';
    const res = await fetch(url, {
      ...(isServer ? { next: { revalidate: 60 } } : { cache: 'no-store' }),
      ...requestInit,
      // Must be last so our timeout AbortSignal is not overwritten by callers
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Request to ${path} failed: ${res.status} ${text}`);
    }

    return (await res.json()) as T;
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      (error as Error).name === 'AbortError'
    ) {
      throw new Error(`Request to ${path} timed out after ${timeoutMs}ms!`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

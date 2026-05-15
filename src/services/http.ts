/** Backend origin only (no `/api`). Example: https://your-api.example.com */
function getPublicApiOrigin(): string {
  return process.env.NEXT_PUBLIC_BASE_API?.trim() ?? '';
}

/** Resolved JSON API prefix: `{origin}/api` */
function getApiBase(): string {
  const origin = getPublicApiOrigin().replace(/\/+$/, '');
  if (!origin) return '';
  return `${origin}/api`;
}

const API_BASE = getApiBase();

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

  if (!API_BASE) {
    throw new Error(
      'API base URL is not configured. Set NEXT_PUBLIC_BASE_API in .env (see .env.example) and redeploy.',
    );
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${API_BASE}${normalizedPath}`;
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
      const snippet = text.replace(/\s+/g, ' ').slice(0, 240);
      const vercelGone =
        /deployment could not be found on Vercel|DEPLOYMENT_NOT_FOUND/i.test(text);
      const hint = vercelGone
        ? ' — NEXT_PUBLIC_BASE_API points to a removed or invalid Vercel URL. In Vercel → this project → Settings → Environment Variables, set NEXT_PUBLIC_BASE_API to your live backend origin (the API server that serves /api/skill), then redeploy.'
        : '';
      throw new Error(
        `Request to ${normalizedPath} failed (${res.status}): ${snippet || '(empty body)'}${hint}`,
      );
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

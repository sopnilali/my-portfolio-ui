const API_BASE = `${process.env.NEXT_PUBLIC_BASE_API}/api`;

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export async function fetchJson<T>(
  path: string,
  init?: RequestInit,
  timeoutMs = 10000,
): Promise<T> {
  const url = `${API_BASE}${path}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      // Default: revalidate periodically; callers can override
      next: { revalidate: 60 },
      signal: controller.signal,
      ...init,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Request to ${path} failed: ${res.status} ${text}`);
    }

    return (await res.json()) as T;
  } catch (error: any) {
    if (error?.name === 'AbortError') {
      throw new Error(`Request to ${path} timed out after ${timeoutMs}ms`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}


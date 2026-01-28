const API_BASE = `${process.env.NEXT_PUBLIC_BASE_API}/api`;

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export async function fetchJson<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const url = `${API_BASE}${path}`;

  const res = await fetch(url, {
    // Default: revalidate periodically; callers can override
    next: { revalidate: 60 },
    ...init,
  });

  if (!res.ok) {
    // Optionally log or throw more detailed error
    const text = await res.text().catch(() => '');
    throw new Error(`Request to ${path} failed: ${res.status} ${text}`);
  }

  return res.json() as Promise<T>;
}


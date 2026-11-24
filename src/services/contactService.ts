import type { ApiResponse } from './http';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  message: string;
}

function contactApiUrl(): string {
  if (typeof window !== 'undefined') return '/backend/contact';
  const origin = (process.env.NEXT_PUBLIC_BASE_API ?? '').trim().replace(/\/+$/, '');
  if (!origin) {
    throw new Error('API base URL is not configured (NEXT_PUBLIC_BASE_API).');
  }
  return `${origin}/api/contact`;
}

export async function createContact(
  payload: ContactPayload,
): Promise<ContactResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (typeof window === 'undefined') {
      const apiKey = process.env.API_KEY?.trim();
      if (apiKey) headers['x-api-key'] = apiKey;
    }

    const res = await fetch(contactApiUrl(), {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        message: payload.message,
      }),
      signal: controller.signal,
      cache: 'no-store',
    });

    const json = (await res.json().catch(() => ({}))) as
      | ApiResponse<unknown>
      | { error?: string };

    if (!res.ok) {
      const err =
        (json as { error?: string }).error ||
        (json as ApiResponse<unknown>)?.message ||
        `Request failed (${res.status})`;
      throw new Error(err);
    }

    return {
      message:
        (json as ApiResponse<unknown>)?.message ??
        'Message sent successfully',
    };
  } catch (e: unknown) {
    if (e instanceof Error && e.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    throw e;
  } finally {
    clearTimeout(timeoutId);
  }
}

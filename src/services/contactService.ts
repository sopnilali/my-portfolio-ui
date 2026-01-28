import { ApiResponse, fetchJson } from './http';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  message: string;
}

export async function createContact(
  payload: ContactPayload,
): Promise<ContactResponse> {
  const res = await fetchJson<ApiResponse<unknown>>('/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  return {
    message: (res as any)?.message ?? 'Message sent successfully',
  };
}


import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

const API_ORIGIN = (process.env.NEXT_PUBLIC_BASE_API ?? '').trim().replace(/\/+$/, '');
const API_KEY = (process.env.API_KEY ?? '').trim();

const HOP_BY_HOP = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
  'host',
  'content-length',
  'accept-encoding',
]);

type RouteContext = { params: Promise<{ path: string[] }> };

async function handler(request: NextRequest, context: RouteContext) {
  if (!API_ORIGIN) {
    return Response.json(
      { success: false, message: 'API base URL is not configured (NEXT_PUBLIC_BASE_API).' },
      { status: 500 },
    );
  }

  const { path } = await context.params;
  const target = new URL(`${API_ORIGIN}/api/${path.join('/')}`);
  target.search = request.nextUrl.search;

  const headers = new Headers();
  request.headers.forEach((value, name) => {
    if (!HOP_BY_HOP.has(name.toLowerCase())) headers.set(name, value);
  });
  if (API_KEY) headers.set('x-api-key', API_KEY);

  const method = request.method.toUpperCase();
  const body =
    method === 'GET' || method === 'HEAD' ? undefined : await request.arrayBuffer();

  const upstream = await fetch(target, {
    method,
    headers,
    body,
    cache: 'no-store',
    redirect: 'manual',
  });

  const responseHeaders = new Headers();
  upstream.headers.forEach((value, name) => {
    if (!HOP_BY_HOP.has(name.toLowerCase())) responseHeaders.set(name, value);
  });

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
  handler as HEAD,
  handler as OPTIONS,
};

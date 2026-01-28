import { ApiResponse, fetchJson } from './http';

export interface Blog {
  id: string;
  title: string;
  thumbnail: string;
  content: string;
  createdAt?: string;
  user?: { name?: string };
}

export async function getBlogs(): Promise<Blog[]> {
  const res = await fetchJson<ApiResponse<Blog[]>>('/blog/all', {
    cache: 'no-store',
  });
  return res.data ?? [];
}

export async function getBlogById(id: string): Promise<Blog | null> {
  const res = await fetchJson<ApiResponse<Blog>>(`/blog/${id}`, {
    cache: 'no-store',
  });
  return res.data ?? null;
}


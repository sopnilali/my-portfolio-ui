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
  try {
    const res = await fetchJson<ApiResponse<Blog[]>>('/blog/all');
    return res.data ?? [];
  } catch (error) {
    console.error('Failed to fetch blogs', error);
    return [];
  }
}

export async function getBlogById(id: string): Promise<Blog | null> {
  try {
    const res = await fetchJson<ApiResponse<Blog>>(`/blog/${id}`);
    return res.data ?? null;
  } catch (error) {
    console.error('Failed to fetch blog by id', error);
    return null;
  }
}


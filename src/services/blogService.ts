import { ApiResponse, fetchJson } from './http';

export interface Blog {
  id: string;
  title: string;
  /** Hero / list image from API */
  imageUrl?: string;
  content: string;
  createdAt?: string;
  user?: { name?: string };
  /** Older API shape; UI falls back if `imageUrl` missing */
  thumbnail?: string;
  /** Server-side view count when returned by API */
  readingCount?: number;
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
    const res = await fetchJson<ApiResponse<Blog>>(`/blog/${id}`, {
      // Single-blog payloads can be heavier / colder on the backend
      timeoutMs: 60000,
    });
    return res.data ?? null;
  } catch (error) {
    console.error('Failed to fetch blog by id', error);
    return null;
  }
}


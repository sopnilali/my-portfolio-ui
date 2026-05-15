/** Shared helpers for blog list / archive UI */

export function stripHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function excerptFromContent(html: string, maxLen = 180): string {
  const plain = stripHtml(html);
  if (plain.length <= maxLen) return plain;
  return `${plain.slice(0, maxLen).trim()}…`;
}

export function formatBlogDateShort(iso?: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatBlogDateLong(iso?: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function isValidImageSrc(src: unknown): src is string {
  return typeof src === 'string' && src.trim().length > 0;
}

/** Prefer `imageUrl`; fall back to legacy `thumbnail` if present */
export function blogCoverSrc(blog: {
  imageUrl?: string;
  thumbnail?: string;
}): string | null {
  const raw = blog.imageUrl?.trim() || blog.thumbnail?.trim();
  return isValidImageSrc(raw) ? raw : null;
}

export function estimateReadingMinutes(html: string): number {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Newest first */
export function sortBlogsByDate<T extends { createdAt?: string }>(blogs: T[]): T[] {
  return [...blogs].sort((a, b) => {
    const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return tb - ta;
  });
}

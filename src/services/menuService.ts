import { ApiResponse, fetchJson } from './http';

export interface MenuItem {
  id: string;
  label: string;
  path: string;
  order: number;
  isActive: boolean;
  isExternal: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/** Shown when the API fails or returns nothing (matches existing app routes). */
export const NAV_FALLBACK_ITEMS: MenuItem[] = [
  {
    id: 'fallback-home',
    label: 'Home',
    path: '/',
    order: 0,
    isActive: true,
    isExternal: false,
  },
  {
    id: 'fallback-projects',
    label: 'Projects',
    path: '/project',
    order: 1,
    isActive: true,
    isExternal: false,
  },
  {
    id: 'fallback-experience',
    label: 'Experience',
    path: '/experience',
    order: 2,
    isActive: true,
    isExternal: false,
  },
  {
    id: 'fallback-skills',
    label: 'Skills',
    path: '/skill',
    order: 3,
    isActive: true,
    isExternal: false,
  },
  {
    id: 'fallback-blog',
    label: 'Blog',
    path: '/blog',
    order: 4,
    isActive: true,
    isExternal: false,
  },
  {
    id: 'fallback-about',
    label: 'About',
    path: '/about',
    order: 5,
    isActive: true,
    isExternal: false,
  },
  {
    id: 'fallback-contact',
    label: 'Contact',
    path: '/contact',
    order: 6,
    isActive: true,
    isExternal: false,
  },
];

export function normalizeMenuItems(raw: MenuItem[]): MenuItem[] {
  return [...raw]
    .filter((m) => m && m.isActive !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/** Server or client: GET /api/menu via shared fetch helper */
export async function getMenuItems(): Promise<MenuItem[]> {
  try {
    const res = await fetchJson<ApiResponse<MenuItem[]>>('/menu', {
      timeoutMs: 15000,
    });
    const normalized = normalizeMenuItems(res.data ?? []);
    return normalized.length > 0 ? normalized : NAV_FALLBACK_ITEMS;
  } catch {
    return NAV_FALLBACK_ITEMS;
  }
}

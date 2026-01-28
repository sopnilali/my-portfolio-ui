import { ApiResponse, fetchJson } from './http';

export interface Skill {
  id?: string;
  name: string;
  icon: string;
}

export async function getSkills(): Promise<Skill[]> {
  const res = await fetchJson<ApiResponse<Skill[]>>('/skill', {
    cache: 'no-store',
  });
  return res.data ?? [];
}


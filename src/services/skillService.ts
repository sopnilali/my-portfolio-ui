import { ApiResponse, fetchJson } from './http';

export interface Skill {
  id?: string;
  name: string;
  icon: string;
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const res = await fetchJson<ApiResponse<Skill[]>>('/skill');
    return res.data ?? [];
  } catch (error) {
    console.error('Failed to fetch skills', error);
    return [];
  }
}


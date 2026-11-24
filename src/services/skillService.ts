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

export async function getSkillById(id: string): Promise<Skill | null> {
  try {
    const res = await fetchJson<ApiResponse<Skill>>(`/skill/${id}`);
    return res.data ?? null;
  } catch (error) {
    console.error('Failed to fetch skill by id', error);
    return null;
  }
}


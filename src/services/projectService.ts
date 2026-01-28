import { ApiResponse, fetchJson } from './http';
import { IProject } from '@/components/Types/project.type';

export async function getProjects(): Promise<IProject[]> {
  const res = await fetchJson<ApiResponse<IProject[]>>('/project', {
    cache: 'no-store',
  });
  return res.data ?? [];
}

export async function getProjectById(id: string): Promise<IProject | null> {
  const res = await fetchJson<ApiResponse<IProject>>(`/project/${id}`, {
    cache: 'no-store',
  });
  return res.data ?? null;
}


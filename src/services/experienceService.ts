import { ApiResponse, fetchJson } from './http';

export interface Experience {
  id?: string;
  position?: string;
  company?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export async function getExperiences(): Promise<Experience[]> {
  const res = await fetchJson<ApiResponse<Experience[]>>('/experience');
  return res.data ?? [];
}


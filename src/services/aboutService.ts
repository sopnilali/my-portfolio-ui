import { ApiResponse, fetchJson } from './http';

export interface About {
  id?: string;
  nameTitle?: string;
  imageUrl?: string;
  professonName?: string;
  shortdescription?: string;
}

export async function getAboutList(): Promise<About[]> {
  const res = await fetchJson<ApiResponse<About[]>>('/about');
  return res.data ?? [];
}


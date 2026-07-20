import api from '@/services/api';
import { API_ROUTES } from '@/constants/routes';
import type { ApiResponse } from '@/types/api';
import type { Category } from '@/types/Category';

export interface CategoryPayload {
  label: string;
  slug: string;
  icon_key?: string | null;
  color_code?: string | null;
  description?: string | null;
}

export async function listCategories(): Promise<Category[]> {
  const response = await api.get<ApiResponse<Category[]>>(API_ROUTES.CATEGORIES);
  return response.data.data;
}

export async function createCategory(payload: CategoryPayload): Promise<Category> {
  const response = await api.post<ApiResponse<Category>>(API_ROUTES.ADMIN_CATEGORIES, payload);
  return response.data.data;
}

export async function updateCategory(id: string, payload: CategoryPayload): Promise<Category> {
  const response = await api.put<ApiResponse<Category>>(API_ROUTES.ADMIN_CATEGORY(id), payload);
  return response.data.data;
}

export async function deleteCategory(id: string): Promise<void> {
  await api.delete(API_ROUTES.ADMIN_CATEGORY(id));
}

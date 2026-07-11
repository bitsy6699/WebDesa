import api from './api';
import { API_ROUTES } from '@/constants/routes';
import type { ApiResponse } from '@/types/api';
import type { Category } from '@/types/Category';

/**
 * Fetches the full list of categories.
 * @see docs/engineering/API_SPEC.md §4.1
 */
export async function fetchCategories(): Promise<Category[]> {
  const response = await api.get<ApiResponse<Category[]>>(API_ROUTES.CATEGORIES);
  return response.data.data;
}

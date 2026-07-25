import api from '@/services/api';
import { API_ROUTES } from '@/constants/routes';
import { fetchCategories } from '@/services/category.service';

export const listCategories = fetchCategories;

export async function createCategory(payload) {
  const response = await api.post(API_ROUTES.ADMIN_CATEGORIES, payload);
  return response.data.data;
}

export async function updateCategory(id, payload) {
  const response = await api.put(API_ROUTES.ADMIN_CATEGORY(id), payload);
  return response.data.data;
}

export async function deleteCategory(id) {
  await api.delete(API_ROUTES.ADMIN_CATEGORY(id));
}

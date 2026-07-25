import api from './api';
import { API_ROUTES } from '@/constants/routes';

/** Fetch the full category list (public). */
export async function fetchCategories() {
  const response = await api.get(API_ROUTES.CATEGORIES);
  return response.data.data;
}

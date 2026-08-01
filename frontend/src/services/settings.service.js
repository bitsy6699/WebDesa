import api from './api';
import { API_ROUTES } from '@/constants/routes';

/** Fetch the full settings list (public). */
export async function fetchSettings() {
  const response = await api.get(API_ROUTES.SETTINGS);
  return response.data.data;
}

/** Update one or more settings (admin). Body: { settings: [{ key, value, type?, group? }] }. */
export async function updateSettings(settings) {
  const response = await api.put(API_ROUTES.ADMIN_SETTINGS, { settings });
  return response.data.data;
}

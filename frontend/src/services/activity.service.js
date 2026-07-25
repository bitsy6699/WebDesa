import api from './api';
import { API_ROUTES } from '@/constants/routes';

/** Fetch paginated activity logs (admin). */
export async function fetchActivityLogs(params = {}) {
  const response = await api.get(API_ROUTES.ADMIN_ACTIVITY_LOGS, { params });
  return response.data;
}

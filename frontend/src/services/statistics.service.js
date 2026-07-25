import api from './api';
import { API_ROUTES } from '@/constants/routes';

/**
 * Fetches village statistics summary.
 * @see docs/engineering/API_SPEC.md §7.1
 */
export async function fetchStatistics() {
  const response = await api.get(API_ROUTES.STATISTICS_SUMMARY);
  return response.data.data;
}

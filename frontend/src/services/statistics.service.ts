import api from './api';
import { API_ROUTES } from '@/constants/routes';
import type { ApiResponse } from '@/types/api';
import type { StatisticsSummary } from '@/types/Statistic';

/**
 * Fetches village statistics summary.
 * @see docs/engineering/API_SPEC.md §7.1
 */
export async function fetchStatistics(): Promise<StatisticsSummary> {
  const response = await api.get<ApiResponse<StatisticsSummary>>(API_ROUTES.STATISTICS_SUMMARY);
  return response.data.data;
}

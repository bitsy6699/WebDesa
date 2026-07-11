import { useQuery } from '@tanstack/react-query';
import { fetchStatistics } from '@/services/statistics.service';
import type { StatisticsSummary } from '@/types/Statistic';

export const STATISTICS_QUERY_KEY = ['statistics', 'summary'] as const;

/**
 * Hook to fetch the village statistics summary.
 * @see docs/engineering/API_SPEC.md §7.1
 */
export function useStatistics() {
  return useQuery<StatisticsSummary, Error>({
    queryKey: STATISTICS_QUERY_KEY,
    queryFn: fetchStatistics,
    staleTime: 5 * 60 * 1000,
  });
}

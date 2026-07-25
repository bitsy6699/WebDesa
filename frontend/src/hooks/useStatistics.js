import { useQuery } from '@tanstack/react-query';
import { fetchStatistics } from '@/services/statistics.service';
import { queryKeys } from '@/lib/queryKeys';

/**
 * Hook to fetch the village statistics summary.
 * @see docs/engineering/API_SPEC.md §7.1
 */
export function useStatistics() {
  return useQuery({
    queryKey: queryKeys.statistics.summary,
    queryFn: fetchStatistics,
    staleTime: 5 * 60 * 1000,
  });
}

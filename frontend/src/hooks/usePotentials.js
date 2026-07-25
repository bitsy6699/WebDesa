import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchPotentials } from '@/services/potential.service';
import { queryKeys } from '@/lib/queryKeys';

/**
 * Hook to fetch a paginated list of potentials.
 * Params are included in the query key so each filter combination is cached separately.
 * Uses keepPreviousData so pagination never flashes empty.
 * @see docs/engineering/API_SPEC.md §5.1
 */
export function usePotentials(params = {}) {
  return useQuery({
    queryKey: queryKeys.potentials.list(params),
    queryFn: () => fetchPotentials(params),
    placeholderData: keepPreviousData,
  });
}

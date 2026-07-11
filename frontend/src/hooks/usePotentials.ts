import { useQuery } from '@tanstack/react-query';
import { fetchPotentials, type FetchPotentialsParams } from '@/services/potential.service';
import type { PaginatedResponse } from '@/types/api';
import type { PotentialListItem } from '@/types/Potential';

export const POTENTIALS_QUERY_KEY = (params: FetchPotentialsParams) =>
  ['potentials', params] as const;

/**
 * Hook to fetch a paginated list of potentials.
 * Params are included in the query key so each filter combination is cached separately.
 * @see docs/engineering/API_SPEC.md §5.1
 */
export function usePotentials(params: FetchPotentialsParams = {}) {
  return useQuery<PaginatedResponse<PotentialListItem>, Error>({
    queryKey: POTENTIALS_QUERY_KEY(params),
    queryFn: () => fetchPotentials(params),
  });
}

import { useQuery } from '@tanstack/react-query';
import { fetchPotentialDetail } from '@/services/potential.service';
import { queryKeys } from '@/lib/queryKeys';

/**
 * Hook to fetch a single potential detail page.
 * @see docs/engineering/API_SPEC.md §5.2
 */
export function usePotential(categorySlug, slug) {
  return useQuery({
    queryKey: queryKeys.potentials.detail(categorySlug, slug),
    queryFn: () => fetchPotentialDetail(categorySlug, slug),
    enabled: Boolean(categorySlug && slug),
  });
}

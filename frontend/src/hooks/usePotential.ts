import { useQuery } from '@tanstack/react-query';
import { fetchPotentialDetail } from '@/services/potential.service';
import type { PotentialDetail } from '@/types/Potential';

const POTENTIAL_DETAIL_QUERY_KEY = (categorySlug: string, slug: string) =>
  ['potentials', categorySlug, slug] as const;

/**
 * Hook to fetch a single potential detail page.
 * @see docs/engineering/API_SPEC.md §5.2
 */
export function usePotential(categorySlug: string, slug: string) {
  return useQuery<PotentialDetail, Error>({
    queryKey: POTENTIAL_DETAIL_QUERY_KEY(categorySlug, slug),
    queryFn: () => fetchPotentialDetail(categorySlug, slug),
    enabled: Boolean(categorySlug && slug),
  });
}

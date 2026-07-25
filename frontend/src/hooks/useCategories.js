import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/services/category.service';
import { queryKeys } from '@/lib/queryKeys';

/**
 * Shared hook for fetching the full category list.
 * Used by both public pages and dashboard — single source of truth.
 * Data is cached for 5 minutes; mutations invalidate via queryClient.
 */
export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
  });
}

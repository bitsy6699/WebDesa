import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/services/category.service';
import type { Category } from '@/types/Category';

export const CATEGORIES_QUERY_KEY = ['categories'] as const;

/**
 * Hook to fetch the full category list.
 * Data is shared across all pages that render category chips.
 * @see docs/engineering/API_SPEC.md §4.1
 */
export function useCategories() {
  return useQuery<Category[], Error>({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000, // Categories rarely change — 5 min cache
  });
}

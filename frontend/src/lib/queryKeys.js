/**
 * Single source of truth for all React Query cache keys.
 *
 * Usage:
 *   import { queryKeys } from '@/lib/queryKeys';
 *
 *   useQuery({ queryKey: queryKeys.potentials.list(params) })
 *   queryClient.invalidateQueries({ queryKey: queryKeys.potentials.all })
 */
export const queryKeys = {
  potentials: {
    all: ['potentials'],
    list: (params) => ['potentials', params],
    detail: (categorySlug, slug) => ['potentials', categorySlug, slug],
  },
  adminPotentials: {
    all: ['admin-potentials'],
    list: (params) => ['admin-potentials', params],
    detail: (id) => ['admin-potentials', id],
  },
  categories: {
    all: ['categories'],
    count: (slug) => ['categories', slug, 'potentials-count'],
  },
  statistics: {
    summary: ['statistics', 'summary'],
  },
  media: {
    all: ['media'],
    list: (params) => ['media', params],
  },
  activityLogs: {
    all: ['activity-logs'],
    list: (params) => ['activity-logs', params],
  },
  settings: {
    all: ['settings'],
  },
};

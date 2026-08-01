import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchAdminPotentials, fetchAdminPotential } from '@/services/potential.service';
import { queryKeys } from '@/lib/queryKeys';

export function useAdminPotentials(params = {}) {
  return useQuery({
    queryKey: queryKeys.adminPotentials.list(params),
    queryFn: () => fetchAdminPotentials(params),
    placeholderData: keepPreviousData,
  });
}

export function useAdminPotential(id) {
  return useQuery({
    queryKey: queryKeys.adminPotentials.detail(id),
    queryFn: () => fetchAdminPotential(id),
    enabled: Boolean(id),
  });
}

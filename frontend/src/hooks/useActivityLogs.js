import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { fetchActivityLogs } from '@/services/activity.service';
import { queryKeys } from '@/lib/queryKeys';

export function useActivityLogs(params = {}) {
  const { token } = useAuth();
  return useQuery({
    queryKey: queryKeys.activityLogs.list(params),
    queryFn: () => fetchActivityLogs(params),
    enabled: Boolean(token),
  });
}

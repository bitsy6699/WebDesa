import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { fetchSettings, updateSettings } from '@/services/settings.service';
import { queryKeys } from '@/lib/queryKeys';

export function useSettings() {
  const { token } = useAuth();
  return useQuery({
    queryKey: queryKeys.settings.all,
    queryFn: fetchSettings,
    enabled: Boolean(token),
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSettings,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.settings.all });
    },
  });
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { fetchMediaList, uploadMedia, deleteMedia } from '@/services/media.service';
import { queryKeys } from '@/lib/queryKeys';

export function useMediaList(params = {}) {
  const { token } = useAuth();
  return useQuery({
    queryKey: queryKeys.media.list(params),
    queryFn: () => fetchMediaList(params),
    enabled: Boolean(token),
  });
}

export function useUploadMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, onProgress }) =>
      uploadMedia(file, onProgress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.media.all });
    },
  });
}

export function useDeleteMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMedia,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.media.all });
    },
  });
}

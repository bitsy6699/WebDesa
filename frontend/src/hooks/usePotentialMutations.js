import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createPotential,
  updatePotential,
  deletePotential,
  togglePotentialFeatured,
} from '@/services/potential.service';
import { queryKeys } from '@/lib/queryKeys';

export function useCreatePotential() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPotential,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.potentials.all });
    },
  });
}

export function useUpdatePotential() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      updatePotential(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.potentials.all });
    },
  });
}

export function useDeletePotential() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePotential,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.potentials.all });
    },
  });
}

export function useToggleFeatured() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: togglePotentialFeatured,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.potentials.all });
    },
  });
}

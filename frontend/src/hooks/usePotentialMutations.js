import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createPotential,
  updatePotential,
  deletePotential,
  togglePotentialFeatured,
  togglePotentialStatus,
} from '@/services/potential.service';
import { queryKeys } from '@/lib/queryKeys';

export function useCreatePotential() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPotential,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.potentials.all });
      await queryClient.invalidateQueries({ queryKey: queryKeys.adminPotentials.all });
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
      await queryClient.invalidateQueries({ queryKey: queryKeys.adminPotentials.all });
    },
  });
}

export function useDeletePotential() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePotential,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.potentials.all });
      await queryClient.invalidateQueries({ queryKey: queryKeys.adminPotentials.all });
    },
  });
}

export function useToggleFeatured() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: togglePotentialFeatured,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.potentials.all });
      await queryClient.invalidateQueries({ queryKey: queryKeys.adminPotentials.all });
    },
  });
}

export function useToggleStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, currentStatus }) => togglePotentialStatus(id, currentStatus),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.potentials.all });
      await queryClient.invalidateQueries({ queryKey: queryKeys.adminPotentials.all });
    },
  });
}

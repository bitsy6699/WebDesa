import { useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategory, deleteCategory, updateCategory } from './categoryApi';
import { useCategories } from '@/hooks/useCategories';
import { queryKeys } from '@/lib/queryKeys';

export { useCategories };

export function useCategory(id) {
  const { data: categories = [], ...rest } = useCategories();

  const category = useMemo(() => categories.find((item) => item.id === id), [categories, id]);

  return {
    ...rest,
    data: category,
  };
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (draft) =>
      createCategory({
        label: draft.name,
        slug: draft.slug,
        description: draft.description ?? null,
        color_code: draft.colorCode ?? null,
        icon_key: draft.iconKey ?? null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, draft }) =>
      updateCategory(id, {
        label: draft.name,
        slug: draft.slug,
        description: draft.description ?? null,
        color_code: draft.colorCode ?? null,
        icon_key: draft.iconKey ?? null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.categories.all });
      const previous = queryClient.getQueryData(queryKeys.categories.all);
      queryClient.setQueryData(queryKeys.categories.all, (current = []) => current.filter((item) => item.id !== id));
      return { previous };
    },
    onError: (_error, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.categories.all, context.previous);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
  });
}

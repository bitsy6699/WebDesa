import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCategory, deleteCategory, listCategories, updateCategory } from './categoryApi';
import type { Category } from '@/types/Category';
import type { CategoryDraft } from '../types';
import { CATEGORIES_QUERY_KEY } from '@/hooks/useCategories';

export function useCategories() {
  return useQuery<Category[], Error>({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: listCategories,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}

export function useCategory(id?: string) {
  const { data: categories = [], ...rest } = useCategories();

  const category = useMemo(() => categories.find((item) => item.id === id), [categories, id]);

  return {
    ...rest,
    data: category,
  };
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, CategoryDraft>({
    mutationFn: (draft) =>
      createCategory({
        label: draft.name,
        slug: draft.slug,
        description: draft.description ?? null,
        color_code: draft.colorCode ?? null,
        icon_key: draft.iconKey ?? null,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, { id: string; draft: CategoryDraft }>({
    mutationFn: ({ id, draft }) =>
      updateCategory(id, {
        label: draft.name,
        slug: draft.slug,
        description: draft.description ?? null,
        color_code: draft.colorCode ?? null,
        icon_key: draft.iconKey ?? null,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string, { previous: Category[] | undefined }>({
    mutationFn: deleteCategory,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: CATEGORIES_QUERY_KEY });
      const previous = queryClient.getQueryData<Category[]>(CATEGORIES_QUERY_KEY);
      queryClient.setQueryData<Category[]>(CATEGORIES_QUERY_KEY, (current = []) => current.filter((item) => item.id !== id));
      return { previous };
    },
    onError: (_error, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData<Category[]>(CATEGORIES_QUERY_KEY, context.previous);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
    },
  });
}

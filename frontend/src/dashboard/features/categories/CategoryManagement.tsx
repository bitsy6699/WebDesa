import { useMemo, useState } from 'react';
import { CategoryListPage } from './CategoryListPage';
import { CategoryDetailPage } from './CategoryDetailPage';
import { CategoryForm } from './CategoryForm';
import { useCategory, useCreateCategory, useDeleteCategory, useUpdateCategory } from './api/hooks';
import { getCategoryErrorMessage, mapServerErrorsToFormState } from './utils';
import type { CategoryDraft, CategoryFormMode, CategoryRow } from './types';

export function CategoryManagement() {
  const [mode, setMode] = useState<CategoryFormMode | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryRow | null>(null);
  const [feedback, setFeedback] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const [pendingDeleteRow, setPendingDeleteRow] = useState<CategoryRow | null>(null);

  const { data: categoryDetails, isLoading: isLoadingCategory } = useCategory(selectedCategory?.id);
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const currentView = useMemo(() => {
    if (mode === 'create' || mode === 'edit') {
      return 'form';
    }

    if (selectedCategory) {
      return 'detail';
    }

    return 'list';
  }, [mode, selectedCategory]);

  const resetFormState = () => {
    setFeedback('');
    setSubmitError('');
    setServerErrors({});
  };

  const handleSubmit = (values: CategoryDraft) => {
    resetFormState();

    if (mode === 'create') {
      createCategoryMutation.mutate(values, {
        onSuccess: () => {
          setFeedback(`Category ${values.name.trim()} was created successfully.`);
          setMode(null);
          setSelectedCategory(null);
        },
        onError: (error) => {
          const mapped = mapServerErrorsToFormState(error);
          setServerErrors(mapped.fieldErrors);
          setSubmitError(mapped.message);
        },
      });
      return;
    }

    if (mode === 'edit' && selectedCategory) {
      updateCategoryMutation.mutate(
        { id: selectedCategory.id, draft: values },
        {
          onSuccess: () => {
            setFeedback(`Category ${values.name.trim()} was updated successfully.`);
            setMode(null);
            setSelectedCategory(null);
          },
          onError: (error) => {
            const mapped = mapServerErrorsToFormState(error);
            setServerErrors(mapped.fieldErrors);
            setSubmitError(mapped.message);
          },
        },
      );
    }
  };

  const handleDeleteConfirm = () => {
    if (!pendingDeleteRow) {
      return;
    }

    deleteCategoryMutation.mutate(pendingDeleteRow.id, {
      onSuccess: () => {
        setFeedback(`Category ${pendingDeleteRow.name} was deleted successfully.`);
        setPendingDeleteRow(null);
        setSelectedCategory(null);
        setMode(null);
      },
      onError: (error) => {
        setPendingDeleteRow(null);
        setSubmitError(getCategoryErrorMessage(error));
      },
    });
  };

  if (currentView === 'detail' && selectedCategory) {
    return (
      <CategoryDetailPage
        category={selectedCategory}
        onBack={() => {
          setSelectedCategory(null);
          resetFormState();
        }}
        onEdit={() => {
          setMode('edit');
          resetFormState();
        }}
      />
    );
  }

  if (currentView === 'form') {
    return (
      <CategoryForm
        mode={mode ?? 'create'}
        initialValues={
          mode === 'edit' && categoryDetails
            ? {
                name: categoryDetails.label,
                slug: categoryDetails.slug,
                description: categoryDetails.description ?? '',
                colorCode: categoryDetails.color_code ?? '',
                iconKey: categoryDetails.icon_key ?? '',
              }
            : selectedCategory
              ? {
                  name: selectedCategory.name,
                  slug: selectedCategory.slug,
                  description: selectedCategory.description ?? '',
                  colorCode: selectedCategory.colorCode ?? '',
                  iconKey: selectedCategory.iconKey ?? '',
                }
              : undefined
        }
        feedback={feedback}
        submitError={submitError}
        serverErrors={serverErrors}
        isSubmitting={createCategoryMutation.isPending || updateCategoryMutation.isPending}
        isLoading={mode === 'edit' && isLoadingCategory}
        onCancel={() => {
          setMode(null);
          setSelectedCategory(null);
          resetFormState();
        }}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <>
      {pendingDeleteRow ? (
        <div className="mb-6 rounded-[1.25rem] border border-[#e6eae9] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,32,0.04)]">
          <h3 className="text-[1rem] font-semibold text-[#0f1720]">Delete category</h3>
          <p className="mt-2 text-sm leading-6 text-[#64748b]">This action will remove {pendingDeleteRow.name} from the category list.</p>
          <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
            <button type="button" className="inline-flex h-9 items-center justify-center rounded-full border border-[#e6eae9] bg-white px-3 text-sm font-medium text-[#0f1720]" onClick={() => setPendingDeleteRow(null)}>
              Cancel
            </button>
            <button type="button" className="inline-flex h-9 items-center justify-center rounded-full border border-transparent bg-[#fef2f2] px-3 text-sm font-medium text-[#991b1b]" onClick={handleDeleteConfirm}>
              {deleteCategoryMutation.isPending ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </div>
      ) : null}
      <CategoryListPage
        onCreate={() => {
          setMode('create');
          resetFormState();
        }}
        onView={(row) => {
          setSelectedCategory(row);
          resetFormState();
        }}
        onEdit={(row) => {
          setSelectedCategory(row);
          setMode('edit');
          resetFormState();
        }}
        onDelete={(row) => {
          setPendingDeleteRow(row);
          resetFormState();
        }}
        onRefresh={() => resetFormState()}
      />
    </>
  );
}

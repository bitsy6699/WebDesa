import { useMemo, useState } from 'react';
import { CategoryListPage } from './CategoryListPage';
import { CategoryDetailPage } from './CategoryDetailPage';
import { CategoryForm } from './CategoryForm';
import { useCategory, useCreateCategory, useDeleteCategory, useUpdateCategory } from './api/hooks';
import { getCategoryErrorMessage, mapServerErrorsToFormState } from './utils';
import { Alert } from '@/dashboard/components/organisms/Alert';
import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';

export function CategoryManagement() {
  const [mode, setMode] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [serverErrors, setServerErrors] = useState({});
  const [pendingDeleteRow, setPendingDeleteRow] = useState(null);
  const [pendingBulkDeleteRows, setPendingBulkDeleteRows] = useState([]);

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

  const handleSubmit = (values) => {
    resetFormState();

    if (mode === 'create') {
      createCategoryMutation.mutate(values, {
        onSuccess: () => {
          setFeedback(`Kategori ${values.name.trim()} berhasil dibuat.`);
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
            setFeedback(`Kategori ${values.name.trim()} berhasil diperbarui.`);
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
        setFeedback(`Kategori ${pendingDeleteRow.name} berhasil dihapus.`);
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

  const handleBulkDeleteConfirm = async () => {
    if (pendingBulkDeleteRows.length === 0) {
      return;
    }

    let failed = 0;
    let succeeded = 0;

    for (const row of pendingBulkDeleteRows) {
      try {
        await deleteCategoryMutation.mutateAsync(row.id);
        succeeded++;
      } catch {
        failed++;
      }
    }

    if (failed > 0) {
      setSubmitError(`${succeeded} kategori berhasil dihapus, ${failed} gagal. Beberapa kategori mungkin masih memiliki potensi atau skema.`);
    } else {
      setFeedback(`${succeeded} kategori berhasil dihapus.`);
    }
    setPendingBulkDeleteRows([]);
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
                colorCode: categoryDetails.colorCode ?? '',
                iconKey: categoryDetails.iconKey ?? '',
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
      {pendingDeleteRow || pendingBulkDeleteRows.length > 0 ? (
        <div className="mb-6 rounded-xl border border-[#E7E7E7] bg-white p-6">
          <h3 className="text-[0.875rem] font-semibold text-neutral-800">Hapus kategori</h3>
          <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-neutral-500">
            {pendingBulkDeleteRows.length > 0
              ? `Tindakan ini akan menghapus ${pendingBulkDeleteRows.length} kategori dari daftar. Kategori yang masih memiliki potensi atau skema tidak akan terhapus.`
              : `Tindakan ini akan menghapus ${pendingDeleteRow.name} dari daftar kategori.`}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
            <DashboardButton variant="secondary" onClick={() => {
              setPendingDeleteRow(null);
              setPendingBulkDeleteRows([]);
            }}>
              Batal
            </DashboardButton>
            <DashboardButton
              variant="danger"
              onClick={pendingBulkDeleteRows.length > 0 ? handleBulkDeleteConfirm : handleDeleteConfirm}
              loading={deleteCategoryMutation.isPending}
            >
              Hapus
            </DashboardButton>
          </div>
        </div>
      ) : null}

      {feedback && !pendingDeleteRow && pendingBulkDeleteRows.length === 0 && (
        <Alert title={feedback} variant="success" className="mb-6" />
      )}

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
        onBulkDelete={(rows) => {
          setPendingBulkDeleteRows(rows);
          resetFormState();
        }}
        onRefresh={() => resetFormState()}
      />
    </>
  );
}

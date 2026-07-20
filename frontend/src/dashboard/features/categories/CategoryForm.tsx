import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';
import { DashboardInput, DashboardTextarea } from '@/dashboard/components/atoms/DashboardInput';
import { DashboardForm } from '@/dashboard/components/forms/DashboardForm';
import { FormSection } from '@/dashboard/components/forms/FormSection';
import { FormActions } from '@/dashboard/components/forms/FormActions';
import { Alert } from '@/dashboard/components/organisms/Alert';
import type { CategoryDraft, CategoryFormMode } from './types';
import { validateCategoryDraft } from './utils';

interface CategoryFormProps {
  mode?: CategoryFormMode;
  initialValues?: Partial<CategoryDraft>;
  submitLabel?: string;
  onSubmit?: (values: CategoryDraft) => void;
  onCancel?: () => void;
  feedback?: string;
  submitError?: string;
  serverErrors?: Record<string, string>;
  isSubmitting?: boolean;
  isLoading?: boolean;
}

export function CategoryForm({
  mode = 'create',
  initialValues,
  submitLabel = mode === 'edit' ? 'Save changes' : 'Create category',
  onSubmit,
  onCancel,
  feedback,
  submitError,
  serverErrors = {},
  isSubmitting = false,
  isLoading = false,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<CategoryDraft>({
    defaultValues: {
      name: initialValues?.name ?? '',
      slug: initialValues?.slug ?? '',
      description: initialValues?.description ?? '',
      colorCode: initialValues?.colorCode ?? '',
      iconKey: initialValues?.iconKey ?? '',
    },
  });

  useEffect(() => {
    reset({
      name: initialValues?.name ?? '',
      slug: initialValues?.slug ?? '',
      description: initialValues?.description ?? '',
      colorCode: initialValues?.colorCode ?? '',
      iconKey: initialValues?.iconKey ?? '',
    });
  }, [initialValues?.name, initialValues?.slug, initialValues?.description, initialValues?.colorCode, initialValues?.iconKey, reset]);

  useEffect(() => {
    if (Object.keys(serverErrors).length === 0) {
      clearErrors();
      return;
    }

    Object.entries(serverErrors).forEach(([field, message]) => {
      setError(field as keyof CategoryDraft, { type: 'server', message });
    });
  }, [clearErrors, serverErrors, setError]);

  const watchedName = watch('name') ?? '';
  const watchedSlug = watch('slug') ?? '';
  const watchedDescription = watch('description') ?? '';

  const validationHint = useMemo(() => {
    return validateCategoryDraft({
      name: watchedName,
      slug: watchedSlug,
      description: watchedDescription,
    });
  }, [watchedDescription, watchedName, watchedSlug]);

  const submit = (values: CategoryDraft) => {
    onSubmit?.({
      ...values,
      slug: validateCategoryDraft(values).normalizedSlug || values.slug.trim(),
    });
  };

  return (
    <DashboardForm onSubmit={handleSubmit(submit)}>
      {feedback ? <Alert title={feedback} variant="success" /> : null}
      {submitError ? <Alert title={submitError} variant="danger" /> : null}
      {isLoading ? <Alert title="Loading category details…" variant="info" /> : null}

      <FormSection title="Category details" description="Keep this taxonomy entry concise and easy to scan.">
        <DashboardInput
          label="Name"
          required
          placeholder="e.g. UMKM"
          error={errors.name?.message}
          {...register('name', { required: 'Name is required.' })}
        />
        <DashboardInput
          label="Slug"
          required
          placeholder="e.g. umkm"
          helperText={validationHint.normalizedSlug ? `Slug preview: /${validationHint.normalizedSlug}` : 'Use lowercase words separated by hyphens.'}
          error={errors.slug?.message}
          {...register('slug', { required: 'Slug is required.' })}
        />
        <DashboardTextarea
          label="Description"
          placeholder="Helpful context for editors"
          helperText="Optional, but useful when this category will appear across the CMS."
          {...register('description')}
        />
      </FormSection>

      <FormSection title="Presentation" description="These fields are ready for future admin CRUD integrations.">
        <div className="grid gap-4 md:grid-cols-2">
          <DashboardInput label="Color" placeholder="#16A34A" {...register('colorCode')} />
          <DashboardInput label="Icon key" placeholder="sparkles" {...register('iconKey')} />
        </div>
      </FormSection>

      <FormActions>
        <DashboardButton type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </DashboardButton>
        <DashboardButton type="submit" loading={isSubmitting || isLoading}>
          {submitLabel}
        </DashboardButton>
      </FormActions>
    </DashboardForm>
  );
}

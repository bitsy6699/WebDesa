import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';
import { DashboardInput, DashboardTextarea } from '@/dashboard/components/atoms/DashboardInput';
import { DashboardForm } from '@/dashboard/components/forms/DashboardForm';
import { FormSection } from '@/dashboard/components/forms/FormSection';
import { FormActions } from '@/dashboard/components/forms/FormActions';
import { Alert } from '@/dashboard/components/organisms/Alert';
import { validateCategoryDraft } from './utils';

export function CategoryForm({
  mode = 'create',
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
  feedback,
  submitError,
  serverErrors = {},
  isSubmitting = false,
  isLoading = false,
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: initialValues?.name ?? '',
      slug: initialValues?.slug ?? '',
      description: initialValues?.description ?? '',
      colorCode: initialValues?.colorCode ?? '#184D47',
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
      setError(field, { type: 'server', message });
    });
  }, [clearErrors, serverErrors, setError]);

  const watchedName = watch('name') ?? '';
  const watchedSlug = watch('slug') ?? '';
  const watchedDescription = watch('description') ?? '';
  const watchedColor = watch('colorCode') ?? '#184D47';

  const validationHint = useMemo(() => {
    return validateCategoryDraft({
      name: watchedName,
      slug: watchedSlug,
      description: watchedDescription,
    });
  }, [watchedDescription, watchedName, watchedSlug]);

  const submit = (values) => {
    onSubmit?.({
      ...values,
      slug: validateCategoryDraft(values).normalizedSlug || values.slug.trim(),
    });
  };

  return (
    <DashboardForm onSubmit={handleSubmit(submit)}>
      {feedback ? <Alert title={feedback} variant="success" /> : null}
      {submitError ? <Alert title={submitError} variant="danger" /> : null}
      {isLoading ? <Alert title="Memuat detail kategori..." variant="info" /> : null}

      <FormSection title="Detail Kategori" description="Pertahankan entri taksonomi yang ringkas dan mudah dipindai.">
        <DashboardInput
          label="Nama"
          required
          placeholder="contoh: UMKM"
          error={errors.name?.message}
          {...register('name', { required: 'Nama wajib diisi.' })}
        />
        <DashboardInput
          label="Slug"
          required
          placeholder="contoh: umkm"
          helperText={validationHint.normalizedSlug ? `Pratinjau slug: /${validationHint.normalizedSlug}` : 'Gunakan huruf kecil dipisahkan dengan tanda hubung.'}
          error={errors.slug?.message}
          {...register('slug', { required: 'Slug wajib diisi.' })}
        />
        <DashboardTextarea
          label="Deskripsi"
          placeholder="Konteks yang berguna bagi editor"
          helperText="Opsional, tetapi berguna jika kategori ini akan muncul di seluruh CMS."
          {...register('description')}
        />
      </FormSection>

      <FormSection title="Presentasi" description="Bidang ini siap untuk integrasi CRUD admin di masa mendatang.">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="colorCode" className="mb-1.5 block text-[0.8125rem] font-medium text-neutral-800">
              Warna
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={watchedColor.match(/^#[0-9A-F]{6}$/i) ? watchedColor : '#184D47'}
                onChange={(e) => setValue('colorCode', e.target.value)}
                className="h-[42px] w-[42px] shrink-0 cursor-pointer rounded-xl border border-[#E8ECEA] bg-white p-1"
              />
              <DashboardInput
                id="colorCode"
                placeholder="#16A34A"
                className="flex-1"
                {...register('colorCode')}
              />
            </div>
          </div>

          <div>
            <label htmlFor="iconKey" className="mb-1.5 block text-[0.8125rem] font-medium text-neutral-800">
              Ikon
            </label>
            <select
              id="iconKey"
              {...register('iconKey')}
              className="w-full rounded-xl border border-[#E8ECEA] bg-white px-3.5 py-2.5 text-[0.8125rem] text-neutral-800 outline-none transition-all duration-150 hover:border-neutral-300 focus:border-[#184D47] focus:ring-2 focus:ring-[#184D47]/20"
            >
              <option value="">Pilih ikon</option>
              <option value="sprout">Sprout (Pertanian)</option>
              <option value="store">Store (UMKM)</option>
              <option value="compass">Compass (Wisata)</option>
              <option value="palmtree">Palmtree (Alam)</option>
              <option value="heart">Heart (Kesehatan)</option>
              <option value="briefcase">Briefcase (Jasa)</option>
              <option value="graduation-cap">GraduationCap (Pendidikan)</option>
              <option value="sparkles">Sparkles (Lainnya)</option>
            </select>
          </div>
        </div>
      </FormSection>

      <FormActions>
        <DashboardButton type="button" variant="secondary" onClick={onCancel}>
          Batal
        </DashboardButton>
        <DashboardButton type="submit" loading={isSubmitting || isLoading}>
          {submitLabel ?? (mode === 'edit' ? 'Simpan perubahan' : 'Buat kategori')}
        </DashboardButton>
      </FormActions>
    </DashboardForm>
  );
}

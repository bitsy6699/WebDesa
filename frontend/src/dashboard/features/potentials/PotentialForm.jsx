import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';
import { DashboardInput, DashboardTextarea } from '@/dashboard/components/atoms/DashboardInput';
import { DashboardForm } from '@/dashboard/components/forms/DashboardForm';
import { FormSection } from '@/dashboard/components/forms/FormSection';
import { FormActions } from '@/dashboard/components/forms/FormActions';
import { Alert } from '@/dashboard/components/organisms/Alert';
import { ImagePicker } from '@/dashboard/components/molecules/ImagePicker';
import { MapPicker } from '@/dashboard/components/molecules/MapPicker';
import { useCategories } from '@/hooks/useCategories';
import { useCreatePotential, useUpdatePotential } from '@/hooks/usePotentialMutations';

export function PotentialForm({ mode = 'create', initialData }) {
  const navigate = useNavigate();
  const { data: categories = [] } = useCategories();
  const createMutation = useCreatePotential();
  const updateMutation = useUpdatePotential();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category_id: initialData?.category_id ?? '',
      title: initialData?.title ?? '',
      description: initialData?.description ?? '',
      status: initialData?.status ?? 'draft',
      latitude: initialData?.latitude ?? -6.9,
      longitude: initialData?.longitude ?? 107.6,
      address: initialData?.address ?? '',
      dusun: initialData?.dusun ?? '',
      is_featured: initialData?.is_featured ?? false,
      cover_image_id: initialData?.cover_image_id ?? '',
      gallery: initialData?.gallery ?? [],
      contact_whatsapp: initialData?.contact?.whatsapp ?? '',
      contact_phone: initialData?.contact?.phone ?? '',
      contact_email: initialData?.contact?.email ?? '',
    },
  });

  const coverImageId = watch('cover_image_id');
  const gallery = watch('gallery') || [];
  const latitude = watch('latitude');
  const longitude = watch('longitude');

  useEffect(() => {
    if (createMutation.isSuccess || updateMutation.isSuccess) {
      const timer = setTimeout(() => navigate('/dashboard/potentials'), 1200);
      return () => clearTimeout(timer);
    }
  }, [createMutation.isSuccess, updateMutation.isSuccess, navigate]);

  const onSubmit = (data) => {
    const payload = {
      category_id: data.category_id,
      title: data.title,
      description: data.description,
      status: data.status,
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      address: data.address,
      dusun: data.dusun || null,
      is_featured: data.is_featured,
      cover_image_id: data.cover_image_id || null,
      gallery: data.gallery || [],
      metadata: {
        ...(initialData?.metadata || {}),
        contact: {
          whatsapp: data.contact_whatsapp || null,
          phone: data.contact_phone || null,
          email: data.contact_email || null,
        },
      },
    };

    if (mode === 'edit' && initialData?.id) {
      updateMutation.mutate({ id: initialData.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const mutationError = createMutation.error ?? updateMutation.error;
  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const isSuccess = createMutation.isSuccess || updateMutation.isSuccess;

  return (
    <DashboardForm onSubmit={handleSubmit(onSubmit)}>
      {isSuccess && (
        <Alert
          title={mode === 'edit' ? 'Potensi berhasil diperbarui.' : 'Potensi berhasil ditambahkan.'}
          variant="success"
        />
      )}

      {mutationError && (
        <Alert
          title={mutationError?.message ?? 'Terjadi kesalahan.'}
          variant="danger"
        />
      )}

      <FormSection title="Informasi Dasar" description="Detail utama potensi desa.">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="category_id" className="mb-1.5 block text-[0.8125rem] font-medium text-neutral-800">
              Kategori <span className="text-red-500">*</span>
            </label>
            <select
              id="category_id"
              {...register('category_id', { required: 'Kategori wajib dipilih.' })}
              className="w-full rounded-xl border border-[#E8ECEA] bg-white px-3.5 py-2.5 text-[0.8125rem] text-neutral-800 outline-none transition-all duration-150 hover:border-neutral-300 focus:border-[#184D47] focus:ring-2 focus:ring-[#184D47]/20"
            >
              <option value="">Pilih kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <p className="mt-1 text-[0.75rem] text-red-500">{errors.category_id.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="status" className="mb-1.5 block text-[0.8125rem] font-medium text-neutral-800">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              {...register('status', { required: 'Status wajib dipilih.' })}
              className="w-full rounded-xl border border-[#E8ECEA] bg-white px-3.5 py-2.5 text-[0.8125rem] text-neutral-800 outline-none transition-all duration-150 hover:border-neutral-300 focus:border-[#184D47] focus:ring-2 focus:ring-[#184D47]/20"
            >
              <option value="draft">Draf</option>
              <option value="published">Diterbitkan</option>
              <option value="archived">Diarsipkan</option>
            </select>
          </div>
        </div>

        <DashboardInput
          label="Judul"
          required
          placeholder="Masukkan judul potensi"
          error={errors.title?.message}
          {...register('title', { required: 'Judul wajib diisi.' })}
        />

        <DashboardTextarea
          label="Deskripsi"
          required
          placeholder="Deskripsikan potensi desa ini..."
          error={errors.description?.message}
          {...register('description', { required: 'Deskripsi wajib diisi.' })}
        />

        <div className="space-y-4 mt-6 border-t border-[#E8ECEA] pt-6">
          <div>
            <label className="mb-1.5 block text-[0.8125rem] font-medium text-neutral-800">
              Foto Sampul
            </label>
            <ImagePicker
              value={coverImageId}
              onChange={(id) => setValue('cover_image_id', id)}
              initialPreview={initialData?.cover_image_url}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[0.8125rem] font-medium text-neutral-800">
              Galeri Foto (Opsional)
            </label>
            <ImagePicker
              multiple
              selectedIds={gallery}
              onMultipleChange={(ids) => setValue('gallery', ids)}
              initialPreviews={initialData?.gallery_details || []}
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="Lokasi" description="Koordinat dan alamat lokasi potensi.">
        <div className="mb-4">
          <label className="mb-1.5 block text-[0.8125rem] font-medium text-neutral-800">
            Pilih Lokasi di Peta
          </label>
          <MapPicker
            latitude={latitude}
            longitude={longitude}
            onChange={({ latitude: lat, longitude: lng }) => {
              setValue('latitude', lat, { shouldValidate: true });
              setValue('longitude', lng, { shouldValidate: true });
            }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <DashboardInput
            label="Latitude"
            required
            type="number"
            step="any"
            placeholder="-6.9"
            error={errors.latitude?.message}
            {...register('latitude', {
              required: 'Latitude wajib diisi.',
              valueAsNumber: true,
              min: { value: -90, message: 'Minimal -90' },
              max: { value: 90, message: 'Maksimal 90' },
            })}
          />
          <DashboardInput
            label="Longitude"
            required
            type="number"
            step="any"
            placeholder="107.6"
            error={errors.longitude?.message}
            {...register('longitude', {
              required: 'Longitude wajib diisi.',
              valueAsNumber: true,
              min: { value: -180, message: 'Minimal -180' },
              max: { value: 180, message: 'Maksimal 180' },
            })}
          />
        </div>

        <DashboardInput
          label="Alamat"
          required
          placeholder="Alamat lengkap lokasi"
          error={errors.address?.message}
          {...register('address', { required: 'Alamat wajib diisi.' })}
        />

        <DashboardInput
          label="Dusun"
          placeholder="Nama dusun (opsional)"
          {...register('dusun')}
        />
      </FormSection>

      <FormSection title="Informasi Kontak" description="Nomor atau email yang bisa dihubungi untuk potensi ini.">
        <div className="grid gap-4 md:grid-cols-3">
          <DashboardInput
            label="WhatsApp"
            placeholder="contoh: 08123456789"
            error={errors.contact_whatsapp?.message}
            {...register('contact_whatsapp')}
          />
          <DashboardInput
            label="Telepon"
            placeholder="contoh: 022123456"
            error={errors.contact_phone?.message}
            {...register('contact_phone')}
          />
          <DashboardInput
            label="Email"
            type="email"
            placeholder="contoh: info@karamatwangi.desa.id"
            error={errors.contact_email?.message}
            {...register('contact_email')}
          />
        </div>
      </FormSection>

      <FormSection title="Pengaturan" description="Fitur unggulan dan status publikasi.">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register('is_featured')}
            className="h-4 w-4 rounded border-[#E8ECEA] text-[#184D47] focus:ring-[#184D47]/20"
          />
          <span className="text-[0.8125rem] text-neutral-800">Jadikan potensi unggulan</span>
        </label>
      </FormSection>

      <FormActions>
        <DashboardButton type="button" variant="secondary" onClick={() => navigate('/dashboard/potentials')}>
          Batal
        </DashboardButton>
        <DashboardButton type="submit" loading={isSubmitting}>
          {mode === 'edit' ? 'Simpan Perubahan' : 'Buat Potensi'}
        </DashboardButton>
      </FormActions>
    </DashboardForm>
  );
}

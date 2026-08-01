import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LoaderCircle, MapPin } from 'lucide-react';
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
import { buildGoogleMapsUrl, reverseGeocode } from '@/services/geocode.service';

export function PotentialForm({ mode = 'create', initialData }) {
  const navigate = useNavigate();
  const { data: categories = [] } = useCategories();
  const createMutation = useCreatePotential();
  const updateMutation = useUpdatePotential();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
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
      google_maps_url: initialData?.google_maps_url ?? '',
      is_featured: initialData?.is_featured ?? false,
      cover_image_id: initialData?.cover_image_id ?? '',
      gallery: initialData?.gallery ?? [],
      contact_whatsapp: initialData?.contact?.whatsapp ?? '',
      contact_phone: initialData?.contact?.phone ?? '',
      contact_email: initialData?.contact?.email ?? '',
      social_tiktok: initialData?.social_media?.tiktok ?? '',
      social_instagram: initialData?.social_media?.instagram ?? '',
      social_facebook: initialData?.social_media?.facebook ?? '',
      market_shopee: initialData?.marketplaces?.shopee ?? '',
      market_tokopedia: initialData?.marketplaces?.tokopedia ?? '',
      market_lazada: initialData?.marketplaces?.lazada ?? '',
    },
  });

  const coverImageId = watch('cover_image_id');
  const gallery = watch('gallery') || [];
  const latitude = watch('latitude');
  const longitude = watch('longitude');
  const address = watch('address');
  const categoryId = watch('category_id');

  const selectedCategory = categories.find((cat) => cat.id === categoryId);
  const acaFields = selectedCategory?.schema?.schemaDefinition?.fields ?? [];

  const [acaValues, setAcaValues] = useState({});

  useEffect(() => {
    const meta = initialData?.metadata && typeof initialData.metadata === 'object' ? initialData.metadata : {};
    const next = {};
    for (const field of acaFields) {
      next[field.name] = meta[field.name] ?? '';
    }
    setAcaValues(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory?.id]);

  const [placeInfo, setPlaceInfo] = useState(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const geoTimeoutRef = useRef(null);
  const geoSeqRef = useRef(0);

  useEffect(() => {
    return () => {
      if (geoTimeoutRef.current) {
        clearTimeout(geoTimeoutRef.current);
      }
    };
  }, []);

  const handleMapPoint = ({ latitude: lat, longitude: lng }) => {
    setValue('latitude', lat, { shouldValidate: true });
    setValue('longitude', lng, { shouldValidate: true });

    if (geoTimeoutRef.current) {
      clearTimeout(geoTimeoutRef.current);
    }

    const seq = ++geoSeqRef.current;
    setGeoLoading(true);

    geoTimeoutRef.current = setTimeout(async () => {
      try {
        const result = await reverseGeocode(lat, lng);
        if (geoSeqRef.current !== seq) return;

        setPlaceInfo(result);

        if (result.displayName) {
          setValue('address', result.displayName, { shouldValidate: true });
        }

        if (!getValues('dusun')) {
          const dusun = result.components.neighbourhood || result.components.hamlet || result.components.village || '';
          if (dusun) setValue('dusun', dusun);
        }

        if (!getValues('google_maps_url')) {
          const url = buildGoogleMapsUrl(lat, lng);
          if (url) setValue('google_maps_url', url);
        }
      } catch {
        if (geoSeqRef.current !== seq) return;
        setPlaceInfo(null);
      } finally {
        if (geoSeqRef.current === seq) {
          setGeoLoading(false);
        }
      }
    }, 400);
  };

  useEffect(() => {
    if (createMutation.isSuccess || updateMutation.isSuccess) {
      navigate('/dashboard/potentials');
    }
  }, [createMutation.isSuccess, updateMutation.isSuccess, navigate]);

  const onSubmit = (data) => {
    const acaPayload = {};
    for (const field of acaFields) {
      acaPayload[field.name] = acaValues[field.name] ?? '';
    }

    const payload = {
      category_id: data.category_id,
      title: data.title,
      description: data.description,
      status: data.status,
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      address: data.address,
      dusun: data.dusun || null,
      google_maps_url: data.google_maps_url || null,
      is_featured: data.is_featured,
      cover_image_id: data.cover_image_id || null,
      gallery: data.gallery || [],
      metadata: {
        ...(initialData?.metadata || {}),
        ...acaPayload,
        contact: {
          whatsapp: data.contact_whatsapp || null,
          phone: data.contact_phone || null,
          email: data.contact_email || null,
        },
        social_media: {
          tiktok: data.social_tiktok || null,
          instagram: data.social_instagram || null,
          facebook: data.social_facebook || null,
        },
        marketplaces: {
          shopee: data.market_shopee || null,
          tokopedia: data.market_tokopedia || null,
          lazada: data.market_lazada || null,
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
              className="w-full rounded-xl border border-[#E7E7E7] bg-white px-3.5 py-2.5 text-[0.8125rem] text-neutral-800 outline-none transition-all duration-150 hover:border-neutral-300 focus:border-[#184D47] focus:ring-2 focus:ring-[#184D47]/20"
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
              className="w-full rounded-xl border border-[#E7E7E7] bg-white px-3.5 py-2.5 text-[0.8125rem] text-neutral-800 outline-none transition-all duration-150 hover:border-neutral-300 focus:border-[#184D47] focus:ring-2 focus:ring-[#184D47]/20"
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

        <div className="space-y-4 mt-6 border-t border-[#E7E7E7] pt-6">
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

      <FormSection title="Lokasi" description="Titik lokasi potensi desa. Klik di peta untuk mengisi lokasi.">
        <div className="mb-4">
          <label className="mb-1.5 block text-[0.8125rem] font-medium text-neutral-800">
            Pilih Titik di Peta
          </label>
          <MapPicker
            latitude={latitude}
            longitude={longitude}
            onChange={handleMapPoint}
            popupLabel={placeInfo?.displayName || (address && 'Titik lokasi dipilih')}
          />
        </div>

        <input type="hidden" {...register('latitude', {
          required: 'Lintang wajib diisi.',
          valueAsNumber: true,
          min: { value: -90, message: 'Minimal -90' },
          max: { value: 90, message: 'Maksimal 90' },
        })} />
        <input type="hidden" {...register('longitude', {
          required: 'Bujur wajib diisi.',
          valueAsNumber: true,
          min: { value: -180, message: 'Minimal -180' },
          max: { value: 180, message: 'Maksimal 180' },
        })} />

        {geoLoading && (
          <p className="mt-1.5 flex items-center gap-1.5 text-[0.75rem] text-neutral-400">
            <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> Memuat informasi titik...
          </p>
        )}

        {placeInfo && !geoLoading && Object.keys(placeInfo.components).length > 0 && (
          <div className="mb-4 mt-1.5 rounded-xl border border-[#E7E7E7] bg-neutral-50 p-4">
            <div className="flex items-center gap-1.5 text-[0.75rem] font-semibold text-neutral-700">
              <MapPin className="h-3.5 w-3.5 text-[#184D47]" /> Informasi Titik
            </div>
            <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">
              {Object.entries(placeInfo.components).map(([key, value]) => (
                <div key={key} className="flex justify-between gap-3 text-[0.75rem]">
                  <dt className="text-neutral-500">{placeInfo.labels[key] ?? key}</dt>
                  <dd className="text-right font-medium text-neutral-800">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <DashboardInput
          label="Nama Daerah / Alamat Titik"
          required
          placeholder="Otomatis terisi saat memilih titik di peta"
          helperText="Diisi otomatis dari titik yang dipilih di peta, bisa disesuaikan."
          error={errors.address?.message}
          {...register('address', { required: 'Alamat wajib diisi.' })}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <DashboardInput
            label="Dusun"
            placeholder="Nama dusun (opsional)"
            {...register('dusun')}
          />

          <DashboardInput
            label="Link Google Maps (opsional)"
            placeholder="https://maps.app.goo.gl/..."
            helperText="Otomatis terisi dari titik di peta, bisa diganti."
            {...register('google_maps_url')}
          />
        </div>
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

      {acaFields.length > 0 ? (
        <FormSection title="Data Khusus Kategori" description={`Bidang tambahan khusus untuk kategori "${selectedCategory.label}".`}>
          <div className="grid gap-4 md:grid-cols-2">
            {acaFields.map((field) => (
              <DashboardInput
                key={field.name}
                label={field.label ?? field.name}
                type={field.type === 'number' ? 'number' : 'text'}
                value={acaValues[field.name] ?? ''}
                onChange={(e) => setAcaValues((current) => ({ ...current, [field.name]: e.target.value }))}
              />
            ))}
          </div>
        </FormSection>
      ) : null}

      <FormSection title="Tautan" description="Link media sosial dan marketplace.">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h4 className="text-[0.8125rem] font-semibold text-neutral-800">Media Sosial</h4>
            <div className="grid gap-4">
              <DashboardInput label="TikTok" placeholder="https://tiktok.com/@username" {...register('social_tiktok')} />
              <DashboardInput label="Instagram" placeholder="https://instagram.com/username" {...register('social_instagram')} />
              <DashboardInput label="Facebook" placeholder="https://facebook.com/username" {...register('social_facebook')} />
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-[0.8125rem] font-semibold text-neutral-800">Marketplace</h4>
            <div className="grid gap-4">
              <DashboardInput label="Shopee" placeholder="https://shopee.co.id/username" {...register('market_shopee')} />
              <DashboardInput label="Tokopedia" placeholder="https://tokopedia.com/username" {...register('market_tokopedia')} />
              <DashboardInput label="Lazada" placeholder="https://lazada.co.id/username" {...register('market_lazada')} />
            </div>
          </div>
        </div>
      </FormSection>

      <FormSection title="Pengaturan" description="Fitur unggulan dan status publikasi.">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register('is_featured')}
            className="h-4 w-4 rounded border-[#E7E7E7] text-[#184D47] focus:ring-[#184D47]/20"
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

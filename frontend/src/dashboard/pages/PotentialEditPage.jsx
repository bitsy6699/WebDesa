import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '@/dashboard/components/molecules/PageHeader';
import { PotentialForm } from '@/dashboard/features/potentials/PotentialForm';
import { Alert } from '@/dashboard/components/organisms/Alert';
import api from '@/services/api';
import { API_ROUTES } from '@/constants/routes';

export default function PotentialEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [potential, setPotential] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchPotential = async () => {
      try {
        const response = await api.get(
          API_ROUTES.ADMIN_POTENTIAL(id),
        );
        setPotential(response.data.data);
      } catch {
        setError('Gagal memuat data potensi.');
      } finally {
        setLoading(false);
      }
    };

    fetchPotential();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-200 border-t-primary" />
      </div>
    );
  }

  if (error || !potential) {
    return (
      <div className="space-y-5">
        <Alert title={error ?? 'Potensi tidak ditemukan.'} variant="danger" />
        <PageHeader
          title="Edit Potensi"
          actions={
            <button onClick={() => navigate('/dashboard/potentials')} className="text-sm text-primary">
              Kembali ke daftar
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <PageHeader title={`Edit: ${potential.title}`} description="Perbarui data potensi desa." />
      <PotentialForm
        mode="edit"
        initialData={{
          id: potential.id,
          category_id: potential.category_id ?? '',
          title: potential.title,
          description: potential.description,
          status: potential.status,
          latitude: potential.location?.latitude ?? -6.9,
          longitude: potential.location?.longitude ?? 107.6,
          address: potential.location?.address ?? '',
          dusun: potential.location?.dusun ?? '',
          is_featured: potential.is_featured,
          cover_image_id: potential.cover_image_id ?? '',
          cover_image_url: potential.cover_image_url,
          gallery: potential.gallery_details?.map((g) => g.id) ?? [],
          gallery_details: potential.gallery_details ?? [],
          contact: potential.contact ?? { whatsapp: '', phone: '', email: '' },
          social_media: potential.social_media ?? { tiktok: '', instagram: '', facebook: '' },
          marketplaces: potential.marketplaces ?? { shopee: '', tokopedia: '', lazada: '' },
        }}
      />
    </div>
  );
}

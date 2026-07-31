import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PotentialDetailPage } from '@/dashboard/features/potentials/PotentialDetailPage';
import { Alert } from '@/dashboard/components/organisms/Alert';
import api from '@/services/api';
import { API_ROUTES } from '@/constants/routes';
import FadeContent from '@/components/FadeContent';

export default function PotentialDetailAdminPage() {
  const { id } = useParams();
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
      <FadeContent duration={600} delay={0} threshold={0.1}>
        <div className="flex items-center justify-center py-20">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-200 border-t-primary" />
        </div>
      </FadeContent>
    );
  }

  if (error || !potential) {
    return (
      <FadeContent duration={600} delay={0} threshold={0.1}>
        <div className="space-y-5">
          <Alert title={error ?? 'Potensi tidak ditemukan.'} variant="danger" />
        </div>
      </FadeContent>
    );
  }

  return (
    <FadeContent duration={600} delay={0} threshold={0.1}>
      <PotentialDetailPage potential={potential} />
    </FadeContent>
  );
}

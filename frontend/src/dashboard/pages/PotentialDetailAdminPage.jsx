import { useParams } from 'react-router-dom';
import { PotentialDetailPage } from '@/dashboard/features/potentials/PotentialDetailPage';
import { Alert } from '@/dashboard/components/organisms/Alert';
import { useAdminPotential } from '@/hooks/useAdminPotentials';
import FadeContent from '@/components/FadeContent';

export default function PotentialDetailAdminPage() {
  const { id } = useParams();
  const { data: potential, isLoading, isError } = useAdminPotential(id);

  if (isLoading) {
    return (
      <FadeContent duration={600} delay={0} threshold={0.1}>
        <div className="flex items-center justify-center py-20">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-200 border-t-primary" />
        </div>
      </FadeContent>
    );
  }

  if (isError || !potential) {
    return (
      <FadeContent duration={600} delay={0} threshold={0.1}>
        <div className="space-y-5">
          <Alert title="Gagal memuat data potensi." variant="danger" />
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

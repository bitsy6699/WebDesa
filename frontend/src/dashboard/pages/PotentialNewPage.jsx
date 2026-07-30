import { PageHeader } from '@/dashboard/components/molecules/PageHeader';
import { PotentialForm } from '@/dashboard/features/potentials/PotentialForm';
import FadeContent from '@/components/FadeContent';

export default function PotentialNewPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Buat Potensi Baru" description="Tambahkan potensi desa baru ke dalam sistem." />
      <FadeContent duration={600} delay={0} threshold={0.1}>
      <PotentialForm mode="create" />
      </FadeContent>
    </div>
  );
}

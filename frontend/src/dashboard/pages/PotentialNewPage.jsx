import { PageHeader } from '@/dashboard/components/molecules/PageHeader';
import { PotentialForm } from '@/dashboard/features/potentials/PotentialForm';

export default function PotentialNewPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Buat Potensi Baru" description="Tambahkan potensi desa baru ke dalam sistem." />
      <PotentialForm mode="create" />
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil, Trash2, Star, StarOff } from 'lucide-react';
import { PageHeader } from '@/dashboard/components/molecules/PageHeader';
import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';
import { DashboardBadge } from '@/dashboard/components/atoms/DashboardBadge';
import { DashboardCard } from '@/dashboard/components/organisms/DashboardCard';
import { Alert } from '@/dashboard/components/organisms/Alert';
import { useDeletePotential, useToggleFeatured } from '@/hooks/usePotentialMutations';

const statusVariant = {
  published: 'success',
  draft: 'warning',
  archived: 'neutral',
};

const statusLabels = {
  published: 'Diterbitkan',
  draft: 'Draf',
  archived: 'Diarsipkan',
};

export function PotentialDetailPage({ potential }) {
  const navigate = useNavigate();
  const deleteMutation = useDeletePotential();
  const toggleFeaturedMutation = useToggleFeatured();

  const handleDelete = () => {
    if (window.confirm('Yakin ingin menghapus potensi ini?')) {
      deleteMutation.mutate(potential.id, {
        onSuccess: () => navigate('/dashboard/potentials'),
      });
    }
  };

  return (
    <div className="space-y-5">
      {deleteMutation.isSuccess && <Alert title="Potensi berhasil dihapus." variant="success" />}
      {deleteMutation.error && (
        <Alert title={deleteMutation.error?.message ?? 'Gagal menghapus.'} variant="danger" />
      )}

      <PageHeader
        title={potential.title}
        badge={statusLabels[potential.status] ?? potential.status}
        badgeVariant={statusVariant[potential.status] ?? 'neutral'}
        actions={
          <div className="flex flex-wrap gap-2">
            <DashboardButton variant="secondary" onClick={() => navigate('/dashboard/potentials')}>
              <ArrowLeft className="mr-1 h-3.5 w-3.5" /> Kembali
            </DashboardButton>
            <DashboardButton
              variant="secondary"
              onClick={() => navigate(`/dashboard/potentials/${potential.id}/edit`)}
            >
              <Pencil className="mr-1 h-3.5 w-3.5" /> Edit
            </DashboardButton>
            <DashboardButton
              variant="secondary"
              onClick={() => toggleFeaturedMutation.mutate(potential.id)}
              loading={toggleFeaturedMutation.isPending}
            >
              {potential.is_featured ? (
                <><StarOff className="mr-1 h-3.5 w-3.5" /> Hapus Unggulan</>
              ) : (
                <><Star className="mr-1 h-3.5 w-3.5" /> Jadikan Unggulan</>
              )}
            </DashboardButton>
            <DashboardButton variant="danger" onClick={handleDelete} loading={deleteMutation.isPending}>
              <Trash2 className="mr-1 h-3.5 w-3.5" /> Hapus
            </DashboardButton>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <DashboardCard title="Deskripsi">
            <div className="prose prose-sm max-w-none text-[0.9375rem] leading-relaxed text-neutral-700">
              <p className="whitespace-pre-wrap">{potential.description}</p>
            </div>
          </DashboardCard>

          {potential.gallery?.length > 0 && (
            <DashboardCard title="Galeri">
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {potential.gallery.map((url, i) => (
                  <div key={i} className="aspect-square overflow-hidden rounded-xl border border-[#E8ECEA]">
                    <img src={url} alt={`Gallery ${i + 1}`} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </DashboardCard>
          )}
        </div>

        <div className="space-y-5">
          <DashboardCard title="Informasi">
            <dl className="space-y-3 text-[0.8125rem]">
              <div className="flex justify-between">
                <dt className="text-neutral-500">Kategori</dt>
                <dd className="font-medium text-neutral-800">{potential.category.label}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-500">Status</dt>
                <dd>
                  <DashboardBadge variant={statusVariant[potential.status] ?? 'neutral'}>
                    {statusLabels[potential.status] ?? potential.status}
                  </DashboardBadge>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-500">Unggulan</dt>
                <dd className="font-medium text-neutral-800">{potential.is_featured ? 'Ya' : 'Tidak'}</dd>
              </div>
              {potential.location && (
                <>
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">Alamat</dt>
                    <dd className="text-right font-medium text-neutral-800">{potential.location.address ?? '-'}</dd>
                  </div>
                  {potential.location.dusun && (
                    <div className="flex justify-between">
                      <dt className="text-neutral-500">Dusun</dt>
                      <dd className="font-medium text-neutral-800">{potential.location.dusun}</dd>
                    </div>
                  )}
                </>
              )}
            </dl>
          </DashboardCard>

          {potential.contact && (
            <DashboardCard title="Kontak">
              <dl className="space-y-3 text-[0.8125rem]">
                {potential.contact.whatsapp && (
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">WhatsApp</dt>
                    <dd className="font-medium text-neutral-800">{potential.contact.whatsapp}</dd>
                  </div>
                )}
                {potential.contact.phone && (
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">Telepon</dt>
                    <dd className="font-medium text-neutral-800">{potential.contact.phone}</dd>
                  </div>
                )}
                {potential.contact.email && (
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">Email</dt>
                    <dd className="font-medium text-neutral-800">{potential.contact.email}</dd>
                  </div>
                )}
              </dl>
            </DashboardCard>
          )}

          {potential.metadata && Object.keys(potential.metadata).length > 0 && (
            <DashboardCard title="Metadata">
              <dl className="space-y-3 text-[0.8125rem]">
                {Object.entries(potential.metadata).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <dt className="text-neutral-500">{key}</dt>
                    <dd className="font-medium text-neutral-800">{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </DashboardCard>
          )}
        </div>
      </div>
    </div>
  );
}

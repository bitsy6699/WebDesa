import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/dashboard/components/molecules/PageHeader';
import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';
import { DashboardDataTable } from '@/dashboard/components/data/DashboardDataTable';
import { TableToolbar } from '@/dashboard/components/data/TableToolbar';
import { TableSearch } from '@/dashboard/components/data/TableSearch';
import { TablePagination } from '@/dashboard/components/data/TablePagination';
import { BulkActionBar } from '@/dashboard/components/data/BulkActionBar';
import { RowActionMenu } from '@/dashboard/components/data/RowActionMenu';
import { PublishStatusToggle } from '@/dashboard/components/data/PublishStatusToggle';
import { Alert } from '@/dashboard/components/organisms/Alert';
import { EmptyState } from '@/dashboard/components/organisms/EmptyState';
import { usePotentials } from '@/hooks/usePotentials';
import { useDeletePotential, useToggleStatus } from '@/hooks/usePotentialMutations';

export default function PotentialsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);

  const { data, isLoading, error } = usePotentials({ page, search: search.length >= 3 ? search : undefined, per_page: 10 });
  const deleteMutation = useDeletePotential();
  const toggleStatusMutation = useToggleStatus();

  const rows = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((item) => ({
      ...item,
      _categoryLabel: item.category.label,
      _updatedAt: item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID') : '-',
    }));
  }, [data]);

  const toggleSelection = (id) => {
    setSelectedIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const toggleAll = () => {
    const ids = rows.map((row) => row.id);
    setSelectedIds((current) => (current.length === ids.length ? [] : ids));
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus potensi ini?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleToggleStatus = (id, currentStatus) => {
    toggleStatusMutation.mutate({ id, currentStatus });
  };

  return (
    <div className="space-y-5">
      {deleteMutation.isSuccess && <Alert title="Potensi berhasil dihapus." variant="success" />}
      {deleteMutation.error && (
        <Alert title={deleteMutation.error?.message ?? 'Gagal menghapus.'} variant="danger" />
      )}

      <PageHeader
        title="Potensi"
        description="Kelola data potensi desa Karamatwangi."
        badge={`${data?.meta?.total ?? 0} total`}
        actions={
          <DashboardButton onClick={() => navigate('/dashboard/potentials/new')}>
            + Buat Potensi
          </DashboardButton>
        }
      />

      <DashboardDataTable
        title="Daftar potensi"
        description="Semua data potensi desa yang tersedia."
        rows={rows}
        loading={isLoading}
        error={error?.message}
        selectedIds={selectedIds}
        onSelectAll={toggleAll}
        onSelectRow={toggleSelection}
        toolbar={
          <div className="space-y-3">
            <BulkActionBar
              selectedCount={selectedIds.length}
              onDelete={() => {
                if (window.confirm(`Hapus ${selectedIds.length} potensi terpilih?`)) {
                  selectedIds.forEach((id) => deleteMutation.mutate(String(id)));
                  setSelectedIds([]);
                }
              }}
            />
            <TableToolbar
              title="Explorer"
              actions={
                <TableSearch value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Cari potensi..." />
              }
            />
          </div>
        }
        columns={[
          {
            key: 'cover_image_url',
            header: 'Foto',
            render: (row) => (
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-[#E8ECEA] bg-neutral-100">
                {row.cover_image_url ? (
                  <img src={row.cover_image_url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-neutral-300">
                    <span className="text-[9px] font-medium">No Image</span>
                  </div>
                )}
              </div>
            ),
          },
          { key: 'title', header: 'Judul' },
          {
            key: 'status',
            header: 'Status',
            render: (row) => (
              <PublishStatusToggle
                published={row.status === 'published'}
                onToggle={() => handleToggleStatus(row.id, row.status)}
              />
            ),
          },
          { key: '_categoryLabel', header: 'Kategori' },
          { key: '_updatedAt', header: 'Tanggal' },
        ]}
        emptyState={
          <EmptyState
            title="Belum ada potensi"
            description="Mulai buat potensi desa pertama Anda."
            action={
              <DashboardButton onClick={() => navigate('/dashboard/potentials/new')}>
                + Buat Potensi
              </DashboardButton>
            }
          />
        }
        rowActions={(row) => (
          <RowActionMenu
            onView={() => navigate(`/dashboard/potentials/${row.id}`)}
            onEdit={() => navigate(`/dashboard/potentials/${row.id}/edit`)}
            onDelete={() => handleDelete(row.id)}
          />
        )}
      />

      {data?.meta && (
        <TablePagination
          page={data.meta.current_page}
          pageSize={data.meta.per_page}
          totalItems={data.meta.total}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

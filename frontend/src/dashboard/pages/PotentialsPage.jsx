import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/dashboard/components/molecules/PageHeader';
import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';
import { DashboardDataTable } from '@/dashboard/components/data/DashboardDataTable';
import FadeContent from '@/components/FadeContent';
import { TableToolbar } from '@/dashboard/components/data/TableToolbar';
import { TableSearch } from '@/dashboard/components/data/TableSearch';
import { TableFilters } from '@/dashboard/components/data/TableFilters';
import { TablePagination } from '@/dashboard/components/data/TablePagination';
import { BulkActionBar } from '@/dashboard/components/data/BulkActionBar';
import { RowActionMenu } from '@/dashboard/components/data/RowActionMenu';
import { PublishStatusToggle } from '@/dashboard/components/data/PublishStatusToggle';
import { Alert } from '@/dashboard/components/organisms/Alert';
import { EmptyState } from '@/dashboard/components/organisms/EmptyState';
import { useAdminPotentials } from '@/hooks/useAdminPotentials';
import { useDeletePotential, useToggleStatus } from '@/hooks/usePotentialMutations';
import { useCategories } from '@/hooks/useCategories';

const selectClass = 'rounded-xl border border-[#E7E7E7] bg-white px-3 py-2 text-[0.8125rem] text-neutral-800 outline-none transition-all duration-150 hover:border-neutral-300 focus:border-[#184D47] focus:ring-2 focus:ring-[#184D47]/20';

export default function PotentialsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [featuredFilter, setFeaturedFilter] = useState('all');
  const [sort, setSort] = useState('latest');

  const { data: categories = [] } = useCategories();

  const { data, isLoading, error } = useAdminPotentials({
    page,
    search: search.length >= 3 ? search : undefined,
    per_page: 10,
    status: statusFilter === 'all' ? undefined : statusFilter,
    category: categoryFilter || undefined,
    featured: featuredFilter === 'all' ? undefined : featuredFilter === 'featured',
    sort: sort === 'latest' ? undefined : sort,
  });
  const deleteMutation = useDeletePotential();
  const toggleStatusMutation = useToggleStatus();

  const rows = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((item) => ({
      ...item,
      _categoryLabel: item.category.label,
      _updatedAt: item.updated_at ? new Date(item.updated_at).toLocaleDateString('id-ID') : '-',
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

  const handleBulkDelete = () => {
    if (!window.confirm(`Hapus ${selectedIds.length} potensi terpilih?`)) {
      return;
    }
    selectedIds.forEach((id) => deleteMutation.mutate(String(id)));
    setSelectedIds([]);
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

      <FadeContent duration={600} delay={0} threshold={0.1}>
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
              onDelete={handleBulkDelete}
            />
            <TableToolbar
              title="Explorer"
              actions={
                <TableFilters
                  filters={
                    <>
                      <TableSearch value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Cari potensi..." />
                      <select className={selectClass} value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
                        <option value="all">Semua status</option>
                        <option value="draft">Draf</option>
                        <option value="published">Diterbitkan</option>
                        <option value="archived">Diarsipkan</option>
                      </select>
                      <select className={selectClass} value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}>
                        <option value="">Semua kategori</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.slug}>{cat.label}</option>
                        ))}
                      </select>
                      <select className={selectClass} value={featuredFilter} onChange={(e) => { setFeaturedFilter(e.target.value); setPage(1); }}>
                        <option value="all">Semua</option>
                        <option value="featured">Unggulan</option>
                        <option value="not">Non-unggulan</option>
                      </select>
                      <select className={selectClass} value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
                        <option value="latest">Terbaru</option>
                        <option value="oldest">Terlama</option>
                        <option value="name_asc">Nama A–Z</option>
                        <option value="name_desc">Nama Z–A</option>
                      </select>
                    </>
                  }
                  onReset={() => {
                    setSearch('');
                    setStatusFilter('all');
                    setCategoryFilter('');
                    setFeaturedFilter('all');
                    setSort('latest');
                    setPage(1);
                  }}
                />
              }
            />
          </div>
        }
        columns={[
          {
            key: 'cover_image_url',
            header: 'Foto',
            render: (row) => (
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-[#E7E7E7] bg-neutral-100">
                {row.cover_image_url ? (
                  <img src={row.cover_image_url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-neutral-300">
                    <span className="text-[9px] font-medium">Tidak Ada Gambar</span>
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
      </FadeContent>
    </div>
  );
}

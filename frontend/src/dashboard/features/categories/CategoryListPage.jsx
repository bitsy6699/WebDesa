import { useEffect, useMemo, useState } from 'react';
import { PageHeader } from '@/dashboard/components/molecules/PageHeader';
import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';
import { DashboardDataTable } from '@/dashboard/components/data/DashboardDataTable';
import { TableToolbar } from '@/dashboard/components/data/TableToolbar';
import { TableSearch } from '@/dashboard/components/data/TableSearch';
import { TableFilters } from '@/dashboard/components/data/TableFilters';
import { TablePagination } from '@/dashboard/components/data/TablePagination';
import { BulkActionBar } from '@/dashboard/components/data/BulkActionBar';
import { RowActionMenu } from '@/dashboard/components/data/RowActionMenu';
import { Alert } from '@/dashboard/components/organisms/Alert';
import { useCategories } from './api/hooks';
import { mapCategoriesToRows } from './utils';

export function CategoryListPage({ onCreate, onView, onEdit, onDelete, onBulkDelete, onRefresh }) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const { data: categories = [], isLoading, isError, error, refetch } = useCategories();

  useEffect(() => {
    setPage(1);
  }, [query]);

  const rows = useMemo(() => {
    const mappedRows = mapCategoriesToRows(categories);
    const normalizedQuery = query.trim().toLowerCase();

    return mappedRows
      .filter((item) => {
        const matchesQuery = !normalizedQuery || item.name.toLowerCase().includes(normalizedQuery) || item.slug.toLowerCase().includes(normalizedQuery);
        return matchesQuery;
      })
      .sort((left, right) => {
        const valueA = left[sortField] ?? '';
        const valueB = right[sortField] ?? '';
        const comparison = String(valueA).localeCompare(String(valueB), undefined, { sensitivity: 'base' });
        return sortDirection === 'asc' ? comparison : comparison * -1;
      });
  }, [categories, query, sortDirection, sortField]);

  const pagedRows = rows.slice((page - 1) * 5, page * 5);
  const selectedRows = rows.filter((row) => selectedIds.includes(row.id));

  const toggleSelection = (id) => {
    setSelectedIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const toggleAll = () => {
    const ids = pagedRows.map((row) => row.id);
    setSelectedIds((current) => (current.length === ids.length ? [] : ids));
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortField(field);
    setSortDirection('asc');
  };

  const errorMessage = error instanceof Error ? error.message : 'Gagal memuat kategori.';

  return (
    <div className="space-y-5">
      <PageHeader
        title="Kategori"
        description="Tinjau dan kelola entri taksonomi yang ditampilkan oleh API kategori."
        badge="Data langsung"
        actions={
          <div className="flex flex-wrap gap-2">
            <DashboardButton variant="secondary" onClick={() => {
              void refetch();
              onRefresh?.();
            }}>
              Muat ulang
            </DashboardButton>
            <DashboardButton onClick={() => onCreate?.()}>
              Tambah kategori
            </DashboardButton>
          </div>
        }
      />

      {isError ? (
        <Alert title="Gagal memuat daftar kategori." description={errorMessage} variant="danger" />
      ) : null}

      <DashboardDataTable
        title="Inventaris kategori"
        description="Daftar ini didukung oleh endpoint kategori backend dan mendukung pencarian, pengurutan, dan penyaringan."
        rows={pagedRows}
        loading={isLoading}
        error={isError ? 'Gagal memuat kategori.' : undefined}
        selectedIds={selectedIds}
        onSelectAll={toggleAll}
        onSelectRow={toggleSelection}
        onSort={handleSort}
        toolbar={
          <div className="space-y-3">
            <BulkActionBar selectedCount={selectedIds.length} onDelete={() => onBulkDelete?.(selectedRows)} />
            <TableToolbar
              title="Manajer taksonomi"
              actions={
                <TableFilters
                  filters={
                    <>
                      <TableSearch value={query} onChange={setQuery} placeholder="Cari kategori" />
                    </>
                  }
                  onReset={() => {
                    setQuery('');
                  }}
                />
              }
            />
          </div>
        }
        columns={[
          { key: 'name', header: 'Nama' },
          { key: 'slug', header: 'Tautan' },
          { key: 'updatedAt', header: 'Terakhir diperbarui' },
        ]}
        rowActions={(row) => (
          <RowActionMenu
            onView={() => onView?.(row)}
            onEdit={() => onEdit?.(row)}
            onDelete={() => onDelete?.(row)}
          />
        )}
      />

      <TablePagination page={page} pageSize={5} totalItems={rows.length} onPageChange={setPage} />
    </div>
  );
}

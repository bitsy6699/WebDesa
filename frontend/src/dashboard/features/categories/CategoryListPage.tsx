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
import { PublishStatusToggle } from '@/dashboard/components/data/PublishStatusToggle';
import { Alert } from '@/dashboard/components/organisms/Alert';
import { useCategories } from './api/hooks';
import type { CategoryRow } from './types';
import { mapCategoriesToRows } from './utils';

interface CategoryListPageProps {
  onCreate?: () => void;
  onView?: (row: CategoryRow) => void;
  onEdit?: (row: CategoryRow) => void;
  onDelete?: (row: CategoryRow) => void;
  onRefresh?: () => void;
}

export function CategoryListPage({ onCreate, onView, onEdit, onDelete, onRefresh }: CategoryListPageProps) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Array<string | number>>([]);
  const [sortField, setSortField] = useState<'name' | 'slug' | 'updatedAt'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'archived'>('all');
  const { data: categories = [], isLoading, isError, error, refetch } = useCategories();

  useEffect(() => {
    setPage(1);
  }, [query, statusFilter]);

  const rows = useMemo(() => {
    const mappedRows = mapCategoriesToRows(categories);
    const normalizedQuery = query.trim().toLowerCase();

    return mappedRows
      .filter((item) => {
        const matchesQuery = !normalizedQuery || item.name.toLowerCase().includes(normalizedQuery) || item.slug.toLowerCase().includes(normalizedQuery);
        const matchesStatus = statusFilter === 'all' || (statusFilter === 'published' && item.status === 'Published');
        return matchesQuery && matchesStatus;
      })
      .sort((left, right) => {
        const valueA = left[sortField] ?? '';
        const valueB = right[sortField] ?? '';
        const comparison = String(valueA).localeCompare(String(valueB), undefined, { sensitivity: 'base' });
        return sortDirection === 'asc' ? comparison : comparison * -1;
      });
  }, [categories, query, sortDirection, sortField, statusFilter]);

  const pagedRows = rows.slice((page - 1) * 5, page * 5);

  const toggleSelection = (id: string | number) => {
    setSelectedIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const toggleAll = () => {
    const ids = pagedRows.map((row) => row.id);
    setSelectedIds((current) => (current.length === ids.length ? [] : ids));
  };

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortField(field as 'name' | 'slug' | 'updatedAt');
    setSortDirection('asc');
  };

  const errorMessage = error instanceof Error ? error.message : 'Unable to load categories.';

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categories"
        description="Review and manage the taxonomy entries exposed by the existing Laravel categories API."
        badge="Live data"
        actions={
          <div className="flex flex-wrap gap-2">
            <DashboardButton variant="secondary" onClick={() => {
              void refetch();
              onRefresh?.();
            }}>
              Refresh
            </DashboardButton>
            <DashboardButton variant="secondary" onClick={() => onCreate?.()}>
              Add Category
            </DashboardButton>
          </div>
        }
      />

      {isError ? (
        <Alert title="We could not load the category list." description={errorMessage} variant="danger" />
      ) : null}

      <DashboardDataTable
        title="Category inventory"
        description="The list is powered by the backend categories endpoint and supports search, sorting, and filtering."
        rows={pagedRows}
        loading={isLoading}
        error={isError ? 'Unable to load categories.' : undefined}
        selectedIds={selectedIds}
        onSelectAll={toggleAll}
        onSelectRow={toggleSelection}
        onSort={handleSort}
        toolbar={
          <div className="space-y-3">
            <BulkActionBar selectedCount={selectedIds.length} />
            <TableToolbar
              title="Taxonomy manager"
              actions={
                <TableFilters
                  filters={
                    <>
                      <TableSearch value={query} onChange={setQuery} placeholder="Search categories" />
                      <select className="rounded-full border border-[#e6eae9] bg-white px-3 py-2 text-sm text-[#0f1720]" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as 'all' | 'published' | 'draft' | 'archived')}>
                        <option value="all">All status</option>
                        <option value="published">Published</option>
                      </select>
                    </>
                  }
                  onReset={() => {
                    setQuery('');
                    setStatusFilter('all');
                  }}
                />
              }
            />
          </div>
        }
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'slug', header: 'Slug' },
          { key: 'status', header: 'Status', render: (row) => <PublishStatusToggle published={row.status === 'Published'} /> },
          { key: 'updatedAt', header: 'Updated' },
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

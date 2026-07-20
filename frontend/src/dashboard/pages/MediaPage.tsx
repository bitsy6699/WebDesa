import { useMemo, useState } from 'react';
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
import { mockMedia } from '@/dashboard/components/data/mockData';

export default function MediaPage() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Array<string | number>>([]);

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return mockMedia;
    }

    return mockMedia.filter((item) => item.name.toLowerCase().includes(normalized));
  }, [query]);

  const pagedRows = filteredRows.slice((page - 1) * 3, page * 3);

  const toggleSelection = (id: string | number) => {
    setSelectedIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const toggleAll = () => {
    const ids = pagedRows.map((row) => row.id);
    setSelectedIds((current) => (current.length === ids.length ? [] : ids));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Media Library" description="Reusable asset table foundation for upcoming media workflows." badge="Foundation" actions={<DashboardButton variant="secondary">Upload Media</DashboardButton>} />

      <DashboardDataTable
        title="Media workspace"
        description="A different dataset proves the shared table shell is reusable across modules."
        rows={pagedRows}
        selectedIds={selectedIds}
        onSelectAll={toggleAll}
        onSelectRow={toggleSelection}
        toolbar={
          <div className="space-y-3">
            <BulkActionBar selectedCount={selectedIds.length} />
            <TableToolbar
              title="Asset library"
              actions={
                <TableFilters
                  filters={<><TableSearch value={query} onChange={setQuery} placeholder="Search media" /><select className="rounded-full border border-[#e6eae9] bg-white px-3 py-2 text-sm text-[#0f1720]"><option>Category</option></select></>}
                  onReset={() => setQuery('')}
                />
              }
            />
          </div>
        }
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'status', header: 'Status', render: (row) => <PublishStatusToggle published={row.status === 'Published'} /> },
          { key: 'category', header: 'Category' },
          { key: 'updatedAt', header: 'Updated' },
        ]}
        rowActions={() => <RowActionMenu onView={() => undefined} onEdit={() => undefined} onDelete={() => undefined} />}
      />

      <TablePagination page={page} pageSize={3} totalItems={filteredRows.length} onPageChange={setPage} />
    </div>
  );
}

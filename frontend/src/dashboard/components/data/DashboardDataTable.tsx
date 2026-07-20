import { type ReactNode } from 'react';
import { clsx } from 'clsx';
import { DashboardCard } from '@/dashboard/components/organisms/DashboardCard';
import { EmptyTableState } from '@/dashboard/components/data/EmptyTableState';

export interface DashboardDataTableColumn<T extends object> {
  key: keyof T;
  header: string;
  render?: (row: T) => ReactNode;
  className?: string;
}

export interface DashboardDataTableProps<T extends object> {
  title: string;
  description: string;
  columns: DashboardDataTableColumn<T>[];
  rows: T[];
  loading?: boolean;
  error?: string;
  selectedIds?: Array<string | number>;
  onSelectAll?: () => void;
  onSelectRow?: (id: string | number) => void;
  onSort?: (key: string) => void;
  toolbar?: ReactNode;
  emptyState?: ReactNode;
  rowActions?: (row: T) => ReactNode;
  className?: string;
}

export function DashboardDataTable<T extends object>({
  title,
  description,
  columns,
  rows,
  loading = false,
  error,
  selectedIds = [],
  onSelectAll,
  onSelectRow,
  onSort,
  toolbar,
  emptyState,
  rowActions,
  className,
}: DashboardDataTableProps<T>) {
  const hasSelection = typeof onSelectRow === 'function' && typeof onSelectAll === 'function';

  if (loading) {
    return (
      <DashboardCard title={title} description={description} className={className}>
        <div className="rounded-[1rem] border border-[#e6eae9] bg-[#f8faf9] p-8 text-sm text-[#64748b]">Loading dataset…</div>
      </DashboardCard>
    );
  }

  if (error) {
    return (
      <DashboardCard title={title} description={description} className={className}>
        <div className="rounded-[1rem] border border-[#fecaca] bg-[#fef2f2] p-8 text-sm text-[#991b1b]">{error}</div>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard title={title} description={description} className={className}>
      {toolbar ? <div className="mb-4">{toolbar}</div> : null}
      {rows.length === 0 ? (
        emptyState ?? <EmptyTableState title="No records" description="No rows available for this view yet." />
      ) : (
        <div className="overflow-hidden rounded-[1rem] border border-[#e6eae9]">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#e6eae9] text-left">
              <thead className="bg-[#f8faf9] text-sm text-[#64748b]">
                <tr>
                  {hasSelection ? (
                    <th className="w-12 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.length > 0 && selectedIds.length === rows.length}
                        onChange={() => onSelectAll?.()}
                        className="h-4 w-4 rounded border-[#cbd5e1] text-[#0f766e] focus:ring-[#0f766e]"
                      />
                    </th>
                  ) : null}
                  {columns.map((column) => (
                    <th key={String(column.key)} className="px-4 py-3 font-medium">
                      {onSort ? (
                        <button type="button" onClick={() => onSort(String(column.key))} className="flex items-center gap-2 text-left text-sm font-medium text-[#64748b] hover:text-[#0f1720]">
                          <span>{column.header}</span>
                        </button>
                      ) : (
                        <span className="text-sm font-medium text-[#64748b]">{column.header}</span>
                      )}
                    </th>
                  ))}
                  {rowActions ? <th className="px-4 py-3 text-right text-sm font-medium text-[#64748b]">Actions</th> : null}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f3f2] bg-white text-sm text-[#0f1720]">
                {rows.map((row) => {
                  const rowId = String((row as { id?: string | number }).id ?? '');
                  const checked = selectedIds.includes(rowId);

                  return (
                    <tr key={rowId} className="transition-colors hover:bg-[#f8faf9]">
                      {hasSelection ? (
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => onSelectRow?.(rowId)}
                            className="h-4 w-4 rounded border-[#cbd5e1] text-[#0f766e] focus:ring-[#0f766e]"
                          />
                        </td>
                      ) : null}
                      {columns.map((column) => (
                        <td key={`${rowId}-${String(column.key)}`} className={clsx('px-4 py-3', column.className)}>
                          {column.render ? column.render(row) : String(row[column.key] ?? '')}
                        </td>
                      ))}
                      {rowActions ? <td className="px-4 py-3 text-right">{rowActions(row)}</td> : null}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardCard>
  );
}

import { useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { dashboardCardClassName } from '@/dashboard/theme/dashboardStyles';
import { EmptyTableState } from '@/dashboard/components/data/EmptyTableState';

export function DashboardDataTable({
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
  selectAllLabel,
}) {
  const hasSelection = typeof onSelectRow === 'function' && typeof onSelectAll === 'function';
  const selectAllRef = useRef(null);

  const someSelected = selectedIds.length > 0;
  const allOnPageSelected = rows.length > 0 && rows.every((row) => selectedIds.includes(String(row.id)));

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someSelected && !allOnPageSelected;
    }
  }, [someSelected, allOnPageSelected]);

  if (loading) {
    const skeletonColumns = [
      ...(hasSelection ? [{ key: '_select', width: 'w-12' }] : []),
      ...columns.map((col) => ({
        key: col.key,
        header: col.header,
      })),
      ...(rowActions ? [{ key: '_actions', width: 'w-16' }] : []),
    ];

    return (
      <div className={clsx(dashboardCardClassName, 'p-0 overflow-hidden', className)}>
        {(title || description) && (
          <div className="border-b border-[#E7E7E7] px-6 py-4">
            {title ? <h2 className="text-[0.875rem] font-semibold text-neutral-800">{title}</h2> : null}
            {description ? <p className="mt-0.5 text-[0.8125rem] text-neutral-500">{description}</p> : null}
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-[0.8125rem]">
            <thead>
              <tr className="border-b border-[#E7E7E7] bg-neutral-50/60">
                {skeletonColumns.map((col) => (
                  <th key={String(col.key)} className="px-6 py-3">
                    <div className="h-3.5 w-16 animate-pulse rounded bg-neutral-200" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E7E7]">
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {skeletonColumns.map((col) => (
                    <td key={String(col.key)} className="px-6 py-3.5">
                      <div className={clsx('h-4 animate-pulse rounded bg-neutral-100', col.key === '_select' ? 'w-4' : 'h-4 w-3/4')} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={clsx(dashboardCardClassName, 'p-6', className)}>
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-[0.8125rem] text-red-800">{error}</div>
      </div>
    );
  }

  return (
    <div className={clsx(dashboardCardClassName, 'p-0 overflow-hidden', className)}>
      {(title || description) && (
        <div className="border-b border-[#E7E7E7] px-6 py-4">
          {title ? <h2 className="text-[0.875rem] font-semibold text-neutral-800">{title}</h2> : null}
          {description ? <p className="mt-0.5 text-[0.8125rem] text-neutral-500">{description}</p> : null}
        </div>
      )}
      {toolbar ? <div className="border-b border-[#E7E7E7] px-6 py-3">{toolbar}</div> : null}
      {rows.length === 0 ? (
        emptyState ?? (
          <div className="p-6">
            <EmptyTableState title="Belum ada data" description="Tidak ada baris yang tersedia untuk tampilan ini." />
          </div>
        )
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-[0.8125rem]">
            <thead>
              <tr className="border-b border-[#E7E7E7] bg-neutral-50/60">
                {hasSelection ? (
                  <th className="w-12 px-6 py-3">
                    <input
                      ref={selectAllRef}
                      type="checkbox"
                      checked={someSelected}
                      onChange={() => onSelectAll?.()}
                      aria-label={selectAllLabel ?? 'Pilih semua baris di halaman ini'}
                      className="h-4 w-4 rounded border-neutral-300 text-[#184D47] focus:ring-[#184D47]"
                    />
                  </th>
                ) : null}
                {columns.map((column) => (
                  <th key={String(column.key)} className="px-6 py-3">
                    {onSort ? (
                      <button
                        type="button"
                        onClick={() => onSort(String(column.key))}
                        className="flex items-center gap-1.5 text-left text-[0.75rem] font-semibold text-neutral-500 hover:text-neutral-800 transition-colors duration-150"
                      >
                        <span>{column.header}</span>
                      </button>
                    ) : (
                      <span className="text-[0.75rem] font-semibold text-neutral-500">{column.header}</span>
                    )}
                  </th>
                ))}
                {rowActions ? <th className="px-6 py-3 text-right text-[0.75rem] font-semibold text-neutral-500">Aksi</th> : null}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECEA]">
              {rows.map((row) => {
                const rowId = String(row.id ?? '');
                const checked = selectedIds.includes(rowId);

                return (
                  <tr key={rowId} className="transition-colors duration-150 hover:bg-[#F8FAF8]">
                    {hasSelection ? (
                      <td className="px-6 py-3.5">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => onSelectRow?.(rowId)}
                          className="h-4 w-4 rounded border-neutral-300 text-[#184D47] focus:ring-[#184D47]"
                        />
                      </td>
                    ) : null}
                    {columns.map((column) => (
                      <td key={`${rowId}-${String(column.key)}`} className={clsx('px-6 py-3.5', column.className)}>
                        {column.render ? column.render(row) : String(row[column.key] ?? '')}
                      </td>
                    ))}
                    {rowActions ? <td className="px-6 py-3.5 text-right">{rowActions(row)}</td> : null}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

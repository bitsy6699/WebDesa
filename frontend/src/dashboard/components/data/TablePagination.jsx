import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';

const selectClass = 'rounded-lg border border-[#E7E7E7] bg-white px-2 py-1 text-[0.8125rem] font-medium text-neutral-700 outline-none focus:border-[#184D47]';

export function TablePagination({ page, pageSize, totalItems, onPageChange, onPageSizeChange }) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-[20px] border border-[#E7E7E7] bg-white px-5 py-3 text-[0.8125rem] text-neutral-500 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="flex flex-wrap items-center gap-3">
        <span>
          Menampilkan {start}–{end} dari {totalItems} data
        </span>
        {typeof onPageSizeChange === 'function' && (
          <label className="flex items-center gap-2">
            <span>Baris/halaman</span>
            <select
              className={selectClass}
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </label>
        )}
      </div>
      <div className="flex items-center gap-1.5">
        <DashboardButton variant="ghost" size="sm" onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1}>
          Sebelumnya
        </DashboardButton>
        <span className="rounded-lg border border-[#E7E7E7] bg-white px-3 py-1 text-[0.8125rem] font-medium text-neutral-700">
          {page}/{totalPages}
        </span>
        <DashboardButton variant="ghost" size="sm" onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
          Berikutnya
        </DashboardButton>
      </div>
    </div>
  );
}

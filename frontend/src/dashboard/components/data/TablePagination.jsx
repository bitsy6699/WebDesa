import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';

export function TablePagination({ page, pageSize, totalItems, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-[20px] border border-[#E7E7E7] bg-white px-5 py-3 text-[0.8125rem] text-neutral-500 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <span>
        Menampilkan {Math.min(pageSize, totalItems)} dari {totalItems} data
      </span>
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

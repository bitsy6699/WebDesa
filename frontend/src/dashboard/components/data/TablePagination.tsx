import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';

export interface TablePaginationProps {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export function TablePagination({ page, pageSize, totalItems, onPageChange }: TablePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-[1rem] border border-[#e6eae9] bg-[#fcfdfd] px-4 py-3 text-sm text-[#64748b]">
      <span>
        Showing {Math.min(pageSize, totalItems)} of {totalItems} records
      </span>
      <div className="flex items-center gap-2">
        <DashboardButton variant="ghost" size="sm" onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1}>
          Prev
        </DashboardButton>
        <span className="rounded-full border border-[#e6eae9] bg-white px-3 py-1 text-[#0f1720]">
          {page}/{totalPages}
        </span>
        <DashboardButton variant="ghost" size="sm" onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
          Next
        </DashboardButton>
      </div>
    </div>
  );
}

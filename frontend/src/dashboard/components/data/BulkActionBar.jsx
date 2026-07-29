import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';

export function BulkActionBar({ selectedCount, onDelete, onPublish }) {
  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#184D47]/20 bg-[#184D47]/5 px-4 py-3">
      <span className="text-[0.8125rem] font-semibold text-[#184D47]">{selectedCount} dipilih</span>
      <div className="flex flex-wrap items-center gap-2">
        {onPublish ? (
          <DashboardButton variant="secondary" size="sm" onClick={onPublish}>
            Terbitkan
          </DashboardButton>
        ) : null}
        <DashboardButton variant="danger" size="sm" onClick={onDelete}>
          Hapus
        </DashboardButton>
      </div>
    </div>
  );
}

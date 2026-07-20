import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';

export interface BulkActionBarProps {
  selectedCount: number;
  onDelete?: () => void;
  onPublish?: () => void;
}

export function BulkActionBar({ selectedCount, onDelete, onPublish }: BulkActionBarProps) {
  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1rem] border border-[#dff6f2] bg-[#f3fbf8] px-4 py-3">
      <span className="text-sm font-medium text-[#0f1720]">{selectedCount} selected</span>
      <div className="flex flex-wrap items-center gap-2">
        <DashboardButton variant="secondary" size="sm" onClick={onPublish}>
          Bulk publish
        </DashboardButton>
        <DashboardButton variant="danger" size="sm" onClick={onDelete}>
          Bulk delete
        </DashboardButton>
      </div>
    </div>
  );
}

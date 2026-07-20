import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';

export interface ConfirmDeleteDialogProps {
  title: string;
  description: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function ConfirmDeleteDialog({ title, description, onConfirm, onCancel }: ConfirmDeleteDialogProps) {
  return (
    <div className="rounded-[1.25rem] border border-[#e6eae9] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,32,0.04)]">
      <h3 className="text-[1rem] font-semibold text-[#0f1720]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#64748b]">{description}</p>
      <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
        <DashboardButton variant="secondary" size="sm" onClick={onCancel}>
          Cancel
        </DashboardButton>
        <DashboardButton variant="danger" size="sm" onClick={onConfirm}>
          Delete
        </DashboardButton>
      </div>
    </div>
  );
}

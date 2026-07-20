import { PencilLine, Trash2, Eye } from 'lucide-react';
import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';

export interface RowActionMenuProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function RowActionMenu({ onView, onEdit, onDelete }: RowActionMenuProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      {onView ? (
        <DashboardButton variant="ghost" size="sm" onClick={onView}>
          <Eye className="h-4 w-4" />
        </DashboardButton>
      ) : null}
      {onEdit ? (
        <DashboardButton variant="ghost" size="sm" onClick={onEdit}>
          <PencilLine className="h-4 w-4" />
        </DashboardButton>
      ) : null}
      {onDelete ? (
        <DashboardButton variant="danger" size="sm" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </DashboardButton>
      ) : null}
    </div>
  );
}

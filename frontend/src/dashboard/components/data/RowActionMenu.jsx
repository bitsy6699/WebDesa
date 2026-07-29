import { PencilLine, Trash2, Eye } from 'lucide-react';
import { DashboardIconButton } from '@/dashboard/components/atoms/DashboardIconButton';

export function RowActionMenu({ onView, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-end gap-1">
      {onView ? (
        <DashboardIconButton icon={<Eye className="h-4 w-4" />} variant="ghost" size="sm" onClick={onView} aria-label="Lihat" />
      ) : null}
      {onEdit ? (
        <DashboardIconButton icon={<PencilLine className="h-4 w-4" />} variant="ghost" size="sm" onClick={onEdit} aria-label="Ubah" />
      ) : null}
      {onDelete ? (
        <DashboardIconButton icon={<Trash2 className="h-4 w-4" />} variant="danger" size="sm" onClick={onDelete} aria-label="Hapus" />
      ) : null}
    </div>
  );
}

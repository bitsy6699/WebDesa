import { SearchX } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { clsx } from 'clsx';

export interface EmptyResultProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

/**
 * EmptyResult - Placeholder when a search or filter yields no data.
 */
export function EmptyResult({
  title = 'Tidak Ada Hasil',
  description = 'Maaf, kami tidak dapat menemukan apa yang Anda cari. Coba gunakan kata kunci lain.',
  actionLabel = 'Bersihkan Pencarian',
  onAction,
  className
}: EmptyResultProps) {
  return (
    <div className={clsx('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[--neutral-100] text-[--neutral-400] mb-4">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-[--neutral-900]">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-[--neutral-500]">{description}</p>
      {onAction && (
        <Button variant="outline" className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

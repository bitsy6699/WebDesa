import { SearchX } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { clsx } from 'clsx';

/**
 * EmptyResult - Placeholder when a search or filter yields no data.
 */
export function EmptyResult({
  title = 'Tidak Ada Hasil',
  description = 'Maaf, kami tidak dapat menemukan apa yang Anda cari. Coba gunakan kata kunci lain.',
  actionLabel = 'Bersihkan Pencarian',
  onAction,
  className
}) {
  return (
    <div className={clsx('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
      <div className="w-full max-w-md rounded-[32px] border border-white/50 bg-white/70 p-8 shadow-[0_20px_60px_rgba(15,61,52,0.06)] backdrop-blur-[24px]">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary mb-6 border border-white/50">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-primary">{title}</h3>
        <p className="mt-2 max-w-sm mx-auto text-sm text-neutral-500 leading-relaxed">{description}</p>
        {onAction && (
          <Button variant="outline" className="mt-6 rounded-full border-primary/20 px-6 text-primary hover:bg-primary/5" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

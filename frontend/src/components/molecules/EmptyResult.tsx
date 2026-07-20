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
      <div className="w-full max-w-md rounded-[32px] border border-white/50 bg-white/70 p-8 shadow-[0_20px_60px_rgba(15,61,52,0.06)] backdrop-blur-[24px]">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#184D47]/10 text-[#184D47] mb-6 border border-white/50">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-[#184D47]">{title}</h3>
        <p className="mt-2 max-w-sm mx-auto text-sm text-[#5F6B68] leading-relaxed">{description}</p>
        {onAction && (
          <Button variant="outline" className="mt-6 rounded-full border-[#184D47]/20 px-6 text-[#184D47] hover:bg-[#184D47]/5" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

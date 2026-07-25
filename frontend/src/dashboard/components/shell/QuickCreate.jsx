import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, FolderPlus, ImagePlus, Plus } from 'lucide-react';
import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';

export function QuickCreate() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative hidden sm:block">
      <DashboardButton variant="secondary" onClick={() => setOpen((current) => !current)} className="gap-1.5">
        <Plus className="h-3.5 w-3.5" />
        <span>Buat baru</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </DashboardButton>

      {open ? (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-[#E8ECEA] bg-white p-1.5 shadow-[0_8px_25px_rgba(0,0,0,0.08)]">
            <button
              type="button"
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[0.8125rem] text-neutral-700 transition-colors duration-150 hover:bg-[#F8FAF8]"
              onClick={() => { navigate('/dashboard/potentials/new'); setOpen(false); }}
            >
              <FolderPlus className="h-4 w-4 text-[#184D47]" />
              Buat potensi
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[0.8125rem] text-neutral-700 transition-colors duration-150 hover:bg-[#F8FAF8]"
              onClick={() => { navigate('/dashboard/categories'); setOpen(false); }}
            >
              <FolderPlus className="h-4 w-4 text-[#184D47]" />
              Buat kategori
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[0.8125rem] text-neutral-700 transition-colors duration-150 hover:bg-[#F8FAF8]"
              onClick={() => { navigate('/dashboard/media'); setOpen(false); }}
            >
              <ImagePlus className="h-4 w-4 text-[#184D47]" />
              Unggah media
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

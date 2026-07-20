import { useState } from 'react';
import { ChevronDown, FolderPlus, ImagePlus, Sparkles } from 'lucide-react';
import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';

export function QuickCreate() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative hidden sm:block">
      <DashboardButton variant="secondary" onClick={() => setOpen((current) => !current)} className="gap-1.5">
        <Sparkles className="h-4 w-4" />
        <span>Quick Create</span>
        <ChevronDown className="h-4 w-4" />
      </DashboardButton>

      {open ? (
        <div className="absolute right-0 mt-2 w-56 rounded-[1rem] border border-[#e6eae9] bg-white p-2 shadow-[0_10px_24px_rgba(15,23,32,0.08)]">
          <button type="button" className="flex w-full items-center gap-3 rounded-[0.8rem] px-3 py-2 text-left text-sm text-[#334155] hover:bg-[#f3f5f5]">
            <FolderPlus className="h-4 w-4 text-[#0f766e]" />
            Create Potential
          </button>
          <button type="button" className="flex w-full items-center gap-3 rounded-[0.8rem] px-3 py-2 text-left text-sm text-[#334155] hover:bg-[#f3f5f5]">
            <FolderPlus className="h-4 w-4 text-[#0f766e]" />
            Create Category
          </button>
          <button type="button" className="flex w-full items-center gap-3 rounded-[0.8rem] px-3 py-2 text-left text-sm text-[#334155] hover:bg-[#f3f5f5]">
            <ImagePlus className="h-4 w-4 text-[#0f766e]" />
            Upload Media
          </button>
        </div>
      ) : null}
    </div>
  );
}

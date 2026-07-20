import { type ReactNode } from 'react';

export interface ColumnVisibilityMenuProps {
  children?: ReactNode;
}

export function ColumnVisibilityMenu({ children }: ColumnVisibilityMenuProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-[#e6eae9] bg-white px-3 py-2 text-sm text-[#64748b]">
      <span className="font-medium text-[#0f1720]">Columns</span>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

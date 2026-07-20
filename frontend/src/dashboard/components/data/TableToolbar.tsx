import type { ReactNode } from 'react';

export interface TableToolbarProps {
  children?: ReactNode;
  actions?: ReactNode;
  title?: string;
}

export function TableToolbar({ children, actions, title }: TableToolbarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-[1rem] border border-[#e6eae9] bg-[#fcfdfd] p-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        {title ? <p className="text-sm font-medium text-[#0f1720]">{title}</p> : null}
        {children ? <div className="flex flex-wrap gap-2">{children}</div> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

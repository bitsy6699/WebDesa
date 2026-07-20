import { type ReactNode } from 'react';

export interface DashboardSectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function DashboardSection({ title, description, children, actions }: DashboardSectionProps) {
  return (
    <div className="space-y-4">
      {(title || description || actions) && (
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1">
            {title ? <h2 className="text-[1.05rem] font-semibold tracking-tight text-[#0f1720]">{title}</h2> : null}
            {description ? <p className="text-sm leading-6 text-[#64748b]">{description}</p> : null}
          </div>
          {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
        </div>
      )}
      {children}
    </div>
  );
}

import { type ReactNode } from 'react';

export interface ConfirmationLayoutProps {
  title: string;
  description?: string;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
}

export function ConfirmationLayout({ title, description, primaryAction, secondaryAction }: ConfirmationLayoutProps) {
  return (
    <div className="rounded-[1.25rem] border border-[#e6eae9] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,32,0.04)]">
      <h3 className="text-base font-semibold text-[#0f1720]">{title}</h3>
      {description ? <p className="mt-2 text-sm leading-6 text-[#64748b]">{description}</p> : null}
      {(primaryAction || secondaryAction) && (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {secondaryAction ? <div>{secondaryAction}</div> : null}
          {primaryAction ? <div>{primaryAction}</div> : null}
        </div>
      )}
    </div>
  );
}

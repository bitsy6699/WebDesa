import { type ReactNode } from 'react';

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[1.25rem] border border-dashed border-[#d4ddda] bg-[#fbfcfc] px-6 py-12 text-center">
      <h3 className="text-base font-semibold text-[#0f1720]">{title}</h3>
      {description ? <p className="mt-2 max-w-md text-sm leading-6 text-[#64748b]">{description}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

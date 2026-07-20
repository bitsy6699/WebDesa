import { AlertCircle } from 'lucide-react';
import { type ReactNode } from 'react';

export interface ErrorStateProps {
  title?: string;
  description?: string;
  action?: ReactNode;
}

export function ErrorState({ title = 'Something went wrong', description = 'Please try again in a moment.', action }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[1.25rem] border border-[#fecaca] bg-[#fef2f2] px-6 py-12 text-center">
      <div className="mb-3 rounded-full bg-white p-3 text-[#dc2626]">
        <AlertCircle className="h-5 w-5" />
      </div>
      <h3 className="text-base font-semibold text-[#0f1720]">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-[#64748b]">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

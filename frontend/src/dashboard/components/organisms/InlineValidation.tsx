import { AlertCircle } from 'lucide-react';

export interface InlineValidationProps {
  message: string;
}

export function InlineValidation({ message }: InlineValidationProps) {
  return (
    <div className="flex items-start gap-2 rounded-[0.9rem] border border-[#fecaca] bg-[#fef2f2] px-3 py-2 text-sm text-[#991b1b]">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

import { type ReactNode } from 'react';
import { RequiredIndicator } from '@/dashboard/components/forms/RequiredIndicator';

export interface FieldLabelProps {
  label: string;
  required?: boolean;
  children?: ReactNode;
}

export function FieldLabel({ label, required = false, children }: FieldLabelProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-[#0f1720]">
      <span className="flex items-center gap-2">
        {label}
        {required ? <RequiredIndicator /> : null}
      </span>
      {children}
    </label>
  );
}

import { type ReactNode } from 'react';

export interface FormActionsProps {
  children: ReactNode;
}

export function FormActions({ children }: FormActionsProps) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>;
}

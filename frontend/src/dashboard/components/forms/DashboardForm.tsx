import { type ReactNode } from 'react';
import { clsx } from 'clsx';

export interface DashboardFormProps {
  children: ReactNode;
  className?: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function DashboardForm({ children, className, onSubmit }: DashboardFormProps) {
  return (
    <form className={clsx('space-y-6', className)} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

import { type ReactNode } from 'react';
import { clsx } from 'clsx';

export interface DashboardContainerProps {
  children: ReactNode;
  className?: string;
}

export function DashboardContainer({ children, className }: DashboardContainerProps) {
  return <div className={clsx('mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8', className)}>{children}</div>;
}

import { type ReactNode } from 'react';

export interface ToastWrapperProps {
  children: ReactNode;
}

export function ToastWrapper({ children }: ToastWrapperProps) {
  return <div className="flex flex-col gap-3" aria-live="polite">{children}</div>;
}

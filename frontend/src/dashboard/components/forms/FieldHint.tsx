import { type ReactNode } from 'react';

export interface FieldHintProps {
  children: ReactNode;
}

export function FieldHint({ children }: FieldHintProps) {
  return <p className="text-sm leading-6 text-[#64748b]">{children}</p>;
}

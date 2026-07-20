import { type ReactNode } from 'react';
import { DashboardCard } from '@/dashboard/components/organisms/DashboardCard';

export interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <DashboardCard title={title} description={description}>
      <div className="space-y-4">{children}</div>
    </DashboardCard>
  );
}

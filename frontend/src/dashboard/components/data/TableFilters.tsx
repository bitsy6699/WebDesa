import { type ReactNode } from 'react';
import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';



export interface TableFiltersProps {
  filters: ReactNode;
  onReset?: () => void;
}

export function TableFilters({ filters, onReset }: TableFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters}
      {onReset ? (
        <DashboardButton variant="ghost" size="sm" onClick={onReset}>
          Reset filters
        </DashboardButton>
      ) : null}
    </div>
  );
}

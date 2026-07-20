import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dashboardTheme } from '@/dashboard/theme/dashboardTheme';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#64748b]" style={{ color: dashboardTheme.colors.textMuted }}>
      <Link to="/dashboard" className="flex items-center gap-1 rounded-full px-2 py-1 hover:bg-[#f3f5f5] hover:text-[#0f1720]">
        <Home className="h-4 w-4" />
        <span className="sr-only">Dashboard</span>
      </Link>
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4" />
          {item.to ? (
            <Link to={item.to} className="rounded-full px-2 py-1 hover:bg-[#f3f5f5] hover:text-[#0f1720]">
              {item.label}
            </Link>
          ) : (
            <span className="px-2 py-1 font-medium text-[#0f1720]">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

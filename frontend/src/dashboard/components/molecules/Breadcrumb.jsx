import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Breadcrumb({ items }) {
  return (
    <nav aria-label="Navigasi" className="flex items-center gap-1 text-[0.8125rem] text-neutral-400">
      <Link to="/dashboard" className="flex items-center rounded-md p-0.5 text-neutral-400 transition-colors duration-150 hover:text-neutral-700" aria-label="Dasbor">
        <Home className="h-3.5 w-3.5" />
      </Link>
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} className="flex items-center gap-1">
          <ChevronRight className="h-3 w-3 text-neutral-300" />
          {item.to ? (
            <Link to={item.to} className="rounded-md px-1 py-0.5 transition-colors duration-150 hover:text-neutral-700">
              {item.label}
            </Link>
          ) : (
            <span className="px-1 py-0.5 font-medium text-neutral-600">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

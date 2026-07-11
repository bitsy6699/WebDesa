import { type ReactNode } from 'react';
import { clsx } from 'clsx';

export interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  children?: ReactNode; // Optional right-aligned action (like "View All")
}

/**
 * SectionTitle - Standardized heading for page sections.
 */
export function SectionTitle({ title, subtitle, align = 'center', className, children }: SectionTitleProps) {
  const aligns = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <div className={clsx('flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8', className)}>
      <div className={clsx('max-w-2xl', aligns[align])}>
        <h2 className="text-3xl font-bold text-[--neutral-900] tracking-tight">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-lg text-[--neutral-500]">{subtitle}</p>
        )}
      </div>
      {children && (
        <div className={clsx('flex-shrink-0', align === 'center' ? 'hidden sm:block' : '')}>
          {children}
        </div>
      )}
    </div>
  );
}

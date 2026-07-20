import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { glassButtonSubtle } from '@/lib/glassStyles';

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
  ctaTo?: string;
  ctaLabel?: string;
  className?: string;
}

function SectionCTA({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[#163A35] transition-all duration-200 ease-out hover:-translate-y-[1px] hover:bg-[rgba(24,77,71,0.12)] hover:text-[#0B3C35] hover:shadow-[0_8px_24px_rgba(24,77,71,0.12)]"
      style={{
        ...glassButtonSubtle,
        border: '1px solid rgba(24,77,71,0.15)',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  ctaTo,
  ctaLabel,
  className,
}: SectionHeaderProps) {
  return (
    <div className={clsx('mb-8 flex flex-col gap-6 lg:mb-10 lg:flex-row lg:items-end lg:justify-between', className)}>
      <div>
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 text-2xl font-bold leading-tight text-[#163A35] md:text-3xl lg:text-4xl">
          {title}
        </h2>
        <p className="mt-3 max-w-[620px] text-[15px] leading-[170%] text-[#667085]">
          {description}
        </p>
      </div>

      {ctaTo && ctaLabel ? (
        <div className="lg:pt-1">
          <SectionCTA to={ctaTo} label={ctaLabel} />
        </div>
      ) : null}
    </div>
  );
}

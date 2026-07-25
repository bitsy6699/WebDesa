import { clsx } from 'clsx';

export const dashboardFocusRingClassName = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#184D47]';

export const dashboardInputClassName = clsx(
  'w-full rounded-lg border border-[#E7E7E7] bg-white px-3 py-2 text-[0.8125rem] text-neutral-800 transition-colors',
  'placeholder:text-neutral-400',
  'hover:border-neutral-300',
  'focus:border-[#184D47] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#184D47]/20',
  'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400',
);

export const dashboardCardClassName = clsx(
  'rounded-2xl border border-[#E7E7E7] bg-white',
);

export const dashboardPageClassName = 'space-y-5';

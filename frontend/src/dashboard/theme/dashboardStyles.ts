import { clsx } from 'clsx';


export const dashboardFocusRingClassName = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0f766e]';


export const dashboardInputClassName = clsx(
  'w-full rounded-[0.9rem] border border-[#e6eae9] bg-white px-3 py-2.5 text-sm text-[#0f1720] shadow-[0_1px_2px_rgba(15,23,32,0.02)] transition-all duration-200',
  'placeholder:text-[#94a3b8] focus:border-[#0f766e] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0f766e]',
  'disabled:cursor-not-allowed disabled:bg-[#f3f5f5] disabled:text-[#64748b]',
);


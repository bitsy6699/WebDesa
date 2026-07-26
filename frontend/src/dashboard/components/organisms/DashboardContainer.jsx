import { clsx } from 'clsx';

export function DashboardContainer({ children, className }) {
  return (
    <div className={clsx('mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-8 pb-12', className)}>
      {children}
    </div>
  );
}

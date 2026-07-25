import { clsx } from 'clsx';

export function DashboardForm({ children, className, onSubmit }) {
  return (
    <form className={clsx('space-y-5', className)} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

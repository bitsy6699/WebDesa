import { type InputHTMLAttributes, forwardRef, type ReactNode } from 'react';
import { clsx } from 'clsx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

/**
 * Input - Standard form text input.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, id, ...props }, ref) => {
    return (
      <div className={clsx('w-full', className)}>
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-[--neutral-700] mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[--neutral-400]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            className={clsx(
              'block w-full rounded-[--radius-md] border transition-colors duration-[--duration-fast] text-sm focus:outline-none focus:ring-2 focus:ring-offset-0',
              error
                ? 'border-[--color-error] text-[--color-error] placeholder-[--color-error] focus:border-[--color-error] focus:ring-[--color-error]/20'
                : 'border-[--border-default] text-[--neutral-900] placeholder-[--neutral-400] focus:border-[--color-primary] focus:ring-[--color-primary]/20 hover:border-[--neutral-300]',
              icon ? 'pl-10' : 'pl-3',
              'pr-3 py-2 bg-white disabled:bg-[--neutral-50] disabled:text-[--neutral-500] disabled:cursor-not-allowed'
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-sm text-[--color-error]">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

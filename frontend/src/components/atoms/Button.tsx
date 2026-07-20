import {
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
  type ReactNode,
  forwardRef,
  type ElementType,
} from 'react';
import { clsx } from 'clsx';
import { buttonBaseStyles } from '@/lib/uiStyles';

type ButtonBaseProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
  /**
   * Renders the button as an anchor tag.
   * Pass `as="a"` to use Button styling on an `<a>` element.
   */
  as?: 'button' | 'a';
};

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };

type ButtonAsAnchor = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const buttonVariants = {
  primary:
    'bg-[--color-primary] text-white ' +
    'hover:bg-[--color-primary-dark] ' +
    'shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]',
  secondary:
    'border border-white bg-transparent text-white ' +
    'hover:bg-white/10 ' +
    'shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]',
  outline:
    'border border-[--border-default] bg-transparent text-[--neutral-800] ' +
    'hover:border-[--color-primary] hover:text-[--color-primary] hover:bg-[--neutral-50] ' +
    'shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]',
  ghost:
    'bg-transparent text-[--neutral-700] ' +
    'hover:bg-[--neutral-100] hover:text-[--neutral-900]',
};

/* SM: 32px height, MD: 40px height, LG: 48px height with consistent horizontal padding */
const buttonSizes = {
  sm: 'h-8 px-4 text-xs',
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

/**
 * Button - Primary interaction element.
 * Supports `as="a"` for rendering as an anchor tag while keeping button styling.
 *
 * @see docs/design/DESIGN_SYSTEM.md §8.5 Buttons
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, className, children, as: Tag = 'button', ...props }, ref) => {
    const computedClass = clsx(
      buttonBaseStyles,
      buttonVariants[variant],
      buttonSizes[size],
      fullWidth && 'w-full',
      className,
    );

    const Component = Tag as ElementType;

    return (
      <Component
        ref={ref}
        className={computedClass}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Button.displayName = 'Button';

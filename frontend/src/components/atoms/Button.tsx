import {
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
  type ReactNode,
  forwardRef,
  type ElementType,
} from 'react';
import { clsx } from 'clsx';

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

const buttonBaseStyles =
  'inline-flex items-center justify-center gap-2 font-semibold leading-none ' +
  'transition-all duration-[--duration-fast] ease-[--ease-default] ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[--border-focus] focus-visible:ring-offset-2 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ' +
  'aria-disabled:opacity-50 aria-disabled:cursor-not-allowed';

const buttonVariants = {
  primary:
    'bg-[--color-primary] text-white ' +
    'hover:bg-[--color-primary-dark] hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] ' +
    'active:translate-y-0 active:shadow-none ' +
    'shadow-[var(--shadow-sm)]',
  secondary:
    'bg-[--color-secondary] text-white ' +
    'hover:bg-[--color-secondary-light] hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] ' +
    'active:translate-y-0 active:shadow-none ' +
    'shadow-[var(--shadow-sm)]',
  outline:
    'border-2 border-[--border-default] bg-transparent text-[--neutral-800] ' +
    'hover:border-[--color-primary] hover:text-[--color-primary] hover:bg-[--neutral-50]',
  ghost:
    'bg-transparent text-[--neutral-700] ' +
    'hover:bg-[--neutral-100] hover:text-[--neutral-900]',
};

/* DS §8.5: sm=32px, md=40px, lg=48px */
const buttonSizes = {
  sm: 'h-8 min-w-[2rem] px-3 text-xs rounded-[--radius-sm]',
  md: 'h-10 min-w-[2.5rem] px-4 text-sm rounded-[--radius-md]',
  lg: 'h-12 min-w-[3rem] px-6 text-base rounded-[--radius-lg]',
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

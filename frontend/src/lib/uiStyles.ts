export const focusRingStyles =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[--border-focus] focus-visible:ring-offset-2';

export const interactiveTransitionStyles =
  'transition-all duration-200 ease-out will-change-transform transform-gpu';

export const buttonBaseStyles =
  'inline-flex items-center justify-center gap-2 font-semibold leading-none rounded-full ' +
  `${interactiveTransitionStyles} hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] ${focusRingStyles} ` +
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ' +
  'aria-disabled:opacity-50 aria-disabled:cursor-not-allowed';

export const iconButtonBaseStyles =
  'inline-flex items-center justify-center rounded-full ' +
  `${interactiveTransitionStyles} hover:-translate-y-[1px] active:translate-y-0 ${focusRingStyles} ` +
  'disabled:opacity-50 disabled:cursor-not-allowed';

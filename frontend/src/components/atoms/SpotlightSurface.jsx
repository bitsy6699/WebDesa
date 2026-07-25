import { useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { clsx } from 'clsx';

export function SpotlightSurface({
  children,
  className,
  intensity = 0.045,
  disabled = false,
  spotlightClassName,
  innerRef,
  as: Component = 'div',
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();
  const [canUseSpotlight, setCanUseSpotlight] = useState(false);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setCanUseSpotlight(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  const shouldRender = !disabled && !prefersReducedMotion && canUseSpotlight;

  const handleMove = (event) => {
    if (!shouldRender) {
      onMouseMove?.(event);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setPointer({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    setIsActive(true);
    onMouseMove?.(event);
  };

  const handleEnter = (event) => {
    if (!shouldRender) {
      onMouseEnter?.(event);
      return;
    }

    setIsActive(true);
    onMouseEnter?.(event);
  };

  const handleLeave = (event) => {
    if (!shouldRender) {
      onMouseLeave?.(event);
      return;
    }

    setIsActive(false);
    setPointer({ x: 50, y: 50 });
    onMouseLeave?.(event);
  };

  const spotlightStyle = useMemo(() => ({
    background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(255,255,255,${intensity}) 0%, rgba(255,255,255,0) 62%)`,
  }), [intensity, pointer.x, pointer.y]);

  return (
    <Component
      ref={innerRef}
      className={clsx('relative isolate overflow-hidden', className)}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      {...props}
    >
      {children}
      {shouldRender && (
        <div
          aria-hidden="true"
          className={clsx('pointer-events-none absolute inset-0 z-10 transition-opacity duration-200', spotlightClassName)}
          style={{ ...spotlightStyle, opacity: isActive ? 1 : 0.35 }}
        />
      )}
    </Component>
  );
}

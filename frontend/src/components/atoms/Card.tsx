import { type ReactNode, forwardRef, type HTMLAttributes, useState, useCallback, useRef } from 'react';
import { clsx } from 'clsx';
import { useReducedMotion } from 'framer-motion';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
}

/**
 * Card - Surface container for grouping related content.
 *
 * Resting elevation: shadow-md (per DESIGN_SYSTEM.md §6 shadow-md = Cards)
 * Hoverable elevation: shadow-lg + lift (DESIGN_SYSTEM.md §9.4 Card Hover)
 * Enhanced with cursor-tracking radial glow lighting (desktop, opacity 6%).
 *
 * @see docs/design/DESIGN_SYSTEM.md §8.7 Unified Potential Card, §6 Shadow System
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hoverable = false, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const localRef = useRef<HTMLDivElement | null>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !hoverable) return;
      const card = localRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      setCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }, [prefersReducedMotion, hoverable]);

    // Combine external ref with internal ref for bounding rect measurements
    const setRefs = useCallback((node: HTMLDivElement | null) => {
      localRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    }, [ref]);

    const isDesktop = typeof window !== 'undefined' && !window.matchMedia('(pointer: coarse)').matches;
    const showLighting = hoverable && isHovered && !prefersReducedMotion && isDesktop;

    return (
      <div
        ref={setRefs}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={clsx(
          'relative overflow-hidden rounded-[24px] bg-[--bg-surface] border border-neutral-100/60',
          'shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 ease-[--ease-default]',
          hoverable && [
            'hover:-translate-y-[6px]',
            'hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)]',
            'cursor-pointer',
          ],
          className,
        )}
        {...props}
      >
        {/* Subtle inner highlight border overlay */}
        <div className="absolute inset-0 pointer-events-none rounded-[24px] border border-white/20 z-10" />

        {/* Premium cursor-tracking lighting layer */}
        {showLighting && (
          <div
            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 opacity-100"
            style={{
              background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(22, 163, 74, 0.06), transparent 80%)`,
            }}
          />
        )}

        <div className="relative z-10 h-full w-full flex flex-col">{children}</div>
      </div>
    );
  },
);

Card.displayName = 'Card';

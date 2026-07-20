import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { clsx } from 'clsx';
import { Skeleton } from './Skeleton';

export interface ProgressiveImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  containerClassName?: string;
}

/**
 * ProgressiveImage - Premium progressive loading of image assets.
 * Spec:
 * - Color-matched blurred placeholder (using image URL with CSS blur)
 * - Glass skeleton layered during load
 * - Smooth fade-in + scale settle
 * - Layout dimension preservation to prevent CLS
 * - Duration: 600ms
 * - Respects prefers-reduced-motion
 */
export function ProgressiveImage({ src, alt, className, containerClassName }: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!src) {
      setCurrentSrc(null);
      setLoaded(false);
      return;
    }

    setLoaded(false);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
      setLoaded(true);
    };
  }, [src]);

  if (!src) {
    return (
      <div className={clsx('flex items-center justify-center bg-neutral-100', containerClassName)}>
        <span className="text-xs text-neutral-400">Tidak ada gambar</span>
      </div>
    );
  }

  return (
    <div className={clsx('relative overflow-hidden w-full h-full select-none', containerClassName)}>
      {/* Blurred Placeholder using the image itself */}
      {!loaded && (
        <div
          className="absolute inset-0 bg-neutral-100 scale-110 blur-2xl transition-opacity duration-500 pointer-events-none"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden="true"
        />
      )}

      {/* Elegant Glass Shimmer Overlay */}
      {!loaded && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
      )}

      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          className={clsx(
            className,
            'w-full h-full object-cover transition-all',
            prefersReducedMotion ? 'duration-0' : 'duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.01]'
          )}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
}

import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { Skeleton } from '@/components/atoms/Skeleton';
import { SpotlightSurface } from '@/components/atoms/SpotlightSurface';
import placeholderCard from '@/assets/images/placeholder-card.svg';

const CARD_SHADOW = '0 2px 8px rgba(15,61,52,0.04), 0 12px 32px rgba(15,61,52,0.08)';
const CARD_SHADOW_HOVER = '0 4px 12px rgba(15,61,52,0.06), 0 20px 48px rgba(15,61,52,0.12)';
const TILT_MAX = 2;

function getCategoryEmoji(slug) {
  switch (slug) {
    case 'pertanian':
      return '🌱';
    case 'peternakan':
      return '🥛';
    case 'wisata':
    case 'wisata-alam':
      return '🏞';
    case 'umkm':
      return '🛍';
    case 'perkebunan':
      return '🌳';
    case 'agroforestri':
      return '🌲';
    case 'budaya':
      return '🎭';
    default:
      return '✦';
  }
}

function CategoryBadge({ label, slug, colorCode }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white transition-transform duration-300 ease-out [@media(hover:hover)]:group-hover:-translate-y-1.5"
      style={{
        background: 'rgba(255,255,255,0.16)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.22)',
      }}
    >
      <span
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: colorCode ?? '#184D47' }}
        aria-hidden="true"
      />
      <span aria-hidden="true">{getCategoryEmoji(slug)}</span>
      {label}
    </span>
  );
}

function GlassReflection({ enabled }) {
  if (!enabled) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[28px]" aria-hidden="true">
      <motion.div
        className="absolute top-0 h-full w-2/5"
        style={{
          background:
            'linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.07) 45%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.07) 55%, transparent 100%)',
        }}
        initial={{ x: '-120%' }}
        animate={{ x: '320%' }}
        transition={{
          duration: 9,
          ease: 'linear',
          repeat: Infinity,
          repeatDelay: 2,
        }}
      />
    </div>
  );
}

function FeaturedPotentialCardContent({ item, variant, stretch }) {
  const aspectClass = variant === 'large' ? 'aspect-[4/3]' : stretch ? 'h-full' : 'aspect-video';
  const cardRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [canHover, setCanHover] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTilting, setIsTilting] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  const resetTilt = useCallback(() => {
    setIsTilting(false);
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  const handleMouseMove = useCallback(
    (event) => {
      if (!canHover || prefersReducedMotion || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      setIsTilting(true);
      setTilt({
        rotateY: Math.max(-TILT_MAX, Math.min(TILT_MAX, x * TILT_MAX * 2)),
        rotateX: Math.max(-TILT_MAX, Math.min(TILT_MAX, -y * TILT_MAX * 2)),
      });
    },
    [canHover, prefersReducedMotion],
  );

  const enableMotion = !prefersReducedMotion;
  const enableTilt = enableMotion && canHover;
  const enableHoverLift = enableMotion && canHover;

  const cardTransform = enableTilt
    ? `perspective(1200px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(${isHovered ? -3 : 0}px) scale(${isHovered ? 1.005 : 1})`
    : enableHoverLift
      ? `translateY(${isHovered ? -3 : 0}px) scale(${isHovered ? 1.005 : 1})`
      : undefined;

  const cardTransition = isTilting
    ? 'box-shadow 300ms ease-out, transform 300ms ease-out'
    : 'transform 300ms ease-out, box-shadow 300ms ease-out';

  return (
    <Link
      to={`/potentials/${item.category.slug}/${item.slug}`}
      className="group block h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[--border-focus] focus-visible:ring-offset-2 rounded-[28px]"
      aria-label={`Lihat detail ${item.title}`}
    >
      <motion.div
        className="h-full"
        whileTap={!canHover && enableMotion ? { scale: 0.98 } : undefined}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2, ease: 'easeOut' }}
      >
        <SpotlightSurface
          as="article"
          innerRef={cardRef}
          onMouseEnter={enableHoverLift ? () => setIsHovered(true) : undefined}
          onMouseLeave={enableTilt ? resetTilt : enableHoverLift ? () => setIsHovered(false) : undefined}
          onMouseMove={enableTilt ? handleMouseMove : undefined}
      className={`relative w-full overflow-hidden rounded-[28px] ${aspectClass}`}
          style={{
            boxShadow: isHovered && enableHoverLift ? CARD_SHADOW_HOVER : CARD_SHADOW,
            border: '1px solid rgba(255,255,255,0.16)',
            background: 'rgba(255,255,255,0.10)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            transform: cardTransform,
            transition: cardTransition,
            transformStyle: enableTilt ? 'preserve-3d' : undefined,
            cursor: canHover ? 'pointer' : undefined,
          }}
          spotlightClassName="opacity-80"
          disabled={!enableMotion}
        >
          <img
            src={item.cover_image_url ?? placeholderCard}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[800ms] ease-out [@media(hover:hover)]:group-hover:scale-[1.015]"
            loading="lazy"
            decoding="async"
          />

          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(8,24,18,0.12) 0%, rgba(8,24,18,0.78) 100%)',
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-transparent transition-colors duration-700 ease-out [@media(hover:hover)]:group-hover:bg-[rgba(8,24,18,0.12)]"
            aria-hidden="true"
          />

          <GlassReflection enabled={enableMotion && !prefersReducedMotion} />

          <div className="absolute top-4 left-4 z-10">
            <CategoryBadge
              label={item.category.label}
              slug={item.category.slug}
              colorCode={item.category.color_code}
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-6">
            <div className="min-w-0 flex-1 space-y-2">
              <h3 className="text-2xl font-bold leading-tight text-white line-clamp-2">
                {item.title}
              </h3>

              {item.location?.address && (
                <div className="flex items-center gap-1.5 text-sm text-white/90">
                  <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="line-clamp-1">{item.location.address}</span>
                </div>
              )}

              {item.short_description && (
                <p className="text-sm leading-relaxed text-white/75 line-clamp-2">
                  {item.short_description}
                </p>
              )}
            </div>

            <motion.span
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white opacity-100 scale-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:scale-[0.9] [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:scale-100"
              style={{
                background: 'rgba(255,255,255,0.16)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.22)',
              }}
              aria-hidden="true"
              animate={isHovered && enableMotion ? { rotate: 15, x: 2, y: -2 } : { rotate: 0, x: 0, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2, ease: 'easeOut' }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.span>
          </div>
        </SpotlightSurface>
      </motion.div>
    </Link>
  );
}

export function FeaturedLargeCard({ item }) {
  return <FeaturedPotentialCardContent item={item} variant="large" />;
}

export function FeaturedSmallCard({ item, stretch }) {
  return <FeaturedPotentialCardContent item={item} variant="small" stretch={stretch} />;
}

function FeaturedCardSkeleton({ variant }) {
  const aspectClass = variant === 'large' ? 'aspect-[4/3]' : 'aspect-video';

  return (
    <div
      className={`relative w-full overflow-hidden rounded-[28px] ${aspectClass}`}
      style={{
        boxShadow: CARD_SHADOW,
        border: '1px solid rgba(255,255,255,0.28)',
        background: 'rgba(255,255,255,0.14)',
      }}
      aria-hidden="true"
    >
      <Skeleton className="absolute inset-0 h-full w-full rounded-[28px]" />

      <div className="absolute inset-x-0 bottom-0 z-10 space-y-3 p-6">
        <Skeleton className="h-7 w-3/4 rounded-lg" />
        <Skeleton className="h-4 w-1/2 rounded-lg" />
        <Skeleton className="h-4 w-full rounded-lg" />
      </div>
    </div>
  );
}

export function FeaturedLargeCardSkeleton() {
  return (
    <div className="h-full" aria-hidden="true">
      <FeaturedCardSkeleton variant="large" />
    </div>
  );
}

export function FeaturedSmallCardSkeleton() {
  return (
    <div className="h-full" aria-hidden="true">
      <FeaturedCardSkeleton variant="small" />
    </div>
  );
}

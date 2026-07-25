import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { getCategoryColor, getCategoryIcon } from './constants';

/**
 * MobileBottomSheet — bottom sheet replacing popup on mobile viewports.
 * Supports swipe-to-dismiss via touch events.
 */
export function MobileBottomSheet({ potential, onClose }) {
  const prefersReducedMotion = useReducedMotion();
  const sheetRef = useRef(null);
  const touchStartY = useRef(0);

  const color = getCategoryColor(potential?.category?.slug);
  const icon = getCategoryIcon(potential?.category?.slug);
  const detailPath = potential
    ? `/potentials/${potential.category?.slug || 'lainnya'}/${potential.slug}`
    : '#';

  useEffect(() => {
    if (!potential) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [potential, onClose]);

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const delta = e.changedTouches[0].clientY - touchStartY.current;
    if (delta > 80) onClose();
  };

  return (
    <AnimatePresence>
      {potential && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-[1000] lg:hidden"
          initial={prefersReducedMotion ? { opacity: 0 } : { y: '100%' }}
          animate={prefersReducedMotion ? { opacity: 1 } : { y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { y: '100%' }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-x-0 -top-[200vh] bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <div
            ref={sheetRef}
            className="relative bg-white rounded-t-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.15)] max-h-[70vh] overflow-y-auto"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-[#D1D9D6]" />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-[#F0F4F2] text-[#4A5C58] hover:bg-[#E0E8E4] transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[#184D47] focus-visible:ring-offset-2"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Image */}
            {potential.cover_image_url && (
              <div className="relative h-44 overflow-hidden">
                <img
                  src={potential.cover_image_url}
                  alt={potential.title}
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 40%)',
                  }}
                />
              </div>
            )}

            {/* Content */}
            <div className="px-5 pb-6 pt-4">
              {/* Category */}
              <span
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-semibold text-white"
                style={{ background: color }}
              >
                {icon} {potential.category?.label || 'Lainnya'}
              </span>

              {/* Title */}
              <h2 className="mt-2 text-[18px] font-bold leading-snug text-[#0F1A18]">
                {potential.title}
              </h2>

              {/* Address */}
              {potential.location?.address && (
                <p className="mt-2 text-[14px] leading-relaxed text-[#6B7B78]">
                  📍 {potential.location.address}
                </p>
              )}

              {/* Description */}
              {potential.short_description && (
                <p className="mt-2 text-[13px] leading-relaxed text-[#8A9C99] line-clamp-2">
                  {potential.short_description}
                </p>
              )}

              {/* CTA */}
              <Link
                to={detailPath}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#184D47] px-5 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#0F3D35] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#184D47] focus-visible:ring-offset-2"
              >
                Lihat Detail
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

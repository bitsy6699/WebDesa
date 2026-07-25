import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const CHAPTERS = [
  { label: 'Welcome', number: '01' },
  { label: 'Nature', number: '02' },
  { label: 'Village Life', number: '03' },
  { label: 'Explore', number: '04' },
  { label: 'Community', number: '05' },
  { label: 'Connect', number: '06' },
];

export function ProgressIndicator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const sections = CHAPTERS.map((_, i) => document.getElementById(`chapter-${i + 1}`)).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target);
            if (idx >= 0) setActiveIndex(idx);
          }
        }
      },
      { threshold: 0.4 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  if (prefersReducedMotion) return null;

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-4 pointer-events-none">
      {CHAPTERS.map((ch, i) => (
        <div
          key={ch.number}
          className="flex items-center gap-3 transition-all duration-500"
          style={{ opacity: i === activeIndex ? 1 : 0.25 }}
        >
          {i === activeIndex && (
            <motion.span
              className="text-xs font-medium text-primary tracking-wider"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {ch.label}
            </motion.span>
          )}
          <div
            className="rounded-full transition-all duration-500"
            style={{
              width: i === activeIndex ? 10 : 6,
              height: i === activeIndex ? 10 : 6,
              backgroundColor: i === activeIndex ? '#184D47' : '#184D47',
              opacity: i === activeIndex ? 1 : 0.3,
            }}
          />
        </div>
      ))}
    </div>
  );
}

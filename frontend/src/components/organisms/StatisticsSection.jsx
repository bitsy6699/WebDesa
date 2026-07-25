import { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { HERO_2 } from '@/lib/imageCompositions';

function AnimatedMetric({ value, label, suffix = '', triggered }) {
  const spring = useSpring(0, { stiffness: 50, damping: 25 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString() + suffix);

  useEffect(() => {
    if (triggered) spring.set(value);
  }, [triggered, value, spring]);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 60, damping: 16 }}
    >
      <motion.span className="block font-heading text-[3rem] sm:text-[3.75rem] lg:text-[4.5rem] font-extrabold text-primary leading-none tracking-[-0.03em]">
        {display}
      </motion.span>
      <span className="block text-sm sm:text-base text-[var(--text-muted)] mt-2 font-medium">{label}</span>
    </motion.div>
  );
}

export function StatisticsSection({ id, summary }) {
  const sectionRef = useRef(null);
  const [triggered, setTriggered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const isLoading = !summary;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  if (isLoading) {
    return (
      <section ref={sectionRef} id={id} className="relative overflow-hidden" style={{ background: 'var(--bg-surface-alt)', paddingTop: 'clamp(80px, 10vw, 120px)', paddingBottom: 'clamp(72px, 8vw, 104px)' }}>
        <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center">
                <div className="h-16 w-32 mx-auto rounded-lg bg-[var(--color-primary)]/5 animate-pulse" />
                <div className="h-4 w-24 mx-auto mt-3 rounded-full bg-[var(--color-primary)]/5 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const metrics = summary ? [
    { value: summary.totalPotentials || 0, label: 'Total Potensi', suffix: '' },
    { value: summary.publishedPotentials || 0, label: 'Potensi Publikasi', suffix: '' },
    { value: summary.totalCategories || 0, label: 'Kategori', suffix: '' },
    { value: summary.totalMedia || 0, label: 'Media Tersimpan', suffix: '' },
  ] : [];

  const hasData = metrics.some((m) => m.value > 0);

  if (!hasData) return null;

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-label="Statistik Desa"
      className="relative overflow-hidden"
      style={{
        background: 'var(--bg-surface-alt)',
        paddingTop: 'clamp(80px, 10vw, 120px)',
        paddingBottom: 'clamp(72px, 8vw, 104px)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `url(${HERO_2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: prefersReducedMotion ? 'scroll' : 'fixed',
          filter: 'blur(40px) saturate(0.3)',
          transform: 'scale(1.15)',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-surface-alt)]/90 via-[var(--bg-surface-alt)]/70 to-[var(--bg-surface-alt)]/90 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Desa dalam Angka
        </motion.p>
        <motion.h2
          className="mt-3 font-heading text-[2rem] font-bold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)] sm:text-[2.5rem] lg:text-[2.75rem]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 70, damping: 14 }}
        >
          Data & Statistik Desa
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12 lg:mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {metrics.map((m) => (
            <AnimatedMetric key={m.label} value={m.value} label={m.label} suffix={m.suffix} triggered={triggered} />
          ))}
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/statistics"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors group"
          >
            Lihat Statistik Lengkap
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

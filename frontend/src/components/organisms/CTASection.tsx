import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BarChart3 } from 'lucide-react';
// glassButtonSubtle removed (not used) — CTASection uses explicit styles

function CTAPrimaryButton({ to, label }: { to: string; label: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="w-full sm:w-auto"
      whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <Link
        to={to}
        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#184D47] shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-shadow duration-250 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#184D47]"
        aria-label={`${label} — buka direktori potensi desa`}
      >
        {label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </motion.div>
  );
}

function CTASecondaryButton({ to, label }: { to: string; label: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="w-full sm:w-auto"
      whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <Link
        to={to}
        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-250 hover:bg-white/[0.12] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#184D47]"
        style={{
          background: 'rgba(255,255,255,0.18)',
          border: '1px solid rgba(255,255,255,0.28)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
        aria-label={`${label} — lihat ringkasan statistik desa`}
      >
        <BarChart3 className="h-4 w-4" aria-hidden="true" />
        {label}
      </Link>
    </motion.div>
  );
}

/**
 * CTASection — Premium closing invitation before the footer.
 *
 * Elegant, minimal banner encouraging visitors to continue exploring
 * the village potential portal.
 */
export function CTASection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative px-4 py-16 sm:py-20 lg:py-[88px]"
      style={{
        background: 'linear-gradient(180deg, #EEF2F0 0%, #F3F7F4 100%)',
      }}
      aria-label="Ajakan jelajahi portal potensi desa"
    >
      <div className="mx-auto max-w-[980px]">
        <motion.div
          className="relative overflow-hidden rounded-[40px] px-6 py-16 text-center sm:px-10 sm:py-18 lg:px-16 lg:py-20"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 50 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #184D47 0%, #20564F 45%, #0F3D34 75%, #184D47 100%)',
              backgroundSize: '200% 200%',
            }}
            animate={
              prefersReducedMotion
                ? undefined
                : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 18, repeat: Infinity, ease: 'linear' }
            }
            aria-hidden="true"
          />

          {/* Subtle radial lights */}
          <div
            className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-20 -right-12 h-72 w-72 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          {/* Thin grid overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
            aria-hidden="true"
          />

          {/* Soft glow blur circles */}
          <div
            className="pointer-events-none absolute left-1/4 top-1/3 h-40 w-40 rounded-full blur-3xl"
            style={{ background: 'rgba(255,255,255,0.05)' }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute bottom-1/4 right-1/4 h-32 w-32 rounded-full blur-2xl"
            style={{ background: 'rgba(32,86,79,0.12)' }}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 mx-auto flex max-w-[640px] flex-col items-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/75">
              Portal Potensi Desa
            </p>

            <h2 className="mt-5 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              Tertarik Mengenal Potensi Desa Karamatwangi Lebih Dekat?
            </h2>

            <p className="mt-5 max-w-[620px] text-[15px] leading-[170%] text-white/[0.82]">
              Jelajahi seluruh potensi desa, mulai dari pertanian, peternakan, produk lokal hingga
              wisata yang dikelola dan dipublikasikan langsung oleh Pemerintah Desa Karamatwangi.
            </p>

            <div className="mt-8 flex w-full max-w-lg flex-col items-stretch justify-center gap-4 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center">
              <CTAPrimaryButton to="/potentials" label="Jelajahi Semua Potensi" />
              <CTASecondaryButton to="/statistics" label="Lihat Statistik" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

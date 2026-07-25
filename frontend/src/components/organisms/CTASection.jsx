import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BarChart3 } from 'lucide-react';
import { HERO_1 } from '@/lib/imageCompositions';
import { FloatingParticle } from '@/lib/atmosphere';

export function CTASection({ id }) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 1.08]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.3, 0.5, 0.4, 0.3]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative overflow-hidden"
      style={{
        background: 'var(--color-primary)',
        paddingTop: 'clamp(80px, 10vw, 120px)',
        paddingBottom: 'clamp(72px, 8vw, 104px)',
      }}
      aria-label="Ajakan jelajahi portal potensi desa"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `url(${HERO_1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          scale: bgScale,
          opacity: bgOpacity,
          filter: 'blur(4px)',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-[var(--color-primary)]/70 to-[var(--color-primary)]/90 pointer-events-none" aria-hidden="true" />

      <FloatingParticle count={6} baseColor="rgba(255,255,255,0.08)" speed={0.6} />

      <div className="relative z-10 mx-auto max-w-[980px] px-4">
        <div className="relative overflow-hidden rounded-[40px] px-6 py-16 text-center sm:px-10 sm:py-18 lg:px-16 lg:py-20">
          <div className="relative z-10 mx-auto flex max-w-[640px] flex-col items-center">
            <motion.p
              className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/75"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Portal Potensi Desa
            </motion.p>

            <motion.h2
              className="mt-5 font-heading text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 70, damping: 14 }}
            >
              Sudah Siap Menjelajah?
            </motion.h2>

            <motion.p
              className="mt-5 max-w-[620px] text-[15px] leading-[170%] text-white/[0.82]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Potensi desa menunggu untuk ditemukan. Mulai dari kebun teh yang hijau hingga UMKM lokal yang menggerakkan perekonomian — setiap sudut Karamatwangi punya cerita.
            </motion.p>

            <motion.div
              className="mt-8 flex w-full max-w-lg flex-col items-stretch justify-center gap-4 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/potentials"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-[0_4px_12px_rgba(15,61,52,0.08),0_8px_24px_rgba(15,61,52,0.12)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                aria-label="Jelajahi Semua Potensi — buka direktori potensi desa"
              >
                Jelajahi Semua Potensi
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                to="/map"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 hover:bg-white/[0.12] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                style={{
                  background: 'rgba(255,255,255,0.18)',
                  border: '1px solid rgba(255,255,255,0.28)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
                aria-label="Buka Peta Desa — buka peta interaktif desa"
              >
                <BarChart3 className="h-4 w-4" aria-hidden="true" />
                Buka Peta Desa
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

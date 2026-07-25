import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { LazyImage } from '@/components/molecules/LazyImage';
import { LeafFloat } from '@/lib/atmosphere';
import { HERO_2 } from '@/lib/imageCompositions';

function AnimatedCounter({ value, label, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const springValue = useSpring(0, { stiffness: 60, damping: 20 });

  const display = useTransform(springValue, (v) => Math.round(v).toLocaleString() + suffix);

  if (isInView) springValue.set(value);

  return (
    <div ref={ref}>
      <motion.span className="block font-heading text-[2.5rem] sm:text-[3rem] font-extrabold text-primary tracking-[-0.03em] leading-none">
        {display}
      </motion.span>
      <span className="text-sm text-[var(--text-muted)] mt-1 block">{label}</span>
    </div>
  );
}

const sectionReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const childUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 16 } },
};

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const imageReveal = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  const imageInView = useInView(imageRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="chapter-2"
      className="relative overflow-hidden"
      style={{
        background: 'var(--bg-page)',
        paddingTop: 'clamp(80px, 10vw, 120px)',
        paddingBottom: 'clamp(72px, 8vw, 104px)',
      }}
      aria-label="Tentang Desa Karamatwangi"
    >
      <LeafFloat count={2} color="#6FAE8F" />

      <div className="container relative z-10 mx-auto max-w-[1120px] px-5 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-[680px] text-center"
          variants={sectionReveal}
          initial="hidden"
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p variants={childUp} className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
            Bab 02 — Alam
          </motion.p>
          <motion.h2 variants={childUp} className="mt-3 font-heading text-[2rem] font-bold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)] sm:text-[2.5rem] lg:text-[2.75rem]">
            Dikelilingi oleh Hijau
          </motion.h2>
        </motion.div>

        <div className="mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-7 relative">
            <div
              ref={imageRef}
              className="relative overflow-hidden rounded-3xl shadow-[0_2px_8px_rgba(15,61,52,0.04),0_8px_24px_rgba(15,61,52,0.06)]"
              style={{ aspectRatio: '4 / 3' }}
            >
              <motion.div
                style={{
                  clipPath: imageInView || prefersReducedMotion
                    ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                    : 'polygon(0 0, 0 0, 0 100%, 0 100%)',
                }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                className="w-full h-full"
              >
                <LazyImage
                  src={HERO_2}
                  alt="Pemandangan Desa Karamatwangi — hamparan hijau dataran tinggi Garut"
                  width="800"
                  height="600"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </motion.div>

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(24,77,71,0.15) 0%, transparent 50%)',
                }}
              />
            </div>
          </div>

          <div className="lg:col-span-5 lg:pl-2">
            <motion.div
              variants={sectionReveal}
              initial="hidden"
              whileInView={prefersReducedMotion ? undefined : 'visible'}
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col gap-6"
            >
              <motion.div variants={childUp} className="space-y-5">
                <p className="text-[16px] leading-[1.8] text-[var(--text-body)]">
                  Dikelilingi oleh hamparan hijau perkebunan teh dan sawah berundak, Desa Karamatwangi menawarkan ketenangan yang semakin langka di tengah hiruk-pikuk kota.
                </p>

                <div className="border-l-2 border-primary/30 pl-5 py-2">
                  <p className="font-heading text-xl italic text-primary leading-relaxed">
                    "Di sinilah alam dan manusia hidup berdampingan."
                  </p>
                </div>

                <p className="text-[15px] leading-[1.8] text-[var(--text-muted)]">
                  Setiap sudut desa menyimpan cerita — dari petani yang membudidayakan sayuran dataran tinggi, hingga pengrajin yang melestarikan tradisi lokal.
                </p>
              </motion.div>

              <motion.div variants={childUp}>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-6 py-3 text-sm font-semibold text-primary-dark transition-all duration-200 hover:-translate-y-[1px] hover:bg-primary/5 hover:shadow-[0_8px_24px_rgba(24,77,71,0.10)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  Selengkapnya Tentang Desa
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="mt-16 lg:mt-24">
          <div className="border-t border-neutral-200/60 pt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)] mb-8 text-center">
              Desa dalam Angka
            </p>
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
              variants={sectionReveal}
              initial="hidden"
              whileInView={prefersReducedMotion ? undefined : 'visible'}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div variants={childUp}>
                <AnimatedCounter value={8500} suffix="+" label="Penduduk" />
              </motion.div>
              <motion.div variants={childUp}>
                <AnimatedCounter value={1200} suffix="+" label="Hektar Lahan" />
              </motion.div>
              <motion.div variants={childUp}>
                <AnimatedCounter value={200} suffix="+" label="UMKM Aktif" />
              </motion.div>
              <motion.div variants={childUp}>
                <AnimatedCounter value={7} suffix=" " label="Dusun" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

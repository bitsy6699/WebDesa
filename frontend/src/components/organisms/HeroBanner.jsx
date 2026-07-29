import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Map } from 'lucide-react';
import { MagneticButton } from '@/components/atoms/MagneticButton';
import { HERO_1 } from '@/lib/imageCompositions';

const TITLE_LINE_1 = 'Desa';
const TITLE_LINE_2 = 'Karamatwangi';

const stag = (i) => ({
  hidden: { opacity: 0, y: 40, rotateX: 6 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.3 + i * 0.12,
      type: 'spring',
      stiffness: 70,
      damping: 16,
      mass: 0.9,
    },
  },
});

const breathe = {
  animate: {
    scale: [1, 1.03, 1],
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
  },
};

export function HeroBanner({ title, description, image }) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const { scrollY } = useScroll({ target: sectionRef });
  const bgY = useTransform(scrollY, [0, 800], [0, prefersReducedMotion ? 0 : 50]);
  const contentY = useTransform(scrollY, [0, 700], [0, prefersReducedMotion ? 0 : -60]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, prefersReducedMotion ? 1 : 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: '100dvh', backgroundColor: 'var(--color-primary-dark)' }}
      aria-labelledby="hero-title"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
        aria-hidden="true"
        variants={prefersReducedMotion ? undefined : breathe}
        animate="animate"
      >
        <div className="absolute inset-0">
          <img
            src={image || HERO_1}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 30%' }}
            loading="eager"
            fetchPriority="high"
          />
        </div>

        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(15,61,52,0.75) 0%, rgba(15,61,52,0.45) 35%, rgba(15,61,52,0.15) 65%, rgba(15,61,52,0.6) 100%)',
          }}
        />

        <div
          className="absolute inset-0 hidden sm:block"
          style={{
            background: 'linear-gradient(90deg, rgba(15,61,52,0.4) 0%, transparent 50%)',
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 40%, rgba(15,61,52,0.35) 100%)',
          }}
        />
      </motion.div>
      <motion.div
        className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12"
        style={{
          paddingTop: 'clamp(120px, 14vh, 180px)',
          paddingBottom: 'clamp(4rem, 8vh, 7rem)',
          y: contentY,
          opacity: contentOpacity,
        }}
      >
        <div className="max-w-[720px] flex flex-col items-start text-left">
          <motion.div
            className="flex items-center gap-2 mb-5"
            style={{ color: 'rgba(255,255,255,0.65)' }}
            variants={stag(0)}
            initial="hidden"
            animate="visible"
          >
            <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: '#A7C957' }} aria-hidden="true" />
            <span className="text-xs sm:text-sm font-medium tracking-[0.04em] uppercase">
              Kec. Cikajang &bull; Kab. Garut &bull; Jawa Barat
            </span>
          </motion.div>

          <h1 id="hero-title" className="sr-only">
            {title || 'Desa Karamatwangi'}
          </h1>
          <div aria-hidden="true" className="overflow-hidden">
            <motion.span
              className="block font-heading font-extrabold text-white leading-[1.02] tracking-[-0.035em]"
              style={{ fontSize: 'clamp(2.75rem, 7vw, 5rem)' }}
              variants={stag(1)}
              initial="hidden"
              animate="visible"
            >
              {(title || TITLE_LINE_1).split(' ').map((word, wi) => (
                <span key={wi} className="inline-block mr-[0.1em]">{word}</span>
              ))}
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              className="block font-heading font-extrabold text-white leading-[1.02] tracking-[-0.035em]"
              style={{ fontSize: 'clamp(2.75rem, 7vw, 5rem)' }}
              variants={stag(2)}
              initial="hidden"
              animate="visible"
            >
              {(title ? '' : TITLE_LINE_2).split(' ').map((word, wi) => (
                <span key={wi} className="inline-block mr-[0.1em]">{word}</span>
              ))}
            </motion.span>
          </div>

          <motion.p
            className="mt-6 max-w-[540px] text-[17px] sm:text-[19px] font-normal leading-[1.8] text-white/82"
            variants={stag(3)}
            initial="hidden"
            animate="visible"
          >
            {description ??
              'Selamat datang di portal digital Desa Karamatwangi. Jelajahi keindahan alam, potensi pertanian, UMKM lokal, dan destinasi wisata yang tersembunyi di dataran tinggi Garut.'}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto"
            variants={stag(4)}
            initial="hidden"
            animate="visible"
          >
            <MagneticButton as={Link} to="/map" strength={0.2}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 font-semibold transition-all duration-200 text-white/90 hover:text-white rounded-full h-12 px-7 text-[15px] border border-white/20 hover:border-white/35 bg-white/8 hover:bg-white/16 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <Map className="w-4 h-4" aria-hidden="true" />
              Lihat Peta
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      <div
        className="absolute bottom-0 left-0 right-0 z-10 h-16 sm:h-24 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(to top, var(--bg-page) 0%, transparent 100%)',
          maskImage: 'linear-gradient(to top, var(--bg-page) 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, var(--bg-page) 0%, transparent 100%)',
        }}
      />
    </section>
  );
}

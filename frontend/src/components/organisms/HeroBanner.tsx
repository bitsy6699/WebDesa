import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Map, Compass, Search } from 'lucide-react';
import { glassSurface } from '@/lib/glassStyles';
import type { FormEvent } from 'react';

export interface HeroBannerProps {
  /** Optional override — defaults to "Portal Potensi Desa Karamatwangi" */
  title?: string;
  /** Optional description override */
  description?: string;
  /** Path to hero background image */
  image: string;
}

/**
 * HeroBanner — Phase 13H final visual redesign.
 * Fully aligned with premium government portal design.
 */
export function HeroBanner({ title, description, image }: HeroBannerProps) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const prefersReducedMotion = useReducedMotion();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = searchValue.trim();
    navigate(q ? `/potentials?search=${encodeURIComponent(q)}` : '/potentials');
  };

  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: 'clamp(720px, 90vh, 860px)', backgroundColor: '#0F3D34' }}
      aria-labelledby="hero-title"
    >
      {/* ── Background image ────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <motion.img
          src={image}
          alt=""
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          style={{ objectPosition: 'center 30%' }}
          initial={false}
          animate={prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.04] }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 19, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
        {/* Spec overlay: top: rgba(15,61,52,0.82), middle: rgba(24,77,71,0.58), bottom: transparent */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: [0.96, 1] }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 18, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          style={{
            background:
              'linear-gradient(180deg, rgba(15,61,52,0.82) 0%, rgba(24,77,71,0.58) 50%, rgba(248,250,248,0) 100%)',
          }}
        />
        {/* Subtle left-side shadow gradient to anchor the text */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: [0.95, 1] }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 20, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          style={{
            background:
              'linear-gradient(90deg, rgba(15,61,52,0.4) 0%, rgba(15,61,52,0) 100%)',
          }}
        />
      </div>

      {/* ── Content — pt-[88px] clears the fixed navbar ─────────────── */}
      <div
        className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8"
        style={{ paddingTop: 'clamp(112px, 12vw, 156px)', paddingBottom: 'clamp(4rem, 6vw, 6rem)' }}
      >
        <div className="max-w-[760px] flex flex-col items-start text-left">
          {/* Location line */}
          <div
            className="flex items-center gap-2 mb-4"
            style={{ color: 'rgba(255,255,255,0.75)' }}
          >
            <MapPin className="w-3.5 h-3.5 shrink-0 text-[#F59E0B]" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-medium tracking-wide">
              Desa Karamatwangi &bull; Kec. Cikajang &bull; Kab. Garut &bull; Jawa Barat
            </span>
          </div>

          {/* Main heading — Playfair Display Serif */}
          <h1
            id="hero-title"
            className="text-white font-serif font-bold text-[40px] sm:text-[56px] lg:text-[72px] leading-[1.05] tracking-[-0.03em] drop-shadow-sm"
          >
            {title ? (
              title
            ) : (
              <>
                Portal Potensi Desa<br />
                Karamatwangi
              </>
            )}
          </h1>

          {/* Description */}
          <p
            className="mt-6 max-w-[680px] text-[18px] font-normal leading-[1.8] text-white/90 drop-shadow-sm"
          >
            {description ?? (
              'Desa Karamatwangi merupakan kawasan pertanian dataran tinggi di Kecamatan Cikajang, Kabupaten Garut, yang dikenal melalui perkebunan teh, peternakan sapi perah, komoditas sayuran, serta potensi wisata alam yang terus berkembang. Portal ini menjadi pintu masuk untuk menjelajahi seluruh potensi unggulan desa secara digital.'
            )}
          </p>

          {/* Search bar — Glassmorphism */}
          <form
            onSubmit={handleSearch}
            role="search"
            aria-label="Cari potensi desa"
            className="mt-8 w-full flex items-center rounded-full overflow-hidden shadow-sm transition-all duration-300"
            style={{
              ...glassSurface,
              maxWidth: '560px',
              height: '60px',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.22), 0 10px 30px rgba(15,61,52,0.12)',
            }}
          >
            <Search
              className="w-5 h-5 shrink-0 ml-5 text-white/80"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Cari potensi desa, wisata, produk, atau lokasi..."
              aria-label="Kata kunci pencarian"
              className="flex-1 h-full px-4 text-white text-sm bg-transparent outline-none placeholder:text-white/72"
            />
            <button
              type="submit"
              className="m-1.5 px-6 h-[48px] rounded-full text-sm font-semibold text-white bg-[#184D47] hover:bg-[#0F3D34] shrink-0 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              Cari
            </button>
          </form>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/potentials" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-white bg-[#184D47] hover:bg-[#0F3D34] rounded-full h-11 px-6 text-sm shadow-sm"
              >
                <Compass className="w-4 h-4" aria-hidden="true" />
                Jelajahi Potensi
              </button>
            </Link>
            <Link to="/map" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-white rounded-full h-11 px-6 text-sm border border-white/20 shadow-sm"
                style={{ backgroundColor: 'rgba(255,255,255,0.14)' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.22)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.14)')}
              >
                <Map className="w-4 h-4" aria-hidden="true" />
                Lihat Peta
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom transition naturally into #F8FAF8 */}
      <div
        className="absolute bottom-0 inset-x-0 h-28 z-10 pointer-events-none"
        aria-hidden="true"
        style={{ background: 'linear-gradient(to bottom, transparent, #F8FAF8)' }}
      />
    </section>
  );
}

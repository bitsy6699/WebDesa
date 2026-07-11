import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Map, Compass, Search } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import type { ReactNode, FormEvent } from 'react';

export interface HeroBannerProps {
  title?: string;
  description?: string;
  image: string;
  /** Statistics card rendered floating on the right side (desktop) */
  statisticsSlot?: ReactNode;
}

/**
 * HeroBanner — Phase 13F redesign (matches approved mockup).
 *
 * Layout: left-aligned, 55/45 split.
 * Left: location badge, Playfair title, description, inline search, 2 CTA buttons.
 * Right: glassmorphism statistics card.
 *
 * NO category chips. NO filter pills. Hero is clean per spec.
 *
 * @see docs/mockups/landing-page-references.png — single source of truth
 * @see docs/design/UI_UX_SPEC.md §5 Hero Section
 */
export function HeroBanner({ title, description, image, statisticsSlot }: HeroBannerProps) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = searchValue.trim();
    navigate(q ? `/potentials?search=${encodeURIComponent(q)}` : '/potentials');
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: 'clamp(760px, 92vh, 920px)', backgroundColor: '#071A16' }}
      aria-labelledby="hero-title"
    >
      {/* ── Background ──────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        {/* Primary gradient overlay: top→bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(7,36,32,0.35) 0%, rgba(7,36,32,0.55) 55%, rgba(7,36,32,0.72) 100%)',
          }}
        />
        {/* Left-side gradient for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(7,36,32,0.65) 0%, rgba(7,36,32,0.20) 52%, rgba(7,36,32,0.02) 100%)',
          }}
        />
      </div>

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center pt-[88px] pb-24 lg:pb-32">
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-10">

          {/* ── Left column (55%) ─────────────────────────────────── */}
          <div className="flex-1 lg:max-w-[55%] flex flex-col items-start text-left">

            {/* Location badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 mb-5"
              style={{ backgroundColor: 'rgba(255,255,255,0.10)' }}
            >
              <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: '#F5C158' }} aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: '#F5C158' }}>
                Selamat Datang di
              </span>
            </div>

            {/* Main heading — Playfair Display */}
            <h1
              id="hero-title"
              className="text-white drop-shadow-lg leading-[1.02]"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
              }}
            >
              {title ?? 'Desa Karamatwangi'}
            </h1>

            {/* Sub-location line */}
            <p
              className="mt-3 font-medium tracking-wide"
              style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)' }}
            >
              Kecamatan Cikajang &nbsp;&bull;&nbsp; Kabupaten Garut &nbsp;&bull;&nbsp; Provinsi Jawa Barat
            </p>

            {/* Description */}
            <p
              className="mt-5 leading-relaxed max-w-[500px]"
              style={{ color: 'rgba(255,255,255,0.78)', fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)' }}
            >
              {description ??
                'Portal digital yang menampilkan seluruh potensi unggulan Desa Karamatwangi, mulai dari wisata, UMKM, pertanian, peternakan, budaya, hingga berbagai informasi desa.'}
            </p>

            {/* Inline search bar */}
            <form
              onSubmit={handleSearch}
              role="search"
              aria-label="Cari potensi desa"
              className="mt-8 w-full max-w-[560px] flex items-center rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.22)] overflow-hidden"
              style={{ backgroundColor: 'rgba(255,255,255,0.96)' }}
            >
              <Search className="w-5 h-5 text-[#9CA3AF] ml-5 shrink-0" aria-hidden="true" />
              <input
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Cari potensi desa, wisata, produk, atau lokasi..."
                aria-label="Kata kunci pencarian"
                className="flex-1 py-4 px-4 text-[#1F2937] text-sm bg-transparent outline-none placeholder:text-[#9CA3AF]"
              />
              <button
                type="submit"
                className="m-1.5 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F855A]/60 shrink-0"
                style={{ backgroundColor: '#2F855A' }}
              >
                Cari
              </button>
            </form>

            {/* CTA buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link to="/potentials">
                <Button
                  variant="primary"
                  size="lg"
                  className="gap-2 rounded-full font-semibold w-full sm:w-auto"
                  style={{ backgroundColor: '#2F855A', borderColor: '#2F855A' }}
                >
                  <Compass className="w-4 h-4" aria-hidden="true" />
                  Jelajahi Potensi Desa
                </Button>
              </Link>
              <Link to="/map">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 rounded-full font-semibold w-full sm:w-auto border-white/50 text-white hover:bg-white/15 hover:border-white hover:text-white"
                >
                  <Map className="w-4 h-4" aria-hidden="true" />
                  Lihat Peta Desa
                </Button>
              </Link>
            </div>

          </div>

          {/* ── Right column (45%) — Statistics Card ──────────────── */}
          {statisticsSlot && (
            <div className="w-full lg:max-w-[42%] flex justify-center lg:justify-end mt-4 lg:mt-0">
              {statisticsSlot}
            </div>
          )}

        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 inset-x-0 h-16 z-10 pointer-events-none"
        aria-hidden="true"
        style={{ background: 'linear-gradient(to bottom, transparent, #F8F9FA)' }}
      />
    </section>
  );
}

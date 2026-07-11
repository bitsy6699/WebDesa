import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Map, Compass, Search } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import type { ReactNode, FormEvent } from 'react';

export interface HeroBannerProps {
  /** Optional override — defaults to two-line "Portal Potensi Desa / Karamatwangi" */
  title?: string;
  /** Optional description override */
  description?: string;
  /** Path to hero background image */
  image: string;
  /** Glassmorphism statistics card rendered on the right (desktop) */
  statisticsSlot?: ReactNode;
}

/**
 * HeroBanner — Phase 13F final implementation.
 *
 * Visual spec:
 * - Full-bleed background image with overlay
 * - Fixed navbar merges with hero (no white gap)
 * - Hero content starts at top-0 and has pt-[88px] to clear the fixed navbar
 * - Left column: badge, title (two-line), location, description, search, CTAs
 * - Right column: glassmorphism statistics card
 * - NO category chips, tags, or UMKM marketing text
 *
 * Overlay: linear-gradient(rgba(7,36,32,.72), rgba(7,36,32,.45), rgba(7,36,32,.62))
 * Min-height: 760px
 *
 * @see docs/mockups/landing-page-references.png
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
      style={{ minHeight: '760px', backgroundColor: '#071A16' }}
      aria-labelledby="hero-title"
    >
      {/* ── Background image ────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          style={{ objectPosition: 'center 30%' }}
        />
        {/* Spec overlay: linear-gradient(rgba(7,36,32,.72), rgba(7,36,32,.45), rgba(7,36,32,.62)) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(7,36,32,0.72) 0%, rgba(7,36,32,0.45) 45%, rgba(7,36,32,0.62) 100%)',
          }}
        />
        {/* Extra left-side gradient for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(7,36,32,0.55) 0%, rgba(7,36,32,0.15) 55%, rgba(7,36,32,0) 100%)',
          }}
        />
      </div>

      {/* ── Content — pt-[88px] clears the fixed navbar ─────────────── */}
      <div
        className="relative z-10 container mx-auto px-4 flex items-center"
        style={{ minHeight: '760px', paddingTop: '88px', paddingBottom: '5rem' }}
      >
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-12">

          {/* ── Left column ────────────────────────────────────────── */}
          <div className="flex-1 lg:max-w-[56%] flex flex-col items-start text-left">

            {/* Welcome badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 mb-5"
              style={{ backgroundColor: 'rgba(255,255,255,0.10)' }}
            >
              <span
                className="text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ color: '#F5C158' }}
              >
                SELAMAT DATANG DI
              </span>
            </div>

            {/* Main heading — two lines, Playfair Display */}
            <h1
              id="hero-title"
              className="text-white drop-shadow-md"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
              }}
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

            {/* Location line */}
            <div
              className="mt-4 flex items-center gap-2"
              style={{ color: 'rgba(255,255,255,0.70)' }}
            >
              <MapPin className="w-3.5 h-3.5 shrink-0 text-[#F5C158]" aria-hidden="true" />
              <span style={{ fontSize: 'clamp(0.78rem, 1vw, 0.9rem)', fontWeight: 500 }}>
                Desa Karamatwangi &bull; Kec. Cikajang &bull; Kab. Garut &bull; Provinsi Jawa Barat
              </span>
            </div>

            {/* Description */}
            <p
              className="mt-6 leading-relaxed"
              style={{
                color: 'rgba(255,255,255,0.80)',
                fontSize: 'clamp(0.92rem, 1.3vw, 1.05rem)',
                maxWidth: '520px',
              }}
            >
              {description ?? (
                'Desa Karamatwangi merupakan kawasan pertanian dataran tinggi di Kecamatan Cikajang, Kabupaten Garut, yang dikenal melalui perkebunan teh, peternakan sapi perah, komoditas sayuran, serta potensi wisata alam yang terus berkembang. Portal ini menjadi pintu masuk untuk menjelajahi seluruh potensi unggulan desa secara digital.'
              )}
            </p>

            {/* Search bar */}
            <form
              onSubmit={handleSearch}
              role="search"
              aria-label="Cari potensi desa"
              className="mt-8 w-full flex items-center rounded-full overflow-hidden"
              style={{
                maxWidth: '560px',
                backgroundColor: 'rgba(255,255,255,0.97)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.22)',
              }}
            >
              <Search
                className="w-5 h-5 shrink-0 ml-5"
                style={{ color: '#9CA3AF' }}
                aria-hidden="true"
              />
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
                className="m-1.5 px-6 py-3.5 rounded-full text-sm font-semibold text-white shrink-0 transition-all duration-200 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F855A]/60"
                style={{ backgroundColor: '#1a5c38' }}
              >
                Cari
              </button>
            </form>

            {/* CTA buttons */}
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <Link to="/potentials">
                <Button
                  variant="primary"
                  size="lg"
                  className="gap-2 rounded-full font-semibold w-full sm:w-auto"
                  style={{ backgroundColor: '#1a5c38', borderColor: '#1a5c38' }}
                >
                  <Compass className="w-4 h-4" aria-hidden="true" />
                  Jelajahi Potensi
                </Button>
              </Link>
              <Link to="/map">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 rounded-full font-semibold w-full sm:w-auto border-white/45 text-white hover:bg-white/15 hover:border-white hover:text-white"
                >
                  <Map className="w-4 h-4" aria-hidden="true" />
                  Lihat Peta
                </Button>
              </Link>
            </div>

          </div>

          {/* ── Right column — Statistics Card ─────────────────────── */}
          {statisticsSlot && (
            <div className="w-full lg:max-w-[41%] flex justify-center lg:justify-end mt-4 lg:mt-0">
              {statisticsSlot}
            </div>
          )}

        </div>
      </div>

      {/* Bottom transition into next section */}
      <div
        className="absolute bottom-0 inset-x-0 h-20 z-10 pointer-events-none"
        aria-hidden="true"
        style={{ background: 'linear-gradient(to bottom, transparent, #F8F9FA)' }}
      />
    </section>
  );
}

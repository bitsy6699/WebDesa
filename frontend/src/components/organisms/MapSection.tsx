import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, ExternalLink } from 'lucide-react';
import { usePotentials } from '@/hooks/usePotentials';
import { Button } from '@/components/atoms/Button';
import { Skeleton } from '@/components/atoms/Skeleton';
import type { PotentialListItem } from '@/types/Potential';
import placeholderCard from '@/assets/images/placeholder-card.svg';

/** Fallback marker colors when category has no color_code */
const FALLBACK_COLORS = ['#16a34a', '#D97706', '#3B82F6', '#8B5CF6', '#EF4444', '#F59E0B'];

/** Static marker positions on the SVG canvas (percentages of 100×100 viewBox) */
const MARKER_POSITIONS = [
  { x: 22, y: 28 },
  { x: 45, y: 35 },
  { x: 62, y: 48 },
  { x: 30, y: 58 },
  { x: 72, y: 25 },
  { x: 55, y: 68 },
  { x: 18, y: 72 },
  { x: 80, y: 60 },
  { x: 40, y: 75 },
];

/** Floating potential preview card (bottom-right of the map) */
function FloatingPreviewCard({ potential, isLoading }: { potential?: PotentialListItem; isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="absolute bottom-4 right-4 w-60 bg-white rounded-2xl shadow-xl p-4 z-10">
        <Skeleton className="h-20 w-full rounded-xl mb-3" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-full mb-1" />
        <Skeleton className="h-3 w-2/3 mb-3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    );
  }

  if (!potential) return null;

  return (
    <div className="absolute bottom-4 right-4 w-60 bg-white rounded-2xl shadow-xl p-4 z-10 border border-[#E5E7EB]">
      {/* Cover image */}
      <div className="relative w-full h-20 rounded-xl overflow-hidden bg-[#F3F4F6] mb-3">
        <img
          src={potential.cover_image_url ?? placeholderCard}
          alt={potential.title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        {/* Category badge */}
        <span
          className="absolute top-2 left-2 text-[10px] font-semibold text-white px-2 py-0.5 rounded-full"
          style={{ backgroundColor: potential.category.color_code ?? '#16a34a' }}
        >
          {potential.category.label}
        </span>
      </div>

      {/* Title */}
      <p className="text-sm font-semibold text-[#1F2937] line-clamp-1 mb-1">
        {potential.title}
      </p>

      {/* Short description */}
      <p className="text-[11px] text-[#6B7280] line-clamp-2 leading-relaxed mb-3">
        {potential.short_description}
      </p>

      {/* CTA link */}
      <Link
        to={`/potentials/${potential.category.slug}/${potential.slug}`}
        className="inline-flex items-center gap-1 text-xs font-semibold text-[#2F855A] hover:text-[#0B3C35] transition-colors"
      >
        Lihat Detail
        <ExternalLink className="w-3 h-3" aria-hidden="true" />
      </Link>
    </div>
  );
}

/** Premium SVG-based isometric village map illustration */
function StaticVillageMap({ markers }: { markers: Array<{ x: number; y: number; color: string }> }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Background gradient */}
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0B3C35" />
          <stop offset="60%" stopColor="#1a6b4a" />
          <stop offset="100%" stopColor="#145a3e" />
        </linearGradient>
        {/* Field gradient */}
        <linearGradient id="fieldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2d8c5e" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#1d6644" stopOpacity="0.3" />
        </linearGradient>
        {/* Water gradient */}
        <linearGradient id="waterGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e6e8f" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#1a5c7a" stopOpacity="0.5" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Background */}
      <rect width="100" height="100" fill="url(#bgGrad)" />

      {/* Grid lines for depth (subtle) */}
      {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((v) => (
        <g key={v} opacity="0.07">
          <line x1={v} y1="0" x2={v} y2="100" stroke="white" strokeWidth="0.2" />
          <line x1="0" y1={v} x2="100" y2={v} stroke="white" strokeWidth="0.2" />
        </g>
      ))}

      {/* Terrain — rice fields (light green patches) */}
      <rect x="5" y="15" width="30" height="20" rx="1" fill="url(#fieldGrad)" />
      <rect x="12" y="17" width="10" height="16" fill="#2f9f68" fillOpacity="0.25" />
      <rect x="24" y="17" width="8" height="16" fill="#2f9f68" fillOpacity="0.15" />
      <rect x="60" y="55" width="25" height="18" rx="1" fill="url(#fieldGrad)" />
      <rect x="62" y="57" width="9" height="14" fill="#2f9f68" fillOpacity="0.2" />
      <rect x="73" y="57" width="9" height="14" fill="#2f9f68" fillOpacity="0.15" />

      {/* Terrain — additional green areas */}
      <rect x="40" y="8" width="18" height="14" rx="2" fill="#276b46" fillOpacity="0.5" />
      <rect x="6" y="62" width="22" height="16" rx="1.5" fill="#276b46" fillOpacity="0.4" />

      {/* River / water body */}
      <path
        d="M 0 52 Q 15 48 28 50 Q 40 52 55 50 Q 68 48 80 52 Q 90 55 100 50"
        stroke="url(#waterGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round"
      />
      <path
        d="M 0 53 Q 15 50 28 51.5 Q 40 53 55 51.5 Q 68 50 80 53 Q 90 56 100 51"
        stroke="#1e7a9f" strokeWidth="0.8" fill="none" strokeOpacity="0.4"
      />

      {/* Road network */}
      <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.7" strokeOpacity="0.15" />
      <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.7" strokeOpacity="0.12" />
      <path d="M 10 10 L 35 35 L 65 65 L 90 90" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" fill="none" />
      <path d="M 5 88 Q 30 70 50 50 Q 70 30 95 12" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" fill="none" />

      {/* Building clusters */}
      {/* Village center */}
      <rect x="46" y="44" width="8" height="6" rx="0.5" fill="#e8d5a3" fillOpacity="0.6" />
      <rect x="47" y="42" width="6" height="3" rx="0.3" fill="#c4a965" fillOpacity="0.5" />
      {/* Small houses scattered */}
      {[
        { x: 20, y: 30 }, { x: 25, y: 25 }, { x: 70, y: 32 }, { x: 75, y: 38 },
        { x: 33, y: 62 }, { x: 60, y: 72 }, { x: 15, y: 55 }, { x: 82, y: 68 },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={3.5} height={2.5} rx="0.3" fill="#e8d5a3" fillOpacity="0.5" />
          <polygon points={`${b.x - 0.5},${b.y} ${b.x + 1.75},${b.y - 2} ${b.x + 4},${b.y}`} fill="#c4973d" fillOpacity="0.45" />
        </g>
      ))}

      {/* Tree clusters */}
      {[
        { x: 8, y: 40 }, { x: 88, y: 20 }, { x: 15, y: 80 }, { x: 85, y: 80 }, { x: 50, y: 20 },
      ].map((t, i) => (
        <g key={i} filter="url(#shadow)">
          <circle cx={t.x} cy={t.y} r="3" fill="#1d6e46" fillOpacity="0.7" />
          <circle cx={t.x} cy={t.y} r="2" fill="#28a063" fillOpacity="0.5" />
        </g>
      ))}

      {/* Dynamic location markers */}
      {markers.map((m, i) => (
        <g key={i} filter="url(#shadow)">
          {/* Outer ring */}
          <circle cx={m.x} cy={m.y} r="2.8" fill={m.color} fillOpacity="0.25" />
          {/* Inner fill */}
          <circle cx={m.x} cy={m.y} r="2" fill={m.color} />
          {/* White center dot */}
          <circle cx={m.x} cy={m.y} r="0.7" fill="white" />
        </g>
      ))}

      {/* Compass rose (top-right) */}
      <g transform="translate(90,10)" opacity="0.5">
        <circle cx="0" cy="0" r="4" fill="white" fillOpacity="0.1" />
        <polygon points="0,-3.5 0.7,-1 -0.7,-1" fill="white" fillOpacity="0.9" />
        <polygon points="0,3.5 0.7,1 -0.7,1" fill="white" fillOpacity="0.4" />
        <polygon points="-3.5,0 -1,0.7 -1,-0.7" fill="white" fillOpacity="0.4" />
        <polygon points="3.5,0 1,0.7 1,-0.7" fill="white" fillOpacity="0.4" />
        <text x="0" y="-5" textAnchor="middle" fill="white" fontSize="2" fontWeight="bold" fillOpacity="0.8">N</text>
      </g>

      {/* Scale bar (bottom-left) */}
      <g transform="translate(6,94)" opacity="0.5">
        <rect x="0" y="0" width="14" height="1.2" fill="white" fillOpacity="0.6" rx="0.6" />
        <text x="7" y="-1.2" textAnchor="middle" fill="white" fontSize="2" fillOpacity="0.7">500m</text>
      </g>
    </svg>
  );
}

/**
 * MapSection — Static premium map preview with split 35/65 layout.
 *
 * Left (35%): section kicker, title, description, dynamic category legend, CTA
 * Right (65%): SVG-based isometric village map with dynamic markers + floating preview card
 *
 * No Leaflet — pure CSS/SVG illustration.
 * Data source: usePotentials hook (categories for legend, first item for preview card).
 * Map height: h-[380px] lg:h-[460px].
 *
 * @see docs/design/UI_UX_SPEC.md §7 Map Section
 */
export function MapSection() {
  const { data: potentialsData, isLoading } = usePotentials({ per_page: 50 });
  const potentials = potentialsData?.data ?? [];

  // Collect unique categories for the legend
  const legendCategories = potentials.reduce<Array<{ label: string; color: string }>>(
    (acc, p) => {
      const color = p.category.color_code ?? '#16a34a';
      if (!acc.find((c) => c.label === p.category.label)) {
        acc.push({ label: p.category.label, color });
      }
      return acc;
    },
    [],
  );

  // Build dynamic markers from categories (cycle through MARKER_POSITIONS)
  const markers = legendCategories.slice(0, MARKER_POSITIONS.length).map((cat, i) => ({
    ...MARKER_POSITIONS[i],
    color: cat.color,
  }));

  // If no categories yet (loading/empty), show fallback markers
  const displayMarkers =
    markers.length > 0
      ? markers
      : MARKER_POSITIONS.slice(0, 6).map((pos, i) => ({
          ...pos,
          color: FALLBACK_COLORS[i % FALLBACK_COLORS.length],
        }));

  // First potential for the floating preview card
  const featuredPotential: PotentialListItem | undefined = potentials[0];

  return (
    <section className="section-padding bg-[#F8F9FA]" aria-label="Sebaran potensi desa">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">

          {/* ── Left column (35%) ──────────────────────────────────── */}
          <div className="w-full lg:w-[35%] flex flex-col gap-6">
            {/* Section kicker */}
            <p className="text-label uppercase tracking-widest text-[#D97706] font-semibold">
              Peta Interaktif
            </p>

            {/* Title */}
            <h2 className="text-h2 text-[#0B3C35] leading-tight">
              Sebaran Potensi Desa
            </h2>

            {/* Description */}
            <p className="text-body text-[#6B7280] leading-relaxed">
              Jelajahi persebaran potensi desa secara visual pada peta interaktif. Temukan lokasi berbagai potensi — wisata alam, produk lokal, pertanian, dan kearifan budaya Desa Karamatwangi.
            </p>

            {/* Legend skeleton while loading */}
            {isLoading && (
              <div className="space-y-2.5">
                <Skeleton className="h-3 w-16 mb-3" />
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <Skeleton className="h-3 w-3 rounded-full shrink-0" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                ))}
              </div>
            )}

            {/* Dynamic legend from API data */}
            {!isLoading && legendCategories.length > 0 && (
              <div className="space-y-2.5">
                <p className="text-label uppercase tracking-widest text-[#6B7280] mb-3">
                  Legenda
                </p>
                {legendCategories.slice(0, 6).map((cat) => (
                  <div key={cat.label} className="flex items-center gap-2.5">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: cat.color }}
                      aria-hidden="true"
                    />
                    <span className="text-caption text-[#1F2937]">{cat.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            <Link to="/map" tabIndex={-1} className="mt-2 self-start">
              <Button
                variant="primary"
                size="md"
                className="gap-2 rounded-full bg-[#0B3C35] hover:bg-[#2F855A] font-semibold"
              >
                <MapPin className="w-4 h-4" aria-hidden="true" />
                Lihat Peta Interaktif
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>

          {/* ── Right column (65%) — Static SVG Map Preview ────────── */}
          <div className="w-full lg:w-[65%]">
            <div className="rounded-[32px] overflow-hidden border border-[#E5E7EB]" style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.14)' }}>
              <div className="relative h-[380px] lg:h-[460px] w-full">
                {/* SVG illustration map */}
                <StaticVillageMap markers={displayMarkers} />

                {/* Floating preview card — bottom-right */}
                <FloatingPreviewCard potential={featuredPotential} isLoading={isLoading} />

                {/* Map label overlay — top-left */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25">
                  <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" aria-hidden="true" />
                  <span className="text-[11px] font-semibold text-white tracking-wide">
                    Desa Karamatwangi, Kab. Garut
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

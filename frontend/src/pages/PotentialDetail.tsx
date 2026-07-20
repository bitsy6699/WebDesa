import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  MapPin,
  ChevronRight,
  Share2,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ChevronLeft,
} from 'lucide-react';
import { usePotential } from '@/hooks/usePotential';
import { usePotentials } from '@/hooks/usePotentials';
import { MetadataRenderer } from '@/components/molecules/MetadataRenderer';
import { Skeleton } from '@/components/atoms/Skeleton';
import { EmptyResult } from '@/components/molecules/EmptyResult';
import { FeaturedSmallCard, FeaturedSmallCardSkeleton } from '@/components/molecules/FeaturedPotentialCard';
import { glassSurface, glassSurfaceSoft } from '@/lib/glassStyles';

// ── Animation variants ───────────────────────────────────────────────────────
// NOTE: transitions are defined on motion elements, NOT inside variants,
// to satisfy framer-motion v12 strict Easing typing.
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {},
};

const FADE_TRANSITION = { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } as const;
const STAGGER_TRANSITION = { staggerChildren: 0.08 } as const;

// ── Format date ───────────────────────────────────────────────────────────────
function formatDate(dateStr?: string): string {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return '—';
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
}

// ── Loading skeleton ──────────────────────────────────────────────────────────
function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#F8FAF8]" aria-busy="true" aria-label="Memuat detail potensi">
      {/* Hero skeleton */}
      <Skeleton className="h-[440px] w-full rounded-none" />
      <div className="mx-auto max-w-[1200px] px-6 py-12 space-y-12">
        {/* Gallery skeleton */}
        <Skeleton className="aspect-video w-full rounded-[32px]" />
        {/* Content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            <Skeleton className="h-8 w-3/4 rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
            <Skeleton className="h-4 w-4/5 rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-2/3 rounded" />
          </div>
          <Skeleton className="h-60 rounded-[32px]" />
        </div>
        {/* Cards skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-[24px]" />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function PotentialDetail() {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const { data: potential, isLoading, isError } = usePotential(category ?? '', slug ?? '');
  const { data: relatedData, isLoading: isLoadingRelated } = usePotentials({ category: category ?? undefined });

  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [imageKey, setImageKey] = useState(0); // drives crossfade keying
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (potential?.cover_image_url) {
      setActiveImage(potential.cover_image_url);
    } else if (potential?.gallery?.length) {
      setActiveImage(potential.gallery[0]);
    }
  }, [potential]);

  const switchImage = useCallback((url: string) => {
    setActiveImage(url);
    setImageKey((k) => k + 1);
  }, []);

  // ── Loading ────────────────────────────────────────────────────────────────
  if (isLoading) return <DetailSkeleton />;

  // ── Error ──────────────────────────────────────────────────────────────────
  if (isError || !potential) {
    return (
      <div className="min-h-screen bg-[#F8FAF8] flex items-center justify-center">
        <EmptyResult
          title="Potensi Tidak Ditemukan"
          description="Halaman potensi yang Anda cari tidak ditemukan atau sudah tidak tersedia."
          actionLabel="Kembali ke Direktori"
          onAction={() => navigate('/potentials')}
        />
      </div>
    );
  }

  const { title, description, category: cat, cover_image_url, gallery = [], location, metadata, created_at } = potential;

  const allImages = [cover_image_url, ...gallery].filter((u): u is string => !!u);

  const relatedItems = (relatedData?.data ?? []).filter((p) => p.id !== potential.id).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Split description into paragraphs; respect single \n as well
  const paragraphs = description
    .split(/\n{2,}/)
    .flatMap((block) => block.split('\n'))
    .filter(Boolean);

  const motionProps = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: 'hidden' as const,
          whileInView: 'visible' as const,
          viewport: { once: true, amount: 0.15 },
          variants: fadeUp,
          transition: { ...FADE_TRANSITION, delay },
        };

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-[#184D47] overflow-x-hidden font-sans">

      {/* ══════════════════════════════════════════════════════════════════════
          1. MINI HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative h-[460px] sm:h-[500px] lg:h-[540px] w-full flex items-end overflow-hidden"
        aria-label="Hero potensi desa"
      >
        {/* Background image with fade-in */}
        <motion.img
          src={cover_image_url || '/assets/images/placeholder-card.svg'}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Dark overlay — bottom-heavy */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              'linear-gradient(to top, rgba(10,38,32,0.97) 0%, rgba(24,77,71,0.75) 45%, rgba(15,61,52,0.35) 100%)',
          }}
        />

        {/* Breadcrumb — top-left */}
        <div className="absolute top-6 left-6 sm:left-12 lg:left-16 z-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-white/65">
            <Link to="/" className="hover:text-white transition-colors duration-200">Beranda</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/potentials" className="hover:text-white transition-colors duration-200">Potensi</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white truncate max-w-[180px] sm:max-w-xs">{title}</span>
          </nav>
        </div>

        {/* Bottom content row */}
        <div className="relative z-20 w-full flex flex-col lg:flex-row justify-between items-end gap-5
                        px-6 sm:px-8 lg:px-10 pb-10 lg:pb-14">

          {/* Left — title block */}
          <div className="space-y-3 max-w-2xl text-left">
            <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest
                             text-white/85 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full
                             border border-white/25">
              {cat.label}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-white
                           leading-[1.15] tracking-tight">
              {title}
            </h1>
            {location?.address && (
              <div className="flex items-center gap-1.5 text-sm text-white/85 font-medium">
                <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{location.address}</span>
              </div>
            )}
          </div>

          {/* Right — Quick-info glass card */}
          <div
            className="w-full lg:w-72 shrink-0 rounded-[22px] p-5 text-sm text-left space-y-3"
            style={{
              ...glassSurfaceSoft,
              background: 'rgba(255,255,255,0.13)',
              border: '1px solid rgba(255,255,255,0.22)',
            }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">Sekilas Potensi</p>
            {[
              { label: 'Kategori', val: cat.label },
              { label: 'Lokasi', val: location?.address?.split(',')[0] ?? 'Karamatwangi' },
              { label: 'Dipublikasikan', val: formatDate(created_at) },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between gap-3 border-b border-white/10 pb-2 last:border-0 last:pb-0">
                <span className="text-white/55 shrink-0">{label}</span>
                <span className="font-semibold text-white text-right truncate">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════════════════════════════════ */}
      <main className="mx-auto max-w-[1240px] px-6 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-20 space-y-14 lg:space-y-16">

        {/* ────────────────────────────────────────────────────────────────
            2. IMAGE GALLERY
        ──────────────────────────────────────────────────────────────── */}
        {allImages.length > 0 && (
          <motion.section {...motionProps()} aria-label="Galeri foto">
            {/* Hero image with crossfade */}
            <div
              className="relative aspect-video w-full overflow-hidden rounded-3xl"
              style={{
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: '0 16px 40px rgba(0,0,0,0.04)',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={imageKey}
                  src={activeImage || allImages[0]}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="eager"
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 1.02 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>

              {/* Arrow navigation when multiple images */}
              {allImages.length > 1 && (() => {
                const idx = allImages.indexOf(activeImage ?? '');
                return (
                  <>
                    <button
                      onClick={() => switchImage(allImages[(idx - 1 + allImages.length) % allImages.length])}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center
                                 justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30
                                 text-white hover:bg-white/35 transition-all focus-visible:ring-2
                                 focus-visible:ring-white"
                      aria-label="Gambar sebelumnya"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => switchImage(allImages[(idx + 1) % allImages.length])}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center
                                 justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30
                                 text-white hover:bg-white/35 transition-all focus-visible:ring-2
                                 focus-visible:ring-white"
                      aria-label="Gambar berikutnya"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                );
              })()}
            </div>

            {/* Thumbnail strip — only when multiple images */}
            {allImages.length > 1 && (
              <div
                className="mt-4 flex gap-3 overflow-x-auto pb-1 scrollbar-none"
                role="group"
                aria-label="Pilih foto"
              >
                {allImages.map((url, i) => {
                  const isActive = activeImage === url;
                  return (
                    <button
                      key={i}
                      onClick={() => switchImage(url)}
                      className={`relative shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2
                                  outline-none transition-all duration-300
                                  focus-visible:ring-2 focus-visible:ring-[#184D47]
                                  ${isActive
                                    ? 'border-[#184D47] scale-[1.04] shadow-[0_10px_24px_rgba(24,77,71,0.18)]'
                                    : 'border-transparent opacity-60 hover:opacity-90 hover:scale-[1.03] hover:-translate-y-1'
                                  }`}
                      aria-label={`Gambar ${i + 1}`}
                      aria-pressed={isActive}
                    >
                      <img
                        src={url}
                        alt={`Thumbnail ${i + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </motion.section>
        )}

        {/* ────────────────────────────────────────────────────────────────
            3. STORY CONTENT + STICKY SIDEBAR
        ──────────────────────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start">

          {/* Left — Article */}
          <motion.div {...motionProps(0.05)} className="lg:col-span-2">
            <article className="space-y-6 max-w-3xl">
              {paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className={`leading-[1.9] text-[17px] ${idx === 0
                    ? 'font-medium text-[#184D47]/90 first-letter:text-6xl first-letter:font-extrabold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#184D47] first-letter:leading-none'
                    : 'text-[#5F6B68]'
                  }`}
                >
                  {p}
                </p>
              ))}
            </article>

            {/* ACA dynamic metadata */}
            {metadata && (
              <div className="mt-10 pt-8 border-t border-[#184D47]/10">
                <MetadataRenderer metadata={metadata} />
              </div>
            )}
          </motion.div>

          {/* Right — Sticky info panel */}
          <motion.div {...motionProps(0.1)} className="lg:sticky lg:top-28 space-y-4">
            <div className="rounded-[32px] p-6 sm:p-7 space-y-5" style={glassSurface}>

              {/* Published by */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5F6B68]/55 mb-1">
                  Dipublikasikan Oleh
                </p>
                <p className="text-sm font-bold text-[#184D47]">Pemerintah Desa Karamatwangi</p>
              </div>

              {/* Detail rows */}
              <dl className="space-y-3 text-sm border-t border-[#184D47]/08 pt-4">
                {[
                  { label: 'Kategori', val: cat.label },
                  { label: 'Lokasi', val: location?.address ?? 'Karamatwangi' },
                  { label: 'Dipublikasikan', val: formatDate(created_at) },
                  { label: 'Galeri', val: `${allImages.length} foto` },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between gap-3">
                    <dt className="text-[#5F6B68]/70 shrink-0">{label}</dt>
                    <dd className="font-semibold text-[#184D47] text-right truncate max-w-[160px]" title={val}>{val}</dd>
                  </div>
                ))}
              </dl>

              <div className="space-y-3 pt-2">
                {/* Share */}
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-2 rounded-full py-2.75
                             border border-[#184D47]/20 text-[#184D47] text-sm font-semibold
                             hover:bg-[#184D47]/05 transition-colors"
                >
                  {copied ? (
                    <><CheckCircle className="w-4 h-4 text-emerald-600" /> Tautan Disalin!</>
                  ) : (
                    <><Share2 className="w-4 h-4" /> Bagikan Potensi</>
                  )}
                </button>

                {/* Back */}
                <button
                  onClick={() => navigate('/potentials')}
                  className="w-full flex items-center justify-center gap-2 rounded-full py-2.5
                             text-xs font-semibold text-[#5F6B68] hover:text-[#184D47] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Direktori
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ────────────────────────────────────────────────────────────────
            4. VILLAGE INFORMATION CARDS (2×2 grid)
        ──────────────────────────────────────────────────────────────── */}
        <motion.section
          aria-label="Informasi utama"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5"
          initial={prefersReducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          transition={STAGGER_TRANSITION}
        >
          {[
            { emoji: '📍', label: 'Lokasi', val: location?.address?.split(',')[0] ?? 'Karamatwangi' },
            { emoji: '🌱', label: 'Kategori', val: cat.label },
            { emoji: '📅', label: 'Dipublikasikan', val: formatDate(created_at) },
            { emoji: '🖼', label: 'Jumlah Galeri', val: `${allImages.length} Foto` },
          ].map((card) => (
            <motion.div
              key={card.label}
              variants={fadeUp}
              transition={FADE_TRANSITION}
              className="rounded-[24px] p-5 flex flex-col gap-3 text-left"
              style={glassSurface}
            >
              <span className="text-2xl" aria-hidden="true">{card.emoji}</span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#5F6B68]/55 mb-0.5">
                  {card.label}
                </p>
                <p className="text-sm font-extrabold text-[#184D47] truncate" title={card.val}>
                  {card.val}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* ────────────────────────────────────────────────────────────────
            5. RELATED POTENTIALS
        ──────────────────────────────────────────────────────────────── */}
        <motion.section {...motionProps()} className="space-y-6 pt-4">
          <div className="text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-[#5F6B68]/60">Rekomendasi</p>
            <h2 className="text-2xl font-bold text-[#184D47]">Potensi Lainnya</h2>
          </div>

          {isLoadingRelated ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => <FeaturedSmallCardSkeleton key={i} />)}
            </div>
          ) : relatedItems.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={prefersReducedMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              transition={STAGGER_TRANSITION}
            >
              {relatedItems.map((item) => (
                <motion.div key={item.id} variants={fadeUp} transition={FADE_TRANSITION} className="h-full">
                  <FeaturedSmallCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-sm text-[#5F6B68] italic">
              Tidak ada potensi lain dalam kategori ini.
            </p>
          )}
        </motion.section>

        {/* ────────────────────────────────────────────────────────────────
            6. BOTTOM CTA
        ──────────────────────────────────────────────────────────────── */}
        <motion.section {...motionProps()}>
          <div
            className="rounded-[36px] p-8 sm:p-10 lg:p-14 text-center space-y-6"
            style={{
              background: 'linear-gradient(135deg, rgba(24,77,71,0.96) 0%, rgba(15,61,52,0.94) 60%, rgba(10,38,32,0.96) 100%)',
              boxShadow: '0 24px 60px rgba(24,77,71,0.16)',
              border: '1px solid rgba(255,255,255,0.16)',
            }}
          >
            {/* Decorative subtle glow */}
            <div
              className="pointer-events-none absolute left-1/4 top-1/4 w-64 h-64 rounded-full blur-3xl opacity-10"
              style={{ background: 'rgba(255,255,255,0.15)' }}
              aria-hidden="true"
            />

            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/65">
              Portal Potensi Desa
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white max-w-2xl mx-auto leading-tight">
              Masih Banyak Potensi Desa yang Bisa Dijelajahi
            </h2>
            <p className="text-white/65 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Mari dukung kemajuan ekonomi Desa Karamatwangi dengan menjelajahi komoditas pertanian, pariwisata, dan industri lokal.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/potentials"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white
                           px-7 py-3.5 text-sm font-semibold text-[#184D47]
                           hover:bg-white/90 hover:-translate-y-0.5 shadow-lg
                           transition-all duration-200"
              >
                Lihat Semua Potensi
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-full
                           border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white
                           hover:bg-white/18 hover:-translate-y-0.5 transition-all duration-200"
                style={{ backdropFilter: 'blur(12px)' }}
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </motion.section>

      </main>
    </div>
  );
}

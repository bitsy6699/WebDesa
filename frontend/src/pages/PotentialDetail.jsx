import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  MapPin,
  ChevronRight,
  ChevronLeft,
  Share2,
  CheckCircle,
  Clock,
  Calendar,
  Tag,
  Navigation,
  ExternalLink,
} from 'lucide-react';
import { usePotential } from '@/hooks/usePotential';
import { usePotentials } from '@/hooks/usePotentials';
import { MetadataRenderer } from '@/components/molecules/MetadataRenderer';
import { Skeleton } from '@/components/atoms/Skeleton';
import { EmptyResult } from '@/components/molecules/EmptyResult';
import { LazyImage } from '@/components/molecules/LazyImage';
import { FeaturedSmallCard, FeaturedSmallCardSkeleton } from '@/components/molecules/FeaturedPotentialCard';
import SEO from '@/components/SEO';
import { articleSchema, breadcrumbSchema } from '@/lib/structuredData';
import { PageHero } from '@/components/molecules/PageHero';
import { PageSection } from '@/components/molecules/PageSection';
import { PageCTA } from '@/components/molecules/PageCTA';
import { StoryDivider } from '@/components/organisms/StoryDivider';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return '—';
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
}

function estimateReadTime(text) {
  if (!text) return 1;
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function DetailSkeleton() {
  return (
    <div className="min-h-screen" aria-busy="true" aria-label="Memuat detail potensi">
      <Skeleton className="h-[300px] w-full rounded-none" />
      <div className="mx-auto max-w-[720px] px-5 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="flex gap-4">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="h-8 w-3/4 rounded" />
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full rounded" />
          ))}
        </div>
        <Skeleton className="h-64 rounded-[20px]" />
      </div>
    </div>
  );
}

// ── Reading Meta Row ──────────────────────────────────────────────────────────

function ReadingMeta({ readTime, date, category }) {
  const items = [];
  if (readTime) items.push({ icon: Clock, text: `${readTime} menit membaca` });
  if (date) items.push({ icon: Calendar, text: formatDate(date) });
  if (category) items.push({ icon: Tag, text: category });

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-400">
      {items.map(({ icon: Icon, text }, i) => (
        <span key={i} className="inline-flex items-center gap-1.5">
          <Icon className="w-3.5 h-3.5" aria-hidden="true" />
          {text}
        </span>
      ))}
    </div>
  );
}

// ── Gallery ───────────────────────────────────────────────────────────────────

function ImageGallery({ images, activeImage, onSwitch, imageKey, prefersReducedMotion, title }) {
  if (!images.length) return null;

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      aria-label="Galeri foto"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-[20px] border border-primary/8 bg-neutral-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={imageKey}
            src={activeImage}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 1.02 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>

        {images.length > 1 && (() => {
          const idx = images.indexOf(activeImage);
          return (
            <>
              <button
                onClick={() => onSwitch(images[(idx - 1 + images.length) % images.length])}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-primary hover:bg-white transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Gambar sebelumnya"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => onSwitch(images[(idx + 1) % images.length])}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-primary hover:bg-white transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Gambar berikutnya"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          );
        })()}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1 scrollbar-none">
          {images.map((url, i) => {
            const isActive = activeImage === url;
            return (
              <button
                key={i}
                onClick={() => onSwitch(url)}
                className={`relative shrink-0 w-20 h-14 rounded-[14px] overflow-hidden border-2 outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? 'border-primary shadow-md'
                    : 'border-transparent opacity-50 hover:opacity-80 hover:-translate-y-0.5'
                }`}
                aria-label={`Gambar ${i + 1}`}
                aria-pressed={isActive}
              >
                <LazyImage src={url} alt={`${title} — gambar ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </button>
            );
          })}
        </div>
      )}
    </motion.section>
  );
}

// ── Interesting Facts ─────────────────────────────────────────────────────────

function InterestingFacts({ metadata }) {
  if (!metadata || !Array.isArray(metadata) || metadata.length === 0) return null;

  const facts = metadata.slice(0, 4);
  if (facts.length === 0) return null;

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <h2 className="font-heading text-xl font-bold text-primary-dark mb-6">Fakta Menarik</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {facts.map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="rounded-[20px] border border-primary/8 bg-white p-5"
          >
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
              {item.key || item.label || 'Informasi'}
            </p>
            <p className="text-[15px] text-primary font-medium leading-relaxed">
              {item.value ?? item.text ?? '—'}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ── Location Section ──────────────────────────────────────────────────────────

function LocationSection({ location }) {
  if (!location?.address) return null;

  const mapsUrl = location.latitude && location.longitude
    ? `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`;

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="rounded-[20px] border border-primary/8 bg-white overflow-hidden">
        <div className="aspect-video sm:aspect-[16/9] w-full bg-neutral-100">
          <iframe
            title={`Lokasi ${location.address}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(location.address)}&output=embed&z=14`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>
        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-[12px] bg-primary/8 text-primary shrink-0">
              <MapPin className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[15px] text-primary font-medium">{location.address}</p>
              <p className="text-xs text-neutral-400 mt-0.5">Desa Karamatwangi, Kec. Cikajang, Kab. Garut</p>
            </div>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/8 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-colors shrink-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Navigation className="w-4 h-4" aria-hidden="true" />
            Buka di Maps
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.section>
  );
}

// ── Share Section ─────────────────────────────────────────────────────────────

function ShareSection({ url, title, copied, onCopy }) {
  const canShare = typeof navigator !== 'undefined' && navigator.share;

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({ title, url }).catch(() => {});
    }
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="flex flex-wrap items-center gap-3"
    >
      <span className="text-sm font-semibold text-primary">Bagikan:</span>

      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-primary/10 text-sm text-neutral-500 font-medium hover:bg-primary/5 hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary"
      >
        WhatsApp
      </a>

      <button
        onClick={onCopy}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-primary/10 text-sm text-neutral-500 font-medium hover:bg-primary/5 hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary"
      >
        {copied ? <><CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Tersalin</> : 'Salin Tautan'}
      </button>

      {canShare && (
        <button
          onClick={handleNativeShare}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-primary/10 text-sm text-neutral-500 font-medium hover:bg-primary/5 hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Share2 className="w-3.5 h-3.5" />
          Bagikan
        </button>
      )}
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function PotentialDetail() {
  const { category, slug } = useParams();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const { data: potential, isLoading, isError } = usePotential(category ?? '', slug ?? '');
  const { data: relatedData, isLoading: isLoadingRelated } = usePotentials({ category: category ?? undefined });

  const [activeImage, setActiveImage] = useState(null);
  const [imageKey, setImageKey] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (potential?.cover_image_url) {
      setActiveImage(potential.cover_image_url);
    } else if (potential?.gallery?.length) {
      setActiveImage(potential.gallery[0]);
    }
  }, [potential]);

  const switchImage = useCallback((url) => {
    setActiveImage(url);
    setImageKey((k) => k + 1);
  }, []);

  const handleCopyLink = useCallback(() => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback: silently fail on insecure contexts
    }
  }, []);

  if (isLoading) return <DetailSkeleton />;

  if (isError || !potential) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <EmptyResult
          title="Potensi Tidak Ditemukan"
          description="Halaman potensi yang Anda cari tidak ditemukan atau sudah tidak tersedia."
          actionLabel="Kembali ke Direktori"
          onAction={() => navigate('/potentials')}
        />
      </div>
    );
  }

  const { title, description, category: cat, cover_image_url, gallery = [], location, metadata, contact, social_media, marketplaces, created_at } = potential;
  const allImages = [cover_image_url, ...gallery].filter(Boolean);
  const relatedItems = (relatedData?.data ?? []).filter((p) => p.id !== potential.id).slice(0, 3);
  const readTime = estimateReadTime(description);

  const paragraphs = description
    .split(/\n{2,}/)
    .flatMap((block) => block.split('\n'))
    .filter(Boolean);

  const hasLocation = location?.address || (location?.latitude && location?.longitude);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-primary font-sans overflow-x-hidden">
      <SEO
        title={title}
        description={description?.slice(0, 160)}
        path={`/potentials/${category}/${slug}`}
        image={cover_image_url}
        type="article"
        schema={[
          articleSchema(potential),
          breadcrumbSchema([
            { label: 'Beranda', to: '/' },
            { label: 'Potensi', to: '/potentials' },
            { label: title },
          ]),
        ]}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          1. HERO — compact, category + location + title only
      ══════════════════════════════════════════════════════════════════════ */}
      <PageHero
        image={cover_image_url || '/assets/images/placeholder-card.svg'}
        imageAlt={title}
        title={title}
        variant="image"
        breadcrumb={[
          { label: 'Beranda', to: '/' },
          { label: 'Potensi', to: '/potentials' },
          { label: title },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-white/85 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
            {cat.label}
          </span>
          {location?.address && (
            <span className="inline-flex items-center gap-1 text-sm text-white/80">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              {location.address.split(',')[0]}
            </span>
          )}
        </div>
      </PageHero>

      {/* ══════════════════════════════════════════════════════════════════════
          MAIN CONTENT — centered editorial column
      ══════════════════════════════════════════════════════════════════════ */}
      <PageSection container="narrow" animated={false}>

        {/* ─── 2. READING META ─────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mb-8"
        >
          <ReadingMeta readTime={readTime} date={created_at} category={cat.label} />
        </motion.div>

        {/* ─── 3. STORY ────────────────────────────────────────────── */}
        <motion.article
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="prose-custom space-y-6 mb-14"
        >
          {paragraphs.map((p, idx) => (
            <p
              key={idx}
              className={`text-[17px] leading-[1.9] ${
                idx === 0
                  ? 'text-primary/85 font-medium first-letter:text-[3.5em] first-letter:font-extrabold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none first-letter:text-primary'
                  : 'text-neutral-500'
              }`}
            >
              {p}
            </p>
          ))}
        </motion.article>

        {/* ─── 4. GALLERY (after story) ────────────────────────────── */}
        {allImages.length > 0 && (
          <div className="mb-14">
            <ImageGallery
              images={allImages}
              activeImage={activeImage}
              onSwitch={switchImage}
              imageKey={imageKey}
              prefersReducedMotion={prefersReducedMotion}
              title={title}
            />
          </div>
        )}

        {/* ─── 5. METADATA (dynamic engine) ────────────────────────── */}
        {metadata && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mb-14 pt-10 border-t border-primary/8"
          >
            <MetadataRenderer metadata={metadata} />
          </motion.div>
        )}

        {/* ─── 5.5 CONTACTS ────────────────────────────────────────── */}
        {contact && (Object.values(contact).some(Boolean)) && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mb-14 pt-10 border-t border-primary/8"
          >
            <h2 className="font-heading text-xl font-bold text-primary-dark mb-4">Kontak</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contact.whatsapp && (
                <div className="rounded-[24px] border border-neutral-200 bg-white p-5 space-y-1.5 shadow-sm">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-400">WhatsApp</dt>
                  <dd className="font-medium">
                    <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#184D47] hover:underline">
                      {contact.whatsapp} <ExternalLink className="h-3 w-3" />
                    </a>
                  </dd>
                </div>
              )}
              {contact.phone && (
                <div className="rounded-[24px] border border-neutral-200 bg-white p-5 space-y-1.5 shadow-sm">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Telepon</dt>
                  <dd className="font-medium">
                    <a href={`tel:${contact.phone}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#184D47] hover:underline">
                      {contact.phone} <ExternalLink className="h-3 w-3" />
                    </a>
                  </dd>
                </div>
              )}
              {contact.email && (
                <div className="rounded-[24px] border border-neutral-200 bg-white p-5 space-y-1.5 shadow-sm">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Email</dt>
                  <dd className="font-medium">
                    <a href={`mailto:${contact.email}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#184D47] hover:underline">
                      {contact.email} <ExternalLink className="h-3 w-3" />
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </motion.div>
        )}

        {/* ─── 5.6 SOCIAL MEDIA ────────────────────────────────────── */}
        {social_media && (Object.values(social_media).some(Boolean)) && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mb-14 pt-10 border-t border-primary/8"
          >
            <h2 className="font-heading text-xl font-bold text-primary-dark mb-4">Media Sosial</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {social_media.tiktok && (
                <div className="rounded-[24px] border border-neutral-200 bg-white p-5 space-y-1.5 shadow-sm">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-400">TikTok</dt>
                  <dd className="font-medium">
                    <a href={social_media.tiktok} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#184D47] hover:underline">
                      Buka TikTok <ExternalLink className="h-3 w-3" />
                    </a>
                  </dd>
                </div>
              )}
              {social_media.instagram && (
                <div className="rounded-[24px] border border-neutral-200 bg-white p-5 space-y-1.5 shadow-sm">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Instagram</dt>
                  <dd className="font-medium">
                    <a href={social_media.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#184D47] hover:underline">
                      Buka Instagram <ExternalLink className="h-3 w-3" />
                    </a>
                  </dd>
                </div>
              )}
              {social_media.facebook && (
                <div className="rounded-[24px] border border-neutral-200 bg-white p-5 space-y-1.5 shadow-sm">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Facebook</dt>
                  <dd className="font-medium">
                    <a href={social_media.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#184D47] hover:underline">
                      Buka Facebook <ExternalLink className="h-3 w-3" />
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </motion.div>
        )}

        {/* ─── 5.7 MARKETPLACES ────────────────────────────────────── */}
        {marketplaces && (Object.values(marketplaces).some(Boolean)) && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mb-14 pt-10 border-t border-primary/8"
          >
            <h2 className="font-heading text-xl font-bold text-primary-dark mb-4">Marketplace</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {marketplaces.shopee && (
                <div className="rounded-[24px] border border-neutral-200 bg-white p-5 space-y-1.5 shadow-sm">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Shopee</dt>
                  <dd className="font-medium">
                    <a href={marketplaces.shopee} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#184D47] hover:underline">
                      Beli di Shopee <ExternalLink className="h-3 w-3" />
                    </a>
                  </dd>
                </div>
              )}
              {marketplaces.tokopedia && (
                <div className="rounded-[24px] border border-neutral-200 bg-white p-5 space-y-1.5 shadow-sm">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Tokopedia</dt>
                  <dd className="font-medium">
                    <a href={marketplaces.tokopedia} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#184D47] hover:underline">
                      Beli di Tokopedia <ExternalLink className="h-3 w-3" />
                    </a>
                  </dd>
                </div>
              )}
              {marketplaces.lazada && (
                <div className="rounded-[24px] border border-neutral-200 bg-white p-5 space-y-1.5 shadow-sm">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Lazada</dt>
                  <dd className="font-medium">
                    <a href={marketplaces.lazada} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#184D47] hover:underline">
                      Beli di Lazada <ExternalLink className="h-3 w-3" />
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </motion.div>
        )}

        {/* ─── 6. INTERESTING FACTS ────────────────────────────────── */}
        {metadata && (
          <div className="mb-14">
            <InterestingFacts metadata={metadata} />
          </div>
        )}


        {/* ─── 7. LOCATION ─────────────────────────────────────────── */}
        {hasLocation && (
          <div className="mb-14">
            <LocationSection location={location} />
          </div>
        )}

        {/* ─── 8. SHARE ────────────────────────────────────────────── */}
        <div className="mb-14 pt-8 border-t border-primary/8">
          <ShareSection
            url={window.location.href}
            title={title}
            copied={copied}
            onCopy={handleCopyLink}
          />
        </div>

        <StoryDivider
          title="Setiap potensi memiliki cerita yang layak didengar."
          subtitle="Potensi Lainnya"
          variant="sage"
        />

        {/* ─── 9. RELATED STORIES ──────────────────────────────────── */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mb-8"
        >
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
              Potensi Lainnya
            </p>
            <h2 className="font-heading text-[1.5rem] font-bold leading-[1.2] tracking-[-0.02em] text-primary-dark sm:text-[1.75rem]">
              Jelajahi Potensi Lainnya
            </h2>
            <p className="mt-3 text-[15px] leading-[1.75] text-neutral-500 max-w-[620px]">
              Potensi serupa yang mungkin menarik perhatian Anda.
            </p>
          </div>

          {isLoadingRelated ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 3 }).map((_, i) => <FeaturedSmallCardSkeleton key={i} />)}
            </div>
          ) : relatedItems.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {relatedItems.map((item) => (
                <motion.div key={item.id} variants={fadeUp} className="h-full">
                  <FeaturedSmallCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-sm text-neutral-400 italic">Tidak ada potensi lain dalam kategori ini.</p>
          )}
        </motion.section>

      </PageSection>

      {/* ══════════════════════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <PageCTA
        title="Masih Banyak Potensi yang Menunggu Dijelajahi"
        description="Dukung kemajuan Desa Karamatwangi dengan menjelajahi potensi pertanian, pariwisata, dan industri lokal."
        ctaTo="/potentials"
        ctaLabel="Lihat Semua Potensi"
        ctaTo2="/map"
        ctaLabel2="Lihat di Peta"
        variant="light"
      />
    </div>
  );
}

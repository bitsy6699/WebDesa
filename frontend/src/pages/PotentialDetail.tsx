import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  ChevronLeft,
  Phone,
  Mail,
  Globe,
  MessageCircle,
  ImageIcon,
} from 'lucide-react';
import { usePotential } from '@/hooks/usePotential';
import { MetadataRenderer } from '@/components/molecules/MetadataRenderer';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Skeleton } from '@/components/atoms/Skeleton';
import { EmptyResult } from '@/components/molecules/EmptyResult';
import type { PotentialContact } from '@/types/Potential';

// ── Contact button ──────────────────────────────────────────────────────────

interface ContactButtonProps {
  contact: PotentialContact | null;
}

/**
 * Implements the Adaptive Contact Fallback logic (BR-CON-01).
 * Evaluates contact fields in priority order:
 * WhatsApp → Phone → Email → Website → disabled
 *
 * @see docs/engineering/ACA.md §8 Adaptive Contact Flow
 */
function AdaptiveContactButton({ contact }: ContactButtonProps) {
  if (!contact) {
    return (
      <Button variant="outline" disabled aria-disabled="true" title="Tidak ada informasi kontak">
        Hubungi
      </Button>
    );
  }

  if (contact.whatsapp) {
    const waNumber = contact.whatsapp.replace(/\D/g, '');
    return (
      <Button
        as="a"
        href={`https://wa.me/${waNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        variant="primary"
        className="gap-2"
      >
        <MessageCircle className="w-4 h-4" />
        Hubungi via WhatsApp
      </Button>
    );
  }

  if (contact.phone) {
    return (
      <Button
        as="a"
        href={`tel:${contact.phone}`}
        variant="primary"
        className="gap-2"
      >
        <Phone className="w-4 h-4" />
        Hubungi via Telepon
      </Button>
    );
  }

  if (contact.email) {
    return (
      <Button
        as="a"
        href={`mailto:${contact.email}`}
        variant="primary"
        className="gap-2"
      >
        <Mail className="w-4 h-4" />
        Kirim Email
      </Button>
    );
  }

  if (contact.website) {
    return (
      <Button
        as="a"
        href={contact.website}
        target="_blank"
        rel="noopener noreferrer"
        variant="primary"
        className="gap-2"
      >
        <Globe className="w-4 h-4" />
        Kunjungi Website
      </Button>
    );
  }

  return (
    <Button variant="outline" disabled aria-disabled="true" title="Tidak ada informasi kontak tersedia">
      Tidak Ada Kontak
    </Button>
  );
}

// ── Loading skeleton ────────────────────────────────────────────────────────

function PotentialDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8" aria-busy="true" aria-label="Memuat detail potensi">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="aspect-video w-full rounded-[--radius-xl]" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-[--radius-lg]" />
        ))}
      </div>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

/**
 * PotentialDetail — Public detail page for a single village potential.
 *
 * Dynamically renders category-specific metadata using MetadataRenderer,
 * which is the frontend implementation of the ACA Dynamic Rendering Engine.
 *
 * Route: /potentials/:category/:slug
 *
 * @see docs/engineering/API_SPEC.md §5.2 Show Potential Detail
 * @see docs/engineering/ACA.md §6.1 Dynamic Rendering Engine
 */
export default function PotentialDetail() {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const navigate = useNavigate();

  const { data: potential, isLoading, isError } = usePotential(
    category ?? '',
    slug ?? '',
  );

  // ── Loading ──────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[--bg-page]">
        <PotentialDetailSkeleton />
      </div>
    );
  }

  // ── Error / Not found ────────────────────────────────────────────────────
  if (isError || !potential) {
    return (
      <div className="min-h-screen bg-[--bg-page] flex items-center justify-center">
        <EmptyResult
          title="Potensi Tidak Ditemukan"
          description="Halaman yang Anda cari tidak ditemukan atau sudah tidak tersedia."
          actionLabel="Kembali ke Direktori"
          onAction={() => navigate('/potentials')}
        />
      </div>
    );
  }

  const {
    title,
    description,
    category: cat,
    cover_image_url,
    gallery,
    location,
    contact,
    metadata,
  } = potential;

  return (
    <div className="min-h-screen bg-[--bg-page]">
      <article className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <Link
            to="/potentials"
            className="inline-flex items-center gap-1.5 text-caption text-[--neutral-500] hover:text-[--color-primary] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[--border-focus] rounded-sm"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            Kembali ke Direktori
          </Link>
        </nav>

        {/* Cover image */}
        <div className="aspect-video w-full overflow-hidden rounded-[--radius-2xl] bg-[--neutral-100] shadow-[var(--shadow-lg)]">
          {cover_image_url ? (
            <img
              src={cover_image_url}
              alt={title}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-[--neutral-400]">
              <ImageIcon className="w-12 h-12" aria-hidden="true" />
              <span className="text-caption">Tidak ada gambar</span>
            </div>
          )}
        </div>

        {/* Header block */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2 flex-1 min-w-0">
              <Badge color="primary">{cat.label}</Badge>
              <h1 className="text-h1 text-[--neutral-900]">{title}</h1>
            </div>
            <div className="shrink-0 mt-1">
              <AdaptiveContactButton contact={contact} />
            </div>
          </div>

          {location?.address && (
            <div className="flex items-start gap-2 text-caption text-[--neutral-500]">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[--color-primary]" aria-hidden="true" />
              <span>{location.address}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <section aria-label="Deskripsi" className="rounded-[--radius-xl] bg-[--bg-surface] border border-[--border-default] p-6 shadow-[var(--shadow-sm)]">
          <h2 className="text-h4 text-[--neutral-900] mb-3">Tentang</h2>
          <p className="text-body text-[--neutral-700] leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </section>

        {/* ACA Metadata — dynamic rendering engine */}
        <MetadataRenderer metadata={metadata} />

        {/* Gallery */}
        {gallery && gallery.length > 0 && (
          <section aria-label="Galeri foto" className="space-y-4">
            <h2 className="text-h3 text-[--neutral-900]">Galeri</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {gallery.map((url, index) => (
                <div
                  key={index}
                  className="aspect-[4/3] overflow-hidden rounded-[--radius-lg] bg-[--neutral-100]"
                >
                  <img
                    src={url}
                    alt={`${title} — foto ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-[--duration-slow] ease-[--ease-out]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact details block */}
        {contact && (
          <section
            aria-label="Informasi kontak"
            className="rounded-[--radius-xl] border border-[--border-default] bg-[--bg-surface] p-6 shadow-[var(--shadow-sm)] space-y-4"
          >
            <h2 className="text-h4 text-[--neutral-900]">Kontak</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contact.whatsapp && (
                <div className="flex items-center gap-3 p-3 rounded-[--radius-lg] bg-[--neutral-50]">
                  <dt className="text-[--neutral-400] shrink-0">
                    <MessageCircle className="w-4 h-4" aria-label="WhatsApp" />
                  </dt>
                  <dd>
                    <a
                      href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-caption text-[--color-primary] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[--border-focus] rounded-sm"
                    >
                      {contact.whatsapp}
                    </a>
                  </dd>
                </div>
              )}
              {contact.phone && (
                <div className="flex items-center gap-3 p-3 rounded-[--radius-lg] bg-[--neutral-50]">
                  <dt className="text-[--neutral-400] shrink-0">
                    <Phone className="w-4 h-4" aria-label="Telepon" />
                  </dt>
                  <dd>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-caption text-[--neutral-800] hover:text-[--color-primary] focus:outline-none focus-visible:ring-2 focus-visible:ring-[--border-focus] rounded-sm"
                    >
                      {contact.phone}
                    </a>
                  </dd>
                </div>
              )}
              {contact.email && (
                <div className="flex items-center gap-3 p-3 rounded-[--radius-lg] bg-[--neutral-50]">
                  <dt className="text-[--neutral-400] shrink-0">
                    <Mail className="w-4 h-4" aria-label="Email" />
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-caption text-[--neutral-800] hover:text-[--color-primary] focus:outline-none focus-visible:ring-2 focus-visible:ring-[--border-focus] rounded-sm"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>
              )}
              {contact.website && (
                <div className="flex items-center gap-3 p-3 rounded-[--radius-lg] bg-[--neutral-50]">
                  <dt className="text-[--neutral-400] shrink-0">
                    <Globe className="w-4 h-4" aria-label="Website" />
                  </dt>
                  <dd>
                    <a
                      href={contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-caption text-[--neutral-800] hover:text-[--color-primary] truncate focus:outline-none focus-visible:ring-2 focus-visible:ring-[--border-focus] rounded-sm"
                    >
                      {contact.website}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </section>
        )}

      </article>
    </div>
  );
}

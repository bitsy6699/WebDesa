import { Link } from 'react-router-dom';
import { getCategoryColor, getCategoryIcon } from './constants';

/**
 * MapPopup — Rich popup content for desktop Leaflet popups.
 * Shows image, title, category, address, and CTA.
 */
export function MapPopup({ potential }) {
  const { title, category, location, cover_image_url, slug } = potential;
  const color = getCategoryColor(category?.slug);
  const icon = getCategoryIcon(category?.slug);
  const detailPath = `/potentials/${category?.slug || 'lainnya'}/${slug}`;

  return (
    <div className="map-popup-card" style={{ width: 260 }}>
      {/* Image */}
      {cover_image_url && (
        <div className="relative overflow-hidden rounded-t-lg" style={{ height: 140 }}>
          <img
            src={cover_image_url}
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)',
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="p-3">
        {/* Category pill */}
        <span
          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold text-white"
          style={{ background: color }}
        >
          {icon} {category?.label || 'Lainnya'}
        </span>

        {/* Title */}
        <h3 className="mt-1.5 text-[14px] font-bold leading-snug text-[#0F1A18] line-clamp-2">
          {title}
        </h3>

        {/* Address */}
        {location?.address && (
          <p className="mt-1 text-[12px] leading-relaxed text-[#6B7B78] line-clamp-2">
            📍 {location.address}
          </p>
        )}

        {/* CTA */}
        <Link
          to={detailPath}
          className="mt-2.5 flex items-center justify-center gap-1.5 rounded-lg bg-[#184D47] px-3 py-2 text-[13px] font-semibold text-white transition-all duration-200 hover:bg-[#0F3D35] hover:-translate-y-0.5 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#184D47] focus-visible:ring-offset-2"
        >
          Lihat Detail
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

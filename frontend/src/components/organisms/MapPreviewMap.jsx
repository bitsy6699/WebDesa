import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { getCategoryColor } from '@/components/map/constants';

import 'leaflet/dist/leaflet.css';
import '@/components/map/leaflet-fix';

/**
 * Creates a small DivIcon marker.
 */
function createIcon(categorySlug) {
  const color = getCategoryColor(categorySlug);
  return L.divIcon({
    className: 'map-marker-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
    html: `<div style="width:24px;height:24px;background:${color};border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.25)"></div>`,
  });
}

/**
 * MapPreviewMap — Static read-only Leaflet map for the homepage preview.
 */
export default function MapPreviewMap({ markers, center, zoom }) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-full w-full"
      zoomControl={false}
      attributionControl={false}
      scrollWheelZoom={false}
      dragging={true}
      style={{ height: 320 }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers.map((m) => (
        <Marker key={m.id} position={[m.lat, m.lng]} icon={createIcon(m.category?.slug)}>
          <Popup maxWidth={200}>
            <div className="p-1">
              <p className="text-[13px] font-bold text-[#0F1A18]">{m.title}</p>
              <p className="text-[11px] text-[#6B7B78]">{m.category?.label}</p>
              <Link
                to={`/potentials/${m.category?.slug || 'lainnya'}/${m.slug}`}
                className="mt-1.5 inline-block text-[12px] font-semibold text-[#184D47] hover:underline"
              >
                Baca cerita →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

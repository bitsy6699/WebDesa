import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { getCategoryColor } from '@/components/map/constants';

import 'leaflet/dist/leaflet.css';
import '@/components/map/leaflet-fix';

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

function FitBounds({ markers }) {
  const map = useMap();
  useEffect(() => {
    if (markers.length === 0) return;
    const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
  }, [map, markers]);
  return null;
}

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
      
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FitBounds markers={markers} />
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

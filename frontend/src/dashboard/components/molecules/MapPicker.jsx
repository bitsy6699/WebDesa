import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import '@/components/map/leaflet-fix';
import '@/components/map/map.css';

const DEFAULT_ZOOM = 13;

const customIcon = L.divIcon({
  className: 'map-marker-icon',
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="28" height="36" style="transform:translate(-14px,-36px);filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3))"><path fill="#184D47" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>`,
  iconSize: [28, 36],
  iconAnchor: [14, 36],
});

function MapClickHandler({ onClick }) {
  useMapEvents({
    click(e) {
      onClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

function FlyToCenter({ lat, lng }) {
  const map = useMap();
  const prev = useRef({ lat, lng });
  useEffect(() => {
    const p = prev.current;
    if (Math.abs(p.lat - lat) > 0.0001 || Math.abs(p.lng - lng) > 0.0001) {
      map.flyTo([lat, lng], map.getZoom());
      prev.current = { lat, lng };
    }
  }, [lat, lng, map]);
  return null;
}

export function MapPicker({ latitude, longitude, onChange, height = '240px' }) {
  const hasCoords = typeof latitude === 'number' && typeof longitude === 'number' && isFinite(latitude) && isFinite(longitude);
  const center = hasCoords ? [latitude, longitude] : [-6.9, 107.6];
  const zoom = hasCoords ? DEFAULT_ZOOM : 9;

  const handleMapClick = ({ lat, lng }) => {
    onChange({ latitude: lat, longitude: lng });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-[#E8ECEA]" style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full"
        zoomControl={false}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onClick={handleMapClick} />
        {hasCoords && (
          <>
            <Marker position={[latitude, longitude]} icon={customIcon} draggable={true}
              eventHandlers={{
                dragend: (e) => {
                  const pos = e.target.getLatLng();
                  onChange({ latitude: pos.lat, longitude: pos.lng });
                },
              }}
            />
            <FlyToCenter lat={latitude} lng={longitude} />
          </>
        )}
      </MapContainer>
    </div>
  );
}

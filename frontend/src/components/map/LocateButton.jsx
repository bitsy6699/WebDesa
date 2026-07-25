import { useState } from 'react';
import { useMap } from 'react-leaflet';
import { Crosshair } from 'lucide-react';

/**
 * LocateButton — re-centers map on user's GPS location.
 */
export function LocateButton() {
  const map = useMap();
  const [status, setStatus] = useState('idle');

  const handleLocate = () => {
    if (!navigator.geolocation) return;
    setStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        map.flyTo([pos.coords.latitude, pos.coords.longitude], 15, {
          duration: 1,
        });
        setStatus('done');
        setTimeout(() => setStatus('idle'), 2000);
      },
      () => {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 2000);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return (
    <button
      onClick={handleLocate}
      disabled={status === 'loading'}
      className="absolute bottom-6 right-4 z-[500] flex items-center justify-center w-11 h-11 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.12)] border border-[#E0E8E4] text-[#184D47] hover:bg-[#F0F4F2] hover:shadow-[0_4px_16px_rgba(0,0,0,0.16)] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#184D47] focus-visible:ring-offset-2 disabled:opacity-60"
      aria-label="Lokasi saya"
      title="Lokasi saya"
    >
      <Crosshair
        className={`w-5 h-5 ${status === 'loading' ? 'animate-pulse' : ''}`}
      />
    </button>
  );
}

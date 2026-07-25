import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Map, Layers } from 'lucide-react';
import SEO from '@/components/SEO';
import { collectionPageSchema } from '@/lib/structuredData';
import { usePotentials } from '@/hooks/usePotentials';
import { useCategories } from '@/hooks/useCategories';
import { MarkerClusterGroup } from '@/components/map/MapMarkers';
import { MapPopup } from '@/components/map/MapPopup';
import { MobileBottomSheet } from '@/components/map/MobileBottomSheet';
import { MapFilters } from '@/components/map/MapFilters';
import { LocateButton } from '@/components/map/LocateButton';
import { MAP_CENTER, MAP_ZOOM, MIN_ZOOM, MAX_ZOOM } from '@/components/map/constants';

import 'leaflet/dist/leaflet.css';
import '../../node_modules/leaflet.markercluster/dist/MarkerCluster.css';
import '../../node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css';
import '@/components/map/leaflet-fix';
import '../../node_modules/leaflet.markercluster/dist/leaflet.markercluster-src.js';
import '@/components/map/map.css';

const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

/**
 * Detects mobile viewport (below lg breakpoint).
 */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false,
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

/**
 * FitBounds — flies map to encompass all filtered markers.
 */
function FitBounds({ potentials }) {
  const map = useMap();
  const prevCount = useRef(0);

  useEffect(() => {
    if (potentials.length === 0) return;
    if (potentials.length === prevCount.current) return;
    prevCount.current = potentials.length;

    const coords = potentials
      .map((p) => [Number(p.location?.latitude), Number(p.location?.longitude)])
      .filter(([lat, lng]) => lat && lng);

    if (coords.length === 0) return;
    if (coords.length === 1) {
      map.flyTo(coords[0], 15, { duration: 0.8 });
      return;
    }

    const bounds = L.latLngBounds(coords);
    map.flyToBounds(bounds, { padding: [60, 60], duration: 0.8 });
  }, [potentials, map]);

  return null;
}

/**
 * MapExplorer — full-page interactive map of Desa Karamatwangi potentials.
 */
export default function MapExplorer() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPotential, setSelectedPotential] = useState(null);
  const isMobile = useIsMobile();

  const { data: potentialsData, isLoading: potentialsLoading } = usePotentials({ perPage: 200, status: 'published' });

  const { data: categories } = useCategories();

  const potentials = useMemo(() => {
    const items = potentialsData?.data || potentialsData || [];
    return Array.isArray(items) ? items : [];
  }, [potentialsData]);

  const filteredPotentials = useMemo(() => {
    let result = potentials;
    if (activeCategory) {
      result = result.filter((p) => p.category?.slug === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.location?.address?.toLowerCase().includes(q) ||
          p.category?.label?.toLowerCase().includes(q),
      );
    }
    return result;
  }, [potentials, activeCategory, searchQuery]);

  const handleSelect = useCallback((p) => {
    setSelectedPotential((prev) => (prev?.id === p.id ? null : p));
  }, []);

  const handleCloseSheet = useCallback(() => {
    setSelectedPotential(null);
  }, []);

  const handleCategoryChange = useCallback((slug) => {
    setActiveCategory(slug);
    setSelectedPotential(null);
  }, []);

  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
    setSelectedPotential(null);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F4F7F5]">
      <SEO
        title="Peta Interaktif"
        description="Jelajahi potensi Desa Karamatwangi pada peta interaktif — temukan lokasi wisata, UMKM, pertanian, dan budaya."
        path="/map"
        image="/hero/hero-karamatwangi.jpg"
        schema={[
          collectionPageSchema('Peta Potensi Desa', 'Jelajahi potensi Desa Karamatwangi pada peta interaktif.', '/map'),
        ]}
      />

      {/* Header bar */}
      <div className="relative z-[600] bg-white border-b border-[#E0E8E4] px-5 py-3 sm:px-8">
        <div className="mx-auto max-w-[1280px] flex items-center gap-3">
          <div className="flex items-center gap-2 text-[#184D47]">
            <Map className="w-5 h-5" />
            <h1 className="text-[16px] font-bold">Peta Interaktif</h1>
          </div>
          <span className="text-[13px] text-[#8A9C99] hidden sm:inline">
            Klik marker untuk melihat detail potensi desa
          </span>
        </div>
      </div>

      {/* Map */}
      <div className="relative" style={{ height: 'calc(100vh - 52px)' }}>
        <MapContainer
          center={MAP_CENTER}
          zoom={MAP_ZOOM}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          className="h-full w-full"
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer url={TILE_URL} attribution={TILE_ATTR} />

          <FitBounds potentials={filteredPotentials} />

          <MarkerClusterGroup
            potentials={filteredPotentials}
            selectedId={selectedPotential?.id}
            onSelect={handleSelect}
          />

          {/* Desktop popup */}
          {!isMobile && selectedPotential && (
            <Popup
              position={[
                Number(selectedPotential.location?.latitude),
                Number(selectedPotential.location?.longitude),
              ]}
              maxWidth={280}
              closeButton={false}
              className="map-popup-container"
            >
              <MapPopup potential={selectedPotential} />
            </Popup>
          )}

          <LocateButton />
        </MapContainer>

        {/* Filter bar overlay */}
        <MapFilters
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          resultCount={filteredPotentials.length}
        />

        {/* Empty state */}
        {filteredPotentials.length === 0 && !potentialsLoading && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[500] bg-white/95 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)] text-center">
            <Layers className="w-8 h-8 text-[#B8C4C0] mx-auto mb-2" />
            <p className="text-[14px] font-semibold text-[#4A5C58]">
              Tidak ada potensi ditemukan
            </p>
            <p className="text-[12px] text-[#8A9C99] mt-1">
              Coba ubah filter atau kata kunci pencarian
            </p>
          </div>
        )}

        {/* Loading */}
        {potentialsLoading && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[500] bg-white/95 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-[#184D47] border-t-transparent rounded-full animate-spin" />
            <span className="text-[13px] font-medium text-[#4A5C58]">Menyiapkan peta desa...</span>
          </div>
        )}
      </div>

      {/* Mobile bottom sheet */}
      <MobileBottomSheet
        potential={selectedPotential}
        onClose={handleCloseSheet}
      />
    </div>
  );
}

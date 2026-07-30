import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Map, Layers } from 'lucide-react';
import { PageHeader } from '@/dashboard/components/molecules/PageHeader';
import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';
import { DashboardCard } from '@/dashboard/components/organisms/DashboardCard';
import { usePotentials } from '@/hooks/usePotentials';
import { useCategories } from '@/hooks/useCategories';
import { MarkerClusterGroup } from '@/components/map/MapMarkers';
import { MapFilters } from '@/components/map/MapFilters';
import { LocateButton } from '@/components/map/LocateButton';

import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import '@/components/map/leaflet-fix';
import 'leaflet.markercluster/dist/leaflet.markercluster-src.js';
import '@/components/map/map.css';

const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const MAP_CENTER = [-6.9200, 107.6000]; // Default center for Garut
const MAP_ZOOM = 10;
const MIN_ZOOM = 8;
const MAX_ZOOM = 18;

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

export default function DashboardMapPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPotential, setSelectedPotential] = useState(null);

  const { data: potentialsData, isLoading: potentialsLoading } = usePotentials({ per_page: 200, status: 'published' });
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

  const handleCategoryChange = useCallback((slug) => {
    setActiveCategory(slug);
    setSelectedPotential(null);
  }, []);

  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
    setSelectedPotential(null);
  }, []);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Peta Interaktif"
        description="Jelajahi dan kelola lokasi potensi desa pada peta."
        actions={
          <DashboardButton onClick={() => navigate('/dashboard/potentials/new')}>
            + Buat Potensi
          </DashboardButton>
        }
      />

      <DashboardCard className="relative h-[calc(100vh-220px)] p-0 overflow-hidden">
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

          {selectedPotential && (
            <Popup
              position={[
                Number(selectedPotential.location?.latitude),
                Number(selectedPotential.location?.longitude),
              ]}
              maxWidth={280}
              closeButton={false}
              className="map-popup-container"
            >
              <div className="p-4">
                <h3 className="text-sm font-semibold text-neutral-800">{selectedPotential.title}</h3>
                <p className="text-xs text-neutral-500 mt-1">{selectedPotential.location?.address}</p>
                <DashboardButton size="sm" className="mt-3 w-full" onClick={() => navigate(`/dashboard/potentials/${selectedPotential.id}`)}>
                  Lihat Detail
                </DashboardButton>
              </div>
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
      </DashboardCard>
    </div>
  );
}

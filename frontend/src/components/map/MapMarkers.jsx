import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { getCategoryColor } from './constants';

/**
 * Creates a custom DivIcon marker with category color.
 */
export function createMarkerIcon(categorySlug, isSelected = false) {
  const color = getCategoryColor(categorySlug);
  const size = isSelected ? 36 : 28;
  const border = isSelected ? `3px solid ${color}` : '2px solid white';
  const shadow = isSelected
    ? `0 0 0 4px ${color}33, 0 4px 12px rgba(0,0,0,0.3)`
    : '0 2px 8px rgba(0,0,0,0.25)';

  return L.divIcon({
    className: 'map-marker-icon',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: ${border};
        box-shadow: ${shadow};
        transition: all 200ms ease-out;
      ">
        <div style="
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(45deg);
          font-size: ${isSelected ? '14px' : '11px'};
          line-height: 1;
        ">${isSelected ? '●' : ''}</div>
      </div>
    `,
  });
}

/**
 * MarkerClusterWrapper — renders clustered markers.
 * Uses leaflet.markercluster for grouping nearby markers.
 */
export function MarkerClusterGroup({ potentials, selectedId, onSelect }) {
  const map = useMap();
  const clusterRef = useRef(null);
  const markersRef = useRef(new Map());

  useEffect(() => {
    if (!clusterRef.current) {
      clusterRef.current = L.markerClusterGroup({
        chunkedLoading: true,
        maxClusterRadius: 50,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        iconCreateFunction: (cluster) => {
          const count = cluster.getChildCount();
          let size = 'small';
          if (count > 20) size = 'large';
          else if (count > 10) size = 'medium';
          return L.divIcon({
            html: `<div class="cluster-icon cluster-${size}">${count}</div>`,
            className: 'map-cluster-icon',
            iconSize: L.point(40, 40),
          });
        },
      });
      map.addLayer(clusterRef.current);
    }

    return () => {
      if (clusterRef.current) {
        map.removeLayer(clusterRef.current);
        clusterRef.current = null;
      }
    };
  }, [map]);

  useEffect(() => {
    if (!clusterRef.current) return;

    clusterRef.current.clearLayers();
    markersRef.current.clear();

    potentials.forEach((p) => {
      const lat = Number(p.location?.latitude);
      const lng = Number(p.location?.longitude);
      if (!lat || !lng) return;

      const icon = createMarkerIcon(p.category?.slug, p.id === selectedId);
      const marker = L.marker([lat, lng], { icon });

      marker.on('click', () => onSelect(p));

      markersRef.current.set(p.id, marker);
      clusterRef.current.addLayer(marker);
    });
  }, [potentials, selectedId, onSelect]);

  useEffect(() => {
    if (!selectedId || !markersRef.current.has(selectedId)) return;
    const marker = markersRef.current.get(selectedId);
    const latlng = marker.getLatLng();
    map.flyTo(latlng, 15, { duration: 0.8 });
  }, [selectedId, map]);

  return null;
}

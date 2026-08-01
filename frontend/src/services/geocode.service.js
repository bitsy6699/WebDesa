import axios from 'axios';

const NOMINATIM_ENDPOINT = 'https://nominatim.openstreetmap.org/reverse';

const ADDRESS_LABELS = {
  road: 'Jalan',
  neighbourhood: 'Kampung',
  hamlet: 'Kampung',
  suburb: 'Kelurahan',
  village: 'Desa',
  town: 'Kota',
  city: 'Kota',
  county: 'Kecamatan',
  state: 'Kabupaten',
  postcode: 'Kode Pos',
};

function extractComponents(address) {
  if (!address || typeof address !== 'object') return {};

  const components = {};
  const keys = [
    'road',
    'neighbourhood',
    'hamlet',
    'suburb',
    'village',
    'town',
    'city',
    'county',
    'state',
    'postcode',
  ];

  keys.forEach((key) => {
    if (address[key]) {
      components[key] = address[key];
    }
  });

  return components;
}

function formatDisplayName(components) {
  if (!Object.keys(components).length) return '';

  return Object.values(components)
    .filter(Boolean)
    .join(', ');
}

export async function reverseGeocode(latitude, longitude) {
  const response = await axios.get(NOMINATIM_ENDPOINT, {
    params: {
      format: 'jsonv2',
      lat: latitude,
      lon: longitude,
      'accept-language': 'id',
      zoom: 18,
    },
    headers: {
      'User-Agent': 'WebDesaKaramatwangi (https://web-desa-sand.vercel.app)',
    },
  });

  const raw = response.data;
  if (!raw || !raw.address) {
    return {
      displayName: '',
      components: {},
      labels: {},
    };
  }

  const components = extractComponents(raw.address);
  const labels = {};
  Object.keys(components).forEach((key) => {
    labels[key] = ADDRESS_LABELS[key] ?? key;
  });

  return {
    displayName: raw.display_name ?? formatDisplayName(components),
    components,
    labels,
  };
}

export function buildGoogleMapsUrl(latitude, longitude) {
  if (
    typeof latitude !== 'number' ||
    typeof longitude !== 'number' ||
    !isFinite(latitude) ||
    !isFinite(longitude)
  ) {
    return '';
  }
  return `https://www.google.com/maps?q=${latitude},${longitude}`;
}

export default reverseGeocode;

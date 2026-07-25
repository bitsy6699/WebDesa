/**
 * Glassmorphism style presets.
 * All shadows use the unified primary tint: rgba(24, 77, 71, ...)
 */
const glassBase = {
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.18)',
  transition: 'background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease, transform 200ms ease',
};

export const glassSurface = {
  ...glassBase,
  background: 'rgba(255,255,255,0.16)',
  boxShadow: '0 12px 40px rgba(24,77,71,0.06)',
};

export const glassSurfaceSoft = {
  ...glassBase,
  background: 'rgba(255,255,255,0.12)',
  border: '1px solid rgba(255,255,255,0.16)',
  boxShadow: '0 8px 32px rgba(24,77,71,0.08)',
};

export const glassPanel = {
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  background: 'rgba(255,255,255,0.65)',
  border: '1px solid rgba(255,255,255,0.45)',
  boxShadow: '0 8px 32px rgba(24,77,71,0.08)',
};

export const glassButtonSubtle = {
  background: 'rgba(255,255,255,0.18)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.28)',
  boxShadow: '0 4px 12px rgba(24,77,71,0.08)',
  transition: 'background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease, transform 200ms ease',
};

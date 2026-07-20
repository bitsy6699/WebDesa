const glassBase = {
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.18)',
  transition: 'background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease, transform 200ms ease',
} as const;

export const glassSurface = {
  ...glassBase,
  background: 'rgba(255,255,255,0.16)',
  boxShadow: '0 20px 60px rgba(15,61,52,0.06)',
} as const;

export const glassSurfaceSoft = {
  ...glassBase,
  background: 'rgba(255,255,255,0.12)',
  border: '1px solid rgba(255,255,255,0.16)',
  boxShadow: '0 18px 50px rgba(16,24,40,0.08)',
} as const;

export const glassPanel = {
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  background: 'rgba(255,255,255,0.65)',
  border: '1px solid rgba(255,255,255,0.45)',
  boxShadow: '0 18px 50px rgba(16,24,40,0.08)',
} as const;


export const glassButtonSubtle = {
  background: 'rgba(255,255,255,0.18)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.28)',
  boxShadow: '0 4px 14px rgba(24,77,71,0.08)',
  transition: 'background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease, transform 200ms ease',
} as const;


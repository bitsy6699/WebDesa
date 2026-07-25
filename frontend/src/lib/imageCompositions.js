const HERO_1 = '/experience/hero-1.png';
const HERO_2 = '/experience/hero-2.png';

export { HERO_1, HERO_2 };

export function heroImage(index = 1) {
  return index === 1 ? HERO_1 : HERO_2;
}

export function duotoneOverlay(baseColor = '#184D47', blendColor = '#F3F8F5') {
  return {
    backgroundImage: `linear-gradient(135deg, ${baseColor}EE, ${blendColor}88)`,
    mixBlendMode: 'multiply',
  };
}

export function imageClipPath(variant = 'diagonal') {
  const variants = {
    diagonal: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
    diagonalReverse: 'polygon(0 15%, 100% 0, 100% 100%, 0 100%)',
    hexagon: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
    circle: 'circle(50% at 50% 50%)',
    parallelogram: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)',
    wedge: 'polygon(0 0, 100% 0, 100% 60%, 0 100%)',
    frame: 'polygon(5% 5%, 95% 5%, 95% 95%, 5% 95%)',
  };
  return variants[variant] || variants.diagonal;
}

export function imageOverlayStyle(opacity = 0.6, color = '#0F3D34') {
  return {
    background: `linear-gradient(180deg,
      ${color}CC 0%,
      ${color}66 40%,
      ${color}22 70%,
      transparent 100%)`,
    opacity,
  };
}

export function blurredBackground(src = HERO_1, intensity = 24) {
  return {
    backgroundImage: `url(${src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: `blur(${intensity}px) saturate(0.7)`,
    transform: 'scale(1.1)',
  };
}

export function noiseture() {
  return {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat',
    backgroundSize: '256px 256px',
  };
}

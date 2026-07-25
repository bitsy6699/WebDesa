import { useRef, useState } from 'react';

import { Home, Grid2X2, Sprout, Star } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';

import { CountUp } from './utils';

// buildMetricItems and CountUp moved to statistics/utils.ts

export function GlassCard({
  item,
  triggered,
  compact = false,
}) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState('');
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const onMove = (event) => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (event.clientX - left) / width - 0.5;
    const y = (event.clientY - top) / height - 0.5;
    const rx = (-(y * 4)).toFixed(2);
    const ry = (x * 4).toFixed(2);
    setTilt(`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px) scale(1.02)`);
  };

  const onEnter = () => setHovered(true);
  const onLeave = () => {
    setHovered(false);
    setTilt('');
  };

  const icon = 'icon' in item && item.icon ? item.icon : (() => {
    const iconKey = 'iconKey' in item ? item.iconKey : 'star';
    const iconMap = {
      star: <Star className="h-5 w-5 text-[var(--text-muted)]" aria-hidden="true" />,
      grid: <Grid2X2 className="h-5 w-5 text-[var(--text-muted)]" aria-hidden="true" />,
      sprout: <Sprout className="h-5 w-5 text-[var(--text-muted)]" aria-hidden="true" />,
      home: <Home className="h-5 w-5 text-[var(--text-muted)]" aria-hidden="true" />,
    };

    return iconMap[iconKey ?? 'star'];
  })();

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative flex flex-col items-center justify-center gap-3 select-none overflow-hidden"
      style={{
        borderRadius: '24px',
        padding: compact ? '20px 18px' : '32px 24px',
        minHeight: compact ? '150px' : '180px',
        background: hovered ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.24)' : 'rgba(255,255,255,0.14)'}`,
        boxShadow: hovered ? '0 4px 12px rgba(16,24,40,0.08), 0 20px 48px rgba(16,24,40,0.12)' : '0 2px 8px rgba(16,24,40,0.04), 0 12px 32px rgba(16,24,40,0.08)',
        transform: tilt || 'none',
        transition: hovered
          ? 'transform 0.15s ease-out, box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease'
          : 'transform 0.3s cubic-bezier(.16,1,.3,1), box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease',
        willChange: hovered ? 'transform' : 'auto',
      }}
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[24px] bg-[linear-gradient(140deg,rgba(255,255,255,0.18)_0%,transparent_50%)]" />

      <div
        className="relative flex h-11 w-11 items-center justify-center rounded-2xl"
        style={{ background: 'rgba(24,77,71,0.08)' }}
      >
        {icon}
      </div>

      <span
        className="relative font-extrabold leading-none tracking-[-0.02em] text-[var(--text-primary)]"
        style={{ fontSize: compact ? 'clamp(1.4rem, 2vw, 1.9rem)' : 'clamp(1.875rem, 3vw, 2.625rem)' }}
      >
        {CountUp(item.value, triggered)}
        {item.suffix && <span className="ml-1 text-base font-semibold text-[var(--text-muted)]">{item.suffix}</span>}
      </span>

      <span
        className="relative text-center text-[13px] font-medium leading-tight tracking-[0.01em] text-slate-500"
        style={{ maxWidth: compact ? '108px' : '110px' }}
      >
        {item.label}
      </span>
    </div>
  );
}

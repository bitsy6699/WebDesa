import { useRef, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, Grid2X2, Sprout, Star } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { glassButtonSubtle } from '@/lib/glassStyles';
import { CountUp, type StatItemRaw } from './utils';

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  icon?: ReactNode;
}

// buildMetricItems and CountUp moved to statistics/utils.ts

export function GlassCard({
  item,
  triggered,
  compact = false,
}: {
  item: StatItem | StatItemRaw;
  triggered: boolean;
  compact?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState('');
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
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
    const iconMap: Record<NonNullable<StatItemRaw['iconKey']>, ReactNode> = {
      star: <Star className="h-5 w-5 text-[#184D47]" aria-hidden="true" />,
      grid: <Grid2X2 className="h-5 w-5 text-[#184D47]" aria-hidden="true" />,
      sprout: <Sprout className="h-5 w-5 text-[#184D47]" aria-hidden="true" />,
      home: <Home className="h-5 w-5 text-[#184D47]" aria-hidden="true" />,
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
        borderRadius: '28px',
        padding: compact ? '20px 18px' : '28px 20px',
        minHeight: compact ? '150px' : '178px',
        background: hovered ? 'rgba(255,255,255,0.24)' : 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.26)' : 'rgba(255,255,255,0.16)'}`,
        boxShadow: hovered ? '0 24px 64px rgba(16,24,40,0.16)' : '0 18px 50px rgba(16,24,40,0.10)',
        transform: tilt || 'none',
        transition: hovered
          ? 'transform 0.12s ease-out, box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease'
          : 'transform 0.24s cubic-bezier(.16,1,.3,1), box-shadow 0.24s ease, background 0.24s ease, border-color 0.24s ease',
        willChange: 'transform',
      }}
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[28px] bg-[linear-gradient(140deg,rgba(255,255,255,0.22)_0%,transparent_55%)]" />

      <div
        className="relative flex h-11 w-11 items-center justify-center rounded-2xl"
        style={{ background: 'rgba(24,77,71,0.08)' }}
      >
        {icon}
      </div>

      <span
        className="relative font-extrabold leading-none tracking-tight text-[#184D47]"
        style={{ fontSize: compact ? 'clamp(1.3rem, 2vw, 1.8rem)' : 'clamp(1.75rem, 3vw, 2.5rem)' }}
      >
        {CountUp(item.value, triggered)}
        {item.suffix && <span className="ml-1 text-base font-semibold text-[#184D47]/60">{item.suffix}</span>}
      </span>

      <span
        className="relative text-center text-[13px] font-medium leading-tight tracking-wide text-slate-500"
        style={{ maxWidth: compact ? '108px' : '110px' }}
      >
        {item.label}
      </span>
    </div>
  );
}

export function SectionCTA({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#184D47]"
      style={{
        ...glassButtonSubtle,
        height: '46px',
        paddingLeft: '24px',
        paddingRight: '20px',
        borderRadius: '999px',
        borderWidth: '1.5px',
        borderStyle: 'solid',
        color: '#184D47',
        transition: 'background 0.25s, box-shadow 0.25s, border-color 0.25s',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(event) => {
        const el = event.currentTarget;
        el.style.background = 'rgba(24,77,71,0.07)';
        el.style.boxShadow = '0 8px 24px rgba(24,77,71,0.14)';
        el.style.borderColor = 'rgba(24,77,71,0.38)';
      }}
      onMouseLeave={(event) => {
        const el = event.currentTarget;
        el.style.background = 'rgba(255,255,255,0.55)';
        el.style.boxShadow = '0 4px 14px rgba(24,77,71,0.08)';
        el.style.borderColor = 'rgba(24,77,71,0.22)';
      }}
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
}

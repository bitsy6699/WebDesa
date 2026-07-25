import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export function FloatingParticle({ count = 6, baseColor = 'rgba(111, 174, 143, 0.3)', speed = 1 }) {
  const prefersReducedMotion = useReducedMotion();
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: rand(5, 95),
      y: rand(5, 95),
      size: rand(2, 6),
      duration: rand(12, 22) / speed,
      delay: rand(0, 6),
      driftX: rand(-30, 30),
      driftY: rand(-20, 20),
    })), [count, speed]);

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: baseColor,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            x: [0, p.driftX, -p.driftX * 0.5, 0],
            y: [0, p.driftY, -p.driftY * 0.3, 0],
            opacity: [0, 0.6, 0.3, 0],
            scale: [0, 1, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export function LeafFloat({ count = 3, color = '#6FAE8F' }) {
  const prefersReducedMotion = useReducedMotion();
  const leaves = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      startX: rand(10, 90),
      delay: rand(0, 8),
      duration: rand(18, 28),
      size: rand(8, 16),
    })), [count]);

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {leaves.map((l) => (
        <motion.div
          key={l.id}
          className="absolute"
          style={{
            left: `${l.startX}%`,
            top: '-5%',
            width: l.size,
            height: l.size * 1.4,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, rand(-40, 40), rand(-20, 20), rand(-30, 30), 0],
            rotate: [0, 90, 180, 270, 360],
            opacity: [0, 0.5, 0.4, 0.3, 0],
          }}
          transition={{
            duration: l.duration,
            delay: l.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg viewBox="0 0 24 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M12 2C8 10 2 16 2 22C2 28 6 32 12 32C18 32 22 28 22 22C22 16 16 10 12 2Z" fill={color} opacity="0.4" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export function AmbientFog({ count = 2, opacity = 0.06 }) {
  const prefersReducedMotion = useReducedMotion();
  const fogLayers = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      duration: rand(20, 35),
      delay: rand(0, 5),
      startX: rand(-20, 40),
    })), [count]);

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {fogLayers.map((f) => (
        <motion.div
          key={f.id}
          className="absolute"
          style={{
            width: '60%',
            height: '100%',
            background: `linear-gradient(90deg, transparent, rgba(255,255,255,${opacity}), transparent)`,
            left: `${f.startX}%`,
            top: 0,
          }}
          animate={{
            x: ['-20%', '120%'],
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

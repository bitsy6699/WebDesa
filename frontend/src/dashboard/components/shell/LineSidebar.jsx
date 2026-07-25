import { useRef, useState, useCallback, useEffect, memo } from 'react';
import { clsx } from 'clsx';
import './LineSidebar.css';

const FALLOFF_CURVES = {
  linear: (p) => p,
  smooth: (p) => p * p * (3 - 2 * p),
  sharp: (p) => p * p * p,
};

export const LineSidebar = memo(function LineSidebar({
  groups = [],
  activeIndex = null,
  onItemClick,
  collapsed = false,
  accentColor = '#184D47',
  textColor = '#78716C',
  markerColor = '#E8ECEA',
  showMarker = true,
  proximityRadius = 80,
  maxShift = 24,
  falloff = 'smooth',
  markerLength = 40,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 4,
  fontSize = 0.8125,
  smoothing = 100,
  className = '',
}) {
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const targetsRef = useRef([]);
  const currentRef = useRef([]);
  const rafRef = useRef(null);
  const lastRef = useRef(0);
  const activeRef = useRef(activeIndex);
  const smoothingRef = useRef(smoothing);

  activeRef.current = activeIndex;
  smoothingRef.current = smoothing;

  const runFrame = useCallback((now) => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const tau = Math.max(smoothingRef.current, 1) / 1000;
    const k = 1 - Math.exp(-dt / tau);

    let moving = false;
    const items = itemRefs.current;
    for (let i = 0; i < items.length; i++) {
      const el = items[i];
      if (!el) continue;
      const target = Math.max(targetsRef.current[i] || 0, activeRef.current === i ? 1 : 0);
      const cur = currentRef.current[i] || 0;
      const next = cur + (target - cur) * k;
      const settled = Math.abs(target - next) < 0.0015;
      const value = settled ? target : next;
      currentRef.current[i] = value;
      el.style.setProperty('--effect', value.toFixed(4));
      if (!settled) moving = true;
    }

    rafRef.current = moving ? requestAnimationFrame(runFrame) : null;
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current != null) return;
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  const handlePointerMove = useCallback(
    (e) => {
      const list = listRef.current;
      if (!list) return;
      const rect = list.getBoundingClientRect();
      const pointerY = e.clientY - rect.top;
      const ease = FALLOFF_CURVES[falloff] ?? FALLOFF_CURVES.linear;
      const items = itemRefs.current;
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (!el) continue;
        const center = el.offsetTop + el.offsetHeight / 2;
        const distance = Math.abs(pointerY - center);
        targetsRef.current[i] = ease(Math.max(0, 1 - distance / proximityRadius));
      }
      startLoop();
    },
    [falloff, proximityRadius, startLoop],
  );

  const handlePointerLeave = useCallback(() => {
    targetsRef.current = targetsRef.current.map(() => 0);
    startLoop();
  }, [startLoop]);

  useEffect(() => {
    startLoop();
  }, [activeIndex, startLoop]);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const flatItems = [];
  let flatIndex = 0;
  for (const group of groups) {
    for (const item of group.items) {
      flatItems.push({ ...item, groupLabel: group.label, flatIndex });
      flatIndex++;
    }
  }

  return (
    <nav
      className={clsx(
        'line-sidebar',
        showMarker && 'line-sidebar--markers',
        scaleTick && 'line-sidebar--scale-tick',
        collapsed && 'line-sidebar--collapsed',
        className,
      )}
      style={{
        '--accent-color': accentColor,
        '--text-color': textColor,
        '--marker-color': markerColor,
        '--marker-length': `${markerLength}px`,
        '--marker-gap': '0px',
        '--tick-scale': tickScale,
        '--max-shift': `${maxShift}px`,
        '--item-gap': `${itemGap}px`,
        '--font-size': `${fontSize}rem`,
        '--smoothing': `${smoothing}ms`,
      }}
      aria-label="Navigasi dashboard"
    >
      <ul
        ref={listRef}
        className="line-sidebar__list"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {groups.map((group) => (
          <li key={group.key} className="line-sidebar__group">
            <span className="line-sidebar__group-label">{group.label}</span>
            <ul className="line-sidebar__list" style={{ gap: `${itemGap}px` }}>
              {group.items.map((item) => {
                const flatIdx = flatItems.find((f) => f.route === item.route)?.flatIndex;
                const Icon = item.icon;
                const isActive = flatIdx === activeIndex;

                return (
                  <li
                    key={item.route}
                    ref={(el) => {
                      itemRefs.current[flatIdx] = el;
                    }}
                    className={clsx('line-sidebar__item', isActive && 'line-sidebar__item--active')}
                    onClick={() => onItemClick?.(flatIdx, item)}
                  >
                    {isActive && <span className="line-sidebar__accent" aria-hidden="true" />}
                    {showMarker && !collapsed && (
                      <span className="line-sidebar__marker" aria-hidden="true" />
                    )}
                    <div className="line-sidebar__item-content">
                      {Icon && (
                        <span className="line-sidebar__icon">
                          <Icon className="h-[20px] w-[20px]" strokeWidth={isActive ? 2 : 1.75} />
                        </span>
                      )}
                      <span className="line-sidebar__label">
                        <span className="line-sidebar__text">{item.title}</span>
                      </span>
                      {item.badge && <span className="line-sidebar__badge">{item.badge}</span>}
                    </div>
                    {collapsed && <span className="line-sidebar__tooltip">{item.title}</span>}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
});

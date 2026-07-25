import { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useMotionValue } from 'framer-motion';

const LenisContext = createContext(null);

export function LenisProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis() {
  return useContext(LenisContext);
}

export function useLenisScroll() {
  const lenis = useLenis();
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    if (!lenis) return;

    const update = (e) => {
      scrollYProgress.set(e.progress);
    };

    lenis.on('scroll', update);
    return () => lenis.off('scroll', update);
  }, [lenis, scrollYProgress]);

  return { scrollYProgress };
}

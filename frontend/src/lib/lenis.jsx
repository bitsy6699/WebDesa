import { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { useMotionValue } from 'framer-motion';

const LenisContext = createContext(null);

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.1,
      touchMultiplier: 1,
      wheelMultiplier: 1,
      autoRaf: true,
    });

    setLenis(instance);

    return () => {
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
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

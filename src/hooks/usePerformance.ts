import { useState, useEffect, useCallback } from 'react';

interface PerformanceConfig {
  prefersReducedMotion: boolean;
  isMobile: boolean;
  isLowPower: boolean;
  isTabVisible: boolean;
}

export function usePerformance(): PerformanceConfig {
  const [config, setConfig] = useState<PerformanceConfig>(() => ({
    prefersReducedMotion: false,
    isMobile: false,
    isLowPower: false,
    isTabVisible: true,
  }));

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isMobile = window.innerWidth < 1024 || 'ontouchstart' in window;
    const isLowPower = isMobile || navigator.hardwareConcurrency <= 4;

    setConfig({
      prefersReducedMotion: reducedMotionQuery.matches,
      isMobile,
      isLowPower,
      isTabVisible: !document.hidden,
    });

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setConfig(prev => ({ ...prev, prefersReducedMotion: e.matches }));
    };

    const handleVisibilityChange = () => {
      setConfig(prev => ({ ...prev, isTabVisible: !document.hidden }));
    };

    const handleResize = () => {
      const isMobile = window.innerWidth < 1024 || 'ontouchstart' in window;
      setConfig(prev => ({ 
        ...prev, 
        isMobile,
        isLowPower: isMobile || navigator.hardwareConcurrency <= 4
      }));
    };

    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize);

    return () => {
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return config;
}

export function useShouldAnimate(): boolean {
  const { prefersReducedMotion, isLowPower } = usePerformance();
  return !prefersReducedMotion && !isLowPower;
}

export function useShouldShowHeavyEffects(): boolean {
  const { prefersReducedMotion, isMobile } = usePerformance();
  return !prefersReducedMotion && !isMobile;
}

export function useRAF(callback: (time: number) => void, enabled: boolean = true): void {
  useEffect(() => {
    if (!enabled) return;

    let rafId: number;
    const animate = (time: number) => {
      callback(time);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [callback, enabled]);
}

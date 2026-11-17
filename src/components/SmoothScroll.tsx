import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

/**
 * Initializes Lenis inertial smooth scrolling on fine-pointer desktop screens,
 * and disables it automatically for `prefers-reduced-motion: reduce`, coarse/touch
 * devices, and compact viewports (<= 767px) so native phone momentum scroll runs at 60fps.
 */
export function SmoothScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarseQuery = window.matchMedia('(pointer: coarse)');
    const smallViewportQuery = window.matchMedia('(max-width: 767px)');

    let lenis: Lenis | null = null;
    let rafId = 0;

    const stopLenis = () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };

    const startOrSyncLenis = () => {
      const shouldDisable =
        motionQuery.matches || coarseQuery.matches || smallViewportQuery.matches;

      if (shouldDisable) {
        stopLenis();
        return;
      }

      if (lenis) return;

      lenis = new Lenis({
        lerp: 0.085,
        smoothWheel: true,
      });

      (window as Window & { __lenis?: Lenis }).__lenis = lenis;

      const raf = (time: number) => {
        if (!lenis) return;
        lenis.raf(time);
        rafId = window.requestAnimationFrame(raf);
      };
      rafId = window.requestAnimationFrame(raf);
    };

    startOrSyncLenis();

    motionQuery.addEventListener('change', startOrSyncLenis);
    coarseQuery.addEventListener('change', startOrSyncLenis);
    smallViewportQuery.addEventListener('change', startOrSyncLenis);

    return () => {
      motionQuery.removeEventListener('change', startOrSyncLenis);
      coarseQuery.removeEventListener('change', startOrSyncLenis);
      smallViewportQuery.removeEventListener('change', startOrSyncLenis);
      stopLenis();
    };
  }, []);

  useEffect(() => {
    const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [pathname]);

  return null;
}

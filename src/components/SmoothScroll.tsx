import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

/**
 * Initializes Lenis inertial smooth scrolling on fine-pointer desktop/tablet screens,
 * disables it for `prefers-reduced-motion: reduce`, coarse/touch devices, and <= 479px phones,
 * and calls lenis.resize() on route changes, layout updates, and image loads.
 */
export function SmoothScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarseQuery = window.matchMedia('(pointer: coarse)');
    const smallViewportQuery = window.matchMedia('(max-width: 479px)');

    let lenis: Lenis | null = null;
    let rafId = 0;
    let resizeRaf = 0;
    let bodyObserver: ResizeObserver | null = null;

    const handleResizeSignal = () => {
      if (!lenis) return;
      if (resizeRaf) window.cancelAnimationFrame(resizeRaf);
      resizeRaf = window.requestAnimationFrame(() => {
        lenis?.resize();
      });
    };

    const stopLenis = () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
      if (resizeRaf) {
        window.cancelAnimationFrame(resizeRaf);
        resizeRaf = 0;
      }
      if (bodyObserver) {
        bodyObserver.disconnect();
        bodyObserver = null;
      }
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
      document.documentElement.classList.remove('is-lenis-active');
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };

    const startOrSyncLenis = () => {
      const shouldDisable =
        motionQuery.matches || smallViewportQuery.matches;

      if (shouldDisable) {
        stopLenis();
        return;
      }

      if (lenis) return;

      lenis = new Lenis({
        lerp: 0.075,
        smoothWheel: true,
        autoResize: true,
      });

      document.documentElement.classList.add('is-lenis-active');
      (window as Window & { __lenis?: Lenis }).__lenis = lenis;

      bodyObserver = new ResizeObserver(handleResizeSignal);
      bodyObserver.observe(document.body);

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
    window.addEventListener('lenis:resize', handleResizeSignal);
    window.addEventListener('load', handleResizeSignal);

    return () => {
      motionQuery.removeEventListener('change', startOrSyncLenis);
      coarseQuery.removeEventListener('change', startOrSyncLenis);
      smallViewportQuery.removeEventListener('change', startOrSyncLenis);
      window.removeEventListener('lenis:resize', handleResizeSignal);
      window.removeEventListener('load', handleResizeSignal);
      stopLenis();
    };
  }, []);

  useEffect(() => {
    const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      const r1 = window.requestAnimationFrame(() => lenis.resize());
      const t1 = window.setTimeout(() => lenis.resize(), 180);
      return () => {
        window.cancelAnimationFrame(r1);
        window.clearTimeout(t1);
      };
    }

    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    return undefined;
  }, [pathname]);

  return null;
}

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

interface IntroLoaderProps {
  onComplete?: () => void;
}

const SESSION_KEY = 'portfolio-intro-seen';
const LOADER_DURATION_MS = 1150;
const EXIT_DURATION = 0.75;

/**
 * Full-screen #292929 Intro Loader matching Matteo Fabbiani reference:
 * - Fixed #292929 panel with flex space-between
 * - Top bar (.loader_top) with 1.5px #dfd8d1 border, left/right mix-blend-mode exclusion text,
 *   and sliding progress fill (.loader_progress) with mix-blend-mode exclusion
 * - Giant counter (.loader_number) at 27rem (18rem mobile, 53vw small phones) in bottom wrapper
 * - Runs once per session via sessionStorage
 * - Locks scroll during intro, releases upon completion
 */
export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return window.sessionStorage.getItem(SESSION_KEY) !== '1';
    } catch {
      return true;
    }
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) {
      onComplete?.();
      return;
    }

    if (prefersReducedMotion) {
      setProgress(100);
      const timer = window.setTimeout(() => {
        try {
          window.sessionStorage.setItem(SESSION_KEY, '1');
        } catch {
          // ignore
        }
        setVisible(false);
        onComplete?.();
      }, 150);
      return () => window.clearTimeout(timer);
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const ratio = Math.min(1, elapsed / LOADER_DURATION_MS);
      // Smooth ease-out exponential progression
      const eased = 1 - Math.pow(1 - ratio, 2.5);
      const currentVal = Math.round(eased * 100);
      setProgress(currentVal);

      if (ratio < 1) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => {
          try {
            window.sessionStorage.setItem(SESSION_KEY, '1');
          } catch {
            // ignore
          }
          setVisible(false);
          onComplete?.();
        }, 180);
      }
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      document.body.style.overflow = prevOverflow;
    };
  }, [visible, prefersReducedMotion, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="intro-loader-overlay"
          aria-hidden="true"
          initial={{ y: '0%' }}
          exit={{
            y: '-100%',
            transition: {
              duration: EXIT_DURATION,
              ease: [0.165, 0.84, 0.44, 1],
            },
          }}
        >
          {/* Top Bar */}
          <div className="loader_top">
            <div
              className="loader_progress"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
            <div className="loader_top-wrapper">
              <span className="loader_text">Keshav Anand</span>
              <span className="loader_text is-right">
                Creative Developer & UI Engineer — Crafting digital experiences with precision and motion.
              </span>
            </div>
          </div>

          {/* Bottom Counter */}
          <div className="loader_bottom">
            <div className="loader_number">
              {String(progress).padStart(2, '0')}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

interface IntroLoaderProps {
  onComplete?: () => void;
}

const SESSION_KEY = 'portfolio-intro-seen';

/**
 * Full-screen #2b2b2b Intro Loader matching the reference:
 * - Progress bar track (26em x 2px, #5e5e5e) with #b9b9b9 fill
 * - Giant counting number (27rem desktop / 18rem mobile, cream #e7e2dc, letter-spacing -0.07em)
 * - Wipes upward cleanly to reveal the hero
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
          // Ignore storage error
        }
        setVisible(false);
        onComplete?.();
      }, 150);
      return () => window.clearTimeout(timer);
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const durationMs = 1150;
    const startTime = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const ratio = Math.min(1, elapsed / durationMs);
      // Ease-out progress feel
      const eased = 1 - Math.pow(1 - ratio, 2.4);
      const nextCount = Math.round(eased * 100);
      setProgress(nextCount);

      if (ratio < 1) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => {
          try {
            window.sessionStorage.setItem(SESSION_KEY, '1');
          } catch {
            // Ignore storage error
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
            transition: { duration: 0.72, ease: [0.165, 0.84, 0.44, 1] },
          }}
        >
          <div className="intro-loader-inner">
            <div className="intro-loader-bar-wrap">
              <div className="intro-loader-track">
                <div
                  className="intro-loader-fill"
                  style={{ transform: `scaleX(${progress / 100})` }}
                />
              </div>
              <span className="intro-loader-label">Keshav Anand &middot; Portfolio</span>
            </div>

            <div className="intro-loader-counter">
              {String(progress).padStart(2, '0')}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

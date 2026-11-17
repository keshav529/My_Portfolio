import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, FileDown } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

const REFERENCE_EASE: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

const HEADLINE_LINES = [
  'Web Developer',
  'building fast, clean',
  '& interactive UIs',
];

/**
 * Stage 2 Reference Hero:
 * - Desktop (> 991px): 300vh outer section with sticky 100svh 1.25fr / 1fr grid
 * - Left: max-width 40rem, margin-left 5vw; tagline + masked line-by-line headline + dual buttons
 * - Right: 40vw tall portrait pinned to right edge, cream wipe overlay reveal, scroll-linked scale & parallax
 * - Bottom: thin 1px scroll-line indicator (hidden <= 991px)
 * - <= 991px or prefers-reduced-motion: normal stacked layout, square image, height auto, no parallax/pinning
 */
export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isCompactViewport, setIsCompactViewport] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 991 : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 991px)');
    const update = () => setIsCompactViewport(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const disableParallax = Boolean(prefersReducedMotion) || isCompactViewport;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });

  // Scroll-linked subtle scale and vertical parallax over the 300vh track (desktop only)
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0px', '-24px']);
  const scrollLineScaleY = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  return (
    <section
      ref={heroRef}
      className={`hero-scroll-section ${prefersReducedMotion ? 'is-reduced-motion' : ''}`}
      aria-labelledby="home-hero-title"
    >
      <div className="hero-sticky-viewport">
        <div className="hero-split-grid">
          {/* Left Text Column */}
          <motion.div
            className="hero-text-col"
            style={disableParallax ? undefined : { y: textY }}
          >
            <motion.p
              className="eyebrow-tagline hero-tagline"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: REFERENCE_EASE }}
            >
              {PROFILE.tagline}
            </motion.p>

            <h1 id="home-hero-title" className="hero-display-headline">
              {HEADLINE_LINES.map((line, idx) => (
                <span key={line} className="hero-line-mask">
                  <motion.span
                    className="hero-line-inner"
                    initial={prefersReducedMotion ? false : { y: '108%' }}
                    animate={{ y: '0%' }}
                    transition={{
                      duration: 0.72,
                      delay: 0.08 + idx * 0.075,
                      ease: REFERENCE_EASE,
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div
              className="hero-cta-row"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: REFERENCE_EASE }}
            >
              <Link to="/work" className="btn-primary-editorial">
                <span>View my work</span>
              </Link>

              <a
                href={PROFILE.resumeUrl}
                download
                className="btn-secondary-editorial"
              >
                <FileDown size={16} aria-hidden="true" />
                <span>Download resume</span>
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Pinned Tall Portrait with Cream Wipe Overlay + Scroll Parallax */}
          <div className="hero-media-col">
            <div className="hero-image-frame">
              <motion.img
                src={PROFILE.profilePhoto}
                alt="Portrait of Keshav Anand, aspiring software developer"
                width={PROFILE.profilePhotoWidth}
                height={PROFILE.profilePhotoHeight}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="hero-portrait-img"
                style={
                  disableParallax
                    ? undefined
                    : { scale: mediaScale, y: mediaY }
                }
              />

              {!prefersReducedMotion && (
                <motion.div
                  className="hero-cream-wipe"
                  aria-hidden="true"
                  initial={{ scaleY: 1 }}
                  animate={{ scaleY: 0 }}
                  transition={{ duration: 0.85, delay: 0.12, ease: REFERENCE_EASE }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Thin 1px Bottom Scroll Indicator (Desktop only) */}
        <div className="hero-scroll-indicator" aria-hidden="true">
          <div className="hero-scroll-track">
            <motion.div
              className="hero-scroll-line"
              style={
                disableParallax
                  ? { scaleY: 1 }
                  : { scaleY: scrollLineScaleY }
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

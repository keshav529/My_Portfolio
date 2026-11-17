import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Reveal } from '../components/Reveal';
import { PROCESS_STEPS, PROFILE } from '../data/portfolioData';

const REFERENCE_EASE: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

const CUBE_WORDS = ['Understand', 'Plan', 'Build', 'Improve'] as const;

const PROCESS_MARQUEE_ONE = [
  'Understand constraints',
  'Figma wireframes',
  'Semantic HTML5',
  'Modular CSS3',
  'Responsive grids',
  'Keyboard accessibility',
];

const PROCESS_MARQUEE_TWO = [
  'Interactive JavaScript',
  'Fetch API integration',
  'Git & GitHub workflow',
  'Cross-device testing',
  'Vercel deployment',
  'Continuous iteration',
];

function StepIllustration({ step }: { step: string }) {
  if (step === '01') {
    return (
      <svg viewBox="0 0 360 240" className="process-diagram-svg" aria-hidden="true">
        <rect x="28" y="28" width="140" height="84" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <rect x="192" y="28" width="140" height="84" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" />
        <rect x="28" y="136" width="304" height="76" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="98" cy="70" r="18" fill="none" stroke="#ff5330" strokeWidth="2" />
        <path d="M168 70 H192 M180 112 V136" stroke="#ff5330" strokeWidth="1.75" />
        <line x1="56" y1="166" x2="220" y2="166" stroke="currentColor" strokeWidth="1.5" />
        <line x1="56" y1="186" x2="170" y2="186" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
      </svg>
    );
  }
  if (step === '02') {
    return (
      <svg viewBox="0 0 360 240" className="process-diagram-svg" aria-hidden="true">
        <rect x="32" y="24" width="180" height="192" rx="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <rect x="48" y="42" width="148" height="32" rx="6" fill="none" stroke="#ff5330" strokeWidth="1.75" />
        <rect x="48" y="88" width="68" height="110" rx="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <rect x="128" y="88" width="68" height="110" rx="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <rect x="236" y="48" width="92" height="168" rx="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <rect x="250" y="68" width="64" height="24" rx="5" fill="none" stroke="#ff5330" strokeWidth="1.75" />
        <line x1="250" y1="112" x2="314" y2="112" stroke="currentColor" strokeWidth="1.5" />
        <line x1="250" y1="132" x2="300" y2="132" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
      </svg>
    );
  }
  if (step === '03') {
    return (
      <svg viewBox="0 0 360 240" className="process-diagram-svg" aria-hidden="true">
        <rect x="28" y="28" width="304" height="184" rx="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <line x1="28" y1="64" x2="332" y2="64" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="52" cy="46" r="5" fill="#ff5330" />
        <circle cx="70" cy="46" r="5" fill="currentColor" opacity="0.5" />
        <circle cx="88" cy="46" r="5" fill="currentColor" opacity="0.5" />
        <path d="M98 112 L72 138 L98 164" fill="none" stroke="#ff5330" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M262 112 L288 138 L262 164" fill="none" stroke="#ff5330" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="194" y1="102" x2="166" y2="174" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 360 240" className="process-diagram-svg" aria-hidden="true">
      <circle cx="180" cy="120" r="76" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
      <circle cx="180" cy="120" r="48" fill="none" stroke="#ff5330" strokeWidth="1.75" />
      <path d="M162 120 L175 133 L200 106" fill="none" stroke="#ff5330" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="180" cy="44" r="6" fill="currentColor" />
      <circle cx="256" cy="120" r="6" fill="#ff5330" />
      <circle cx="180" cy="196" r="6" fill="currentColor" />
      <circle cx="104" cy="120" r="6" fill="currentColor" />
    </svg>
  );
}

/**
 * Stage 3 Process Page (/process):
 * - 100svh Hero: circular masked image (40rem / 30rem / min(17rem, 78vw)) with orbiting dots +
 *   rotating 3D text cube (disabled on reduced motion and compact phones <= 479px)
 * - 4 sequential Steps with animated hairline dividers, clean SVG architectural diagrams,
 *   and right-hand stage panels (min-height 22rem)
 * - Two opposite-direction marquee banners at the bottom
 */
export function ProcessPage() {
  const [activeFaceIndex, setActiveFaceIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const [isSmallPhone, setIsSmallPhone] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 479 : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 479px)');
    const update = () => setIsSmallPhone(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const disableCube = Boolean(prefersReducedMotion) || isSmallPhone;

  useEffect(() => {
    if (disableCube) return;
    const timer = window.setInterval(() => {
      setActiveFaceIndex((prev) => (prev + 1) % CUBE_WORDS.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [disableCube]);

  return (
    <PageTransition>
      {/* 100svh Hero: Circular Masked Image + Orbiting Dots + 3D Text Cube */}
      <section className="process-ref-hero" aria-labelledby="process-page-title">
        <div className="container">
          <div className="process-hero-stage">
            {/* Left: Circular Masked Image + Orbiting Dots */}
            <div className="process-circle-stage">
              {!disableCube && (
                <div className="process-orbit-ring" aria-hidden="true">
                  <span className="process-orbit-dot is-one" />
                  <span className="process-orbit-dot is-two" />
                  <span className="process-orbit-dot is-three" />
                </div>
              )}
              <div className="process-circle-mask">
                <img
                  src={PROFILE.workspacePhoto}
                  alt="Workspace setup representing planning and front-end execution"
                  width={PROFILE.workspacePhotoWidth}
                  height={PROFILE.workspacePhotoHeight}
                  decoding="async"
                />
              </div>
            </div>

            {/* Right: Rotating 3D Cube (9rem weight 300) + Accessibility Title */}
            <div className="process-cube-col">
              <h1 id="process-page-title" className="sr-only">
                Process: Understand, Plan, Build, Improve
              </h1>

              {disableCube ? (
                <div className="process-static-word-stack">
                  <span className="process-hero-word">{CUBE_WORDS[activeFaceIndex]}</span>
                </div>
              ) : (
                <div className="process-cube-perspective" aria-hidden="true">
                  <motion.div
                    className="process-cube-3d"
                    animate={{ rotateX: -activeFaceIndex * 90 }}
                    transition={{ duration: 0.9, ease: REFERENCE_EASE }}
                  >
                    <div className="process-cube-face is-front">
                      <span>Understand</span>
                    </div>
                    <div className="process-cube-face is-top">
                      <span>Plan</span>
                    </div>
                    <div className="process-cube-face is-back">
                      <span>Build</span>
                    </div>
                    <div className="process-cube-face is-bottom">
                      <span>Improve</span>
                    </div>
                  </motion.div>
                </div>
              )}

              <div className="process-cube-controls" role="group" aria-label="Select process phase">
                {CUBE_WORDS.map((word, idx) => (
                  <button
                    key={word}
                    type="button"
                    aria-pressed={activeFaceIndex === idx}
                    className={`process-cube-pill ${activeFaceIndex === idx ? 'is-active' : ''}`}
                    onClick={() => setActiveFaceIndex(idx)}
                  >
                    {word}
                  </button>
                ))}
              </div>

              <p className="process-hero-lead">
                A repeatable four-step workflow that takes an idea from clarity and Figma structure to tested, responsive browser code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section with Animated Divider Lines */}
      <section className="process-steps-section" aria-label="Four sequential steps of my workflow">
        <div className="container">
          <div className="process-sequence-list">
            {PROCESS_STEPS.map((item) => (
              <article key={item.step} className="process-sequence-row">
                <motion.div
                  className="process-divider-line"
                  initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.75, ease: REFERENCE_EASE }}
                  aria-hidden="true"
                />

                <div className="process-row-grid">
                  <Reveal className="process-row-text">
                    <span className="process-step-index">{item.step}</span>
                    <h2 className="process-row-title">{item.title}</h2>
                    <p className="process-row-summary">{item.summary}</p>
                    <ul className="process-detail-list">
                      {item.details.map((detail) => (
                        <li key={detail}>
                          <Check size={16} aria-hidden="true" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>

                  <Reveal delay={0.08} className="process-row-visual">
                    <div className="process-visual-panel">
                      <StepIllustration step={item.step} />
                    </div>
                  </Reveal>
                </div>
              </article>
            ))}
          </div>

          <Reveal>
            <div className="process-bottom-cta">
              <h2>See the workflow in practice</h2>
              <div className="stage-cta-row">
                <Link to="/work" className="btn-primary-editorial">
                  <span>Browse projects</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link to="/contact" className="btn-secondary-editorial">
                  <span>Start a conversation</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Two Opposite-Direction Marquee Banners at Bottom */}
      <section className="marquee-band-section" aria-label="Workflow principles">
        <div className={`marquee-row ${prefersReducedMotion ? 'is-static' : ''}`}>
          <div className="marquee-track is-left">
            {[...PROCESS_MARQUEE_ONE, ...PROCESS_MARQUEE_ONE].map((item, idx) => (
              <span key={`${item}-${idx}`} className="marquee-item">
                <span>{item}</span>
                <span className="marquee-dot" aria-hidden="true">&bull;</span>
              </span>
            ))}
          </div>
        </div>

        <div className={`marquee-row is-bordered ${prefersReducedMotion ? 'is-static' : ''}`}>
          <div className="marquee-track is-right">
            {[...PROCESS_MARQUEE_TWO, ...PROCESS_MARQUEE_TWO].map((item, idx) => (
              <span key={`${item}-${idx}`} className="marquee-item">
                <span>{item}</span>
                <span className="marquee-dot" aria-hidden="true">&bull;</span>
              </span>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

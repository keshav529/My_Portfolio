import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowRight, FileDown } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Reveal } from '../components/Reveal';
import {
  ABOUT_TIMELINE,
  PROFILE,
  SKILL_GROUPS,
} from '../data/portfolioData';

const MARQUEE_ROW_ONE = [
  'HTML5',
  'CSS3',
  'JavaScript',
  'Java',
  'C Programming',
  'Bootstrap',
  'Figma',
  'Git & GitHub',
];

const MARQUEE_ROW_TWO = [
  'React',
  'Node.js',
  'MongoDB',
  'Data Structures & Algorithms',
  'Responsive Layouts',
  'Problem Solving',
  'BCA 2022–2025',
];

/**
 * Stage 3 About Page (/about):
 * - 2-column hero (gap 9rem, collapses <= 991px) with Keshav's photo and honest intro
 * - Measured horizontal scroll timeline: sectionHeight = sticky stage height + (track.scrollWidth - stage.clientWidth)
 *   with 0–4% start hold and 96–100% end hold, GPU translate3d transform, progress bar + 6 stop dots,
 *   and vertical list fallback on <= 479px phones or prefers-reduced-motion.
 * - Two opposite-moving marquee banners (1.325rem)
 * - Real grouped Skills matrix below
 */
export function AboutPage() {
  const timelineRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const [isMobileTimeline, setIsMobileTimeline] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 479 : false
  );
  const [travelPx, setTravelPx] = useState(0);
  const [stageHeightPx, setStageHeightPx] = useState(0);
  const [activeStopIndex, setActiveStopIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 479px)');
    const update = () => setIsMobileTimeline(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const disableHorizontalTimeline = Boolean(prefersReducedMotion) || isMobileTimeline;

  const measureTimeline = useCallback(() => {
    if (disableHorizontalTimeline) {
      setTravelPx(0);
      setStageHeightPx(0);
      window.dispatchEvent(new Event('lenis:resize'));
      return;
    }

    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track) return;

    const nextTravel = Math.max(0, Math.round(track.scrollWidth - stage.clientWidth));
    const nextStageHeight = Math.round(stage.getBoundingClientRect().height);

    setTravelPx(nextTravel);
    setStageHeightPx(nextStageHeight);
    window.dispatchEvent(new Event('lenis:resize'));
  }, [disableHorizontalTimeline]);

  useEffect(() => {
    measureTimeline();

    if (disableHorizontalTimeline) return undefined;

    const stage = stageRef.current;
    const track = trackRef.current;
    const observer = new ResizeObserver(measureTimeline);
    if (stage) observer.observe(stage);
    if (track) observer.observe(track);

    window.addEventListener('resize', measureTimeline);
    window.addEventListener('orientationchange', measureTimeline);
    window.addEventListener('load', measureTimeline);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measureTimeline);
      window.removeEventListener('orientationchange', measureTimeline);
      window.removeEventListener('load', measureTimeline);
    };
  }, [disableHorizontalTimeline, measureTimeline]);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start start', 'end end'],
  });

  // Remap scroll progress with 0–4% start hold and 96–100% end hold so first & last stops rest cleanly
  const clampedTimelineProgress = useTransform(
    scrollYProgress,
    [0, 0.04, 0.96, 1],
    [0, 0, 1, 1],
    { clamp: true }
  );

  const timelineXPx = useTransform(clampedTimelineProgress, [0, 1], [0, -travelPx]);
  const timelineTransform = useMotionTemplate`translate3d(${timelineXPx}px, 0, 0)`;

  useMotionValueEvent(clampedTimelineProgress, 'change', (latest) => {
    const count = ABOUT_TIMELINE.length;
    if (count <= 1) return;
    const nextIndex = Math.min(
      count - 1,
      Math.max(0, Math.round(latest * (count - 1)))
    );
    setActiveStopIndex(nextIndex);
  });

  const handleJumpToStop = (stopIndex: number) => {
    const section = timelineRef.current;
    if (!section || disableHorizontalTimeline || travelPx <= 0) return;

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const scrollRange = Math.max(travelPx, section.offsetHeight - window.innerHeight);
    const targetProgress = 0.04 + (stopIndex / Math.max(1, ABOUT_TIMELINE.length - 1)) * 0.92;
    const targetY = sectionTop + targetProgress * scrollRange;

    const lenis = (window as Window & { __lenis?: { scrollTo: (y: number) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(targetY);
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  const sectionStyle =
    !disableHorizontalTimeline && stageHeightPx > 0
      ? ({
          height: `${stageHeightPx + travelPx}px`,
          '--timeline-stops': ABOUT_TIMELINE.length,
        } as CSSProperties)
      : ({ '--timeline-stops': ABOUT_TIMELINE.length } as CSSProperties);

  return (
    <PageTransition>
      {/* 2-Column Hero (gap 9rem) */}
      <section className="about-ref-hero-section" aria-labelledby="about-page-title">
        <div className="container">
          <div className="about-ref-hero-grid">
            <Reveal>
              <div className="about-ref-intro">
                <h1 id="about-page-title" className="about-ref-title">
                  Curious builder focused on clean web fundamentals
                </h1>
                <p className="about-ref-lead">
                  I&apos;m {PROFILE.fullName}, a {PROFILE.degree} student at {PROFILE.college}. I started by exploring how semantic HTML and CSS structure real web layouts, then moved into interactive JavaScript tools like my Currency Converter, Stopwatch, Calculator, and Tic-Tac-Toe game.
                </p>
                <p className="about-ref-lead">
                  Today, I&apos;m expanding into React, Node.js, MongoDB, and Data Structures &amp; Algorithms while designing clean, accessible interfaces in Figma.
                </p>

                <div className="stage-cta-row">
                  <Link to="/work" className="btn-primary-editorial">
                    <span>Explore my work</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <a
                    href={PROFILE.resumeUrl}
                    download
                    className="btn-secondary-editorial"
                  >
                    <FileDown size={16} aria-hidden="true" />
                    <span>Download resume</span>
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="about-ref-portrait-frame">
                <img
                  src={PROFILE.profilePhoto}
                  alt="Portrait of Keshav Anand"
                  width={PROFILE.profilePhotoWidth}
                  height={PROFILE.profilePhotoHeight}
                  decoding="async"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Timeline (100svh sticky + 1:1 measured travel on desktop/tablet, vertical list <= 479px & reduced motion) */}
      <section
        ref={timelineRef}
        style={sectionStyle}
        className={`about-timeline-section ${disableHorizontalTimeline ? 'is-static' : ''}`}
        aria-label="Education and learning journey timeline"
      >
        <div ref={stageRef} className="about-timeline-sticky">
          <div className="container about-timeline-header">
            <h2>My journey so far</h2>

            {!disableHorizontalTimeline && (
              <div className="about-timeline-progress" aria-label="Timeline progress">
                <span className="about-timeline-step-count">
                  {String(activeStopIndex + 1).padStart(2, '0')} /{' '}
                  {String(ABOUT_TIMELINE.length).padStart(2, '0')}
                </span>

                <div className="about-timeline-progress-track" aria-hidden="true">
                  <motion.div
                    className="about-timeline-progress-fill"
                    style={{ scaleX: clampedTimelineProgress }}
                  />
                </div>

                <div className="about-timeline-dots" role="group" aria-label="Jump to timeline stop">
                  {ABOUT_TIMELINE.map((stop, idx) => (
                    <button
                      key={stop.id}
                      type="button"
                      className={`about-timeline-dot-btn ${
                        idx === activeStopIndex ? 'is-active' : ''
                      }`}
                      aria-label={`Jump to ${stop.marker}: ${stop.title}`}
                      aria-current={idx === activeStopIndex ? 'step' : undefined}
                      onClick={() => handleJumpToStop(idx)}
                    >
                      <span className="about-timeline-dot-core" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="about-timeline-viewport">
            <motion.div
              ref={trackRef}
              className="about-timeline-track"
              style={
                disableHorizontalTimeline
                  ? undefined
                  : { transform: timelineTransform }
              }
            >
              {ABOUT_TIMELINE.map((stop) => (
                <article key={stop.id} className="about-timeline-slide">
                  <div className="about-timeline-card">
                    <div className="about-timeline-media">
                      <img
                        src={stop.image}
                        alt={stop.imageAlt}
                        width={stop.imageWidth}
                        height={stop.imageHeight}
                        loading="eager"
                        decoding="async"
                        onLoad={measureTimeline}
                      />
                      <div className="about-timeline-scrim" aria-hidden="true" />
                      <span className="about-timeline-big-year" aria-hidden="true">
                        {stop.marker}
                      </span>
                    </div>

                    <div className="about-timeline-copy-row">
                      <div className="about-timeline-title-col">
                        <h3>{stop.title}</h3>
                        <p className="about-timeline-sub">{stop.subtitle}</p>
                      </div>
                      <p className="about-timeline-desc">{stop.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Two Opposite-Moving Marquee Banners (1.325rem) */}
      <section className="marquee-band-section" aria-label="Technical skills and focus areas">
        <div className={`marquee-row ${prefersReducedMotion ? 'is-static' : ''}`}>
          <div className="marquee-track is-left">
            {[...MARQUEE_ROW_ONE, ...MARQUEE_ROW_ONE].map((item, idx) => (
              <span key={`${item}-${idx}`} className="marquee-item">
                <span>{item}</span>
                <span className="marquee-dot" aria-hidden="true">&bull;</span>
              </span>
            ))}
          </div>
        </div>

        <div className={`marquee-row is-bordered ${prefersReducedMotion ? 'is-static' : ''}`}>
          <div className="marquee-track is-right">
            {[...MARQUEE_ROW_TWO, ...MARQUEE_ROW_TWO].map((item, idx) => (
              <span key={`${item}-${idx}`} className="marquee-item">
                <span>{item}</span>
                <span className="marquee-dot" aria-hidden="true">&bull;</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Skills Matrix */}
      <section className="home-section" aria-labelledby="skills-overview-title">
        <div className="container">
          <Reveal>
            <div className="section-header-row">
              <h2 id="skills-overview-title">Skills &amp; tools</h2>
              <p className="editorial-section-note">
                Organized honestly into tools I use right now, technologies I am learning next, and core collaboration habits.
              </p>
            </div>
          </Reveal>

          <div className="skill-groups-stack">
            {SKILL_GROUPS.map((group, groupIdx) => (
              <Reveal key={group.id} delay={groupIdx * 0.06}>
                <div className="skill-group-block">
                  <div className="skill-group-header">
                    <h3 className="skill-group-title">{group.title}</h3>
                    <p className="skill-group-subtitle">{group.subtitle}</p>
                  </div>

                  <div className="skill-cards-grid">
                    {group.items.map((skill) => (
                      <div key={skill.name} className="skill-card">
                        <div className="skill-icon-wrap">
                          <img
                            src={skill.icon}
                            alt={`${skill.name} icon`}
                            width={skill.width}
                            height={skill.height}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <div>
                          <p className="skill-card-name">{skill.name}</p>
                          <p className="skill-card-focus">{skill.focus}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

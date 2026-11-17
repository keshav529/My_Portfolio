import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
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
 * - 1000vh outer / 100vh sticky horizontal scroll timeline moving a 600vw track across 6 real stops
 *   with 7rem white display text over 45vw x 55vh images (vertical fallback on mobile <= 767px & reduced motion)
 * - Two opposite-moving marquee banners (1.325rem)
 * - Real grouped Skills matrix below
 */
export function AboutPage() {
  const timelineRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start start', 'end end'],
  });

  // Track is 600vw wide inside 100vw sticky frame: moving -83.333333% aligns stop 6 cleanly
  const timelineX = useTransform(scrollYProgress, [0, 1], ['0%', '-83.333333%']);

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
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Timeline (1000vh / 600vw track on desktop, vertical fallback on mobile / reduced motion) */}
      <section
        ref={timelineRef}
        className={`about-timeline-section ${prefersReducedMotion ? 'is-reduced-motion' : ''}`}
        aria-label="Education and learning journey timeline"
      >
        <div className="about-timeline-sticky">
          <div className="container about-timeline-header">
            <h2>My journey so far</h2>
          </div>

          <div className="about-timeline-viewport">
            <motion.div
              className="about-timeline-track"
              style={prefersReducedMotion ? undefined : { x: timelineX }}
            >
              {ABOUT_TIMELINE.map((stop) => (
                <article key={stop.id} className="about-timeline-slide">
                  <div className="about-timeline-card">
                    <div className="about-timeline-media">
                      <img
                        src={stop.image}
                        alt={stop.imageAlt}
                        loading="lazy"
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
                            loading="lazy"
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

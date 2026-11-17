import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2, FileDown, Star, User } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Reveal } from '../components/Reveal';
import { Hero } from '../components/Hero';
import { ServiceTabs } from '../components/ServiceTabs';
import { WorkCard } from '../components/WorkCard';
import { Accordion } from '../components/Accordion';
import {
  HOME_FAQS,
  LEARNING_AND_PEER_CARDS,
  PROFILE,
  PROJECTS,
  SERVICES,
  WHY_WORK_WITH_ME,
} from '../data/portfolioData';

/**
 * Reference-Matched Home Page (Stage 2)
 * Order:
 * 1. Hero (300vh sticky 1.25fr / 1fr + line-by-line mask + cream wipe)
 * 2. Intro Statement (large weight-300 editorial paragraph)
 * 3. Services ("How I can help you" — #e5e5e5 band + opposite tracks + 2-col bullet list)
 * 4. Work (35rem horizontal scroll-linked strip of 6 real projects + "See more work")
 * 5. Why Work With Me (2-column checklist + 50% width image block)
 * 6. Reviews (7.5rem two-line banner heading + 3-col placeholder cards w/ stars & avatars)
 * 7. Resume Banner (download CTA + document cover)
 * 8. FAQ (6.5rem rows + cream-2 wipe + #292929 answer panel)
 */
export function HomePage() {
  const workStripRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress: workProgress } = useScroll({
    target: workStripRef,
    offset: ['start start', 'end end'],
  });

  // Scroll 6 cards cleanly across the horizontal viewport on desktop
  const workTrackX = useTransform(workProgress, [0, 1], ['0%', '-62%']);

  return (
    <PageTransition>
      {/* 1. HERO (300vh sticky on desktop, stacked <= 991px) */}
      <Hero />

      {/* 2. INTRO STATEMENT */}
      <section className="home-intro-section" aria-labelledby="intro-statement">
        <div className="container">
          <Reveal>
            <div className="intro-statement-shell">
              <p className="eyebrow-tagline">About my focus</p>
              <h2 id="intro-statement" className="intro-statement-headline">
                I partner with student teams, mentors, and growing products to craft clean, responsive interfaces that turn ideas into fast browser experiences.
              </h2>
              <p className="intro-statement-subcopy">
                As a {PROFILE.degree} student at {PROFILE.college}, I combine structured HTML5, modular CSS, Bootstrap, Figma, and JavaScript with active daily practice in React, Node.js, MongoDB, and Data Structures.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. SERVICES ("How I can help you") */}
      <section className="services-band-section" aria-labelledby="services-heading">
        <div className="container">
          <Reveal>
            <div className="services-band-header">
              <p className="eyebrow-tagline">Capabilities</p>
              <h2 id="services-heading" className="services-band-title">
                How I can help you
              </h2>
            </div>
          </Reveal>
        </div>

        <ServiceTabs services={SERVICES} />
      </section>

      {/* 4. WORK (35rem Horizontal Scroll-Linked Strip on Desktop, 85vw Swipeable Row on Mobile) */}
      <section
        ref={workStripRef}
        className={`work-strip-section ${prefersReducedMotion ? 'is-reduced-motion' : ''}`}
        aria-labelledby="work-preview-heading"
      >
        <div className="work-strip-sticky">
          <div className="container work-strip-header-wrap">
            <Reveal>
              <div className="work-strip-header">
                <div>
                  <p className="eyebrow-tagline">Work &middot; Case Studies</p>
                  <h2 id="work-preview-heading" className="work-strip-heading">
                    Selected builds
                  </h2>
                </div>
                <p className="work-strip-count">
                  01 &mdash; 0{PROJECTS.length}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Horizontal Track (Desktop scroll-driven x, mobile horizontal scroll-snap) */}
          <div className="work-strip-viewport">
            <motion.div
              className="work-strip-track"
              style={prefersReducedMotion ? undefined : { x: workTrackX }}
            >
              {PROJECTS.map((project) => (
                <WorkCard key={project.slug} project={project} variant="strip" />
              ))}
            </motion.div>
          </div>

          <div className="container work-strip-footer">
            <Link to="/work" className="btn-secondary-editorial">
              <span>See more work</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. WHY WORK WITH ME (2-Column Checklist + 50% Width Image Block, gap 5rem) */}
      <section className="why-ref-section" aria-labelledby="why-heading">
        <div className="container">
          <Reveal>
            <div className="why-ref-header">
              <p className="eyebrow-tagline">Standards</p>
              <h2 id="why-heading">Why work with me</h2>
            </div>
          </Reveal>

          <div className="why-ref-layout">
            <Reveal delay={0.05} className="why-ref-list-col">
              <ul className="why-ref-checklist">
                {WHY_WORK_WITH_ME.map((point) => (
                  <li key={point} className="why-ref-item">
                    <CheckCircle2
                      size={20}
                      className="why-ref-check-icon"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12} className="why-ref-media-col">
              <div className="why-ref-image-frame">
                <img
                  src="/image/contactphoto.jpg"
                  alt="Laptop coding workspace showcasing clean front-end craft"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. REVIEWS / PLACEHOLDERS (Big Two-Line 7.5rem Banner + 3-Col Grid) */}
      <section className="reviews-ref-section" aria-labelledby="notes-heading">
        <div className="container">
          <Reveal>
            <p className="eyebrow-tagline">Growth &amp; Peer Placeholders</p>
            <h2 id="notes-heading" className="reviews-banner-heading">
              <span className="reviews-line-black">Nice words</span>
              <span className="reviews-line-orange">&amp; milestones</span>
            </h2>
          </Reveal>

          <div className="reviews-ref-grid">
            {LEARNING_AND_PEER_CARDS.map((card, index) => {
              const isPlaceholder = card.id.includes('placeholder');
              return (
                <Reveal key={card.id} delay={index * 0.08}>
                  <article
                    className={`review-ref-card ${
                      isPlaceholder ? 'is-placeholder' : ''
                    }`}
                  >
                    <div className="review-stars-row" aria-label={isPlaceholder ? 'Placeholder rating slot' : 'Active milestone'}>
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          size={16}
                          className={isPlaceholder ? 'review-star-muted' : 'review-star-filled'}
                          fill={isPlaceholder ? 'none' : 'currentColor'}
                          aria-hidden="true"
                        />
                      ))}
                      <span className="review-tag-label">{card.label}</span>
                    </div>

                    <h3 className="review-ref-title">{card.title}</h3>
                    <p className="review-ref-body">{card.body}</p>

                    <div className="review-author-row">
                      <div className="review-avatar-circle" aria-hidden="true">
                        {isPlaceholder ? (
                          <User size={18} />
                        ) : (
                          <img src={PROFILE.profilePhoto} alt="" />
                        )}
                      </div>
                      <p className="review-author-note">{card.authorNote}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. RESUME BANNER */}
      <section className="resume-ref-section" aria-labelledby="resume-banner-heading">
        <div className="container">
          <Reveal>
            <div className="resume-ref-card">
              <div className="resume-ref-content">
                <p className="eyebrow-tagline">Curriculum Vitae</p>
                <h2 id="resume-banner-heading" className="resume-ref-title">
                  Download my resume
                </h2>
                <p className="resume-ref-copy">
                  Get a complete PDF summary of my BCA coursework (2022–2025), technical skills across HTML, CSS, JavaScript, C, Java, and Figma, plus verified links.
                </p>
                <div className="stage-cta-row">
                  <a
                    href={PROFILE.resumeUrl}
                    download
                    className="btn-primary-editorial"
                  >
                    <FileDown size={16} aria-hidden="true" />
                    <span>Download PDF Resume</span>
                  </a>
                  <Link to="/resources" className="btn-secondary-editorial">
                    <span>View Resources</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="resume-ref-cover">
                <img
                  src={PROFILE.resumeCover}
                  alt="Document cover preview of Keshav Anand's CV"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. FAQ (6.5rem Rows + Cream-2 Wipe + #292929 Panel) */}
      <section className="faq-ref-section" aria-labelledby="faq-heading">
        <div className="container">
          <Reveal>
            <div className="faq-ref-header">
              <p className="eyebrow-tagline">FAQ</p>
              <h2 id="faq-heading">Common questions</h2>
            </div>
          </Reveal>

          <Accordion items={HOME_FAQS} />
        </div>
      </section>
    </PageTransition>
  );
}

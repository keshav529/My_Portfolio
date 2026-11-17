import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Code2, ExternalLink, Maximize2, X } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Reveal } from '../components/Reveal';
import { ImageSlot } from '../components/ImageSlot';
import { PROJECTS } from '../data/portfolioData';

const REFERENCE_EASE: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

/**
 * Stage 3 Project Detail Page (/work/:slug):
 * - Header grid 1.5fr / 1fr: left = title + description + links; right = orange-bordered tags + 2x2 meta list
 * - 4-column meta row (Role, Tools, Year, Type) with 1px black top & bottom borders
 * - Content blocks in 1fr / 1.5fr grids (Overview, What it does, What I learned, Challenges)
 * - Image gallery: full-width 16:9 screenshot (click to open Lightbox) + 2-column square slots
 * - Live demo / GitHub secondary links + Next project link
 */
export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const currentIndex = PROJECTS.findIndex((item) => item.slug === slug);
  const project = currentIndex >= 0 ? PROJECTS[currentIndex] : undefined;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mobileExists, setMobileExists] = useState(true);
  const [detailExists, setDetailExists] = useState(true);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const openerBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setLightboxOpen(false);
    setMobileExists(true);
    setDetailExists(true);
  }, [slug]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxOpen(false);
        openerBtnRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusTimer);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen]);

  if (!project) {
    return (
      <PageTransition>
        <section className="not-found-section">
          <div className="container">
            <div className="not-found-card">
              <h1 className="not-found-title">We couldn&apos;t find that project</h1>
              <p className="not-found-copy">
                The case study link may have changed. Return to the work archive to browse all projects.
              </p>
              <Link to="/work" className="btn-primary-editorial">
                <ArrowLeft size={16} aria-hidden="true" />
                <span>Back to Work</span>
              </Link>
            </div>
          </div>
        </section>
      </PageTransition>
    );
  }

  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <PageTransition>
      <article className="project-detail-page">
        {/* Top Header Grid: 1.5fr / 1fr */}
        <section className="case-header-section" aria-labelledby="project-detail-title">
          <div className="container">
            <Reveal>
              <Link to="/work" className="back-link-editorial">
                <ArrowLeft size={16} aria-hidden="true" />
                <span>All projects</span>
              </Link>

              <div className="case-header-grid">
                {/* Left 1.5fr: Title + Short Description + Links */}
                <div className="case-header-main">
                  <h1 id="project-detail-title" className="case-detail-title">
                    {project.title}
                  </h1>
                  <p className="case-detail-lead">{project.shortDescription}</p>

                  <div className="case-header-links">
                    {project.hasLiveDemo ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary-editorial"
                      >
                        <span>Live demo</span>
                        <ExternalLink size={15} aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="case-pending-note">
                        Live demo (pending deployment)
                      </span>
                    )}

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary-editorial"
                    >
                      <Code2 size={15} aria-hidden="true" />
                      <span>
                        {project.hasExactRepo ? 'GitHub' : 'GitHub profile (repo pending)'}
                      </span>
                    </a>
                  </div>
                </div>

                {/* Right 1fr: Orange-bordered tag chips + 2x2 meta list */}
                <div className="case-header-aside">
                  <div className="case-tag-chips" aria-label="Technologies used">
                    {project.tags.map((tag) => (
                      <span key={tag} className="case-tag-chip">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <dl className="case-quick-meta">
                    <div className="case-quick-meta-cell">
                      <dt>Category</dt>
                      <dd>{project.category}</dd>
                    </div>
                    <div className="case-quick-meta-cell">
                      <dt>Role</dt>
                      <dd>{project.role}</dd>
                    </div>
                    <div className="case-quick-meta-cell">
                      <dt>Year</dt>
                      <dd>{project.year}</dd>
                    </div>
                    <div className="case-quick-meta-cell">
                      <dt>Type</dt>
                      <dd>{project.projectType}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 4-Column Meta Row (1px solid black top & bottom borders) */}
        <section className="case-meta-strip-section" aria-label="Project metadata">
          <div className="container">
            <Reveal delay={0.05}>
              <dl className="case-meta-four-grid">
                <div className="case-meta-col">
                  <dt>Role</dt>
                  <dd>{project.role}</dd>
                </div>
                <div className="case-meta-col">
                  <dt>Tools</dt>
                  <dd>{project.tags.join(', ')}</dd>
                </div>
                <div className="case-meta-col">
                  <dt>Year</dt>
                  <dd>{project.year}</dd>
                </div>
                <div className="case-meta-col">
                  <dt>Type</dt>
                  <dd>{project.projectType}</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </section>

        {/* Image Gallery: Full-Width 16:9 Screenshot + 2-Column Square Slots */}
        <section className="case-gallery-section" aria-label="Project gallery">
          <div className="container">
            <Reveal delay={0.08}>
              <div className="case-gallery-primary-wrap">
                <button
                  ref={openerBtnRef}
                  type="button"
                  className="case-gallery-trigger"
                  onClick={() => setLightboxOpen(true)}
                  aria-label={`Open full-size screenshot of ${project.title}`}
                >
                  <ImageSlot
                    src={project.image}
                    fallback="project-grid"
                    alt={project.imageAlt}
                    width={project.imageWidth}
                    height={project.imageHeight}
                    focal={project.imageFocal}
                    loading="eager"
                    ratio="16 / 9"
                    disableTreatment
                  />
                  <span className="case-gallery-zoom-badge" aria-hidden="true">
                    <Maximize2 size={16} />
                    <span>Expand</span>
                  </span>
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Content Blocks in 1fr / 1.5fr Grids */}
        <section className="case-blocks-section" aria-label="Case study narrative">
          <div className="container">
            <div className="case-blocks-stack">
              <Reveal>
                <div className="case-block-row">
                  <h2 className="case-block-heading">Overview</h2>
                  <p className="case-block-copy">{project.overview}</p>
                </div>
              </Reveal>

              <Reveal delay={0.04}>
                <div className="case-block-row">
                  <h2 className="case-block-heading">What it does</h2>
                  <p className="case-block-copy">{project.whatItDoes}</p>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="case-block-row">
                  <h2 className="case-block-heading">What I learned</h2>
                  <p className="case-block-copy">{project.whatILearned}</p>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="case-block-row">
                  <h2 className="case-block-heading">Challenges</h2>
                  <p className="case-block-copy">{project.challenges}</p>
                </div>
              </Reveal>
            </div>

            {/* 2-Column Square Image Slots (only rendered when files exist on disk) */}
            {(mobileExists || detailExists) && (
              <Reveal delay={0.1}>
                <div className="case-square-gallery">
                  {mobileExists && (
                    <figure className="case-square-slot">
                      <div className="case-square-media">
                        <ImageSlot
                          src={`/image/${project.slug}-mobile.webp`}
                          fallback="mobile-view"
                          alt={`${project.title} responsive mobile screen`}
                          width={600}
                          height={600}
                          focal="50% 20%"
                          ratio="1 / 1"
                          disableTreatment
                          onError={() => setMobileExists(false)}
                        />
                      </div>
                      <figcaption className="case-square-caption">
                        <span className="case-placeholder-title">Responsive mobile view</span>
                        <span className="case-placeholder-hint">
                          public/image/{project.slug}-mobile.webp (600&times;600)
                        </span>
                      </figcaption>
                    </figure>
                  )}

                  {detailExists && (
                    <figure className="case-square-slot">
                      <div className="case-square-media">
                        <ImageSlot
                          src={`/image/${project.slug}-detail.webp`}
                          fallback="state-detail"
                          alt={`${project.title} interactive state detail`}
                          width={600}
                          height={600}
                          focal="50% 35%"
                          ratio="1 / 1"
                          disableTreatment
                          onError={() => setDetailExists(false)}
                        />
                      </div>
                      <figcaption className="case-square-caption">
                        <span className="case-placeholder-title">Interactive state detail</span>
                        <span className="case-placeholder-hint">
                          public/image/{project.slug}-detail.webp (600&times;600)
                        </span>
                      </figcaption>
                    </figure>
                  )}
                </div>
              </Reveal>
            )}

            {/* Bottom Action Links */}
            <Reveal delay={0.12}>
              <div className="case-bottom-actions">
                {project.hasLiveDemo && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-editorial"
                  >
                    <span>Live demo</span>
                    <ExternalLink size={15} aria-hidden="true" />
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-editorial"
                >
                  <Code2 size={15} aria-hidden="true" />
                  <span>{project.hasExactRepo ? 'GitHub' : 'GitHub profile'}</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Next Project Link */}
        {nextProject && (
          <section className="case-next-section" aria-labelledby="next-project-heading">
            <div className="container">
              <Reveal>
                <Link to={`/work/${nextProject.slug}`} className="case-next-card">
                  <div>
                    <span id="next-project-heading" className="case-next-kicker">
                      Next project
                    </span>
                    <h2 className="case-next-title">{nextProject.title}</h2>
                    <p className="case-next-desc">{nextProject.shortDescription}</p>
                    <span className="btn-secondary-editorial" style={{ marginTop: '1rem' }}>
                      <span>View project</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </div>

                  <div className="case-next-thumb">
                    <ImageSlot
                      src={nextProject.image}
                      fallback="project-grid"
                      alt={nextProject.imageAlt}
                      width={nextProject.imageWidth}
                      height={nextProject.imageHeight}
                      focal={nextProject.imageFocal}
                      ratio="16 / 9"
                      disableTreatment
                    />
                  </div>
                </Link>
              </Reveal>
            </div>
          </section>
        )}
      </article>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="case-lightbox-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} full screenshot preview`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: REFERENCE_EASE }}
            onClick={() => {
              setLightboxOpen(false);
              openerBtnRef.current?.focus();
            }}
          >
            <motion.div
              className="case-lightbox-content"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: REFERENCE_EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeBtnRef}
                type="button"
                className="case-lightbox-close"
                aria-label="Close screenshot preview"
                onClick={() => {
                  setLightboxOpen(false);
                  openerBtnRef.current?.focus();
                }}
              >
                <X size={20} aria-hidden="true" />
              </button>
              <ImageSlot
                src={project.image}
                fallback="project-grid"
                alt={project.imageAlt}
                width={project.imageWidth}
                height={project.imageHeight}
                focal="50% 50%"
                loading="eager"
                disableTreatment
                className="case-lightbox-slot"
                imgClassName="case-lightbox-img"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}

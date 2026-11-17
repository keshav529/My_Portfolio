import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Code2, ExternalLink } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Reveal } from '../components/Reveal';
import { PROJECTS } from '../data/portfolioData';

/**
 * Dynamic Project Detail Page (/work/:slug) — Stage 3 + Stage 5 GitHub Links
 */
export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const currentIndex = PROJECTS.findIndex((item) => item.slug === slug);
  const project = currentIndex >= 0 ? PROJECTS[currentIndex] : undefined;

  if (!project) {
    return (
      <PageTransition>
        <section className="stage-section">
          <div className="container">
            <div className="stage-shell-card">
              <p className="eyebrow-tagline">PROJECT NOT FOUND</p>
              <h1>We couldn&apos;t find that project</h1>
              <p>
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
        {/* Top Breadcrumb + Title Header */}
        <section className="page-header-section" aria-labelledby="project-detail-title">
          <div className="container">
            <Reveal>
              <Link to="/work" className="back-link-editorial">
                <ArrowLeft size={16} aria-hidden="true" />
                <span>All projects</span>
              </Link>

              <p className="eyebrow-tagline" style={{ marginTop: '1.75rem' }}>
                {project.workNumber} &middot; {project.category}
              </p>

              <h1 id="project-detail-title" className="page-hero-title">
                {project.title}
              </h1>

              <p className="page-hero-lead">{project.shortDescription}</p>

              <div className="stage-cta-row" style={{ marginTop: '2rem' }}>
                {project.hasLiveDemo ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-editorial"
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={15} aria-hidden="true" />
                  </a>
                ) : (
                  <span className="btn-secondary-editorial" aria-disabled="true">
                    Live Demo (Not Yet Deployed)
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
                    {project.hasExactRepo ? 'GitHub Repository' : 'GitHub Profile (Repo Pending)'}
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Cover Screenshot */}
        <section className="project-cover-section">
          <div className="container">
            <Reveal delay={0.05}>
              <div className="project-cover-frame">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  decoding="async"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Structured Case Study Content */}
        <section className="home-section" aria-label="Project details">
          <div className="container">
            <div className="project-detail-grid">
              {/* Left Sidebar Metadata */}
              <Reveal>
                <aside className="project-meta-box">
                  <div className="project-meta-block">
                    <p className="eyebrow-tagline">Category</p>
                    <p className="project-meta-value">{project.category}</p>
                  </div>

                  <div className="project-meta-block">
                    <p className="eyebrow-tagline">Scope</p>
                    <p className="project-meta-value">Personal Practice Build</p>
                  </div>

                  <div className="project-meta-block">
                    <p className="eyebrow-tagline">Tech Stack</p>
                    <ul className="project-tech-list">
                      {project.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>

                  {(!project.hasLiveDemo || !project.hasExactRepo) && (
                    <p className="project-placeholder-hint">
                      This project does not have a dedicated public repo/live URL on <code>github.com/keshav529</code> yet. Add it in <code>src/data/portfolioData.ts</code> once pushed.
                    </p>
                  )}
                </aside>
              </Reveal>

              {/* Right Case Study Narrative */}
              <Reveal delay={0.08}>
                <div className="project-narrative">
                  <div className="project-narrative-block">
                    <h2>Project Overview</h2>
                    <p>{project.overview}</p>
                  </div>

                  <div className="project-narrative-block">
                    <h2>What I Learned</h2>
                    <p>{project.whatILearned}</p>
                  </div>

                  <div className="project-narrative-block">
                    <h2>Challenges &amp; Solutions</h2>
                    <p>{project.challenges}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Next Project Navigation */}
        {nextProject && (
          <section className="home-section home-section-tinted" aria-labelledby="next-project-heading">
            <div className="container">
              <Reveal>
                <Link to={`/work/${nextProject.slug}`} className="next-project-card">
                  <div className="next-project-copy">
                    <p id="next-project-heading" className="eyebrow-tagline">
                      Next Project &middot; {nextProject.workNumber}
                    </p>
                    <h2 className="next-project-title">{nextProject.title}</h2>
                    <p className="next-project-desc">{nextProject.shortDescription}</p>
                    <span className="see-more-link" style={{ marginTop: '1rem' }}>
                      <span>View project</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </div>

                  <div className="next-project-thumb">
                    <img
                      src={nextProject.image}
                      alt={nextProject.imageAlt}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </Link>
              </Reveal>
            </div>
          </section>
        )}
      </article>
    </PageTransition>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ExternalLink, Code2 } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Reveal } from '../components/Reveal';
import { WorkCard } from '../components/WorkCard';
import {
  ADDITIONAL_GITHUB_REPOS,
  PROJECTS,
  ProjectItem,
} from '../data/portfolioData';

type FilterCategory = 'All' | ProjectItem['category'];

const FILTER_CATEGORIES: FilterCategory[] = ['All', 'JavaScript', 'CSS/HTML', 'API'];

/**
 * Work Page (/work) — Stage 3 + Stage 5 GitHub Integration
 */
export function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');

  const featuredProject =
    PROJECTS.find((project) => project.featured) ?? PROJECTS[0];

  const filteredProjects =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeFilter);

  return (
    <PageTransition>
      {/* Page Header */}
      <section className="page-header-section" aria-labelledby="work-page-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow-tagline">WORK &bull; CASE STUDIES</p>
            <h1 id="work-page-title" className="page-hero-title">
              Selected projects &amp; browser builds
            </h1>
            <p className="page-hero-lead">
              A collection of responsive websites, UI clones, and interactive JavaScript applications built while sharpening my front-end fundamentals.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured Project Spotlight */}
      {featuredProject && (
        <section className="work-featured-section" aria-labelledby="featured-work-title">
          <div className="container">
            <Reveal>
              <article className="featured-project-card">
                <div className="featured-project-media">
                  <img
                    src={featuredProject.image}
                    alt={featuredProject.imageAlt}
                    decoding="async"
                  />
                </div>

                <div className="featured-project-content">
                  <p className="eyebrow-tagline">
                    Featured Case Study &middot; {featuredProject.workNumber} &middot; {featuredProject.category}
                  </p>
                  <h2 id="featured-work-title" className="featured-project-title">
                    {featuredProject.title}
                  </h2>
                  <p className="featured-project-desc">
                    {featuredProject.overview}
                  </p>
                  <p className="featured-project-stack">
                    {featuredProject.tags.join(' · ')}
                  </p>

                  <div className="stage-cta-row">
                    <Link
                      to={`/work/${featuredProject.slug}`}
                      className="btn-primary-editorial"
                    >
                      <span>Read case study</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>

                    {featuredProject.hasLiveDemo && (
                      <a
                        href={featuredProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary-editorial"
                      >
                        <span>Live demo</span>
                        <ExternalLink size={15} aria-hidden="true" />
                      </a>
                    )}

                    <a
                      href={featuredProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary-editorial"
                    >
                      <Code2 size={15} aria-hidden="true" />
                      <span>
                        {featuredProject.hasExactRepo ? 'GitHub' : 'GitHub Profile'}
                      </span>
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </section>
      )}

      {/* Filterable All Projects Grid */}
      <section className="home-section" aria-labelledby="all-projects-heading">
        <div className="container">
          <div className="work-filter-bar">
            <div>
              <h2 id="all-projects-heading" className="editorial-section-title" style={{ marginTop: 0 }}>
                All projects
              </h2>
              <p className="work-filter-count">
                Showing {filteredProjects.length} of {PROJECTS.length} builds
              </p>
            </div>

            <div className="filter-pill-group" role="group" aria-label="Filter projects by category">
              {FILTER_CATEGORIES.map((category) => {
                const isActive = activeFilter === category;
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={isActive}
                    className={`filter-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveFilter(category)}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div layout className="work-preview-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                >
                  <WorkCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Additional Live Repos from Keshav's GitHub */}
      <section className="home-section home-section-tinted" aria-labelledby="more-github-heading">
        <div className="container">
          <Reveal>
            <div className="section-header-row">
              <div>
                <p className="eyebrow-tagline">GitHub &bull; keshav529</p>
                <h2 id="more-github-heading" className="editorial-section-title">
                  More deployed GitHub builds
                </h2>
              </div>
              <a
                href="https://github.com/keshav529?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="see-more-link"
              >
                <span>View all on GitHub</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <div className="extra-repos-grid">
            {ADDITIONAL_GITHUB_REPOS.map((repo, idx) => (
              <Reveal key={repo.name} delay={idx * 0.06}>
                <article className="extra-repo-card">
                  <h3 className="extra-repo-title">{repo.name}</h3>
                  <p className="extra-repo-desc">{repo.description}</p>
                  <div className="extra-repo-links">
                    <a
                      href={repo.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary-editorial"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={14} aria-hidden="true" />
                    </a>
                    <a
                      href={repo.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary-editorial"
                    >
                      <Code2 size={14} aria-hidden="true" />
                      <span>Repo</span>
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

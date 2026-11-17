import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Code2, ExternalLink } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Reveal } from '../components/Reveal';
import { WorkCard } from '../components/WorkCard';
import {
  ADDITIONAL_GITHUB_REPOS,
  PROJECTS,
  ProjectItem,
} from '../data/portfolioData';

type FilterTab = 'All' | 'JavaScript' | 'HTML/CSS' | 'API';

const FILTER_TABS: FilterTab[] = ['All', 'JavaScript', 'HTML/CSS', 'API'];

const CATEGORY_MAP: Record<Exclude<FilterTab, 'All'>, ProjectItem['category']> = {
  JavaScript: 'JavaScript',
  'HTML/CSS': 'CSS/HTML',
  API: 'API',
};

const REFERENCE_EASE: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

/**
 * Stage 3 Work Page (/work):
 * - Heading, short lead, and category filter tabs (All / JavaScript / HTML/CSS / API)
 * - 2-column grid (gap 1.75rem; 1 col <= 767px) with 16:9 dark-overlay centered-title cards
 * - Deployed GitHub Builds section below
 */
export function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All');

  const filteredProjects =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === CATEGORY_MAP[activeFilter]);

  return (
    <PageTransition>
      {/* Page Header */}
      <section className="work-archive-header" aria-labelledby="work-page-title">
        <div className="container">
          <Reveal>
            <div className="work-archive-top">
              <div>
                <h1 id="work-page-title" className="work-archive-title">
                  Selected work
                </h1>
                <p className="work-archive-lead">
                  Responsive websites, UI clones, and interactive JavaScript applications built from scratch.
                </p>
              </div>

              <div
                className="work-filter-tabs"
                role="group"
                aria-label="Filter projects by category"
              >
                {FILTER_TABS.map((tab) => {
                  const isActive = activeFilter === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      aria-pressed={isActive}
                      className={`work-filter-tab ${isActive ? 'is-active' : ''}`}
                      onClick={() => setActiveFilter(tab)}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="work-filter-active-bg"
                          className="work-filter-pill-bg"
                          transition={{ duration: 0.4, ease: REFERENCE_EASE }}
                          aria-hidden="true"
                        />
                      )}
                      <span className="work-filter-label">{tab}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2-Column Archive Grid (16:9 dark-overlay cards, gap 1.75rem) */}
      <section className="work-archive-section" aria-label="Projects grid">
        <div className="container">
          <motion.div layout className="work-archive-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: REFERENCE_EASE }}
                >
                  <WorkCard project={project} variant="grid" />
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
              <h2 id="more-github-heading" className="editorial-section-title" style={{ marginTop: 0 }}>
                More deployed GitHub builds
              </h2>
              <a
                href="https://github.com/keshav529?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-editorial"
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
                      <span>Live demo</span>
                      <ExternalLink size={14} aria-hidden="true" />
                    </a>
                    <a
                      href={repo.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary-editorial"
                    >
                      <Code2 size={14} aria-hidden="true" />
                      <span>GitHub</span>
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

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface WorkCardProps {
  project: ProjectItem;
  variant?: 'strip' | 'grid';
}

const REFERENCE_EASE: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

/**
 * Numbered Project Card:
 * - variant="strip": Home horizontal strip (35rem tall, 42% desktop / 85vw mobile,
 *   radius 1rem, 20% dark overlay, white centered title & tags, hover shadow 1px 1px 3em 1px rgba(0,0,0,.4))
 * - variant="grid": Standard archive card for /work page
 */
export function WorkCard({ project, variant = 'grid' }: WorkCardProps) {
  if (variant === 'strip') {
    return (
      <article className="work-strip-card">
        <Link to={`/work/${project.slug}`} className="work-strip-link">
          <img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            className="work-strip-image"
          />
          <div className="work-strip-overlay" aria-hidden="true" />
          <div className="work-strip-content">
            <span className="work-strip-number">{project.workNumber}</span>
            <h3 className="work-strip-title">{project.title}</h3>
            <p className="work-strip-tags">{project.tags.join(' · ')}</p>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <motion.article
      className="work-card"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, ease: REFERENCE_EASE }}
    >
      <Link to={`/work/${project.slug}`} className="work-card-link">
        <div className="work-card-image-wrap">
          <img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            className="work-card-image"
          />
        </div>

        <div className="work-card-body">
          <div className="work-card-meta">
            <span className="work-card-number">{project.workNumber}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{project.tags.join(' · ')}</span>
          </div>

          <div className="work-card-title-row">
            <h3 className="work-card-title">{project.title}</h3>
            <span className="work-card-arrow" aria-hidden="true">
              <ArrowUpRight size={18} />
            </span>
          </div>

          <p className="work-card-desc">{project.shortDescription}</p>
        </div>
      </Link>
    </motion.article>
  );
}

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface WorkCardProps {
  project: ProjectItem;
}

/**
 * Editorial Numbered Project Card (Work #1, Work #2, ...)
 * Uses clean unboxed typographic metadata separators instead of badge clutter.
 */
export function WorkCard({ project }: WorkCardProps) {
  return (
    <motion.article
      className="work-card"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
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

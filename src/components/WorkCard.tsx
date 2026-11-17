import { Link } from 'react-router-dom';
import { ProjectItem } from '../data/portfolioData';

interface WorkCardProps {
  project: ProjectItem;
  variant?: 'strip' | 'grid';
}

/**
 * Project Card:
 * - variant="strip": Home horizontal strip (35rem tall, 42% desktop / 85vw mobile,
 *   radius 1rem, 20% dark overlay, white centered title & tags)
 * - variant="grid": Stage 3 Work Page 2-column archive card (16:9 padding-top 56.25%,
 *   radius .875rem, 20% dark overlay, centered white title & tags, hover shadow 1px 1px 3em 1px rgba(0,0,0,.4))
 */
export function WorkCard({ project, variant = 'grid' }: WorkCardProps) {
  if (variant === 'strip') {
    return (
      <article className="work-strip-card">
        <Link to={`/work/${project.slug}`} className="work-strip-link">
          <img
            src={project.image}
            alt={project.imageAlt}
            width={project.imageWidth}
            height={project.imageHeight}
            loading="lazy"
            decoding="async"
            className="work-strip-image"
          />
          <div className="work-strip-overlay" aria-hidden="true" />
          <div className="work-strip-content">
            <h3 className="work-strip-title">{project.title}</h3>
            <p className="work-strip-tags">{project.tags.join(' · ')}</p>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="work-grid-card">
      <Link to={`/work/${project.slug}`} className="work-grid-link">
        <div className="work-grid-ratio">
          <img
            src={project.image}
            alt={project.imageAlt}
            width={project.imageWidth}
            height={project.imageHeight}
            loading="lazy"
            decoding="async"
            className="work-grid-image"
          />
          <div className="work-grid-overlay" aria-hidden="true" />
          <div className="work-grid-content">
            <h3 className="work-grid-title">{project.title}</h3>
            <p className="work-grid-tags">{project.tags.join(' · ')}</p>
          </div>
        </div>
      </Link>
    </article>
  );
}

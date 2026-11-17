import { Link } from 'react-router-dom';
import { ImageSlot } from './ImageSlot';
import { ProjectItem } from '../data/portfolioData';

interface WorkCardProps {
  project: ProjectItem;
  variant?: 'strip' | 'grid';
}

/**
 * Project Card:
 * - Both variants enforce a consistent 16:9 crop with per-project focal points
 *   and unified ImageSlot cream/orange duotone treatment that fades on hover.
 */
export function WorkCard({ project, variant = 'grid' }: WorkCardProps) {
  if (variant === 'strip') {
    return (
      <article className="work-strip-card">
        <Link to={`/work/${project.slug}`} className="work-strip-link">
          <ImageSlot
            src={project.image}
            fallback="project-grid"
            alt={project.imageAlt}
            width={project.imageWidth}
            height={project.imageHeight}
            focal={project.imageFocal}
            className="work-strip-image-slot"
            imgClassName="work-strip-image"
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
          <ImageSlot
            src={project.image}
            fallback="project-grid"
            alt={project.imageAlt}
            width={project.imageWidth}
            height={project.imageHeight}
            focal={project.imageFocal}
            className="work-grid-image-slot"
            imgClassName="work-grid-image"
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

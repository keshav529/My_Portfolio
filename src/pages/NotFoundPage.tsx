import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';

/**
 * Custom 404 Page matching the Cream-1 / Orange / Charcoal visual system.
 */
export function NotFoundPage() {
  return (
    <PageTransition>
      <section className="not-found-section" aria-labelledby="not-found-title">
        <div className="container">
          <div className="not-found-card">
            <p className="eyebrow-tagline">404 &middot; Route Not Found</p>
            <h1 id="not-found-title" className="not-found-title">
              This page does not exist
            </h1>
            <p className="not-found-copy">
              The link you followed may have moved or been typed incorrectly. Head back home or explore my selected web development work.
            </p>
            <div className="stage-cta-row">
              <Link to="/" className="btn-primary-editorial">
                <ArrowLeft size={16} aria-hidden="true" />
                <span>Back to Home</span>
              </Link>
              <Link to="/work" className="btn-secondary-editorial">
                <span>Browse Work</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

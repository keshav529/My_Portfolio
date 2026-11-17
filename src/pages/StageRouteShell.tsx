import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';

interface StageRouteShellProps {
  eyebrow: string;
  title: string;
  description: string;
  stageLabel: string;
}

/**
 * Clean placeholder page shell for routes that will be expanded in Stages 3–5.
 * Ensures every Navbar and Footer link works cleanly during Stage 1 testing.
 */
export function StageRouteShell({
  eyebrow,
  title,
  description,
  stageLabel,
}: StageRouteShellProps) {
  return (
    <PageTransition>
      <section className="stage-section" aria-labelledby="route-shell-title">
        <div className="container">
          <div className="stage-shell-card">
            <p className="eyebrow-tagline">{eyebrow}</p>
            <h1 id="route-shell-title">{title}</h1>
            <p>{description}</p>
            <p className="eyebrow-tagline" style={{ marginBottom: '2rem' }}>
              Scheduled for {stageLabel}
            </p>
            <Link to="/" className="btn-secondary-editorial">
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Reveal } from '../components/Reveal';
import { PROCESS_STEPS } from '../data/portfolioData';

/**
 * Process Page (/process) — Stage 4
 * Presents Keshav's 4-step working method (Understand, Plan, Build, Improve)
 * using animated numbered editorial step cards.
 */
export function ProcessPage() {
  return (
    <PageTransition>
      <section className="page-header-section" aria-labelledby="process-page-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow-tagline">WORKFLOW &bull; METHOD</p>
            <h1 id="process-page-title" className="page-hero-title">
              How I take an idea from sketch to browser
            </h1>
            <p className="page-hero-lead">
              A repeatable four-step process that helps me stay organized, avoid rushed layouts, and ship clean code.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="home-section home-section-tinted" aria-label="Four steps of my workflow">
        <div className="container">
          <div className="process-steps-grid">
            {PROCESS_STEPS.map((item, idx) => (
              <Reveal key={item.step} delay={idx * 0.08}>
                <article className="process-step-card">
                  <p className="process-step-number">Step {item.step}</p>
                  <h2 className="process-step-title">{item.title}</h2>
                  <p className="process-step-summary">{item.summary}</p>

                  <ul className="process-detail-list">
                    {item.details.map((detail) => (
                      <li key={detail}>
                        <Check size={16} aria-hidden="true" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section" aria-labelledby="process-cta-title">
        <div className="container">
          <Reveal>
            <div className="stage-shell-card" style={{ textAlign: 'center' }}>
              <p className="eyebrow-tagline">See the process in action</p>
              <h2 id="process-cta-title" className="editorial-section-title" style={{ marginTop: '0.75rem' }}>
                Explore projects built with this workflow
              </h2>
              <p style={{ marginInline: 'auto', marginTop: '0.85rem' }}>
                Check out my case studies on the Work page or reach out if you would like to collaborate.
              </p>
              <div className="stage-cta-row" style={{ justifyContent: 'center' }}>
                <Link to="/work" className="btn-primary-editorial">
                  <span>Browse projects</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link to="/contact" className="btn-secondary-editorial">
                  <span>Contact me</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}

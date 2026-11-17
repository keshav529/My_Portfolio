import { ArrowUpRight, FileDown } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Reveal } from '../components/Reveal';
import { PROFILE, RESOURCE_ITEMS } from '../data/portfolioData';

/**
 * Resources Page (/resources) — Stage 4
 * Resume download showcase plus useful documentation & learning links.
 */
export function ResourcesPage() {
  return (
    <PageTransition>
      <section className="page-header-section" aria-labelledby="resources-page-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow-tagline">RESUME &bull; LEARNING NOTES</p>
            <h1 id="resources-page-title" className="page-hero-title">
              Resume &amp; curated developer resources
            </h1>
            <p className="page-hero-lead">
              Download my latest PDF resume or explore the references and coding platforms I use every day.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Resume Download Card */}
      <section className="home-section home-section-tinted" aria-labelledby="resources-resume-title">
        <div className="container">
          <Reveal>
            <div className="resume-banner-card">
              <div className="resume-banner-content">
                <p className="eyebrow-tagline">Curriculum Vitae</p>
                <h2 id="resources-resume-title" className="resume-banner-title">
                  {PROFILE.fullName} — Resume (PDF)
                </h2>
                <p className="resume-banner-copy">
                  Includes my BCA academic details (2022–2025), technical skills across HTML, CSS, JavaScript, Java, C, Bootstrap, Figma, and Git/GitHub, plus contact information.
                </p>
                <div className="stage-cta-row">
                  <a
                    href={PROFILE.resumeUrl}
                    download
                    className="btn-primary-editorial"
                  >
                    <FileDown size={16} aria-hidden="true" />
                    <span>Download PDF Resume</span>
                  </a>
                  <a
                    href={PROFILE.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-editorial"
                  >
                    <span>Open in browser</span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="resume-cover-frame">
                <img
                  src={PROFILE.resumeCover}
                  alt="Preview of Keshav's resume document"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Useful Links & Learning Notes */}
      <section className="home-section" aria-labelledby="links-heading">
        <div className="container">
          <Reveal>
            <div className="section-header-row">
              <div>
                <p className="eyebrow-tagline">Bookmarks</p>
                <h2 id="links-heading" className="editorial-section-title">
                  Useful links &amp; study notes
                </h2>
              </div>
              <p className="editorial-section-note">
                Easily expandable inside <code>src/data/portfolioData.ts</code> under <code>RESOURCE_ITEMS</code>.
              </p>
            </div>
          </Reveal>

          <div className="resources-grid">
            {RESOURCE_ITEMS.map((item, idx) => (
              <Reveal key={item.id} delay={idx * 0.06}>
                <a
                  href={item.url}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="resource-card"
                >
                  <div className="resource-card-top">
                    <span className="eyebrow-tagline">{item.category}</span>
                    <ArrowUpRight size={18} className="resource-card-icon" aria-hidden="true" />
                  </div>
                  <h3 className="resource-card-title">{item.title}</h3>
                  <p className="resource-card-desc">{item.description}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

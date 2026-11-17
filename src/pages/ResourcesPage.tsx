import { ArrowUpRight, FileDown } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Reveal } from '../components/Reveal';
import { RESOURCE_ITEMS } from '../data/portfolioData';

/**
 * Stage 3 Resources Page (/resources):
 * - Clean page heading (no extra eyebrow labels)
 * - Reference cards: 1px solid #a3a3a3, radius 1.5rem, padding 1.5rem, .4fr / 1fr grid,
 *   hover background #f5f5f5 over 0.5s, image shadow 0 6px 12px rgba(0,0,0,.15)
 * - Covers Resume PDF download, GitHub, LeetCode, LinkedIn, plus study notes
 */
export function ResourcesPage() {
  return (
    <PageTransition>
      <section className="resources-ref-header" aria-labelledby="resources-page-title">
        <div className="container">
          <Reveal>
            <h1 id="resources-page-title" className="resources-ref-title">
              Resources &amp; links
            </h1>
            <p className="resources-ref-lead">
              Download my PDF resume, inspect my coding profiles on GitHub and LeetCode, or browse the documentation I rely on daily.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="resources-ref-list-section" aria-label="Resource cards">
        <div className="container">
          <div className="resources-ref-stack">
            {RESOURCE_ITEMS.map((item, idx) => (
              <Reveal key={item.id} delay={idx * 0.05}>
                <a
                  href={item.url}
                  download={item.download || undefined}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="resource-ref-card"
                >
                  <div className="resource-ref-thumb">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      width={item.imageWidth}
                      height={item.imageHeight}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="resource-ref-body">
                    <div className="resource-ref-top">
                      <span className="resource-ref-cat">{item.category}</span>
                      <span className="resource-ref-action">
                        {item.download ? (
                          <FileDown size={18} aria-hidden="true" />
                        ) : (
                          <ArrowUpRight size={18} aria-hidden="true" />
                        )}
                        <span>{item.ctaLabel}</span>
                      </span>
                    </div>

                    <h2 className="resource-ref-card-title">{item.title}</h2>
                    <p className="resource-ref-card-desc">{item.description}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

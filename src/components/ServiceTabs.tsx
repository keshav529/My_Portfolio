import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { ServiceItem } from '../data/portfolioData';

interface ServiceTabsProps {
  services: ServiceItem[];
}

/**
 * Interactive "How I can help you" section.
 * Clicking or focusing any of the 4 service tabs updates the preview image
 * and description panel on the right with a smooth editorial transition.
 */
export function ServiceTabs({ services }: ServiceTabsProps) {
  const [activeId, setActiveId] = useState<string>(services[0]?.id ?? '');
  const activeService =
    services.find((service) => service.id === activeId) ?? services[0];

  if (!activeService) return null;

  return (
    <div className="service-tabs-grid">
      {/* Left Column: 4 Interactive Service Selector Tabs */}
      <div className="service-tab-list" role="tablist" aria-label="Services">
        {services.map((service) => {
          const isActive = service.id === activeService.id;
          return (
            <button
              key={service.id}
              type="button"
              role="tab"
              id={`tab-${service.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${service.id}`}
              className={`service-tab-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveId(service.id)}
            >
              <span className="service-tab-number">{service.number}</span>
              <span className="service-tab-content">
                <span className="service-tab-title">{service.title}</span>
                <span className="service-tab-summary">{service.summary}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Right Column: Dynamic Visual & Honest Description Panel */}
      <div className="service-panel-shell">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            id={`panel-${activeService.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeService.id}`}
            className="service-panel-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="service-panel-image">
              <img
                src={activeService.image}
                alt={activeService.imageAlt}
                loading="lazy"
              />
            </div>

            <div className="service-panel-body">
              <p className="eyebrow-tagline">
                {activeService.number} &middot; {activeService.title}
              </p>
              <h3 className="service-panel-heading">{activeService.summary}</h3>
              <p className="service-panel-copy">{activeService.details}</p>

              <ul className="service-deliverables">
                {activeService.deliverables.map((item) => (
                  <li key={item}>
                    <Check size={15} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

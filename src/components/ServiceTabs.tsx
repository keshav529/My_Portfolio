import { KeyboardEvent, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { SERVICE_HIGHLIGHTS, ServiceItem } from '../data/portfolioData';

interface ServiceTabsProps {
  services: ServiceItem[];
}

const REFERENCE_EASE: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

/**
 * Reference "How I can help you" Services Band:
 * - #e5e5e5 background with 1px #a3a3a3 top border
 * - 4 plain-text tab buttons with sliding selector pill & Left/Right arrow-key navigation
 * - 40rem black area with opposite horizontal sliding tracks (images slide left, text panels slide right)
 * - 2-column bullet list below (6rem gap, 1.5rem #525252 text, orange icon, 1px #a3a3a3 dividers)
 */
export function ServiceTabs({ services }: ServiceTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  if (services.length === 0) return null;

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const count = services.length;
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % count;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + count) % count;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = count - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      setActiveIndex(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  // Text panels arranged in reverse order so shifting to (services.length - 1 - activeIndex)
  // moves the text track in the opposite horizontal direction to the image track.
  const reversedServices = [...services].reverse();
  const imageTranslate = `-${activeIndex * 100}%`;
  const textTranslate = `-${(services.length - 1 - activeIndex) * 100}%`;

  return (
    <div className="services-ref-wrapper">
      {/* Tab Buttons + Sliding Selector Pill */}
      <div className="services-tabs-outer">
        <div
          className="services-tabs-bar"
          role="tablist"
          aria-label="How I can help you"
        >
          {/* Sliding 25%-width selector pill */}
          <motion.div
            className="services-selector-pill"
            aria-hidden="true"
            animate={{ x: `${activeIndex * 100}%` }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.5, ease: REFERENCE_EASE }
            }
          />

          {services.map((service, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={service.id}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${service.id}`}
                tabIndex={isActive ? 0 : -1}
                aria-selected={isActive}
                aria-controls={`panel-${service.id}`}
                className={`services-tab-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveIndex(idx)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
              >
                <span className="services-tab-name">{service.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 40rem Black Area: Opposite-Sliding Image Track & #141414 Text Track */}
      <div className="services-stage-box">
        {/* Left Image Window */}
        <div className="services-stage-window">
          <motion.div
            className="services-track"
            animate={{ x: imageTranslate }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.65, ease: REFERENCE_EASE }
            }
          >
            {services.map((service) => (
              <div key={service.id} className="services-image-slide">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right #141414 Text Window (Slides in Opposite Direction) */}
        <div className="services-stage-window is-text-window">
          <motion.div
            className="services-track"
            animate={{ x: textTranslate }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.65, ease: REFERENCE_EASE }
            }
          >
            {reversedServices.map((service) => {
              const isSelected = service.id === services[activeIndex]?.id;
              return (
                <div
                  key={service.id}
                  id={`panel-${service.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${service.id}`}
                  aria-hidden={!isSelected}
                  className="services-text-slide"
                >
                  <p className="services-panel-kicker">{service.title}</p>
                  <h3 className="services-panel-title">{service.summary}</h3>
                  <p className="services-panel-copy">{service.details}</p>

                  <ul className="services-panel-list">
                    {service.deliverables.map((item) => (
                      <li key={item}>
                        <Check size={16} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* 2-Column Bullet List Below Services (6rem gap, 1.5rem #525252 text, 1px #a3a3a3 dividers) */}
      <div className="container">
        <ul className="services-bullets-grid">
          {SERVICE_HIGHLIGHTS.map((point) => (
            <li key={point} className="services-bullet-row">
              <span className="services-bullet-icon" aria-hidden="true">
                <ArrowUpRight size={18} />
              </span>
              <span className="services-bullet-text">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

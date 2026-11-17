import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FaqItem } from '../data/portfolioData';

interface AccordionProps {
  items: FaqItem[];
}

const REFERENCE_EASE: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

/**
 * Reference FAQ Accordion:
 * - 6.5rem tall rows with 1.75rem question (-0.025em letter-spacing)
 * - 3.5rem white square icon box (.5rem radius) with 1px #424242 plus lines (turns #ff5330 orange in 0.2s on hover)
 * - Opening wipes in a cream-2 (#dfd8d1) band, then reveals the #292929 answer panel (#e5e5e5 text, max-width 53rem)
 */
export function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const prefersReducedMotion = useReducedMotion();

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="faq-ref-accordion">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className={`faq-ref-item ${isOpen ? 'is-open' : ''}`}>
            <button
              type="button"
              className="faq-ref-trigger"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
              id={`faq-question-${item.id}`}
              onClick={() => toggleItem(item.id)}
            >
              <span className="faq-ref-question">{item.question}</span>
              <span className="faq-ref-icon" aria-hidden="true">
                <span className="faq-plus-bar is-horizontal" />
                <span className="faq-plus-bar is-vertical" />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                  className="faq-ref-panel-outer"
                  initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.48, ease: REFERENCE_EASE }}
                >
                  {/* Cream-2 wipe band */}
                  <motion.div
                    className="faq-cream-wipe-band"
                    aria-hidden="true"
                    initial={prefersReducedMotion ? false : { scaleX: 1 }}
                    animate={{ scaleX: 0 }}
                    transition={{ duration: 0.45, ease: REFERENCE_EASE }}
                  />

                  {/* #292929 Answer Panel */}
                  <div className="faq-ref-answer-box">
                    <motion.p
                      className="faq-ref-answer-text"
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.14, ease: REFERENCE_EASE }}
                    >
                      {item.answer}
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

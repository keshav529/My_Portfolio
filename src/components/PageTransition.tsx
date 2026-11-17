import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
}

const REFERENCE_EASE: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

/**
 * Reference-matched Page Transition:
 * Two 50%-width #2b2b2b panels wipe in from left and right on route exit,
 * then wipe back out to reveal the incoming route page.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div>{children}</div>;
  }

  return (
    <div className="page-transition-wrapper">
      {/* Split 50% Wipe Panels (#2b2b2b) */}
      <motion.div
        className="page-transition-panel is-left"
        aria-hidden="true"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: REFERENCE_EASE }}
      />
      <motion.div
        className="page-transition-panel is-right"
        aria-hidden="true"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: REFERENCE_EASE }}
      />

      <motion.div
        initial={{ opacity: 0.01 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.32, ease: REFERENCE_EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const REFERENCE_EASE: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

/**
 * Reusable scroll-reveal wrapper using compositor-only transform + opacity.
 * Duration (0.65s) and slide distance (28px) match editorial scroll entrance pacing.
 * Respects prefers-reduced-motion via <MotionConfig reducedMotion="user">.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{
        duration: 0.65,
        delay,
        ease: REFERENCE_EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

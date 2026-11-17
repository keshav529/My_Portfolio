import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, FileDown } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

/**
 * Editorial Split-Screen Hero with subtle scroll parallax on the portrait frame.
 */
export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Gentle vertical parallax on the hero portrait as the visitor scrolls
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [0, 36]);

  return (
    <section ref={heroRef} className="home-hero-section" aria-labelledby="home-hero-title">
      <div className="container">
        <div className="home-hero-grid">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow-tagline">{PROFILE.tagline}</p>

            <h1 id="home-hero-title" className="home-hero-title">
              Web Developer building fast, clean and interactive experiences
            </h1>

            <p className="home-hero-lead">
              I&apos;m {PROFILE.name}, an {PROFILE.role.toLowerCase()} and {PROFILE.degree}. I turn ideas into responsive, accessible websites with HTML, CSS, JavaScript, Bootstrap, and Figma.
            </p>

            <div className="stage-cta-row">
              <Link to="/work" className="btn-primary-editorial">
                <span>View my work</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>

              <a
                href={PROFILE.resumeUrl}
                download
                className="btn-secondary-editorial"
              >
                <FileDown size={16} aria-hidden="true" />
                <span>Download resume</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            className="hero-media-column"
            style={{ y: imageParallaxY }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="stage-image-card">
              <div className="stage-image-frame">
                <img
                  src={PROFILE.profilePhoto}
                  alt="Portrait of Keshav, aspiring software developer"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
              <div className="stage-image-meta">
                <span>{PROFILE.fullName}</span>
                <span className="mono-meta">{PROFILE.degree}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

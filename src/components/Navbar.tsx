import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NAV_ITEMS, PROFILE } from '../data/portfolioData';

/**
 * Sticky 3-Zone Editorial Navigation Bar
 * - Left: Brand wordmark
 * - Middle: 6 navigation links with animated underline on hover/active
 * - Right: Highlighted CONTACT button + mobile full-screen menu trigger
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Add subtle background & shadow once the user scrolls past the top
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu automatically when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll and listen for Escape key when full-screen menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={`site-navbar ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="container navbar-inner">
          {/* Zone 1: Brand Wordmark */}
          <Link to="/" className="navbar-brand-link" aria-label={`${PROFILE.name} — Home`}>
            <span>{PROFILE.name}</span>
            <span className="navbar-brand-dot" aria-hidden="true" />
          </Link>

          {/* Zone 2: Center Navigation Links (Desktop) */}
          <nav aria-label="Primary navigation">
            <ul className="navbar-links-desktop">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `navbar-link ${isActive ? 'is-active' : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Zone 3: Highlighted CONTACT CTA + Mobile Menu Button */}
          <div className="navbar-actions">
            <Link to="/contact" className="navbar-contact-cta">
              Contact
            </Link>

            <button
              type="button"
              className="navbar-menu-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-fullscreen-menu"
              aria-label="Open navigation menu"
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Animated Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-fullscreen-menu"
            className="mobile-menu-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-menu-header">
              <Link
                to="/"
                className="mobile-menu-brand"
                onClick={() => setMobileMenuOpen(false)}
              >
                {PROFILE.name}
              </Link>
              <button
                type="button"
                className="mobile-menu-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile links">
              <ul className="mobile-menu-nav">
                {NAV_ITEMS.map((item, idx) => (
                  <motion.li
                    key={item.path}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.05 + idx * 0.04,
                      duration: 0.28,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <NavLink
                      to={item.path}
                      end={item.path === '/'}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `mobile-menu-link ${isActive ? 'is-active' : ''}`
                      }
                    >
                      <span className="mobile-menu-index">0{idx + 1}</span>
                      <span>{item.label}</span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="mobile-menu-footer">
              <a href={`mailto:${PROFILE.email}`}>
                {PROFILE.email} <ArrowUpRight size={14} style={{ display: 'inline' }} aria-hidden="true" />
              </a>
              <a href={`tel:${PROFILE.phone.replace(/[^+\d]/g, '')}`}>
                {PROFILE.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

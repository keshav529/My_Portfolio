import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { NAV_ITEMS, PROFILE } from '../data/portfolioData';
import { useTheme } from '../hooks/useTheme';

/**
 * Sticky 3-Zone Editorial Navigation Bar
 * - Left: Brand wordmark
 * - Middle: 6 navigation links with animated underline on hover/active
 * - Right: Light/Dark theme toggle + Highlighted CONTACT button + <820px mobile menu trigger
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

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

  // Close mobile menu if viewport widens to desktop (>= 820px)
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }
    const desktopQuery = window.matchMedia('(min-width: 820px)');
    const handleViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMobileMenuOpen(false);
      }
    };
    desktopQuery.addEventListener('change', handleViewportChange);
    return () => desktopQuery.removeEventListener('change', handleViewportChange);
  }, []);

  // Lock body scroll, manage focus, trap Tab key, and support Escape when full-screen menu is open
  useEffect(() => {
    if (!mobileMenuOpen) {
      if (wasOpenRef.current) {
        wasOpenRef.current = false;
        menuToggleRef.current?.focus();
      }
      return;
    }

    wasOpenRef.current = true;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileMenuOpen(false);
        return;
      }

      if (event.key === 'Tab' && mobileMenuRef.current) {
        const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const firstEl = focusable[0];
        const lastEl = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === firstEl) {
          event.preventDefault();
          lastEl.focus();
        } else if (!event.shiftKey && document.activeElement === lastEl) {
          event.preventDefault();
          firstEl.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusTimer);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const themeToggleLabel =
    theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <>
      <header className={`site-navbar ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="container navbar-inner">
          {/* Zone 1: Brand Wordmark */}
          <Link to="/" className="navbar-brand-link" aria-label={`${PROFILE.name} — Home`}>
            <span>{PROFILE.name}</span>
            <span className="navbar-brand-dot" aria-hidden="true" />
          </Link>

          {/* Zone 2: Center Navigation Links (Desktop >= 820px) */}
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

          {/* Zone 3: Theme Toggle + Highlighted CONTACT CTA + Mobile Menu Button (< 820px) */}
          <div className="navbar-actions">
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={themeToggleLabel}
              aria-pressed={theme === 'dark'}
              title={themeToggleLabel}
            >
              {theme === 'dark' ? (
                <Sun size={18} aria-hidden="true" />
              ) : (
                <Moon size={18} aria-hidden="true" />
              )}
            </button>

            <Link to="/contact" className="navbar-contact-cta">
              Contact
            </Link>

            <button
              ref={menuToggleRef}
              type="button"
              className="navbar-menu-toggle"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-fullscreen-menu"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Animated Mobile Navigation Menu (< 820px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
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
                onClick={closeMobileMenu}
              >
                {PROFILE.name}
              </Link>
              <div className="mobile-menu-controls">
                <button
                  type="button"
                  className="mobile-menu-theme-btn"
                  onClick={toggleTheme}
                  aria-label={themeToggleLabel}
                  aria-pressed={theme === 'dark'}
                  title={themeToggleLabel}
                >
                  {theme === 'dark' ? (
                    <Sun size={18} aria-hidden="true" />
                  ) : (
                    <Moon size={18} aria-hidden="true" />
                  )}
                </button>
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="mobile-menu-close"
                  onClick={closeMobileMenu}
                  aria-label="Close navigation menu"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>
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
                      onClick={closeMobileMenu}
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
              <a href={`mailto:${PROFILE.email}`} onClick={closeMobileMenu}>
                {PROFILE.email} <ArrowUpRight size={14} style={{ display: 'inline' }} aria-hidden="true" />
              </a>
              <a href={`tel:${PROFILE.phone.replace(/[^+\d]/g, '')}`} onClick={closeMobileMenu}>
                {PROFILE.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

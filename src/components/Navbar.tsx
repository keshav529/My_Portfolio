import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Moon, Sun } from 'lucide-react';
import { NAV_ITEMS, PROFILE } from '../data/portfolioData';
import type { FallbackIllustrationKind } from './BrandIllustration';
import { ImageSlot } from './ImageSlot';
import { useTheme } from '../hooks/useTheme';

const REFERENCE_EASE: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

interface MenuPreviewSpec {
  src?: string;
  fallback: FallbackIllustrationKind;
  alt: string;
  width: number;
  height: number;
  focal: string;
}

const MENU_PREVIEW_IMAGES: Record<string, MenuPreviewSpec> = {
  '/': {
    src: PROFILE.profilePhoto,
    fallback: 'portrait-workspace',
    alt: 'Portrait preview for Home page',
    width: PROFILE.profilePhotoWidth,
    height: PROFILE.profilePhotoHeight,
    focal: PROFILE.profilePhotoFocal,
  },
  '/about': {
    src: '/image/journey-college.webp',
    fallback: 'campus',
    alt: 'College and timeline journey preview for About page',
    width: 800,
    height: 600,
    focal: '50% 35%',
  },
  '/process': {
    fallback: 'code-workspace',
    alt: 'Structured build workflow diagram preview for Process page',
    width: 800,
    height: 600,
    focal: '50% 50%',
  },
  '/work': {
    src: '/image/netfliximageportfolio.webp',
    fallback: 'project-grid',
    alt: 'Selected responsive web project showcase for Work page',
    width: 1200,
    height: 568,
    focal: '50% 20%',
  },
  '/contact': {
    src: '/image/journey-desk.webp',
    fallback: 'desk-laptop',
    alt: 'Workspace preview for Contact page',
    width: 800,
    height: 600,
    focal: '50% 30%',
  },
  '/resources': {
    src: PROFILE.resumeCover,
    fallback: 'resume-doc',
    alt: 'Resume preview for Resources page',
    width: PROFILE.resumeCoverWidth,
    height: PROFILE.resumeCoverHeight,
    focal: '50% 0%',
  },
};

/**
 * Fixed Editorial Navbar + 50/50 Split Full-Screen Menu:
 * - Fixed top bar (height 4.375rem, max 80px, padding 0 5vw, blur(.5rem), cream glass)
 * - Left: Logo wordmark + 1.75px x 2rem orange vertical divider
 * - Right: Filled orange CONTACT CTA + 3rem circular menu button (#d6d6d6, two 1.5px #292929 lines)
 * - Full-screen menu includes theme toggle inside the right panel so it is accessible on every screen size.
 */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string>('/');
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setHoveredPath(location.pathname in MENU_PREVIEW_IMAGES ? location.pathname : '/');
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) {
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
      firstLinkRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }

      if (event.key === 'Tab' && menuOverlayRef.current) {
        const focusable = menuOverlayRef.current.querySelectorAll<HTMLElement>(
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
  }, [menuOpen]);

  const activePreview = MENU_PREVIEW_IMAGES[hoveredPath] ?? MENU_PREVIEW_IMAGES['/'];

  return (
    <>
      <header className="site-navbar">
        <div className="navbar-inner">
          {/* Left: Logo + 1.75px x 2rem Orange Vertical Line */}
          <Link
            to="/"
            className="navbar-brand-link"
            aria-label={`${PROFILE.name} — Home`}
            onClick={closeMenu}
          >
            <span className="navbar-brand-text">{PROFILE.name}</span>
            <span className="navbar-brand-divider" aria-hidden="true" />
          </Link>

          {/* Right: Filled Orange CONTACT Button + 3rem Circular Menu Trigger */}
          <div className="navbar-actions">
            <Link to="/contact" className="navbar-contact-cta" onClick={closeMenu}>
              Contact
            </Link>

            <button
              ref={menuToggleRef}
              type="button"
              className={`navbar-menu-toggle ${menuOpen ? 'is-open' : ''}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="fullscreen-nav-menu"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <span className="menu-toggle-line is-top" aria-hidden="true" />
              <span className="menu-toggle-line is-bottom" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* 50/50 Split Full-Screen Animated Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuOverlayRef}
            id="fullscreen-nav-menu"
            className="fullscreen-menu-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0, y: '-3%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '-2%' }}
            transition={{ duration: 0.45, ease: REFERENCE_EASE }}
          >
            {/* Left 50% Panel (#b9b9b9): Perspective Image Preview (Hidden <= 991px) */}
            <div className="menu-left-panel">
              <div className="menu-preview-stage">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={hoveredPath}
                    className="menu-preview-frame"
                    initial={{ opacity: 0, scale: 0.96, rotateY: 6 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 3 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35, ease: REFERENCE_EASE }}
                  >
                    <ImageSlot
                      src={activePreview.src}
                      fallback={activePreview.fallback}
                      alt={activePreview.alt}
                      width={activePreview.width}
                      height={activePreview.height}
                      focal={activePreview.focal}
                      ratio="4 / 3"
                      className="menu-preview-slot"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="menu-left-meta">
                <span>{PROFILE.tagline}</span>
                <span>{PROFILE.degree}</span>
              </div>
            </div>

            {/* Right 50% Panel (#121212, 100% <= 991px): 6 Equal Rows + Utility Bar with Theme Toggle */}
            <nav className="menu-right-panel" aria-label="Full-screen menu navigation">
              <ul className="menu-rows-list">
                {NAV_ITEMS.map((item, idx) => (
                  <motion.li
                    key={item.path}
                    className="menu-row-item"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + idx * 0.045,
                      duration: 0.45,
                      ease: REFERENCE_EASE,
                    }}
                  >
                    <NavLink
                      ref={idx === 0 ? firstLinkRef : undefined}
                      to={item.path}
                      end={item.path === '/'}
                      onClick={closeMenu}
                      onMouseEnter={() => setHoveredPath(item.path)}
                      onFocus={() => setHoveredPath(item.path)}
                      className={({ isActive }) =>
                        `menu-row-link ${isActive ? 'is-active' : ''}`
                      }
                    >
                      <span className="menu-row-label">{item.label}</span>
                      <span className="menu-row-icon" aria-hidden="true">
                        <ArrowUpRight size={32} strokeWidth={1.5} />
                      </span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              {/* Bottom utility strip inside right panel — accessible on all screen sizes */}
              <div className="menu-right-footer">
                <a href={`mailto:${PROFILE.email}`} className="menu-right-email" onClick={closeMenu}>
                  {PROFILE.email}
                </a>

                <button
                  type="button"
                  className="menu-theme-btn"
                  onClick={toggleTheme}
                  aria-pressed={theme === 'dark'}
                  aria-label={theme === 'dark' ? 'Switch to cream light mode' : 'Switch to dark mode'}
                >
                  {theme === 'dark' ? (
                    <Sun size={15} aria-hidden="true" />
                  ) : (
                    <Moon size={15} aria-hidden="true" />
                  )}
                  <span>{theme === 'dark' ? 'Cream Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

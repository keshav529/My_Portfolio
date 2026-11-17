import { Link } from 'react-router-dom';
import { ArrowUpRight, FileDown } from 'lucide-react';
import { NAV_ITEMS, PROFILE } from '../data/portfolioData';

/**
 * Reference-Matched Dark Footer (#121212):
 * - Left (34%): Large display logo mark + circular social/resume icons
 * - Right (50%): Nav links (1.25rem) + Contact titles (2.25rem) with orange links
 * - Bottom: Legal text (.825rem #525252)
 */
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Left Column (34%): Brand Logo Mark & Social Icons */}
          <div className="footer-left-col">
            <Link to="/" className="footer-brand-mark" aria-label={`${PROFILE.fullName} — Home`}>
              <span>{PROFILE.name}</span>
              <span className="footer-brand-divider" aria-hidden="true" />
            </Link>

            <p className="footer-bio">
              {PROFILE.role} &amp; {PROFILE.degree} at {PROFILE.college}.
            </p>

            <div className="footer-socials" aria-label="Social and resume links">
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
              >
                <span>LinkedIn</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
              >
                <span>GitHub</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a
                href={PROFILE.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
              >
                <span>LeetCode</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a
                href={PROFILE.resumeUrl}
                download
                className="footer-social-btn"
              >
                <FileDown size={14} aria-hidden="true" />
                <span>Resume</span>
              </a>
            </div>
          </div>

          {/* Right Column (50%): Nav Links (1.25rem) + Contact Block (2.25rem with Orange Links) */}
          <div className="footer-right-col">
            <nav aria-label="Footer navigation">
              <ul className="footer-link-list">
                {NAV_ITEMS.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="footer-nav-link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="footer-contact-groups">
              <div className="footer-contact-group">
                <p className="footer-contact-heading">Write me</p>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="footer-orange-link"
                >
                  {PROFILE.email}
                </a>
              </div>

              <div className="footer-contact-group">
                <p className="footer-contact-heading">Call me</p>
                <a
                  href={`tel:${PROFILE.phone.replace(/[^+\d]/g, '')}`}
                  className="footer-orange-link"
                >
                  {PROFILE.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-legal">
            &copy; {new Date().getFullYear()} {PROFILE.fullName}. All rights reserved.
          </p>
          <p className="footer-legal">
            BCA Student (2022–2025) &middot; Open to internships &amp; entry-level web development roles.
          </p>
        </div>
      </div>
    </footer>
  );
}

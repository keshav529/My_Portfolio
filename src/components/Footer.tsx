import { Link } from 'react-router-dom';
import { Mail, Phone, FileDown, ArrowUpRight } from 'lucide-react';
import { NAV_ITEMS, PROFILE } from '../data/portfolioData';

/**
 * Editorial Footer with navigation links, verified email & phone,
 * social links, resume download, and copyright.
 */
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand & Honest Intro */}
          <div>
            <p className="footer-brand">{PROFILE.fullName}</p>
            <p className="footer-bio">
              {PROFILE.role} &amp; {PROFILE.degree} at {PROFILE.college}. Focused on building clean, responsive, and user-friendly web experiences.
            </p>
            <a
              href={PROFILE.resumeUrl}
              download
              className="footer-social-btn"
            >
              <FileDown size={16} aria-hidden="true" />
              <span>Download Resume</span>
            </a>
          </div>

          {/* Column 2: Site Pages */}
          <div>
            <p className="footer-heading">Navigation</p>
            <ul className="footer-link-list">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="footer-nav-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Direct Contact & Social Links */}
          <div>
            <p className="footer-heading">Connect</p>
            <ul className="footer-contact-list">
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="footer-contact-item"
                >
                  <Mail size={16} aria-hidden="true" />
                  <span>{PROFILE.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${PROFILE.phone.replace(/[^+\d]/g, '')}`}
                  className="footer-contact-item"
                >
                  <Phone size={16} aria-hidden="true" />
                  <span>{PROFILE.phone}</span>
                </a>
              </li>
            </ul>

            <div className="footer-socials">
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
                href={PROFILE.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
              >
                <span>LeetCode</span>
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
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
          <p>Open to internships &amp; entry-level web development opportunities.</p>
        </div>
      </div>
    </footer>
  );
}

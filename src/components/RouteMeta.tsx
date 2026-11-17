import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PROJECTS } from '../data/portfolioData';

const ROUTE_TITLES: Record<string, string> = {
  '/': 'Keshav Anand — Web Developer & UI Designer',
  '/about': 'About — Keshav Anand | Education & Skills',
  '/process': 'Process — Keshav Anand | How I Build',
  '/work': 'Work — Keshav Anand | Selected Projects',
  '/contact': 'Contact — Keshav Anand | Get in Touch',
  '/resources': 'Resources — Keshav Anand | Resume & Notes',
};

/**
 * Updates document title and canonical URL on client-side route changes for SEO.
 */
export function RouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    let nextTitle = ROUTE_TITLES[pathname];

    if (!nextTitle && pathname.startsWith('/work/')) {
      const slug = pathname.replace('/work/', '');
      const project = PROJECTS.find((p) => p.slug === slug);
      nextTitle = project
        ? `${project.title} — Case Study | Keshav Anand`
        : 'Project Case Study — Keshav Anand';
    }

    document.title = nextTitle || 'Keshav Anand — Web Developer Portfolio';

    const canonicalUrl = `${window.location.origin}${pathname}`;
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;
  }, [pathname]);

  return null;
}

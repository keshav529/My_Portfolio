import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PROJECTS } from '../data/portfolioData';

interface MetaEntry {
  title: string;
  description: string;
}

const ROUTE_META: Record<string, MetaEntry> = {
  '/': {
    title: 'Keshav Anand — Web Developer & UI Designer',
    description:
      'Portfolio of Keshav Anand, a BCA student (2022–2025) and aspiring software developer building fast, responsive web experiences with HTML, CSS, JavaScript, and React.',
  },
  '/about': {
    title: 'About — Keshav Anand | Education & Skills',
    description:
      'Education timeline (BCA 2022–2025, Class 12 HBSE 82.2%, Class 10 CBSE 69.6%) and technical skills of Keshav Anand across HTML5, CSS3, JavaScript, Java, C, Bootstrap, Figma, and React.',
  },
  '/process': {
    title: 'Process — Keshav Anand | How I Build',
    description:
      'My four-step workflow — Understand, Plan, Build, Improve — from Figma wireframes to semantic, accessible, and responsive web applications.',
  },
  '/work': {
    title: 'Work — Keshav Anand | Selected Projects',
    description:
      'Explore responsive web projects and interactive JavaScript apps by Keshav Anand: Currency Converter, Netflix Clone, Bootstrap Website Clone, Tic-Tac-Toe, Stopwatch, and Calculator.',
  },
  '/contact': {
    title: 'Contact — Keshav Anand | Get in Touch',
    description:
      'Contact Keshav Anand for web development internships, trainee roles, or collaborations via form, email (keshavanand748@gmail.com), phone, GitHub, or LinkedIn.',
  },
  '/resources': {
    title: 'Resources — Keshav Anand | Resume & Links',
    description:
      'Download Keshav Anand’s PDF resume and visit his verified GitHub, LeetCode, and LinkedIn profiles.',
  },
};

function upsertMetaTag(attr: 'name' | 'property', key: string, content: string): void {
  let tag = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

/**
 * Updates document title, meta description, Open Graph, Twitter cards, and canonical URL per route.
 */
export function RouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    let entry: MetaEntry | undefined = ROUTE_META[pathname];

    if (!entry && pathname.startsWith('/work/')) {
      const slug = pathname.replace('/work/', '');
      const project = PROJECTS.find((p) => p.slug === slug);
      entry = project
        ? {
            title: `${project.title} — Case Study | Keshav Anand`,
            description: project.shortDescription,
          }
        : {
            title: 'Project Not Found — Keshav Anand',
            description: 'The requested project case study could not be found in Keshav Anand’s portfolio.',
          };
    }

    if (!entry) {
      entry = {
        title: '404 — Page Not Found | Keshav Anand',
        description: 'The requested page does not exist. Return to Keshav Anand’s portfolio home or project archive.',
      };
    }

    const canonicalUrl = `${window.location.origin}${pathname}`;

    document.title = entry.title;
    upsertMetaTag('name', 'description', entry.description);
    upsertMetaTag('property', 'og:title', entry.title);
    upsertMetaTag('property', 'og:description', entry.description);
    upsertMetaTag('property', 'og:url', canonicalUrl);
    upsertMetaTag('name', 'twitter:title', entry.title);
    upsertMetaTag('name', 'twitter:description', entry.description);

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

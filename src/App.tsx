import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { IntroLoader } from './components/IntroLoader';
import { SmoothScroll } from './components/SmoothScroll';
import { RouteMeta } from './components/RouteMeta';
import { HomePage } from './pages/HomePage';
import { PROJECTS } from './data/portfolioData';

const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const ProcessPage = lazy(() =>
  import('./pages/ProcessPage').then((m) => ({ default: m.ProcessPage }))
);
const WorkPage = lazy(() =>
  import('./pages/WorkPage').then((m) => ({ default: m.WorkPage }))
);
const ProjectDetailPage = lazy(() =>
  import('./pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage }))
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const ResourcesPage = lazy(() =>
  import('./pages/ResourcesPage').then((m) => ({ default: m.ResourcesPage }))
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

function RouteSuspenseFallback() {
  return (
    <div className="route-suspense-fallback" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Loading page</span>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={<RouteSuspenseFallback />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<ProjectDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

/**
 * Root Application Shell
 * - IntroLoader (#2b2b2b counter + wipe reveal)
 * - SmoothScroll (Lenis inertial scrolling, disabled for prefers-reduced-motion)
 * - Fixed Navbar + 50/50 split Fullscreen Menu
 * - Dual-panel PageTransition between routes
 * - Reference Footer (#121212)
 */
export function App() {
  useEffect(() => {
    if (import.meta.env.DEV) {
      const optionalAssets = [
        '/image/resume-preview.webp',
        '/image/journey-college.webp',
        '/image/journey-desk.webp',
        ...PROJECTS.flatMap((p) => [`/image/${p.slug}-mobile.webp`, `/image/${p.slug}-detail.webp`]),
      ];
      console.groupCollapsed(
        '%c[Dev Notice] Optional portfolio image assets status',
        'color: #ff5330; font-weight: bold;'
      );
      optionalAssets.forEach((path) => {
        const img = new Image();
        img.src = path;
        img.onerror = () => {
          console.log(
            `%c[Missing optional asset] ${path} (falling back to SVG/portrait)`,
            'color: #737373;'
          );
        };
      });
      console.groupEnd();
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <SmoothScroll />
        <RouteMeta />
        <IntroLoader />
        <div className="app-shell">
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="app-main">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;

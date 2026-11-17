import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { IntroLoader } from './components/IntroLoader';
import { SmoothScroll } from './components/SmoothScroll';
import { RouteMeta } from './components/RouteMeta';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProcessPage } from './pages/ProcessPage';
import { WorkPage } from './pages/WorkPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ContactPage } from './pages/ContactPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { StageRouteShell } from './pages/StageRouteShell';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:slug" element={<ProjectDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route
          path="*"
          element={
            <StageRouteShell
              eyebrow="404 • PAGE NOT FOUND"
              title="This page does not exist"
              description="The link you followed may be broken or moved. Use the menu above or return home."
              stageLabel="Navigation"
            />
          }
        />
      </Routes>
    </AnimatePresence>
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

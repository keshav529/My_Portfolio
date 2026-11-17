/**
 * Keshav's Portfolio — Stage 1 Script
 * Handles:
 * 1. Theme persistence (localStorage + system prefers-color-scheme fallback)
 * 2. Hero role typing / rotating effect (respects prefers-reduced-motion)
 * 3. Lightweight Hero canvas particle grid (pauses when offscreen or reduced motion)
 */

const THEME_STORAGE_KEY = 'portfolio-theme';
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ==========================================================================
   1. Theme Toggle & Persistence
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const toggleIcon = document.getElementById('theme-toggle-icon');
  const toggleLabel = document.getElementById('theme-toggle-label');
  const root = document.documentElement;

  if (!toggleBtn || !toggleIcon || !toggleLabel) return;

  function applyTheme(theme, persist = false) {
    root.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';

    toggleBtn.setAttribute('aria-pressed', String(isDark));
    toggleBtn.setAttribute(
      'aria-label',
      isDark ? 'Switch to light theme' : 'Switch to dark theme'
    );
    toggleIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    toggleLabel.textContent = isDark ? 'Light' : 'Dark';

    if (persist) {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
      } catch {
        // Ignore storage errors in restricted browsing modes
      }
    }
  }

  // Sync button UI with the initial theme already applied in <head>
  const initialTheme = root.getAttribute('data-theme') || 'dark';
  applyTheme(initialTheme, false);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme, true);
  });

  // Follow system theme changes only when the user hasn't explicitly chosen one
  const systemDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  systemDarkQuery.addEventListener('change', (event) => {
    try {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(event.matches ? 'dark' : 'light', false);
      }
    } catch {
      applyTheme(event.matches ? 'dark' : 'light', false);
    }
  });
}

/* ==========================================================================
   2. Hero Rotating / Typing Text Effect
   ========================================================================== */
function initHeroRoleTyper() {
  const roleElement = document.getElementById('hero-rotating-role');
  if (!roleElement) return;

  const roles = ['Aspiring Software Developer', 'Web Developer', 'Problem Solver'];

  // Show static title immediately if user prefers reduced motion
  if (prefersReducedMotion.matches) {
    roleElement.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = roles[0].length;
  let isDeleting = false;
  let timerId = null;

  function tick() {
    if (prefersReducedMotion.matches) {
      roleElement.textContent = roles[0];
      return;
    }

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex = Math.max(0, charIndex - 1);
    } else {
      charIndex = Math.min(currentRole.length, charIndex + 1);
    }

    roleElement.textContent = currentRole.slice(0, charIndex);

    let delay = isDeleting ? 45 : 75;

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause on full word before deleting
      isDeleting = true;
      delay = 1900;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 320;
    }

    timerId = window.setTimeout(tick, delay);
  }

  // Start after a short initial pause so first paint stays calm
  timerId = window.setTimeout(() => {
    isDeleting = true;
    tick();
  }, 2200);

  prefersReducedMotion.addEventListener('change', (e) => {
    if (e.matches && timerId) {
      window.clearTimeout(timerId);
      roleElement.textContent = roles[0];
    }
  });
}

/* ==========================================================================
   3. Lightweight Hero Particle Canvas
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  const heroSection = document.getElementById('home-id');
  if (!canvas || !heroSection) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let particles = [];
  let rafId = null;
  let isVisible = true;

  function getParticleRgb() {
    const rgb = getComputedStyle(document.documentElement)
      .getPropertyValue('--particle-rgb')
      .trim();
    return rgb || '56, 189, 248';
  }

  function resizeCanvas() {
    const rect = heroSection.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Keep particle count modest for 60fps performance on all devices
    const count = width < 768 ? 18 : 34;
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.6 + 1,
    }));
  }

  function drawFrame() {
    if (!isVisible || prefersReducedMotion.matches) {
      ctx.clearRect(0, 0, width, height);
      rafId = null;
      return;
    }

    ctx.clearRect(0, 0, width, height);
    const rgb = getParticleRgb();
    const linkDistance = 125;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb}, 0.45)`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.hypot(dx, dy);

        if (dist < linkDistance) {
          const alpha = (1 - dist / linkDistance) * 0.16;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(${rgb}, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    rafId = window.requestAnimationFrame(drawFrame);
  }

  function startAnimation() {
    if (prefersReducedMotion.matches) {
      ctx.clearRect(0, 0, width, height);
      return;
    }
    if (!rafId && isVisible) {
      rafId = window.requestAnimationFrame(drawFrame);
    }
  }

  resizeCanvas();
  startAnimation();

  window.addEventListener('resize', resizeCanvas, { passive: true });

  // Pause animation when hero scrolls out of view to save CPU/battery
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        if (isVisible) {
          startAnimation();
        } else if (rafId) {
          window.cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(heroSection);
  }

  prefersReducedMotion.addEventListener('change', () => {
    if (prefersReducedMotion.matches && rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
      ctx.clearRect(0, 0, width, height);
    } else {
      startAnimation();
    }
  });
}

/* ==========================================================================
   Boot Stage 1 Interactive Features
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initHeroRoleTyper();
  initHeroCanvas();
});

import { useCallback, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'portfolio-theme';

const THEME_META_COLORS: Record<ThemeMode, string> = {
  light: '#fafafa',
  dark: '#070b14',
};

function getStoredTheme(): ThemeMode | null {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch {
    // Ignore storage access errors (e.g., restricted/private browsing contexts)
  }
  return null;
}

function getSystemTheme(): ThemeMode {
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

function resolveInitialTheme(): ThemeMode {
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'light' || attr === 'dark') {
      return attr;
    }
  }
  return getStoredTheme() ?? getSystemTheme();
}

function applyThemeToDocument(theme: ThemeMode): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', THEME_META_COLORS[theme]);
  }
}

/**
 * Manages light/dark theme state:
 * - Defaults to the user's OS `prefers-color-scheme` preference
 * - Persists explicit user choices in localStorage
 * - Tracks OS theme changes automatically if the user hasn't overridden it
 */
export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(resolveInitialTheme);

  // Sync DOM attribute and meta theme-color whenever state changes
  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  // Follow system preference changes unless the user has explicitly saved a choice
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (event: MediaQueryListEvent) => {
      if (getStoredTheme() === null) {
        setTheme(event.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => {
      const nextTheme: ThemeMode = currentTheme === 'dark' ? 'light' : 'dark';
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      } catch {
        // Ignore storage write errors
      }
      return nextTheme;
    });
  }, []);

  return { theme, toggleTheme };
}

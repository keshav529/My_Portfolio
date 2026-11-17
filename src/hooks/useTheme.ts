import { useCallback, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'portfolio-theme';

const THEME_META_COLORS: Record<ThemeMode, string> = {
  light: '#e7e2dc',
  dark: '#121212',
};

function getStoredTheme(): ThemeMode | null {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch {
    // Ignore storage access errors
  }
  return null;
}

function resolveInitialTheme(): ThemeMode {
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'light' || attr === 'dark') {
      return attr;
    }
  }
  // Always default to the reference Cream-1 (#e7e2dc) look unless user saved 'dark'
  return getStoredTheme() ?? 'light';
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
 * Optional light/dark theme state that preserves the Cream (#e7e2dc) + Orange (#ff5330)
 * reference palette by default while allowing an optional dark charcoal switch.
 */
export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(resolveInitialTheme);

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

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

'use client';

import { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';

type Theme = 'dark' | 'light';

export default function ThemeToggle() {
  // Start as null so we don't render the wrong icon before we've read the
  // visitor's saved choice (which the inline script in layout already applied).
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current =
      document.documentElement.getAttribute('data-theme') === 'light'
        ? 'light'
        : 'dark';
    setTheme(current);
  }, []);

  function toggle() {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    if (next === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Private browsing / storage disabled — toggle still works for this visit.
    }
    setTheme(next);
  }

  // Avoid a flash of the wrong icon until we know the theme.
  const isLight = theme === 'light';
  const label = isLight ? 'Switch to night (Nox)' : 'Switch to day (Lumos)';

  return (
    <button
      className={styles.toggle}
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      <span className={styles.icon} aria-hidden="true">
        {theme === null ? '' : isLight ? '🌙' : '☀️'}
      </span>
    </button>
  );
}

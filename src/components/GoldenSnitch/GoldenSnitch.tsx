'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styles from './GoldenSnitch.module.css';

export default function GoldenSnitch() {
  const pathname = usePathname();
  const [flying, setFlying] = useState(false);
  const prevPath = useRef(pathname);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (pathname !== prevPath.current) {
      prevPath.current = pathname;
      if (timer.current) clearTimeout(timer.current);
      setFlying(true);
      timer.current = setTimeout(() => setFlying(false), 1400);
    }
  }, [pathname]);

  if (!flying) return null;

  return (
    <div className={styles.snitch} aria-hidden="true">
      <svg width="36" height="26" viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left wing */}
        <ellipse cx="8" cy="13" rx="9" ry="4.5" fill="#b8960a" stroke="#7a5c00" strokeWidth="0.7"
          transform="rotate(-15 8 13)" className={styles.wingLeft} />
        {/* Right wing */}
        <ellipse cx="28" cy="13" rx="9" ry="4.5" fill="#b8960a" stroke="#7a5c00" strokeWidth="0.7"
          transform="rotate(15 28 13)" className={styles.wingRight} />
        {/* Wing detail lines */}
        <line x1="3" y1="11" x2="16" y2="13" stroke="#7a5c00" strokeWidth="0.4" opacity="0.6" />
        <line x1="33" y1="11" x2="20" y2="13" stroke="#7a5c00" strokeWidth="0.4" opacity="0.6" />
        {/* Body — golden ball */}
        <circle cx="18" cy="13" r="6.2" fill="url(#snitch-gold)" />
        {/* Specular highlight */}
        <circle cx="15.2" cy="10.2" r="2" fill="rgba(255,252,200,0.55)" />
        <circle cx="20" cy="15.5" r="0.8" fill="rgba(255,220,80,0.2)" />
        <defs>
          <radialGradient id="snitch-gold" cx="38%" cy="32%" r="68%">
            <stop offset="0%"   stopColor="#fff0a0" />
            <stop offset="35%"  stopColor="#e8b820" />
            <stop offset="70%"  stopColor="#c08010" />
            <stop offset="100%" stopColor="#7a4e00" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

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
        <ellipse cx="8" cy="13" rx="9" ry="5" fill="rgba(255,248,220,0.82)" stroke="rgba(212,168,67,0.6)" strokeWidth="0.6"
          transform="rotate(-18 8 13)" className={styles.wingLeft} />
        {/* Right wing */}
        <ellipse cx="28" cy="13" rx="9" ry="5" fill="rgba(255,248,220,0.82)" stroke="rgba(212,168,67,0.6)" strokeWidth="0.6"
          transform="rotate(18 28 13)" className={styles.wingRight} />
        {/* Body — golden ball */}
        <circle cx="18" cy="13" r="6" fill="url(#snitch-gold)" />
        {/* Highlight */}
        <circle cx="15.5" cy="10.5" r="1.8" fill="rgba(255,255,220,0.6)" />
        <defs>
          <radialGradient id="snitch-gold" cx="40%" cy="35%" r="65%">
            <stop offset="0%"  stopColor="#ffe97a" />
            <stop offset="60%" stopColor="#d4a843" />
            <stop offset="100%" stopColor="#8a6010" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

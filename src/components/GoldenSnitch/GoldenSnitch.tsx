'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './GoldenSnitch.module.css';

const SPARKLE_GLYPHS = ['✦', '✧', '✦', '·', '✦'];

type Sparkle = { tx: number; ty: number; size: number; delay: number; glyph: string };

// The Golden Snitch SVG, reused for the flying egg and the celebration card.
// Each instance needs a unique gradient id so two on screen never clash.
function SnitchSvg({ id, width = 36, height = 26 }: { id: string; width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <circle cx="18" cy="13" r="6.2" fill={`url(#${id})`} />
      {/* Specular highlight */}
      <circle cx="15.2" cy="10.2" r="2" fill="rgba(255,252,200,0.55)" />
      <circle cx="20" cy="15.5" r="0.8" fill="rgba(255,220,80,0.2)" />
      <defs>
        <radialGradient id={id} cx="38%" cy="32%" r="68%">
          <stop offset="0%"   stopColor="#fff0a0" />
          <stop offset="35%"  stopColor="#e8b820" />
          <stop offset="70%"  stopColor="#c08010" />
          <stop offset="100%" stopColor="#7a4e00" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default function GoldenSnitch() {
  const pathname = usePathname();
  const [flying, setFlying] = useState(false);
  const [caught, setCaught] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const flyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const catchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Fire on initial mount AND on every subsequent navigation.
    if (flyTimer.current) clearTimeout(flyTimer.current);
    setFlying(true);
    // Matches the ~5s CSS flight so there's a long, fair window to catch it.
    flyTimer.current = setTimeout(() => setFlying(false), 5000);
  }, [pathname]);

  // Tidy timers if the component unmounts mid-flight or mid-celebration.
  useEffect(() => () => {
    if (flyTimer.current) clearTimeout(flyTimer.current);
    if (catchTimer.current) clearTimeout(catchTimer.current);
  }, []);

  const handleCatch = useCallback(() => {
    // Stop the flight and fire the celebration.
    if (flyTimer.current) clearTimeout(flyTimer.current);
    setFlying(false);

    // Burst of sparkles flying outward from the centre of the card.
    setSparkles(
      Array.from({ length: 18 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 50 + Math.random() * 80;
        return {
          tx: Math.cos(angle) * dist,
          ty: Math.sin(angle) * dist,
          size: 12 + Math.random() * 12,
          delay: Math.random() * 120,
          glyph: SPARKLE_GLYPHS[Math.floor(Math.random() * SPARKLE_GLYPHS.length)],
        };
      })
    );

    setCaught(true);
    if (catchTimer.current) clearTimeout(catchTimer.current);
    catchTimer.current = setTimeout(() => setCaught(false), 2600);
  }, []);

  return (
    <>
      {flying && (
        <div
          className={styles.snitch}
          onClick={handleCatch}
          role="button"
          aria-label="Catch the Golden Snitch"
        >
          {/* Slightly enlarged invisible hit area so it's catchable, not impossible. */}
          <span className={styles.hit} />
          <SnitchSvg id="snitch-gold-fly" />
        </div>
      )}

      {caught && (
        <div className={styles.celebration} aria-hidden="true">
          <span className={styles.flash} />
          <div className={styles.card}>
            <span className={styles.cardSnitch}>
              <SnitchSvg id="snitch-gold-card" width={64} height={46} />
            </span>
            <span className={styles.caughtTitle}>You caught the Snitch!</span>
            <span className={styles.points}>+150 points!</span>

            {sparkles.map((s, i) => (
              <span
                key={i}
                className={styles.sparkle}
                style={
                  {
                    '--tx': `${s.tx}px`,
                    '--ty': `${s.ty}px`,
                    fontSize: `${s.size}px`,
                    animationDelay: `${s.delay}ms`,
                  } as React.CSSProperties
                }
              >
                {s.glyph}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

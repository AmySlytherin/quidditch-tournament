'use client';

import { useEffect, useState } from 'react';
import styles from './GreatHallCeiling.module.css';

type SkyPhase = 'dawn' | 'day' | 'dusk' | 'night';

// Fixed candle layout — deterministic so the server and client render the same
// markup (no hydration mismatch). They sit just below the nav and drift /
// flicker like the floating candles of the Great Hall.
const CANDLES = [
  { left: 5,  top: 120, scale: 0.9,  delay: 0   },
  { left: 14, top: 200, scale: 1.1,  delay: 1.2 },
  { left: 23, top: 110, scale: 0.8,  delay: 2.4 },
  { left: 32, top: 230, scale: 1.0,  delay: 0.6 },
  { left: 41, top: 130, scale: 1.15, delay: 1.8 },
  { left: 50, top: 210, scale: 0.85, delay: 3.0 },
  { left: 59, top: 104, scale: 1.05, delay: 0.9 },
  { left: 68, top: 224, scale: 0.95, delay: 2.1 },
  { left: 78, top: 140, scale: 1.1,  delay: 1.5 },
  { left: 87, top: 198, scale: 0.8,  delay: 0.3 },
];

// Fixed star field for the dusk / night sky. Positions are derived from the
// index so they're deterministic (again, no hydration mismatch).
const STARS = Array.from({ length: 44 }, (_, i) => ({
  x: (i * 53 + 7) % 100,
  y: (i * 29 + 11) % 70,
  size: ((i * 17) % 3) * 0.5 + 0.8,
  delay: ((i * 13) % 10) * 0.4,
}));

function phaseForHour(hour: number): SkyPhase {
  if (hour >= 5 && hour < 8) return 'dawn';
  if (hour >= 8 && hour < 17) return 'day';
  if (hour >= 17 && hour < 21) return 'dusk';
  return 'night';
}

export default function GreatHallCeiling() {
  // Render night on the server / first paint (matches the default Nox theme),
  // then settle to the visitor's real local time of day after mount.
  const [phase, setPhase] = useState<SkyPhase>('night');

  useEffect(() => {
    const update = () => setPhase(phaseForHour(new Date().getHours()));
    update();
    // Re-check hourly so a long-open tab rolls over into the next phase.
    const id = setInterval(update, 60 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const showStars = phase === 'night' || phase === 'dusk';

  return (
    <div className={`${styles.ceiling} ${styles[phase]}`} aria-hidden="true">
      <div className={styles.sky} />

      {/* A soft sun by day, a moon by night, high in the corner. */}
      {phase === 'night' && <span className={styles.moon} />}
      {(phase === 'day' || phase === 'dawn') && <span className={styles.sun} />}

      {showStars && (
        <div className={styles.stars}>
          {STARS.map((star, i) => (
            <span
              key={i}
              className={styles.star}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className={styles.candles}>
        {CANDLES.map((c, i) => (
          <span
            key={i}
            className={styles.candle}
            style={
              {
                left: `${c.left}%`,
                top: `${c.top}px`,
                '--scale': c.scale,
                animationDelay: `${c.delay}s`,
              } as React.CSSProperties
            }
          >
            <span className={styles.glow} />
            <span className={styles.flame} />
            <span className={styles.taper} />
          </span>
        ))}
      </div>
    </div>
  );
}

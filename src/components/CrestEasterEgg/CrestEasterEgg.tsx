'use client';

import { useRef, useState, useCallback } from 'react';
import HogwartsCrest from '@/components/HogwartsCrest/HogwartsCrest';
import QuoteParchment from '@/components/QuoteParchment/QuoteParchment';
import styles from './CrestEasterEgg.module.css';

// The four houses, in the order points are awarded. Bright, saturated colours
// so the floating message reads on the dark "spell" pill in BOTH Lumos & Nox.
const HOUSES = [
  { name: 'Gryffindor', color: '#ff5a4d' },
  { name: 'Hufflepuff', color: '#f5c518' },
  { name: 'Ravenclaw', color: '#6f9eff' },
  { name: 'Slytherin', color: '#3ddc78' },
] as const;

// Cheeky little lines, picked at random each tap.
const QUOTES = [
  'Mischief managed.',
  'Dumbledore would be proud.',
  'A worthy display of nerve.',
  'Cunning little click.',
  'The hourglasses approve.',
  'Well spotted!',
  'Magic is afoot.',
  'And not a Knut more.',
];

type Pop = {
  id: number;
  house: (typeof HOUSES)[number];
  quote: string;
  sparkles: { tx: number; ty: number; size: number; delay: number; glyph: string }[];
};

const SPARKLE_GLYPHS = ['✦', '✧', '✦', '·', '✦'];

export default function CrestEasterEgg({ className }: { className?: string }) {
  const [pops, setPops] = useState<Pop[]>([]);
  const houseIndex = useRef(Math.floor(Math.random() * HOUSES.length));
  const nextId = useRef(0);

  const handleClick = useCallback((e: React.MouseEvent) => {
    // Stop the nav's "/" link from navigating home — the crest is now a surprise.
    e.preventDefault();
    e.stopPropagation();

    const house = HOUSES[houseIndex.current % HOUSES.length];
    houseIndex.current += 1;
    const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

    // Build a little burst of sparkles flying outward from the crest centre.
    const sparkles = Array.from({ length: 14 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 26 + Math.random() * 40;
      return {
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist,
        size: 9 + Math.random() * 9,
        delay: Math.random() * 90,
        glyph: SPARKLE_GLYPHS[Math.floor(Math.random() * SPARKLE_GLYPHS.length)],
      };
    });

    const id = nextId.current++;
    setPops((prev) => [...prev, { id, house, quote, sparkles }]);
    // Self-cleanup once the animation has finished.
    window.setTimeout(() => {
      setPops((prev) => prev.filter((p) => p.id !== id));
    }, 1500);
  }, []);

  return (
    <span
      className={`${styles.wrap} ${className ?? ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={-1}
      aria-label="Hogwarts crest — tap for a surprise"
    >
      <HogwartsCrest size={58} />

      {/* Hidden charm: a precise click on the crest's "H" unrolls a quote. */}
      <QuoteParchment />

      {pops.map((pop) => (
        <span key={pop.id} className={styles.overlay} aria-hidden="true">
          {pop.sparkles.map((s, i) => (
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

          <span className={styles.message}>
            <span className={styles.points} style={{ color: pop.house.color }}>
              +10 points to {pop.house.name}!
            </span>
            <span className={styles.quote}>{pop.quote}</span>
          </span>
        </span>
      ))}
    </span>
  );
}

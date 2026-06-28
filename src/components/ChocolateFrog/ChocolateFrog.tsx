'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getCard } from '@/data/chocolateFrogCards';
import { collectCard, getCollected, pickRandomUncollected, useFrogCards } from '@/lib/frogCards';
import FrogSvg from './FrogSvg';
import FrogCardFace from './FrogCardFace';
import styles from './ChocolateFrog.module.css';

const SPARKLE_GLYPHS = ['✦', '✧', '✦', '·', '✦'];
type Sparkle = { tx: number; ty: number; size: number; delay: number; glyph: string };

// A chocolate frog hops across the bottom of the screen now and then. Catching
// it collects a card you don't have yet. Transient like the Snitch, so nothing
// ever sits permanently on the page. It hops along the BOTTOM edge and on a
// delayed timer, so it never collides with the Snitch (which flies up top).
export default function ChocolateFrog() {
  const pathname = usePathname();
  const { isComplete } = useFrogCards();
  const [hopping, setHopping] = useState(false);
  const [revealId, setRevealId] = useState<string | null>(null);
  const [justCompleted, setJustCompleted] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const appearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // On each page (re)load, after a friendly delay, send the frog hopping —
  // but only if there are still cards left to collect.
  useEffect(() => {
    if (appearTimer.current) clearTimeout(appearTimer.current);
    if (hopTimer.current) clearTimeout(hopTimer.current);
    setHopping(false);

    // Set already complete → no more frogs, keep it calm.
    if (getCollected().length >= 8) return;

    // 60% of page views, after a 5.5–10.5s delay (well clear of the Snitch).
    if (Math.random() > 0.6) return;
    const delay = 5500 + Math.random() * 5000;
    appearTimer.current = setTimeout(() => {
      setHopping(true);
      // ~7s hop across; if not caught, it simply hops off the far side.
      hopTimer.current = setTimeout(() => setHopping(false), 7000);
    }, delay);

    return () => {
      if (appearTimer.current) clearTimeout(appearTimer.current);
      if (hopTimer.current) clearTimeout(hopTimer.current);
    };
  }, [pathname]);

  // Tidy any pending timers on unmount.
  useEffect(
    () => () => {
      if (appearTimer.current) clearTimeout(appearTimer.current);
      if (hopTimer.current) clearTimeout(hopTimer.current);
      if (revealTimer.current) clearTimeout(revealTimer.current);
    },
    []
  );

  const closeReveal = useCallback(() => {
    if (revealTimer.current) clearTimeout(revealTimer.current);
    setRevealId(null);
    setJustCompleted(false);
  }, []);

  const handleCatch = useCallback(() => {
    if (hopTimer.current) clearTimeout(hopTimer.current);
    setHopping(false);

    const id = pickRandomUncollected();
    if (!id) return; // nothing left (shouldn't happen — frog hides when complete)

    const after = collectCard(id);
    const complete = after.length >= 8;

    // Burst of sparkles from the centre of the revealed card.
    setSparkles(
      Array.from({ length: 18 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 60 + Math.random() * 90;
        return {
          tx: Math.cos(angle) * dist,
          ty: Math.sin(angle) * dist,
          size: 12 + Math.random() * 12,
          delay: Math.random() * 140,
          glyph: SPARKLE_GLYPHS[Math.floor(Math.random() * SPARKLE_GLYPHS.length)],
        };
      })
    );

    setRevealId(id);
    setJustCompleted(complete);

    // Auto-dismiss; the completion flourish lingers a touch longer.
    if (revealTimer.current) clearTimeout(revealTimer.current);
    revealTimer.current = setTimeout(closeReveal, complete ? 6000 : 4500);
  }, [closeReveal]);

  const card = revealId ? getCard(revealId) : null;
  const collectedCount = getCollected().length;

  return (
    <>
      {hopping && !isComplete && (
        <div
          className={styles.frog}
          onClick={handleCatch}
          role="button"
          aria-label="Catch the chocolate frog"
        >
          {/* Generous invisible hit area so it's a fair, catchable target. */}
          <span className={styles.hit} />
          <FrogSvg size={42} legClass={styles.legs} eyeClass={styles.eyes} />
        </div>
      )}

      {card && (
        <div
          className={styles.revealBackdrop}
          onClick={closeReveal}
          role="dialog"
          aria-label="You caught a Chocolate Frog Card"
        >
          {justCompleted && <span className={styles.flash} aria-hidden="true" />}

          <div className={styles.revealStage} onClick={(e) => e.stopPropagation()}>
            <p className={styles.caughtLabel}>
              {justCompleted ? 'The set is complete!' : 'You caught a Chocolate Frog!'}
            </p>

            <div className={styles.cardWrap}>
              <FrogCardFace card={card} />
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

            <p className={styles.progress}>
              {justCompleted
                ? "🎉 You've collected every card!"
                : `${collectedCount} of 8 collected`}
            </p>
            <p className={styles.tapHint}>tap to close</p>
          </div>
        </div>
      )}
    </>
  );
}

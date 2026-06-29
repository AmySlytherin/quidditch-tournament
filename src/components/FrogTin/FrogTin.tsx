'use client';

import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useCallback, useEffect, useState } from 'react';
import { FROG_CARDS, getCard, type FrogCard } from '@/data/chocolateFrogCards';
import { resetCards, useFrogCards } from '@/lib/frogCards';
import FrogSvg from '@/components/ChocolateFrog/FrogSvg';
import FrogCardFace from '@/components/ChocolateFrog/FrogCardFace';
import styles from './FrogTin.module.css';

// A discreet chocolate-frog "tin" in the nav. Tap to open the card album:
// found cards as portraits, missing ones as mystery slots, an "X of 8 found"
// header, and a golden flourish once the whole set is complete.
export default function FrogTin() {
  const { count, total, isComplete, has } = useFrogCards();
  const [open, setOpen] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);
  // Only portal after mount, since document doesn't exist during SSR.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    setOpen(false);
    setDetailId(null);
  }, []);

  // Escape closes the detail card first, then the album.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (detailId) setDetailId(null);
      else close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, detailId, close]);

  const detail: FrogCard | null = detailId ? getCard(detailId) ?? null : null;

  return (
    <>
      <button
        className={styles.tin}
        onClick={() => setOpen(true)}
        aria-label={`Chocolate Frog Cards — ${count} of ${total} found`}
        title="Chocolate Frog Cards"
      >
        <FrogSvg size={24} />
        {count > 0 && (
          <span className={`${styles.badge} ${isComplete ? styles.badgeDone : ''}`}>
            {count}/{total}
          </span>
        )}
      </button>

      {open && mounted && createPortal(
        <div className={styles.backdrop} onClick={close} role="dialog" aria-label="Chocolate Frog Cards album">
          <div className={styles.album} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={close} aria-label="Close">×</button>

            <header className={styles.header}>
              <h2 className={styles.title}>Chocolate Frog Cards</h2>
              <p className={styles.subtitle}>“Mix of Legends”</p>
              <div className={styles.progressBar}>
                <span className={styles.progressFill} style={{ width: `${(count / total) * 100}%` }} />
              </div>
              <p className={`${styles.count} ${isComplete ? styles.countDone : ''}`}>
                {isComplete ? '★ Collection complete! ★' : `${count} of ${total} found`}
              </p>
            </header>

            <div className={styles.grid}>
              {FROG_CARDS.map((card) => {
                const owned = has(card.id);
                if (!owned) {
                  return (
                    <div key={card.id} className={styles.slotMystery} aria-label="Undiscovered card">
                      <span className={styles.mysteryMark}>?</span>
                    </div>
                  );
                }
                return (
                  <button
                    key={card.id}
                    className={styles.slot}
                    style={{ '--card-accent': card.color } as React.CSSProperties}
                    onClick={() => setDetailId(card.id)}
                    aria-label={`${card.name} — view card`}
                  >
                    <span className={styles.thumb}>
                      {card.image ? (
                        <Image src={card.image} alt={card.name} width={120} height={120} className={styles.thumbImg} />
                      ) : (
                        <span className={styles.thumbOrb} aria-hidden="true" />
                      )}
                    </span>
                    <span className={styles.slotName}>{card.name}</span>
                    <span className={styles.slotRole}>
                      <span aria-hidden="true">{card.icon}</span> {card.role}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className={styles.hint}>
              {isComplete
                ? 'Every legend caught. Nicely done.'
                : 'Keep an eye out — a chocolate frog hops by now and then. Catch it to collect a card.'}
            </p>

            {/* Once the set is complete, let visitors start the hunt over. */}
            {isComplete && (
              <button
                className={styles.playAgain}
                onClick={() => {
                  resetCards();
                  close();
                }}
              >
                Play again
              </button>
            )}
          </div>

          {/* Enlarged single-card view, tapping a found card */}
          {detail && (
            <div className={styles.detailBackdrop} onClick={() => setDetailId(null)}>
              <div onClick={(e) => e.stopPropagation()}>
                <FrogCardFace card={detail} />
              </div>
            </div>
          )}
        </div>,
        document.body
      )}
    </>
  );
}

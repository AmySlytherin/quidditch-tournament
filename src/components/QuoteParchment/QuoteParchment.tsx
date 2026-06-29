'use client';

import { createPortal } from 'react-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './QuoteParchment.module.css';

// A handful of famous Hogwarts lines, picked at random each reveal.
const QUOTES = [
  {
    text: 'It does not do to dwell on dreams and forget to live.',
    who: 'Albus Dumbledore',
  },
  {
    text: 'Happiness can be found, even in the darkest of times, if one only remembers to turn on the light.',
    who: 'Albus Dumbledore',
  },
  {
    text: 'It is our choices, Harry, that show what we truly are, far more than our abilities.',
    who: 'Albus Dumbledore',
  },
  {
    text: 'We’ve all got both light and dark inside us. What matters is the part we choose to act on.',
    who: 'Sirius Black',
  },
  {
    text: 'Of course it is happening inside your head, but why on earth should that mean that it is not real?',
    who: 'Albus Dumbledore',
  },
  {
    text: 'Fear of a name increases fear of the thing itself.',
    who: 'Hermione Granger',
  },
  {
    text: 'Words are, in my not-so-humble opinion, our most inexhaustible source of magic.',
    who: 'Albus Dumbledore',
  },
  {
    text: 'It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.',
    who: 'Neville Longbottom',
  },
  {
    text: 'I solemnly swear that I am up to no good.',
    who: 'The Marauder’s Map',
  },
] as const;

export default function QuoteParchment() {
  const [quote, setQuote] = useState<(typeof QUOTES)[number] | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Only portal after mount, since document doesn't exist during SSR.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setQuote(null);
  }, []);

  const open = useCallback((e: React.MouseEvent) => {
    // The H sits ON TOP of the crest, which already has a "+10 points" tap egg.
    // Stop the click here so only ONE egg fires (the parchment), and stop the
    // nav's home link from navigating.
    e.preventDefault();
    e.stopPropagation();

    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);

    // Auto-roll away after a few seconds if they don't dismiss it themselves.
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setQuote(null), 7000);
  }, []);

  // Let Escape close the card too, while it's open.
  useEffect(() => {
    if (!quote) return;
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [quote, close]);

  // Tidy the timer if the component ever unmounts mid-reveal.
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return (
    <>
      {/* Invisible hotspot sitting right over the gold "H" in the crest. */}
      <button
        type="button"
        className={styles.hotspot}
        onClick={open}
        aria-label="A hidden charm"
      />

      {quote && mounted && createPortal(
        <div
          className={styles.backdrop}
          onClick={close}
          role="dialog"
          aria-label="A Hogwarts quote"
        >
          {/* stop clicks on the card itself from closing via the backdrop */}
          <div className={styles.parchment} onClick={(e) => e.stopPropagation()}>
            <span className={styles.curlTop} aria-hidden="true" />
            <p className={styles.text}>&ldquo;{quote.text}&rdquo;</p>
            <p className={styles.who}>&mdash; {quote.who}</p>
            <span className={styles.seal} aria-hidden="true">
              H
            </span>
            <span className={styles.curlBottom} aria-hidden="true" />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

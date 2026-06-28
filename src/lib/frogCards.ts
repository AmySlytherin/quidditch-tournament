'use client';

// ─── Chocolate Frog Cards: collection persistence ────────────────────────
// Glitch-proof and backend-free: the set of collected card ids lives in
// localStorage (same approach as the Lumos/Nox theme toggle). A custom window
// event keeps every component (the hopping frog + the nav tin) in sync the
// instant a card is collected, and the native `storage` event keeps separate
// browser tabs in sync too.

import { useEffect, useState } from 'react';
import { FROG_CARDS, TOTAL_CARDS } from '@/data/chocolateFrogCards';

const KEY = 'frogCards';
export const FROGCARDS_EVENT = 'frogcards:change';

/** Read the collected card ids from localStorage (safe on the server). */
export function getCollected(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    // Only keep ids that still exist in the set, in case the set ever changes.
    const valid = new Set(FROG_CARDS.map((c) => c.id));
    return arr.filter((x): x is string => typeof x === 'string' && valid.has(x));
  } catch {
    return [];
  }
}

/** Collect a card by id. No-op if already held. Returns the new collection. */
export function collectCard(id: string): string[] {
  const current = getCollected();
  if (current.includes(id)) return current;
  const next = [...current, id];
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Private browsing / storage disabled — still works for this visit.
  }
  // Tell every listening component in this tab to refresh.
  try {
    window.dispatchEvent(new CustomEvent(FROGCARDS_EVENT));
  } catch {
    /* no-op */
  }
  return next;
}

/** Pick a random card the visitor doesn't have yet (null if the set is full). */
export function pickRandomUncollected(): string | null {
  const have = new Set(getCollected());
  const missing = FROG_CARDS.filter((c) => !have.has(c.id));
  if (missing.length === 0) return null;
  return missing[Math.floor(Math.random() * missing.length)].id;
}

/** React hook: the live list of collected ids, kept in sync across the app. */
export function useFrogCards() {
  const [collected, setCollected] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setCollected(getCollected());
    sync(); // read once on mount (after hydration, so SSR stays consistent)
    window.addEventListener(FROGCARDS_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(FROGCARDS_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return {
    collected,
    count: collected.length,
    total: TOTAL_CARDS,
    isComplete: collected.length >= TOTAL_CARDS,
    has: (id: string) => collected.includes(id),
  };
}

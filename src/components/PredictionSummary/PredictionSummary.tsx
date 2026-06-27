'use client';

import { useState, useEffect } from 'react';
import { loadPredictions } from '@/lib/predictions';
import styles from './PredictionSummary.module.css';

interface MatchResult {
  matchId: string;
  winnerTeamId: string;
}

interface Props {
  matches: MatchResult[];
}

export default function PredictionSummary({ matches }: Props) {
  const [counts, setCounts] = useState<{ predicted: number; correct: number } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const map = loadPredictions();
    let predicted = 0;
    let correct = 0;
    for (const { matchId, winnerTeamId } of matches) {
      if (map[matchId]) {
        predicted++;
        if (map[matchId] === winnerTeamId) correct++;
      }
    }
    setCounts({ predicted, correct });
  }, [matches]);

  if (!counts || counts.predicted === 0) return null;

  const pct = Math.round((counts.correct / counts.predicted) * 100);
  const total = matches.length;

  function handleShare() {
    const text =
      `🔮 Hogwarts Quidditch predictions: ${counts!.correct}/${counts!.predicted} correct (${pct}%) — ${total - counts!.predicted} still to go!\n` +
      `Can you do better? https://quidditch-tournament.vercel.app/schedule`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className={styles.bar}>
      <span className={styles.icon}>🔮</span>
      <span className={styles.text}>
        Your predictions: <strong>{counts.correct}/{counts.predicted}</strong> correct
      </span>
      <span className={styles.pct}>{pct}%</span>
      <button className={styles.shareBtn} onClick={handleShare}>
        {copied ? '✓ Copied!' : 'Share'}
      </button>
    </div>
  );
}

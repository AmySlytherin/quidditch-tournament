'use client';

import { useState, useEffect } from 'react';
import { loadPredictions, savePrediction } from '@/lib/predictions';
import styles from './PredictionRow.module.css';

interface Props {
  matchId: string;
  homeTeamId: string;
  homeShortName: string;
  homePrimary: string;
  awayTeamId: string;
  awayShortName: string;
  awayPrimary: string;
  winnerTeamId: string;
}

export default function PredictionRow({
  matchId,
  homeTeamId,
  homeShortName,
  homePrimary,
  awayTeamId,
  awayShortName,
  awayPrimary,
  winnerTeamId,
}: Props) {
  const [prediction, setPrediction] = useState<string | null>(null);

  useEffect(() => {
    const map = loadPredictions();
    setPrediction(map[matchId] ?? null);
  }, [matchId]);

  function handlePick(teamId: string) {
    savePrediction(matchId, teamId);
    setPrediction(teamId);
  }

  if (prediction) {
    const correct = prediction === winnerTeamId;
    const pickedName = prediction === homeTeamId ? homeShortName : awayShortName;
    const pickedColor = prediction === homeTeamId ? homePrimary : awayPrimary;
    return (
      <div className={`${styles.result} ${correct ? styles.correct : styles.wrong}`}>
        <span
          className={styles.dot}
          style={{ background: pickedColor }}
        />
        <span className={styles.label}>
          You predicted <strong>{pickedName}</strong>
        </span>
        <span className={styles.badge}>{correct ? '✓ Correct' : '✗ Wrong'}</span>
      </div>
    );
  }

  return (
    <div className={styles.picker}>
      <span className={styles.prompt}>Who wins?</span>
      <button
        className={styles.teamBtn}
        style={{ '--team-color': homePrimary } as React.CSSProperties}
        onClick={() => handlePick(homeTeamId)}
      >
        <span className={styles.btnDot} />
        {homeShortName}
      </button>
      <button
        className={styles.teamBtn}
        style={{ '--team-color': awayPrimary } as React.CSSProperties}
        onClick={() => handlePick(awayTeamId)}
      >
        <span className={styles.btnDot} />
        {awayShortName}
      </button>
    </div>
  );
}

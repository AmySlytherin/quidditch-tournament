'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { loadPredictions, savePrediction } from '@/lib/predictions';
import styles from './PredictableMatch.module.css';

interface TeamInfo {
  id: string;
  shortName: string;
  primary: string;
}

interface Props {
  matchId: string;
  round: number;
  home: TeamInfo;
  away: TeamInfo;
  homeScore: number;
  awayScore: number;
  winnerTeamId: string;
  snitchCatcher: string;
}

export default function PredictableMatch({
  matchId, round, home, away, homeScore, awayScore, winnerTeamId, snitchCatcher,
}: Props) {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const saved = loadPredictions()[matchId] ?? null;
    setPrediction(saved);
    setRevealed(saved !== null);
  }, [matchId]);

  function handlePick(teamId: string) {
    savePrediction(matchId, teamId);
    setPrediction(teamId);
    setRevealed(true);
  }

  const correct = prediction === winnerTeamId;
  const pickedTeam = prediction === home.id ? home : away;
  const homeWon = winnerTeamId === home.id;
  const awayWon = winnerTeamId === away.id;

  return (
    <div className={styles.card}>
      {/* Teams + score row */}
      <div className={styles.matchRow}>
        <div className={styles.team}>
          <span className={styles.bar} style={{ background: home.primary }} />
          <span className={styles.teamName}>{home.shortName}</span>
        </div>

        <div className={styles.center}>
          <span className={styles.roundBadge}>Rd {round}</span>
          {revealed ? (
            <div className={styles.scoreRevealed}>
              <span className={`${styles.score} ${homeWon ? styles.winner : ''}`}>{homeScore}</span>
              <span className={styles.dash}>–</span>
              <span className={`${styles.score} ${awayWon ? styles.winner : ''}`}>{awayScore}</span>
            </div>
          ) : (
            <div className={styles.scoreMasked}>? — ?</div>
          )}
          {revealed && (
            <span className={styles.snitch}>🟡 {snitchCatcher}</span>
          )}
        </div>

        <div className={`${styles.team} ${styles.teamRight}`}>
          <span className={styles.teamName}>{away.shortName}</span>
          <span className={styles.bar} style={{ background: away.primary }} />
        </div>
      </div>

      {/* Prediction row */}
      {!revealed ? (
        <div className={styles.pickRow}>
          <span className={styles.pickLabel}>Who wins?</span>
          <button
            className={styles.pickBtn}
            style={{ '--c': home.primary } as React.CSSProperties}
            onClick={() => handlePick(home.id)}
          >
            <span className={styles.dot} style={{ background: home.primary }} />
            {home.shortName}
          </button>
          <button
            className={styles.pickBtn}
            style={{ '--c': away.primary } as React.CSSProperties}
            onClick={() => handlePick(away.id)}
          >
            <span className={styles.dot} style={{ background: away.primary }} />
            {away.shortName}
          </button>
        </div>
      ) : (
        <div className={`${styles.resultRow} ${correct ? styles.correct : styles.wrong}`}>
          <span className={styles.dot} style={{ background: pickedTeam.primary }} />
          <span className={styles.resultText}>
            You picked <strong>{pickedTeam.shortName}</strong>
          </span>
          <span className={styles.badge}>{correct ? '✓ Correct' : '✗ Wrong'}</span>
          <Link href={`/matches/${matchId}`} className={styles.detailLink}>
            Match details →
          </Link>
        </div>
      )}
    </div>
  );
}

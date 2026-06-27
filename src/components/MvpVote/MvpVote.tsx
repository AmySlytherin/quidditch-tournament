'use client';

import { useState, useEffect } from 'react';
import { loadMvpVote, saveMvpVote } from '@/lib/mvp';
import styles from './MvpVote.module.css';

interface PlayerEntry {
  id: string;
  name: string;
  position: string;
  teamId: string;
  teamShortName: string;
  teamPrimary: string;
}

interface Props {
  matchId: string;
  players: PlayerEntry[];
}

export default function MvpVote({ matchId, players }: Props) {
  const [voted, setVoted] = useState<string | null>(null);

  useEffect(() => {
    setVoted(loadMvpVote(matchId));
  }, [matchId]);

  function handleVote(playerId: string) {
    saveMvpVote(matchId, playerId);
    setVoted(playerId);
  }

  const pick = voted ? players.find((p) => p.id === voted) : null;

  const teams = Array.from(new Set(players.map((p) => p.teamId)));

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <span className={styles.icon}>⭐</span>
        <h2 className={styles.title}>MVP Vote</h2>
      </div>

      {pick ? (
        <div className={styles.picked}>
          <span className={styles.pickedDot} style={{ background: pick.teamPrimary }} />
          <span className={styles.pickedName}>{pick.name}</span>
          <span className={styles.pickedMeta}>{pick.position} · {pick.teamShortName}</span>
          <button className={styles.change} onClick={() => setVoted(null)}>Change</button>
        </div>
      ) : (
        <div className={styles.grid}>
          {teams.map((teamId) => {
            const teamPlayers = players.filter((p) => p.teamId === teamId);
            const { teamShortName, teamPrimary } = teamPlayers[0];
            return (
              <div key={teamId} className={styles.teamGroup}>
                <div className={styles.teamLabel}>
                  <span className={styles.teamBar} style={{ background: teamPrimary }} />
                  {teamShortName}
                </div>
                <div className={styles.playerList}>
                  {teamPlayers.map((p) => (
                    <button
                      key={p.id}
                      className={styles.playerBtn}
                      style={{ '--c': teamPrimary } as React.CSSProperties}
                      onClick={() => handleVote(p.id)}
                    >
                      <span className={styles.playerName}>{p.name}</span>
                      <span className={styles.playerPos}>{p.position}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

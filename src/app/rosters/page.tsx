'use client';

import { useState } from 'react';
import { TEAMS, MATCHES } from '@/data';
import { computePlayerStats } from '@/lib/playerStats';
import { Position } from '@/data/types';
import PlayerIllustration from '@/components/PlayerIllustration/PlayerIllustration';
import styles from './page.module.css';

const POSITION_ORDER: Position[] = ['Keeper', 'Chaser', 'Beater', 'Seeker'];

const POSITION_DESC: Record<Position, string> = {
  Keeper: 'Guards the three goal hoops',
  Chaser: 'Scores with the Quaffle — 10 pts per goal',
  Beater: 'Wields a bat to redirect Bludgers',
  Seeker: 'Catches the Golden Snitch — 150 pts, ends the match',
};

const POSITION_ICON: Record<Position, string> = {
  Keeper: '🥅',
  Chaser: '🏆',
  Beater: '🏏',
  Seeker: '🔮',
};

const FEMALE_PLAYERS = new Set([
  'Amy Ward',
  'Angelina Johnson', 'Alicia Spinnet', 'Katie Bell',
  'Gwenog Jones', 'Wilda Griffiths', 'Valmai Morgan', 'Glynnis Griffiths',
  'Bronwen Sharpe', 'Siwan Hobday', 'Meghan McCormack',
  'Cho Chang', 'Tamsin Applebee', 'Heidi Macavoy',
  'Tamara Finnegan', 'Iona Banks', 'Catriona McCormack', 'Molly McBride',
  'Nell Vance', 'Seren Ashby',
  'Petra Hawke', 'Isla Fairweather', 'Jess Galway',
  'Siobhan Quigley', 'Aoife Brennan', 'Brigid Shaughnessy',
]);

const positionBadgeClass: Record<Position, string> = {
  Keeper: styles.badgeKeeper,
  Chaser: styles.badgeChaser,
  Beater: styles.badgeBeater,
  Seeker: styles.badgeSeeker,
};

export default function RostersPage() {
  const [activeTeam, setActiveTeam] = useState(TEAMS[0].id);
  const playerStats = computePlayerStats(MATCHES);
  const team = TEAMS.find((t) => t.id === activeTeam)!;

  return (
    <div className={`${styles.page} container`}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>⚡ 2024–25 Season</p>
        <h1>Team Rosters</h1>
        <p className={styles.subtitle}>All players, positions, and stats across {TEAMS.length} teams</p>
      </header>

      {/* Team tab bar */}
      <div className={styles.tabBar} role="tablist">
        {TEAMS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={t.id === activeTeam}
            className={`${styles.tab} ${t.id === activeTeam ? styles.tabActive : ''}`}
            style={{ ['--tab-color' as string]: t.colors.primary }}
            onClick={() => setActiveTeam(t.id)}
          >
            <span className={styles.tabDot} style={{ background: t.colors.primary }} />
            {t.shortName}
          </button>
        ))}
      </div>

      {/* Team header */}
      <div
        className={styles.teamHeader}
        style={{
          background: `linear-gradient(120deg, ${team.colors.primary}22, ${team.colors.secondary}11)`,
          border: `1px solid ${team.colors.primary}33`,
          borderRadius: 'var(--radius-xl)',
          marginBottom: 'var(--space-8)',
        }}
      >
        <div
          className={styles.teamHeaderBadge}
          style={{ background: `linear-gradient(135deg, ${team.colors.primary}, ${team.colors.secondary})` }}
        >
          {team.abbreviation}
        </div>
        <div className={styles.teamHeaderInfo}>
          <div className={styles.teamHeaderName}>{team.name}</div>
          <div className={styles.teamHeaderCity}>{team.city}</div>
        </div>
        <div className={styles.teamHeaderCount}>{team.roster.length} players</div>
      </div>

      {/* Roster by position */}
      {POSITION_ORDER.map((pos) => {
        const players = team.roster.filter((p) => p.position === pos);
        if (!players.length) return null;
        return (
          <section key={pos} className={styles.positionSection}>
            <div className={styles.positionHeading}>
              <span className={styles.positionTitle}>{POSITION_ICON[pos]} {pos}</span>
              <span className={styles.positionLine} />
              <span className={styles.positionDesc}>{POSITION_DESC[pos]}</span>
            </div>

            <div className={styles.playerGrid}>
              {players.map((player) => {
                const gender = FEMALE_PLAYERS.has(player.name) ? 'female' : 'male';
                const isYou = player.name === 'Amy Ward';
                const ps = playerStats[player.name];
                const goals = ps?.goalsScored ?? 0;
                const snitch = ps?.snitchCatches ?? 0;
                const pts = ps?.pointsContributed ?? 0;

                return (
                  <div
                    key={player.id}
                    className={`${styles.playerCard} ${isYou ? styles.playerCardHighlight : ''}`}
                  >
                    {/* Illustrated portrait */}
                    <div className={styles.avatarWrap}>
                      <PlayerIllustration
                        position={pos}
                        primary={team.colors.primary}
                        secondary={team.colors.secondary}
                        num={player.number}
                        gender={gender}
                        uid={player.id}
                      />
                      {isYou && <span className={styles.youBadge}>You</span>}
                    </div>

                    <div className={styles.playerInfo}>
                      <div className={styles.playerName}>{player.name}</div>
                      <span className={`${styles.positionBadge} ${positionBadgeClass[pos]}`}>
                        {POSITION_ICON[pos]} {pos}
                      </span>

                      <div className={styles.playerStats}>
                        {pos === 'Chaser' && (
                          <>
                            <div className={styles.pStat}>
                              <span className={`${styles.pStatVal} ${styles.pStatAccent}`}>{goals}</span>
                              <span className={styles.pStatLabel}>Goals</span>
                            </div>
                            <div className={styles.pStat}>
                              <span className={styles.pStatVal}>{pts}</span>
                              <span className={styles.pStatLabel}>Pts scored</span>
                            </div>
                          </>
                        )}
                        {pos === 'Seeker' && (
                          <>
                            <div className={styles.pStat}>
                              <span className={`${styles.pStatVal} ${styles.pStatWin}`}>{snitch}</span>
                              <span className={styles.pStatLabel}>Snitch</span>
                            </div>
                            <div className={styles.pStat}>
                              <span className={styles.pStatVal}>{snitch * 150}</span>
                              <span className={styles.pStatLabel}>Pts</span>
                            </div>
                          </>
                        )}
                        {(pos === 'Keeper' || pos === 'Beater') && (
                          <div className={styles.pStat}>
                            <span className={styles.pStatVal}>{team.roster.length}</span>
                            <span className={styles.pStatLabel}>Teammates</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

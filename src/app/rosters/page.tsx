'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { TEAMS, MATCHES } from '@/data';
import { computePlayerStats } from '@/lib/playerStats';
import { Position } from '@/data/types';
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

const POSITION_COLOR: Record<Position, string> = {
  Keeper:  '#2196a6',
  Chaser:  '#d4a843',
  Beater:  '#e05c6e',
  Seeker:  '#3ecf8e',
};

const IMAGE_OVERRIDES: Record<string, string> = {
  'Amy Ward': '/players/amy_ward_v10.png',
};

function playerImagePath(name: string): string {
  return IMAGE_OVERRIDES[name] ?? '/players/' + name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() + '.png';
}

export default function RostersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTeam = searchParams.get('team') ?? TEAMS[0].id;
  const [activeTeam, setActiveTeam] = useState(initialTeam);
  const playerStats = computePlayerStats(MATCHES);
  const team = TEAMS.find((t) => t.id === activeTeam) ?? TEAMS[0];

  function selectTeam(id: string) {
    setActiveTeam(id);
    router.replace(`/rosters?team=${id}`, { scroll: false });
  }

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
            onClick={() => selectTeam(t.id)}
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
                const isYou = player.name === 'Amy Ward';
                const ps = playerStats[player.name];
                const goals  = ps?.goalsScored ?? 0;
                const snitch = ps?.snitchCatches ?? 0;
                const pts    = ps?.pointsContributed ?? 0;
                const posColor = POSITION_COLOR[pos];

                return (
                  <div
                    key={player.id}
                    className={`${styles.playerCard} ${isYou ? styles.playerCardHighlight : ''}`}
                    style={{ ['--team-primary' as string]: team.colors.primary }}
                  >
                    {/* Top accent stripe — team color */}
                    <div className={styles.cardStripe}
                      style={{ background: `linear-gradient(90deg, ${team.colors.primary}, ${team.colors.secondary})` }} />

                    {/* Portrait */}
                    <div className={styles.avatarWrap}>
                      <Image
                        src={playerImagePath(player.name)}
                        alt={player.name}
                        fill
                        className={styles.avatarImg}
                      />
                      {/* Gradient overlay at bottom of portrait */}
                      <div className={styles.avatarOverlay} />

                      {/* Jersey number — bottom-left of portrait */}
                      <span className={styles.jerseyNum}>#{player.number}</span>

                      {isYou && <span className={styles.youBadge}>You</span>}
                    </div>

                    {/* Info section */}
                    <div className={styles.playerInfo}>
                      <div className={styles.playerName}>{player.name}</div>

                      <span className={styles.positionBadge}
                        style={{ background: `${posColor}22`, color: posColor, borderColor: `${posColor}44` }}>
                        {POSITION_ICON[pos]} {pos}
                      </span>

                      {/* Stats */}
                      <div className={styles.playerStats}>
                        {pos === 'Chaser' && (
                          <>
                            <div className={styles.pStat}>
                              <span className={styles.pStatVal} style={{ color: posColor }}>{goals}</span>
                              <span className={styles.pStatLabel}>Goals</span>
                            </div>
                            <div className={styles.statDivider} />
                            <div className={styles.pStat}>
                              <span className={styles.pStatVal}>{pts}</span>
                              <span className={styles.pStatLabel}>Pts scored</span>
                            </div>
                          </>
                        )}
                        {pos === 'Seeker' && (
                          <>
                            <div className={styles.pStat}>
                              <span className={styles.pStatVal} style={{ color: posColor }}>{snitch}</span>
                              <span className={styles.pStatLabel}>Snitch</span>
                            </div>
                            <div className={styles.statDivider} />
                            <div className={styles.pStat}>
                              <span className={styles.pStatVal}>{snitch * 150}</span>
                              <span className={styles.pStatLabel}>Pts</span>
                            </div>
                          </>
                        )}
                        {pos === 'Keeper' && (
                          <div className={styles.pStat}>
                            <span className={styles.pStatVal} style={{ color: posColor }}>🥅</span>
                            <span className={styles.pStatLabel}>Last line of defence</span>
                          </div>
                        )}
                        {pos === 'Beater' && (
                          <div className={styles.pStat}>
                            <span className={styles.pStatVal} style={{ color: posColor }}>🏏</span>
                            <span className={styles.pStatLabel}>Protects the team</span>
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

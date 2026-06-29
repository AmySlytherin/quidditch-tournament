'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { TEAMS } from '@/data';
import { Position, Player, Team } from '@/data/types';
import styles from './page.module.css';

function ordinal(n: number) {
  return ['', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th'][n] ?? `${n}th`;
}

const POSITION_ORDER: Position[] = ['Keeper', 'Chaser', 'Beater', 'Seeker'];

const POSITION_ICON: Record<Position, string> = {
  Keeper: '🥅',
  Chaser: '🤾',
  Beater: '🏏',
  Seeker: '🟡',
};

const POSITION_COLOR: Record<Position, string> = {
  Keeper:  '#2196a6',
  Chaser:  '#d4a843',
  Beater:  '#e05c6e',
  Seeker:  '#3ecf8e',
};

const IMAGE_OVERRIDES: Record<string, string> = {
  'Amy Ward': '/players/amy_ward_v11.png',
  'Lucinda Talkalot': '/players/lucinda_v2.png',
  'Harry Potter': '/players/harry_potter_v9a.png',
  'Vincent Crabbe': '/players/vincent_crabbe_v2.png',
};

function playerImagePath(name: string): string {
  return IMAGE_OVERRIDES[name] ?? '/players/' + name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() + '.png';
}

export default function RostersPage() {
  return (
    <Suspense>
      <RostersInner />
    </Suspense>
  );
}

function RostersInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTeam = searchParams.get('team') ?? TEAMS[0].id;
  const initialPlayerId = searchParams.get('player');
  const [activeTeam, setActiveTeam] = useState(initialTeam);
  const [selectedPlayer, setSelectedPlayer] = useState<{ player: Player; team: Team } | null>(null);
  const team = TEAMS.find((t) => t.id === activeTeam) ?? TEAMS[0];

  useEffect(() => {
    if (!initialPlayerId) return;
    const t = TEAMS.find((t) => t.id === initialTeam) ?? TEAMS[0];
    const p = t.roster.find((p) => p.id === initialPlayerId);
    if (p) {
      setSelectedPlayer({ player: p, team: t });
      setTimeout(() => {
        document.getElementById(`player-${p.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, []);

  function togglePlayer(player: Player, t: Team) {
    setSelectedPlayer((prev) =>
      prev?.player.id === player.id ? null : { player, team: t }
    );
  }

  function selectTeam(id: string) {
    setActiveTeam(id);
    setSelectedPlayer(null);
    router.replace(`/rosters?team=${id}`, { scroll: false });
  }

  return (
    <div className={`${styles.page} container`}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>⚡ 2025–2026</p>
        <h1>House Rosters</h1>
        <div className="page-divider"><span>✦</span></div>
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
          background: `linear-gradient(120deg, ${team.colors.primary}44, ${team.colors.secondary}22)`,
          border: `1px solid ${team.colors.primary}66`,
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
        const sectionHasSelected = selectedPlayer?.player.position === pos;
        return (
          <section key={pos} className={styles.positionSection}>
            <div className={styles.positionHeading}>
              <span className={styles.positionTitle}>{POSITION_ICON[pos]} {pos}</span>
              <span className={styles.positionLine} />
            </div>

            <div className={styles.playerGrid}>
              {players.map((player) => {
                const isYou = player.name === 'Amy Ward';
                const posColor = POSITION_COLOR[pos];

                const isFlipped = selectedPlayer?.player.id === player.id;
                const cardEl = (
                  <div
                    key={player.id}
                    id={`player-${player.id}`}
                    className={styles.cardFlipContainer}
                    style={{ ['--team-primary' as string]: team.colors.primary }}
                    onClick={() => togglePlayer(player, team)}
                  >
                  <div className={`${styles.cardInner} ${isFlipped ? styles.cardFlipped : ''}`}>

                  {/* ── FRONT ── */}
                  <div className={styles.cardFront}>
                  <div className={`${styles.playerCard} ${isYou ? styles.playerCardHighlight : ''}`}>
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
                    </div>
                  </div>
                  </div>

                  {/* ── BACK ── */}
                  <div className={styles.cardBack}
                    style={{ border: `1px solid ${team.colors.primary}66` }}>
                    <div className={styles.cardStripe}
                      style={{ background: `linear-gradient(90deg, ${team.colors.primary}, ${team.colors.secondary})` }} />
                    <div className={styles.cardBackPortrait}>
                      <Image src={playerImagePath(player.name)} alt={player.name} fill className={styles.cardBackPortraitImg} />
                      <div className={styles.cardBackOverlay} />
                    </div>
                    <div className={styles.cardBackBody}>
                      <div className={styles.cardBackName}>{player.name}</div>
                      <div className={styles.cardBackRow}>
                        <span className={styles.cardBackLabel}>Position</span>
                        <span className={styles.cardBackValue} style={{ color: POSITION_COLOR[player.position] }}>
                          {POSITION_ICON[player.position]} {player.position}
                        </span>
                      </div>
                      <div className={styles.cardBackRow}>
                        <span className={styles.cardBackLabel}>House</span>
                        <span className={styles.cardBackValue} style={{ color: team.id === 'hufflepuff' ? '#7a5c00' : team.colors.primary }}>
                          {team.name}
                        </span>
                      </div>
                      <div className={styles.cardBackRow}>
                        <span className={styles.cardBackLabel}>Jersey</span>
                        <span className={styles.cardBackValue}>#{player.number}</span>
                      </div>
                      <div className={styles.cardBackRow}>
                        <span className={styles.cardBackLabel}>Year</span>
                        <span className={styles.cardBackValue}>{ordinal(player.year)} Year</span>
                      </div>
                    </div>
                  </div>
                  </div>
                  </div>
                );

                return cardEl;
              })}
            </div>

          </section>
        );
      })}
    </div>
  );
}

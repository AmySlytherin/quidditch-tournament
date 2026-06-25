import Link from 'next/link';
import { TEAMS, MATCHES } from '@/data';
import { computeStandings } from '@/lib/standings';
import styles from './page.module.css';

export default function TeamsPage() {
  const standings = computeStandings(MATCHES);
  const standingMap = Object.fromEntries(standings.map((s) => [s.teamId, s]));

  return (
    <div className={`${styles.page} container`}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>⚡ 2025–2026</p>
        <h1>All Houses</h1>
        <div className="page-divider"><span>✦</span></div>
      </header>

      <div className={styles.grid}>
        {TEAMS.map((team) => {
          const s = standingMap[team.id];
          return (
            <Link key={team.id} href={`/teams/${team.id}`} className={styles.card}>
              <div className={styles.cardHeader} style={{ background: `linear-gradient(135deg, ${team.colors.primary}, ${team.colors.secondary})` }}>
                <span className={styles.abbr}>{team.abbreviation}</span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.teamName}>{team.name}</div>
                <div className={styles.teamCity}>{team.city}</div>
                {s && (
                  <div className={styles.stats}>
                    <span className={styles.stat}>
                      <span className={styles.statVal}>{s.wins}</span>
                      <span className={styles.statLabel}>W</span>
                    </span>
                    <span className={styles.statSep} />
                    <span className={styles.stat}>
                      <span className={styles.statVal}>{s.losses}</span>
                      <span className={styles.statLabel}>L</span>
                    </span>
                    <span className={styles.statSep} />
                    <span className={styles.stat}>
                      <span className={styles.statVal} style={{ color: 'var(--color-accent)' }}>#{s.rank}</span>
                      <span className={styles.statLabel}>Rank</span>
                    </span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

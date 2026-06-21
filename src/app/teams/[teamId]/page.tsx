import { notFound } from 'next/navigation';
import Link from 'next/link';
import { TEAMS, TEAM_MAP, MATCHES } from '@/data';
import { computeStandings, teamMatches, headToHeadRecords, matchScore, matchWinner } from '@/lib/standings';
import MatchCard from '@/components/MatchCard/MatchCard';
import styles from './page.module.css';

const POSITIONS = ['Keeper', 'Chaser', 'Beater', 'Seeker'] as const;

export function generateStaticParams() {
  return TEAMS.map((t) => ({ teamId: t.id }));
}

export default async function TeamPage({ params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params;
  const team = TEAM_MAP[teamId];
  if (!team) notFound();

  const standings = computeStandings(MATCHES);
  const standing = standings.find((s) => s.teamId === teamId)!;
  const matches = teamMatches(MATCHES, teamId);
  const h2h = headToHeadRecords(MATCHES, teamId);

  const avgPtsFor = standing.played > 0 ? Math.round(standing.pointsFor / standing.played) : 0;
  const avgPtsAgainst = standing.played > 0 ? Math.round(standing.pointsAgainst / standing.played) : 0;
  const winPct = standing.played > 0 ? Math.round((standing.wins / standing.played) * 100) : 0;

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div
          className={styles.heroGlow}
          style={{ background: team.colors.primary }}
        />
        <div className="container">
          <div className={styles.heroInner}>
            <div
              className={styles.teamBadge}
              style={{
                background: `linear-gradient(135deg, ${team.colors.primary}, ${team.colors.secondary})`,
              }}
            >
              {team.abbreviation}
            </div>
            <div className={styles.teamMeta}>
              <div className={styles.eyebrow}>{team.city}</div>
              <h1 className={styles.teamName}>{team.name}</h1>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatVal} style={{ color: 'var(--color-accent)' }}>
                  #{standing.rank}
                </span>
                <span className={styles.heroStatLabel}>Rank</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatVal} style={{ color: 'var(--color-win)' }}>
                  {standing.wins}
                </span>
                <span className={styles.heroStatLabel}>Wins</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatVal} style={{ color: 'var(--color-loss)' }}>
                  {standing.losses}
                </span>
                <span className={styles.heroStatLabel}>Losses</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatVal} style={{ color: 'var(--color-accent)' }}>
                  {standing.snitchCatches}
                </span>
                <span className={styles.heroStatLabel}>Snitch</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.content}>
          {/* Main column */}
          <div className={styles.main}>
            {/* Match history */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Match History</h2>
                <span className={styles.sectionCount}>{matches.length}</span>
              </div>

              <div className={styles.formStrip}>
                <span className={styles.formLabel}>Form</span>
                {standing.recentForm.map((r, i) => (
                  <span
                    key={i}
                    className={`${styles.formPip} ${r === 'W' ? styles.formW : styles.formL}`}
                  >
                    {r}
                  </span>
                ))}
              </div>

              <div className={styles.matchList}>
                {[...matches].reverse().map((m) => (
                  <MatchCard key={m.id} match={m} highlightTeamId={teamId} />
                ))}
              </div>
            </section>

            {/* Head-to-head */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Head-to-Head</h2>
              </div>
              <table className={styles.h2hTable}>
                <thead>
                  <tr>
                    <th className={styles.h2hTh}>Opponent</th>
                    <th className={styles.h2hTh} style={{ textAlign: 'right' }}>Record</th>
                    <th className={styles.h2hTh} style={{ textAlign: 'right' }}>PF</th>
                    <th className={styles.h2hTh} style={{ textAlign: 'right' }}>PA</th>
                    <th className={styles.h2hTh} style={{ textAlign: 'right' }}>+/-</th>
                  </tr>
                </thead>
                <tbody>
                  {h2h
                    .sort((a, b) => b.wins - a.wins)
                    .map((r) => {
                      const opp = TEAM_MAP[r.opponentId];
                      const diff = r.pointsFor - r.pointsAgainst;
                      return (
                        <tr key={r.opponentId} className={styles.h2hRow}>
                          <td className={styles.h2hTd}>
                            <Link href={`/teams/${opp.id}`} className={styles.h2hTeam}>
                              <span className={styles.h2hDot} style={{ background: opp.colors.primary }} />
                              {opp.shortName}
                            </Link>
                          </td>
                          <td className={`${styles.h2hTd} ${styles.h2hTdNum}`}>
                            <span className={styles.h2hRecord}>
                              <span className={styles.h2hW}>{r.wins}</span>
                              <span className={styles.h2hSep}> – </span>
                              <span className={styles.h2hL}>{r.losses}</span>
                            </span>
                          </td>
                          <td className={`${styles.h2hTd} ${styles.h2hTdNum}`}>{r.pointsFor}</td>
                          <td className={`${styles.h2hTd} ${styles.h2hTdNum}`}>{r.pointsAgainst}</td>
                          <td className={`${styles.h2hTd} ${styles.h2hTdNum}`} style={{ color: diff > 0 ? 'var(--color-win)' : diff < 0 ? 'var(--color-loss)' : undefined }}>
                            {diff > 0 ? '+' : ''}{diff}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </section>
          </div>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            {/* Key stats */}
            <div className={styles.sideCard}>
              <div className={styles.sideCardTitle}>Season Stats</div>
              {[
                { label: 'Matches played', val: standing.played },
                { label: 'Win %', val: `${winPct}%` },
                { label: 'Points for', val: standing.pointsFor },
                { label: 'Points against', val: standing.pointsAgainst },
                { label: 'Avg pts for', val: avgPtsFor },
                { label: 'Avg pts against', val: avgPtsAgainst },
                { label: 'Snitch catches', val: standing.snitchCatches },
                { label: 'Point diff', val: `${standing.pointsDiff > 0 ? '+' : ''}${standing.pointsDiff}` },
              ].map(({ label, val }) => (
                <div key={label} className={styles.statRow}>
                  <span className={styles.statRowLabel}>{label}</span>
                  <span className={styles.statRowVal}>{val}</span>
                </div>
              ))}
            </div>

            {/* Roster */}
            <div className={styles.sideCard}>
              <div className={styles.sideCardTitle}>Roster</div>
              {POSITIONS.map((pos) => {
                const players = team.roster.filter((p) => p.position === pos);
                if (!players.length) return null;
                return (
                  <div key={pos} className={styles.positionGroup}>
                    <div className={styles.positionLabel}>{pos}</div>
                    {players.map((p) => (
                      <div key={p.id} className={styles.player}>
                        <span className={styles.playerNumber}>{p.number}</span>
                        <Link href={`/rosters?team=${team.id}&player=${p.id}`} className={styles.playerName}>
                          {p.name}
                        </Link>
                        {pos === 'Seeker' && (
                          <span className={styles.seekerBadge}>🔮</span>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MATCHES, TEAM_MAP } from '@/data';
import { matchScore, matchWinner } from '@/lib/standings';
import MvpVote from '@/components/MvpVote/MvpVote';
import styles from './page.module.css';

export function generateStaticParams() {
  return MATCHES.map((m) => ({ matchId: m.id }));
}

export default async function MatchPage({ params }: { params: Promise<{ matchId: string }> }) {
  const { matchId } = await params;
  const match = MATCHES.find((m) => m.id === matchId);
  if (!match) notFound();

  const home = TEAM_MAP[match.homeTeamId];
  const away = TEAM_MAP[match.awayTeamId];
  const homeScore = matchScore(match, 'home');
  const awayScore = matchScore(match, 'away');
  const winner = matchWinner(match);

  const formattedDate = new Date(match.date).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    // Dates are stored as calendar days (YYYY-MM-DD); pin to UTC so they don't
    // slip to the previous day when rendered in a timezone behind UTC.
    timeZone: 'UTC',
  });

  return (
    <div className={`${styles.page} container`}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <Link
          href="/schedule"
          style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-muted)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-1)',
            transition: 'color 0.15s',
          }}
        >
          ← Schedule
        </Link>
      </div>

      {/* Scoreboard */}
      <div
        className={styles.scoreboard}
        style={{
          ['--team-primary-home' as string]: home.colors.primary,
          ['--team-primary-away' as string]: away.colors.primary,
        }}
      >
        <div className={styles.scoreboardTop}>
          {/* Home */}
          <div className={`${styles.teamPanel} ${styles.teamPanelHome}`}
            style={{ background: `linear-gradient(160deg, ${home.colors.primary}20, transparent)` }}
          >
            <Link href={`/teams/${home.id}`}>
              <div className={styles.teamAbbr}
                style={{ color: home.colors.primary }}
              >
                {home.abbreviation}
              </div>
            </Link>
            <div className={styles.teamFullName}>{home.name}</div>
            <div
              className={`${styles.teamScore} ${winner === 'home' ? styles.teamScoreWinner : ''}`}
              style={{ color: winner === 'home' ? undefined : 'var(--color-text-primary)' }}
            >
              {homeScore}
            </div>
            {winner === 'home' && (
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-win)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Winner
              </span>
            )}
          </div>

          <div className={styles.scoreDivider}>
            <span className={styles.scoreDash}>vs</span>
          </div>

          {/* Away */}
          <div className={`${styles.teamPanel} ${styles.teamPanelAway}`}
            style={{ background: `linear-gradient(160deg, transparent, ${away.colors.primary}20)` }}
          >
            <Link href={`/teams/${away.id}`}>
              <div className={styles.teamAbbr} style={{ color: away.colors.primary }}>
                {away.abbreviation}
              </div>
            </Link>
            <div className={styles.teamFullName}>{away.name}</div>
            <div
              className={`${styles.teamScore} ${winner === 'away' ? styles.teamScoreWinner : ''}`}
              style={{ color: winner === 'away' ? undefined : 'var(--color-text-primary)' }}
            >
              {awayScore}
            </div>
            {winner === 'away' && (
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-win)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Winner
              </span>
            )}
          </div>
        </div>

        <div className={styles.scoreboardMeta}>
          <span className={styles.metaItem}>
            <span className={styles.metaIcon}>📅</span>
            {formattedDate}
          </span>
          <span className={styles.metaItem}>
            <span className={styles.metaIcon}>🏆</span>
            Round {match.round}
          </span>
          <span className={styles.metaItem}>
            <span className={styles.metaIcon}>⏱</span>
            {match.durationMinutes} min
          </span>
          <span className={styles.snitchBadge}>
            🟡 Snitch caught by {match.snitchCatcher}
            {' '}({match.snitchCaughtBy === 'home' ? home.shortName : away.shortName})
          </span>
        </div>
      </div>

      {/* MVP Vote */}
      <MvpVote
        matchId={match.id}
        players={[
          ...home.roster.map((p) => ({
            id: p.id,
            name: p.name,
            position: p.position,
            teamId: home.id,
            teamShortName: home.shortName,
            teamPrimary: home.colors.primary,
          })),
          ...away.roster.map((p) => ({
            id: p.id,
            name: p.name,
            position: p.position,
            teamId: away.id,
            teamShortName: away.shortName,
            teamPrimary: away.colors.primary,
          })),
        ]}
      />

      {/* Timeline */}
      <div className={styles.timeline}>
        <div className={styles.timelineHeader}>
          <h2 className={styles.timelineTitle}>Match Timeline</h2>
        </div>
        <div className={styles.timelineList}>
          {match.timeline.map((event, i) => {
            const isHome = event.side === 'home';
            const isSnitch = event.type === 'snitch';
            const teamColor = isHome ? home.colors.primary : away.colors.primary;
            const catcher = isHome ? home : away;

            return (
              <div
                key={i}
                className={`${styles.event} ${isSnitch ? styles.eventSnitch : ''}`}
              >
                {/* Home side */}
                <div className={styles.eventHome}>
                  {isHome && (
                    <div className={`${styles.eventContent}`}>
                      <span className={styles.eventPlayer} style={{ color: teamColor }}>
                        {event.player}
                      </span>
                      <span className={`${styles.eventPoints} ${isSnitch ? styles.pointsSnitch : styles.pointsQuaffle}`}>
                        +{event.points}
                      </span>
                    </div>
                  )}
                  {isHome && (
                    <span className={styles.eventIcon}>{isSnitch ? '🟡' : '🏆'}</span>
                  )}
                </div>

                {/* Center: time + score */}
                <div className={styles.eventTime}>
                  <span className={styles.minute}>{event.minute}&apos;</span>
                  <span className={styles.eventScore}>
                    {event.homeScoreAfter} – {event.awayScoreAfter}
                  </span>
                </div>

                {/* Away side */}
                <div className={styles.eventAway}>
                  {!isHome && (
                    <span className={styles.eventIcon}>{isSnitch ? '🟡' : '🏆'}</span>
                  )}
                  {!isHome && (
                    <div className={`${styles.eventContent} ${styles.eventContentAway}`}>
                      <span className={styles.eventPlayer} style={{ color: teamColor }}>
                        {event.player}
                      </span>
                      <span className={`${styles.eventPoints} ${isSnitch ? styles.pointsSnitch : styles.pointsQuaffle}`}>
                        +{event.points}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quaffle goals breakdown */}
      <div style={{
        marginTop: 'var(--space-6)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--space-4)',
      }}>
        {([['home', home] as const, ['away', away] as const]).map(([side, sideTeam]) => {
          const goals = side === 'home' ? match.homeQuaffleGoals : match.awayQuaffleGoals;
          return (
            <div key={side} style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                <span style={{ width: 4, height: 20, background: sideTeam.colors.primary, borderRadius: 9999 }} />
                <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{sideTeam.shortName}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  <span>Quaffle goals</span><span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{goals} ({goals * 10} pts)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  <span>Snitch</span>
                  <span style={{ fontWeight: 600, color: match.snitchCaughtBy === side ? 'var(--color-accent)' : 'var(--color-text-muted)' }}>
                    {match.snitchCaughtBy === side ? '+150 pts' : '—'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-2)', marginTop: 'var(--space-1)' }}>
                  <span style={{ fontWeight: 700 }}>Total</span>
                  <span style={{ fontWeight: 700, color: matchScore(match, side) > matchScore(match, side === 'home' ? 'away' : 'home') ? 'var(--color-win)' : 'var(--color-text-primary)' }}>
                    {matchScore(match, side)} pts
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { MATCHES, TEAM_MAP } from '@/data';
import { matchWinner } from '@/lib/standings';
import MatchCard from '@/components/MatchCard/MatchCard';
import PredictionRow from '@/components/PredictionRow/PredictionRow';
import PredictionSummary from '@/components/PredictionSummary/PredictionSummary';
import styles from './page.module.css';

export default function SchedulePage() {
  const byRound = MATCHES.reduce<Record<number, typeof MATCHES>>((acc, m) => {
    if (!acc[m.round]) acc[m.round] = [];
    acc[m.round].push(m);
    return acc;
  }, {});

  const rounds = Object.keys(byRound)
    .map(Number)
    .sort((a, b) => a - b);

  const allResults = MATCHES.map((m) => {
    const side = matchWinner(m);
    return {
      matchId: m.id,
      winnerTeamId: side === 'home' ? m.homeTeamId : m.awayTeamId,
    };
  });

  return (
    <div className={`${styles.page} container`}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>⚡ 2025–2026</p>
        <h1>Fixtures & Results</h1>
        <div className="page-divider"><span>✦</span></div>
      </header>

      <PredictionSummary matches={allResults} />

      <div className={styles.rounds}>
        {rounds.map((round) => {
          const roundMatches = byRound[round].sort((a, b) => a.date.localeCompare(b.date));
          const date = new Date(roundMatches[0].date).toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });
          return (
            <section key={round} className={styles.roundSection}>
              <div className={styles.roundHeader}>
                <span className={styles.roundLabel}>Round {round}</span>
                <span className={styles.roundDate}>{date}</span>
              </div>
              <div className={styles.matchList}>
                {roundMatches.map((m) => {
                  const home = TEAM_MAP[m.homeTeamId];
                  const away = TEAM_MAP[m.awayTeamId];
                  const side = matchWinner(m);
                  const winnerTeamId = side === 'home' ? m.homeTeamId : m.awayTeamId;
                  return (
                    <div key={m.id} className={styles.matchGroup}>
                      <MatchCard match={m} />
                      <PredictionRow
                        matchId={m.id}
                        homeTeamId={m.homeTeamId}
                        homeShortName={home.shortName}
                        homePrimary={home.colors.primary}
                        awayTeamId={m.awayTeamId}
                        awayShortName={away.shortName}
                        awayPrimary={away.colors.primary}
                        winnerTeamId={winnerTeamId}
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

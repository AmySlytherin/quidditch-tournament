import { MATCHES } from '@/data';
import MatchCard from '@/components/MatchCard/MatchCard';
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

  return (
    <div className={`${styles.page} container`}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>⚡ Hogwarts Quidditch · 2024–25</p>
        <h1>Fixtures & Results</h1>
        <div className="page-divider"><span>✦</span></div>
      </header>

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
                {roundMatches.map((m) => (
                  <MatchCard key={m.id} match={m} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

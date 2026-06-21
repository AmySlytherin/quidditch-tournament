import { MATCHES } from '@/data';
import { computeStandings } from '@/lib/standings';
import StandingsTable from '@/components/StandingsTable/StandingsTable';
import HouseHourglasses from '@/components/HouseHourglasses/HouseHourglasses';
import styles from './page.module.css';

export default function StandingsPage() {
  const standings = computeStandings(MATCHES);
  const lastMatch = [...MATCHES].sort((a, b) => b.date.localeCompare(a.date))[0];

  return (
    <div className={`${styles.page} container`}>
      <header className={styles.header}>
        <h1 className={styles.title}>⚡ Current Standings (2024–2025)</h1>
        <div className="page-divider"><span>✦</span></div>
        <p className={styles.subtitle}>
          Last updated{' '}
          {new Date(lastMatch.date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: 'var(--color-accent)' }} />
            Top 4 qualify for knockout stage
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: 'var(--color-win)' }} />
            Win
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: 'var(--color-loss)' }} />
            Loss
          </span>
        </div>
      </header>

      <HouseHourglasses standings={standings} />

      <div className={styles.tableSection}>
        <div className={styles.sectionTitle}>Full Table — click any column to sort</div>
        <StandingsTable standings={standings} />
      </div>
    </div>
  );
}

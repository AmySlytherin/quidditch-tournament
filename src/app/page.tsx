import { MATCHES } from '@/data';
import { computeStandings } from '@/lib/standings';
import { lastMonday } from '@/lib/dates';
import StandingsTable from '@/components/StandingsTable/StandingsTable';
import HouseHourglasses from '@/components/HouseHourglasses/HouseHourglasses';
import WelcomeAudio from '@/components/WelcomeAudio/WelcomeAudio';
import styles from './page.module.css';

export default function StandingsPage() {
  const standings = computeStandings(MATCHES);

  return (
    <div className={`${styles.page} container`}>
      <WelcomeAudio />
      <header className={styles.header}>
        <h1 className={styles.title}>⚡ Current Standings (2025–2026)</h1>
        <div className="page-divider"><span>✦</span></div>
        <p className={styles.subtitle}>
          Last updated{' '}{lastMonday()}
        </p>
        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: 'var(--color-accent)' }} />
            Season Champion advances to Quidditch World Cup 🏆
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

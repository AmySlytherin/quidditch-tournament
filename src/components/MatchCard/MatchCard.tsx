import Link from 'next/link';
import { Match } from '@/data/types';
import { TEAM_MAP } from '@/data';
import { matchScore, matchWinner } from '@/lib/standings';
import styles from './MatchCard.module.css';

interface Props {
  match: Match;
  highlightTeamId?: string;
}

export default function MatchCard({ match, highlightTeamId }: Props) {
  const home = TEAM_MAP[match.homeTeamId];
  const away = TEAM_MAP[match.awayTeamId];
  const homeScore = matchScore(match, 'home');
  const awayScore = matchScore(match, 'away');
  const winner = matchWinner(match);

  return (
    <Link href={`/matches/${match.id}`} className={styles.card}>
      {/* Home team */}
      <div className={styles.team}>
        <span className={styles.teamColor} style={{ background: home.colors.primary }} />
        <div>
          <div className={styles.teamName}>{home.shortName}</div>
          <div className={styles.teamCity}>{home.city}</div>
        </div>
      </div>

      {/* Score */}
      <div className={styles.score}>
        <span className={styles.roundBadge}>Rd {match.round}</span>
        <div className={styles.scoreMain}>
          <span className={`${styles.homeScore} ${winner === 'home' ? styles.winnerHighlight : ''}`}>
            {homeScore}
          </span>
          <span className={styles.scoreSep}>–</span>
          <span className={`${styles.awayScore} ${winner === 'away' ? styles.winnerHighlight : ''}`}>
            {awayScore}
          </span>
        </div>
        <span className={styles.snitchBadge}>
          🟡 {match.snitchCatcher}
        </span>
      </div>

      {/* Away team */}
      <div className={`${styles.team} ${styles.teamAway}`}>
        <span className={styles.teamColor} style={{ background: away.colors.primary }} />
        <div>
          <div className={styles.teamName}>{away.shortName}</div>
          <div className={styles.teamCity}>{away.city}</div>
        </div>
      </div>
    </Link>
  );
}

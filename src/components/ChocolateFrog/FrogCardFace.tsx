import Image from 'next/image';
import type { FrogCard } from '@/data/chocolateFrogCards';
import styles from './FrogCard.module.css';

// The collectible card face. Shared by the "you caught it" reveal and the
// album's enlarged view so a card always looks identical wherever it appears.
// The legendary Golden Snitch has no portrait, so it shows a golden orb.
export default function FrogCardFace({ card }: { card: FrogCard }) {
  return (
    <div
      className={`${styles.card} ${card.legendary ? styles.legendary : ''}`}
      style={{ '--card-accent': card.color } as React.CSSProperties}
    >
      <div className={styles.portrait}>
        {card.image ? (
          <Image
            src={card.image}
            alt={card.name}
            width={220}
            height={220}
            className={styles.portraitImg}
          />
        ) : (
          <span className={styles.orb} aria-hidden="true">
            <span className={styles.orbCore} />
            <span className={styles.orbGlint} />
          </span>
        )}
        <span className={styles.house}>{card.house}</span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{card.name}</h3>
        <p className={styles.role}>
          <span className={styles.roleIcon} aria-hidden="true">{card.icon}</span>
          {card.role}
        </p>
        <p className={styles.flavor}>{card.flavor}</p>
      </div>
    </div>
  );
}

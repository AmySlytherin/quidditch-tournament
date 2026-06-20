'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TeamStanding } from '@/data/types';
import { TEAM_MAP } from '@/data';
import styles from './StandingsTable.module.css';

type SortKey = 'rank' | 'wins' | 'losses' | 'pointsFor' | 'pointsAgainst' | 'pointsDiff' | 'snitchCatches';

interface Props {
  standings: TeamStanding[];
}

const COLUMNS: { key: SortKey; label: string; title: string }[] = [
  { key: 'rank', label: '#', title: 'Rank' },
  { key: 'wins', label: 'W', title: 'Wins' },
  { key: 'losses', label: 'L', title: 'Losses' },
  { key: 'pointsFor', label: 'PF', title: 'Points For' },
  { key: 'pointsAgainst', label: 'PA', title: 'Points Against' },
  { key: 'pointsDiff', label: '+/-', title: 'Points Difference' },
  { key: 'snitchCatches', label: '🔮', title: 'Snitch Catches' },
];

export default function StandingsTable({ standings }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('rank');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir(key === 'rank' || key === 'losses' ? 'asc' : 'desc');
    }
  }

  const sorted = [...standings].sort((a, b) => {
    const av = a[sortKey] as number;
    const bv = b[sortKey] as number;
    return sortDir === 'asc' ? av - bv : bv - av;
  });

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {COLUMNS.map(({ key, label, title }) => (
              <th
                key={key}
                className={`${styles.th} ${styles.thNum} ${styles.thSortable} ${sortKey === key ? styles.thActive : ''}`}
                onClick={() => handleSort(key)}
                title={title}
                aria-sort={sortKey === key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                {label}
                <i className={`${styles.sortIcon} ${sortKey === key ? styles.sortIconActive : ''}`}>
                  {sortKey === key ? (sortDir === 'asc' ? '▲' : '▼') : '⇅'}
                </i>
              </th>
            ))}
            <th className={styles.th} style={{ minWidth: 180 }}>Team</th>
            <th className={`${styles.th} ${styles.thNum}`}>Played</th>
            <th className={styles.th}>Form</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((s) => {
            const team = TEAM_MAP[s.teamId];
            if (!team) return null;
            const isTop3 = s.rank <= 3;
            return (
              <tr key={s.teamId} className={styles.row}>
                <td className={`${styles.td} ${styles.tdNum} ${styles.rank} ${isTop3 ? styles.rankTop : ''}`}>
                  {s.rank}
                </td>
                <td className={`${styles.td} ${styles.tdNum} ${styles.tdNumHighlight}`}>{s.wins}</td>
                <td className={`${styles.td} ${styles.tdNum}`}>{s.losses}</td>
                <td className={`${styles.td} ${styles.tdNum}`}>{s.pointsFor}</td>
                <td className={`${styles.td} ${styles.tdNum}`}>{s.pointsAgainst}</td>
                <td className={`${styles.td} ${styles.tdNum}`}>
                  <span className={`${styles.diff} ${s.pointsDiff > 0 ? styles.diffPos : s.pointsDiff < 0 ? styles.diffNeg : styles.diffZero}`}>
                    {s.pointsDiff > 0 ? '+' : ''}{s.pointsDiff}
                  </span>
                </td>
                <td className={`${styles.td} ${styles.tdNum}`}>
                  <span className={styles.snitchCount}>{s.snitchCatches}</span>
                </td>
                <td className={styles.td}>
                  <Link href={`/teams/${team.id}`} className={styles.teamCell}>
                    <span
                      className={styles.teamBar}
                      style={{ background: team.colors.primary }}
                    />
                    <span className={styles.teamInfo}>
                      <span className={styles.teamName}>{team.name}</span>
                      <span className={styles.teamCity}>{team.city}</span>
                    </span>
                  </Link>
                </td>
                <td className={`${styles.td} ${styles.tdNum}`}>{s.played}</td>
                <td className={styles.td}>
                  <div className={styles.form}>
                    {s.recentForm.map((r, i) => (
                      <span
                        key={i}
                        className={`${styles.formPip} ${r === 'W' ? styles.formW : styles.formL}`}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

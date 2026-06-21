'use client';

import { TeamStanding } from '@/data/types';
import { TEAM_MAP } from '@/data';
import styles from './HouseHourglasses.module.css';

const HOUSE_GEMS: Record<string, { color: string; glow: string; gemColor: string }> = {
  gryffindor: { color: '#740001', glow: 'rgba(116,0,1,0.6)',  gemColor: '#e8443a' },
  slytherin:  { color: '#1A472A', glow: 'rgba(26,71,42,0.6)', gemColor: '#4ecb71' },
  hufflepuff: { color: '#d4a81a', glow: 'rgba(212,168,26,0.6)', gemColor: '#f5cc30' },
  ravenclaw:  { color: '#0E1A40', glow: 'rgba(14,26,64,0.6)', gemColor: '#5b8cdb' },
};

function Hourglass({ standing, maxPoints }: { standing: TeamStanding; maxPoints: number }) {
  const team = TEAM_MAP[standing.teamId];
  const gem = HOUSE_GEMS[standing.teamId];
  if (!team || !gem) return null;

  // Fill level 0–1 based on points relative to max, minimum 0.06 so it's never empty
  const fill = maxPoints > 0
    ? Math.max(0.06, standing.pointsFor / maxPoints)
    : 0.06;

  // The bottom bulb of the hourglass is a trapezoid shape.
  // We represent the gem fill as a rect clipped inside the bottom bulb.
  // Bottom bulb SVG coords: roughly y=62 to y=108, width narrows from 36 at bottom to 6 at neck (y=62)
  const bulbTop = 62;
  const bulbBottom = 108;
  const bulbHeight = bulbBottom - bulbTop; // 46px
  const fillHeight = bulbHeight * fill;
  const fillY = bulbBottom - fillHeight;

  return (
    <div className={styles.hourglassWrap}>
      <svg
        width="72"
        height="130"
        viewBox="0 0 72 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        <defs>
          {/* Clip path for bottom bulb fill */}
          <clipPath id={`bulb-${standing.teamId}`}>
            <polygon points="18,62 54,62 66,108 6,108" />
          </clipPath>

          {/* Gem gradient */}
          <linearGradient id={`gem-${standing.teamId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={gem.gemColor} stopOpacity="0.95" />
            <stop offset="100%" stopColor={gem.color} stopOpacity="0.9" />
          </linearGradient>

          {/* Glass gradient for hourglass body */}
          <linearGradient id={`glass-${standing.teamId}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
          </linearGradient>

          {/* Glow filter */}
          <filter id={`glow-${standing.teamId}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── Top cap ── */}
        <rect x="14" y="4" width="44" height="6" rx="3" fill="#c9a84c" />

        {/* ── Top bulb outline ── */}
        <polygon
          points="18,10 54,10 42,58 30,58"
          fill="rgba(20,16,10,0.6)"
          stroke="#c9a84c"
          strokeWidth="1.5"
        />

        {/* ── Neck ── */}
        <rect x="29" y="57" width="14" height="8" rx="2"
          fill="rgba(20,16,10,0.8)" stroke="#c9a84c" strokeWidth="1.5" />

        {/* ── Bottom bulb outline ── */}
        <polygon
          points="18,65 54,65 66,112 6,112"
          fill="rgba(20,16,10,0.6)"
          stroke="#c9a84c"
          strokeWidth="1.5"
        />

        {/* ── Gem fill in bottom bulb ── */}
        <rect
          x="6" y={fillY}
          width="60" height={fillHeight + 4}
          clipPath={`url(#bulb-${standing.teamId})`}
          fill={`url(#gem-${standing.teamId})`}
          filter={`url(#glow-${standing.teamId})`}
          className={styles.gemFill}
        />

        {/* Gem sparkle dots */}
        {fill > 0.3 && (
          <>
            <circle cx="28" cy={fillY + 6} r="1.5" fill="rgba(255,255,255,0.7)" />
            <circle cx="42" cy={fillY + 10} r="1" fill="rgba(255,255,255,0.5)" />
            <circle cx="22" cy={fillY + 14} r="1" fill="rgba(255,255,255,0.4)" />
          </>
        )}

        {/* ── Glass sheen overlay ── */}
        <polygon
          points="18,10 54,10 42,58 30,58"
          fill={`url(#glass-${standing.teamId})`}
        />
        <polygon
          points="18,65 54,65 66,112 6,112"
          fill={`url(#glass-${standing.teamId})`}
        />

        {/* ── Bottom cap ── */}
        <rect x="4" y="111" width="64" height="6" rx="3" fill="#c9a84c" />

        {/* ── Stand legs ── */}
        <line x1="10" y1="4" x2="6" y2="117" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="62" y1="4" x2="66" y2="117" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" />

        {/* ── Rank badge ── */}
        <circle cx="36" cy="122" r="7" fill="#c9a84c" />
        <text
          x="36" y="126"
          textAnchor="middle"
          fontSize="9"
          fontWeight="800"
          fontFamily="Georgia, serif"
          fill="#1a1610"
        >
          {standing.rank}
        </text>
      </svg>

      <div className={styles.label} style={{ color: gem.gemColor }}>
        {team.name}
      </div>
      <div className={styles.points}>{standing.pointsFor} pts</div>
    </div>
  );
}

export default function HouseHourglasses({ standings }: { standings: TeamStanding[] }) {
  const maxPoints = Math.max(...standings.map(s => s.pointsFor), 1);

  // Sort by rank so 1st is leftmost
  const sorted = [...standings].sort((a, b) => a.rank - b.rank);

  return (
    <div className={styles.container}>
      {sorted.map(s => (
        <Hourglass key={s.teamId} standing={s} maxPoints={maxPoints} />
      ))}
    </div>
  );
}

'use client';

import { TeamStanding } from '@/data/types';
import { TEAM_MAP } from '@/data';
import styles from './HouseHourglasses.module.css';

const HOUSE_GEMS: Record<string, { gemColor: string; glowColor: string; labelColor: string }> = {
  gryffindor: { gemColor: '#e8443a', glowColor: 'rgba(232,68,58,0.5)',  labelColor: '#e8443a' },
  slytherin:  { gemColor: '#4ecb71', glowColor: 'rgba(78,203,113,0.5)', labelColor: '#4ecb71' },
  hufflepuff: { gemColor: '#f5cc30', glowColor: 'rgba(245,204,48,0.5)', labelColor: '#c9a200' },
  ravenclaw:  { gemColor: '#5b8cdb', glowColor: 'rgba(91,140,219,0.5)', labelColor: '#5b8cdb' },
};

// Bottom bulb SVG coordinates
const BULB_TOP_Y = 92;    // where neck ends / bottom bulb begins
const BULB_BOTTOM_Y = 155; // base of bottom bulb glass
const BULB_HEIGHT = BULB_BOTTOM_Y - BULB_TOP_Y; // 63

function Hourglass({
  standing,
  fill,
}: {
  standing: TeamStanding;
  fill: number; // 0–1
}) {
  const team = TEAM_MAP[standing.teamId];
  const gem = HOUSE_GEMS[standing.teamId];
  if (!team || !gem) return null;

  const fillH = BULB_HEIGHT * fill;
  const fillY = BULB_BOTTOM_Y - fillH;

  const id = standing.teamId;

  return (
    <div className={styles.hourglassWrap}>
      <svg
        width="80"
        height="190"
        viewBox="0 0 80 190"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        <defs>
          {/* Clip path for bottom bulb — matches the glass shape */}
          <clipPath id={`clip-bottom-${id}`}>
            <path d="M14,155 C14,155 66,155 66,155 C64,130 44,100 40,92 C36,100 16,130 14,155 Z" />
          </clipPath>

          {/* Gem fill gradient */}
          <linearGradient id={`gem-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={gem.gemColor} stopOpacity="0.85" />
            <stop offset="100%" stopColor={gem.gemColor} stopOpacity="1" />
          </linearGradient>

          {/* Glass tint */}
          <linearGradient id={`glass-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.03)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.10)" />
          </linearGradient>

          {/* Glow */}
          <filter id={`glow-${id}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── Frame side posts ── */}
        <line x1="13" y1="6" x2="13" y2="162" stroke="#c9a84c" strokeWidth="3" strokeLinecap="round" />
        <line x1="67" y1="6" x2="67" y2="162" stroke="#c9a84c" strokeWidth="3" strokeLinecap="round" />

        {/* ── Top cap ── */}
        <rect x="8" y="4" width="64" height="7" rx="3.5" fill="#c9a84c" />

        {/* ── Bottom cap ── */}
        <rect x="8" y="158" width="64" height="7" rx="3.5" fill="#c9a84c" />

        {/* ── Top bulb glass (dark) ── */}
        <path
          d="M14,11 C14,11 66,11 66,11 C64,36 44,72 40,80 C36,72 16,36 14,11 Z"
          fill="rgba(18,14,10,0.75)"
          stroke="#c9a84c"
          strokeWidth="1.2"
        />

        {/* ── Neck ── */}
        <rect x="36" y="79" width="8" height="13" rx="2"
          fill="rgba(18,14,10,0.9)" stroke="#c9a84c" strokeWidth="1.2" />

        {/* ── Bottom bulb glass (dark base) ── */}
        <path
          d="M14,155 C14,155 66,155 66,155 C64,130 44,100 40,92 C36,100 16,130 14,155 Z"
          fill="rgba(18,14,10,0.65)"
          stroke="#c9a84c"
          strokeWidth="1.2"
        />

        {/* ── Sand/gem fill in bottom bulb ── */}
        <rect
          x="0"
          y={fillY}
          width="80"
          height={fillH + 4}
          clipPath={`url(#clip-bottom-${id})`}
          fill={`url(#gem-${id})`}
          filter={`url(#glow-${id})`}
          className={styles.gemFill}
        />

        {/* Sparkle dots on fill surface */}
        {fill > 0.15 && (
          <>
            <circle cx="32" cy={fillY + 5} r="1.5" fill="rgba(255,255,255,0.75)" clipPath={`url(#clip-bottom-${id})`} />
            <circle cx="48" cy={fillY + 9} r="1" fill="rgba(255,255,255,0.5)"  clipPath={`url(#clip-bottom-${id})`} />
            <circle cx="26" cy={fillY + 13} r="1" fill="rgba(255,255,255,0.4)" clipPath={`url(#clip-bottom-${id})`} />
          </>
        )}

        {/* ── Glass sheen overlays ── */}
        <path
          d="M14,11 C14,11 66,11 66,11 C64,36 44,72 40,80 C36,72 16,36 14,11 Z"
          fill={`url(#glass-${id})`}
        />
        <path
          d="M14,155 C14,155 66,155 66,155 C64,130 44,100 40,92 C36,100 16,130 14,155 Z"
          fill={`url(#glass-${id})`}
        />

        {/* ── Rank badge ── */}
        <circle cx="40" cy="174" r="9" fill="#c9a84c" />
        <text
          x="40" y="178"
          textAnchor="middle"
          fontSize="10"
          fontWeight="800"
          fontFamily="Georgia, serif"
          fill="#1a1610"
        >
          {standing.rank}
        </text>
      </svg>

      <div className={styles.label} style={{ color: gem.labelColor }}>
        {team.name}
      </div>
      <div className={styles.points}>{standing.pointsFor} pts</div>
    </div>
  );
}

export default function HouseHourglasses({ standings }: { standings: TeamStanding[] }) {
  const sorted = [...standings].sort((a, b) => a.rank - b.rank);

  const pts = sorted.map(s => s.pointsFor);
  const minPts = Math.min(...pts);
  const maxPts = Math.max(...pts);
  const range = maxPts - minPts || 1;

  // Spread fill from 0.18 (last place) to 0.95 (first place) so differences are visible
  function fillFor(s: TeamStanding) {
    return 0.18 + 0.77 * (s.pointsFor - minPts) / range;
  }

  return (
    <div className={styles.container}>
      {sorted.map(s => (
        <Hourglass key={s.teamId} standing={s} fill={fillFor(s)} />
      ))}
    </div>
  );
}

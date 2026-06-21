'use client';

import { TeamStanding } from '@/data/types';
import { TEAM_MAP } from '@/data';
import styles from './HouseHourglasses.module.css';

const HOUSE_GEMS: Record<string, { gemColor: string; gemDark: string; labelColor: string }> = {
  gryffindor: { gemColor: '#e8443a', gemDark: '#7a100a', labelColor: '#e8443a' },
  slytherin:  { gemColor: '#4ecb71', gemDark: '#0d5c28', labelColor: '#4ecb71' },
  hufflepuff: { gemColor: '#f5cc30', gemDark: '#8a6800', labelColor: '#c9a200' },
  ravenclaw:  { gemColor: '#5b8cdb', gemDark: '#152d6e', labelColor: '#5b8cdb' },
};

const BULB_TOP_Y    = 90;   // neck bottom / bottom bulb start
const BULB_BOTTOM_Y = 156;  // base of bottom bulb
const BULB_H        = BULB_BOTTOM_Y - BULB_TOP_Y; // 66

function Hourglass({ standing, fill }: { standing: TeamStanding; fill: number }) {
  const team = TEAM_MAP[standing.teamId];
  const gem  = HOUSE_GEMS[standing.teamId];
  if (!team || !gem) return null;

  const id      = standing.teamId;
  const fillH   = BULB_H * fill;
  const fillY   = BULB_BOTTOM_Y - fillH;

  // Bottom bulb glass outline path (bezier curves for realism)
  const bottomBulb = `M 37,90 C 30,97 13,128 13,156 L 67,156 C 67,128 50,97 43,90 Z`;
  // Top bulb glass outline path
  const topBulb    = `M 13,12 C 13,34 29,68 37,80 L 43,80 C 50,68 67,34 67,12 Z`;

  return (
    <div className={styles.hourglassWrap}>
      <svg
        width="84"
        height="196"
        viewBox="0 0 80 196"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        <defs>
          {/* Sand/gem fill gradient — rich, layered */}
          <linearGradient id={`gem-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={gem.gemColor} stopOpacity="0.7" />
            <stop offset="40%"  stopColor={gem.gemColor} stopOpacity="0.95" />
            <stop offset="100%" stopColor={gem.gemDark}  stopOpacity="1" />
          </linearGradient>

          {/* Gem surface highlight (top of sand) */}
          <linearGradient id={`gem-top-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.35)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Glass body gradient — dark with subtle blue tint like real glass */}
          <linearGradient id={`glass-body-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(30,22,10,0.82)" />
            <stop offset="45%"  stopColor="rgba(20,16,8,0.55)" />
            <stop offset="100%" stopColor="rgba(30,22,10,0.80)" />
          </linearGradient>

          {/* Left highlight — light catching glass edge */}
          <linearGradient id={`sheen-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.22)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Inner glow at bottom when full */}
          <radialGradient id={`glow-${id}`} cx="50%" cy="80%" r="50%">
            <stop offset="0%"   stopColor={gem.gemColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={gem.gemColor} stopOpacity="0" />
          </radialGradient>

          {/* Frame gradient — brushed metal look */}
          <linearGradient id={`frame-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#a07828" />
            <stop offset="40%"  stopColor="#e8c86a" />
            <stop offset="70%"  stopColor="#c9a84c" />
            <stop offset="100%" stopColor="#8a6418" />
          </linearGradient>

          {/* Clip paths */}
          <clipPath id={`clip-bottom-${id}`}>
            <path d={bottomBulb} />
          </clipPath>
          <clipPath id={`clip-top-${id}`}>
            <path d={topBulb} />
          </clipPath>
        </defs>

        {/* ── Frame ── */}
        {/* Side posts */}
        <line x1="11" y1="6"   x2="11" y2="162" stroke={`url(#frame-${id})`} strokeWidth="3.5" strokeLinecap="round" />
        <line x1="69" y1="6"   x2="69" y2="162" stroke={`url(#frame-${id})`} strokeWidth="3.5" strokeLinecap="round" />
        {/* Top cap */}
        <rect x="7"  y="3"   width="66" height="8"  rx="4" fill={`url(#frame-${id})`} />
        {/* Neck band */}
        <rect x="33" y="79"  width="14" height="13" rx="3" fill={`url(#frame-${id})`} />
        {/* Bottom cap */}
        <rect x="7"  y="157" width="66" height="8"  rx="4" fill={`url(#frame-${id})`} />
        {/* Mid cross-braces (like real HP hourglasses have wooden cross-pieces) */}
        <line x1="11" y1="40"  x2="69" y2="40"  stroke={`url(#frame-${id})`} strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="11" y1="128" x2="69" y2="128" stroke={`url(#frame-${id})`} strokeWidth="1.5" strokeOpacity="0.6" />

        {/* ── Top bulb — glass body ── */}
        <path d={topBulb} fill={`url(#glass-body-${id})`} stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.7" />

        {/* ── Bottom bulb — glass body ── */}
        <path d={bottomBulb} fill={`url(#glass-body-${id})`} stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.7" />

        {/* ── Sand/gem fill ── */}
        {fillH > 0 && (
          <>
            {/* Main fill block */}
            <rect
              x="0" y={fillY}
              width="80" height={fillH + 2}
              clipPath={`url(#clip-bottom-${id})`}
              fill={`url(#gem-${id})`}
              className={styles.gemFill}
            />
            {/* Inner glow at base */}
            <rect
              x="0" y={BULB_BOTTOM_Y - 20}
              width="80" height="22"
              clipPath={`url(#clip-bottom-${id})`}
              fill={`url(#glow-${id})`}
            />
            {/* Surface sheen (top 6px of fill) */}
            <rect
              x="0" y={fillY}
              width="80" height="6"
              clipPath={`url(#clip-bottom-${id})`}
              fill={`url(#gem-top-${id})`}
            />
            {/* Sparkle dots */}
            {fill > 0.2 && (
              <>
                <circle cx="30" cy={fillY + 4}  r="1.2" fill="rgba(255,255,255,0.7)" clipPath={`url(#clip-bottom-${id})`} />
                <circle cx="50" cy={fillY + 8}  r="0.9" fill="rgba(255,255,255,0.5)" clipPath={`url(#clip-bottom-${id})`} />
                <circle cx="24" cy={fillY + 14} r="0.8" fill="rgba(255,255,255,0.35)" clipPath={`url(#clip-bottom-${id})`} />
              </>
            )}
          </>
        )}

        {/* ── Glass sheen overlays (on top of fill) ── */}
        {/* Left edge highlight on top bulb */}
        <path
          d="M 15,14 C 13,36 17,64 33,78 C 23,66 18,38 17,14 Z"
          fill={`url(#sheen-${id})`}
          clipPath={`url(#clip-top-${id})`}
        />
        {/* Left edge highlight on bottom bulb */}
        <path
          d="M 17,158 C 14,136 18,104 33,92 C 20,104 15,136 15,158 Z"
          fill={`url(#sheen-${id})`}
          clipPath={`url(#clip-bottom-${id})`}
        />
        {/* Right edge shadow on top bulb */}
        <path
          d="M 65,14 C 67,36 63,64 47,78 C 57,66 62,38 63,14 Z"
          fill="rgba(0,0,0,0.15)"
          clipPath={`url(#clip-top-${id})`}
        />

        {/* ── Rank badge ── */}
        <circle cx="40" cy="177" r="9" fill={`url(#frame-${id})`} />
        <circle cx="40" cy="177" r="7.5" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
        <text
          x="40" y="181"
          textAnchor="middle"
          fontSize="10"
          fontWeight="800"
          fontFamily="Georgia, serif"
          fill="#1a1010"
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
  const pts    = sorted.map(s => s.pointsFor);
  const minPts = Math.min(...pts);
  const maxPts = Math.max(...pts);
  const range  = maxPts - minPts || 1;

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

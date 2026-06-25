'use client';

import { TeamStanding } from '@/data/types';
import { TEAM_MAP } from '@/data';
import styles from './HouseHourglasses.module.css';

const HOUSE: Record<string, {
  gem: string; gemDark: string; gemLight: string;
  label: string;
  sand: string; sandDark: string;
}> = {
  gryffindor: { gem: '#e03030', gemDark: '#7a100a', gemLight: '#ffaaaa', label: '#e8443a', sand: '#e05030', sandDark: '#7a1808' },
  slytherin:  { gem: '#30b858', gemDark: '#0a4a20', gemLight: '#90ffb8', label: '#4ecb71', sand: '#30b858', sandDark: '#0a4a20' },
  hufflepuff: { gem: '#f0c020', gemDark: '#7a5800', gemLight: '#fff090', label: '#c9a200', sand: '#f0c020', sandDark: '#8a6000' },
  ravenclaw:  { gem: '#4878d0', gemDark: '#0e2260', gemLight: '#90c0ff', label: '#5b8cdb', sand: '#4878d0', sandDark: '#0e2260' },
};

// Bulb geometry
const NECK_TOP    = 124;
const NECK_BOT    = 146;
const NECK_L      = 38;
const NECK_R      = 62;
const BULB_B_TOP  = NECK_BOT;
const BULB_B_BOT  = 224;

const topBulbPath    = `M${NECK_L},${NECK_TOP} C28,112 16,82 16,54 L84,54 C84,82 72,112 ${NECK_R},${NECK_TOP} Z`;
const bottomBulbPath = `M${NECK_L},${NECK_BOT} C26,158 14,188 14,${BULB_B_BOT} L86,${BULB_B_BOT} C86,188 74,158 ${NECK_R},${NECK_BOT} Z`;

// ── House animal toppers ─────────────────────────────────────────────────────

function Lion() {
  return (
    <g>
      {/* mane */}
      <ellipse cx="50" cy="16" rx="14" ry="13" fill="#9a5808" />
      <ellipse cx="50" cy="15" rx="11" ry="10" fill="#c87808" />
      {/* head */}
      <circle cx="50" cy="14" r="8.5" fill="#e8a820" />
      {/* ears */}
      <polygon points="41,7 37,0 45,6" fill="#e8a820" /><polygon points="39,7 36,1 44,6" fill="#c87808" />
      <polygon points="59,7 63,0 55,6" fill="#e8a820" /><polygon points="61,7 64,1 56,6" fill="#c87808" />
      {/* eyes */}
      <circle cx="46" cy="13" r="2.2" fill="#2a1000" /><circle cx="45.4" cy="12.4" r="0.9" fill="white" />
      <circle cx="54" cy="13" r="2.2" fill="#2a1000" /><circle cx="53.4" cy="12.4" r="0.9" fill="white" />
      {/* nose + mouth */}
      <path d="M48,17 L52,17 L50,19.5 Z" fill="#8a3010" />
      <path d="M47,20 Q50,22 53,20" stroke="#6a2008" strokeWidth="0.8" fill="none" />
      {/* body */}
      <ellipse cx="50" cy="27" rx="8" ry="5" fill="#9a5808" />
    </g>
  );
}

function Eagle() {
  return (
    <g>
      {/* left wing */}
      <path d="M50,14 C44,10 28,6 16,10 C22,12 32,11 40,16 Z" fill="#152055" />
      <path d="M50,14 C44,10 28,6 16,10 C22,12 32,11 40,16 Z" fill="none" stroke="#2a3888" strokeWidth="0.6" />
      {/* right wing */}
      <path d="M50,14 C56,10 72,6 84,10 C78,12 68,11 60,16 Z" fill="#152055" />
      <path d="M50,14 C56,10 72,6 84,10 C78,12 68,11 60,16 Z" fill="none" stroke="#2a3888" strokeWidth="0.6" />
      {/* body */}
      <ellipse cx="50" cy="18" rx="6" ry="9" fill="#152055" />
      {/* tail */}
      <path d="M44,26 L50,24 L56,26 L53,31 L47,31 Z" fill="#152055" />
      {/* head */}
      <circle cx="50" cy="8" r="5.5" fill="#152055" />
      {/* beak */}
      <path d="M50,6 L56,9 L50,12 Z" fill="#c89818" />
      {/* eye */}
      <circle cx="47" cy="7" r="1.8" fill="#d0b020" />
      <circle cx="47" cy="7" r="0.9" fill="#1a1000" />
    </g>
  );
}

function Badger() {
  return (
    <g>
      {/* body */}
      <ellipse cx="50" cy="24" rx="15" ry="8" fill="#302818" />
      {/* head */}
      <ellipse cx="50" cy="13" rx="13" ry="11" fill="#282010" />
      {/* white face stripes */}
      <path d="M44,3 L42,23" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M56,3 L58,23" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M50,2 L50,10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      {/* eyes */}
      <circle cx="45" cy="11" r="2" fill="#b89000" /><circle cx="45" cy="11" r="1" fill="#100800" />
      <circle cx="55" cy="11" r="2" fill="#b89000" /><circle cx="55" cy="11" r="1" fill="#100800" />
      {/* nose */}
      <ellipse cx="50" cy="17" rx="3" ry="2" fill="#180800" />
    </g>
  );
}

function Snake() {
  return (
    <g>
      {/* body S-curve */}
      <path d="M42,28 C32,24 28,16 36,10 C44,4 56,4 58,10 C60,16 54,20 50,16"
            stroke="#156020" strokeWidth="5.5" fill="none" strokeLinecap="round" />
      <path d="M42,28 C32,24 28,16 36,10 C44,4 56,4 58,10 C60,16 54,20 50,16"
            stroke="#28a040" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="5,4" />
      {/* head */}
      <ellipse cx="49" cy="14" rx="7" ry="4.5" fill="#156020" transform="rotate(-25 49 14)" />
      <ellipse cx="49" cy="14" rx="5.5" ry="3" fill="#1e8030" transform="rotate(-25 49 14)" />
      {/* eye */}
      <ellipse cx="47" cy="11" rx="1.8" ry="1.2" fill="#e0c000" transform="rotate(-25 47 11)" />
      <ellipse cx="47" cy="11" rx="0.6" ry="1" fill="#100800" transform="rotate(-25 47 11)" />
      {/* tongue */}
      <path d="M53,10 L58,8 M58,8 L61,6 M58,8 L61,10"
            stroke="#cc1818" strokeWidth="0.9" fill="none" strokeLinecap="round" />
    </g>
  );
}

const ANIMALS: Record<string, () => JSX.Element> = {
  gryffindor: Lion,
  ravenclaw:  Eagle,
  hufflepuff: Badger,
  slytherin:  Snake,
};

// ── Faceted gem shape ────────────────────────────────────────────────────────
function Gem({ cx, cy, r, color, colorLight, colorDark, id }: {
  cx: number; cy: number; r: number;
  color: string; colorLight: string; colorDark: string; id: string;
}) {
  return (
    <>
      <defs>
        <radialGradient id={`gem-crown-${id}`} cx="35%" cy="30%" r="70%">
          <stop offset="0%"   stopColor={colorLight} />
          <stop offset="40%"  stopColor={color} />
          <stop offset="100%" stopColor={colorDark} />
        </radialGradient>
      </defs>
      {/* gem outer glow */}
      <circle cx={cx} cy={cy} r={r + 2} fill={color} opacity="0.25" />
      {/* gem facets */}
      <polygon
        points={`${cx},${cy - r}  ${cx + r * 0.7},${cy - r * 0.3}  ${cx + r * 0.7},${cy + r * 0.5}  ${cx},${cy + r}  ${cx - r * 0.7},${cy + r * 0.5}  ${cx - r * 0.7},${cy - r * 0.3}`}
        fill={`url(#gem-crown-${id})`}
        stroke={colorDark}
        strokeWidth="0.5"
      />
      {/* inner facet lines */}
      <line x1={cx} y1={cy - r} x2={cx} y2={cy} stroke={colorLight} strokeWidth="0.4" opacity="0.6" />
      <line x1={cx + r * 0.7} y1={cy - r * 0.3} x2={cx} y2={cy} stroke={colorLight} strokeWidth="0.4" opacity="0.4" />
      <line x1={cx - r * 0.7} y1={cy - r * 0.3} x2={cx} y2={cy} stroke={colorLight} strokeWidth="0.4" opacity="0.4" />
      {/* highlight */}
      <ellipse cx={cx - r * 0.25} cy={cy - r * 0.35} rx={r * 0.3} ry={r * 0.2} fill="white" opacity="0.5" />
    </>
  );
}

// ── Single hourglass ─────────────────────────────────────────────────────────
function Hourglass({ standing, fill }: { standing: TeamStanding; fill: number }) {
  const team = TEAM_MAP[standing.teamId];
  const h    = HOUSE[standing.teamId];
  if (!team || !h) return null;

  const id    = standing.teamId;
  const fillH = (BULB_B_BOT - BULB_B_TOP) * fill;
  const fillY = BULB_B_BOT - fillH;

  const Animal = ANIMALS[id];

  return (
    <div className={styles.hourglassWrap}>
      <svg
        width="100" height="295"
        viewBox="0 0 100 295"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        <defs>
          {/* brass frame */}
          <linearGradient id={`fr-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#7a5010" />
            <stop offset="30%"  stopColor="#e8c060" />
            <stop offset="60%"  stopColor="#c8a040" />
            <stop offset="100%" stopColor="#7a5010" />
          </linearGradient>
          <linearGradient id={`fr-v-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#e8c060" />
            <stop offset="50%"  stopColor="#c8a040" />
            <stop offset="100%" stopColor="#7a5010" />
          </linearGradient>
          {/* glass */}
          <linearGradient id={`gl-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(20,14,6,0.85)" />
            <stop offset="40%"  stopColor="rgba(12,10,4,0.50)" />
            <stop offset="100%" stopColor="rgba(20,14,6,0.82)" />
          </linearGradient>
          {/* sand fill */}
          <linearGradient id={`sf-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={h.sand}     stopOpacity="0.7" />
            <stop offset="50%"  stopColor={h.sand}     stopOpacity="0.95" />
            <stop offset="100%" stopColor={h.sandDark} stopOpacity="1" />
          </linearGradient>
          <radialGradient id={`sg-${id}`} cx="50%" cy="85%" r="55%">
            <stop offset="0%"   stopColor={h.sand} stopOpacity="0.45" />
            <stop offset="100%" stopColor={h.sand} stopOpacity="0" />
          </radialGradient>
          {/* glass sheen */}
          <linearGradient id={`sh-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.20)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          {/* clip paths */}
          <clipPath id={`ct-${id}`}><path d={topBulbPath} /></clipPath>
          <clipPath id={`cb-${id}`}><path d={bottomBulbPath} /></clipPath>
        </defs>

        {/* ── Animal topper ── */}
        {Animal && <Animal />}

        {/* ── Crown arch ── */}
        <path
          d="M 10,52 C 10,38 24,32 50,30 C 76,32 90,38 90,52"
          stroke={`url(#fr-${id})`} strokeWidth="5" fill="none" strokeLinecap="round"
        />
        {/* crown side scrolls */}
        <path d="M 10,52 C 6,50 5,46 8,44 C 10,43 12,44 12,46" stroke={`url(#fr-${id})`} strokeWidth="2.5" fill="none" />
        <path d="M 90,52 C 94,50 95,46 92,44 C 90,43 88,44 88,46" stroke={`url(#fr-${id})`} strokeWidth="2.5" fill="none" />

        {/* crown gem */}
        <Gem cx={50} cy={32} r={7} color={h.gem} colorLight={h.gemLight} colorDark={h.gemDark} id={id} />

        {/* ── Frame posts ── */}
        <rect x="10" y="50" width="8" height="182" rx="4" fill={`url(#fr-${id})`} />
        <rect x="82" y="50" width="8" height="182" rx="4" fill={`url(#fr-${id})`} />

        {/* post decorative rings */}
        {[78, 108, 135, 162, 192, 218].map(y => (
          <g key={y}>
            <rect x="8"  y={y - 4} width="12" height="8" rx="4" fill={`url(#fr-${id})`} />
            <rect x="80" y={y - 4} width="12" height="8" rx="4" fill={`url(#fr-${id})`} />
          </g>
        ))}

        {/* ── Top cap beam ── */}
        <rect x="14" y="50" width="72" height="9" rx="3" fill={`url(#fr-${id})`} />

        {/* ── Top bulb ── */}
        <path d={topBulbPath} fill={`url(#gl-${id})`} stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.6" />
        {/* top bulb sheen */}
        <path
          d="M38,124 C28,112 18,84 18,56 C22,62 22,90 34,116 Z"
          fill={`url(#sh-${id})`} clipPath={`url(#ct-${id})`}
        />

        {/* ── Neck ── */}
        <rect x={NECK_L - 2} y={NECK_TOP} width={NECK_R - NECK_L + 4} height={NECK_BOT - NECK_TOP} rx="2" fill={`url(#fr-${id})`} />

        {/* ── Bottom bulb ── */}
        <path d={bottomBulbPath} fill={`url(#gl-${id})`} stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.6" />

        {/* sand fill */}
        {fillH > 0 && (
          <>
            <rect
              x="0" y={fillY} width="100" height={fillH + 2}
              clipPath={`url(#cb-${id})`}
              fill={`url(#sf-${id})`}
              className={styles.gemFill}
            />
            <rect
              x="0" y={BULB_B_BOT - 22} width="100" height="24"
              clipPath={`url(#cb-${id})`}
              fill={`url(#sg-${id})`}
            />
            {fill > 0.15 && <>
              <circle cx="35" cy={fillY + 4}  r="1.4" fill="rgba(255,255,255,0.65)" clipPath={`url(#cb-${id})`} />
              <circle cx="56" cy={fillY + 9}  r="1.0" fill="rgba(255,255,255,0.45)" clipPath={`url(#cb-${id})`} />
              <circle cx="28" cy={fillY + 16} r="0.8" fill="rgba(255,255,255,0.35)" clipPath={`url(#cb-${id})`} />
            </>}
          </>
        )}

        {/* bottom bulb sheen */}
        <path
          d="M38,146 C26,158 16,188 16,222 C20,210 22,180 34,160 Z"
          fill={`url(#sh-${id})`} clipPath={`url(#cb-${id})`}
        />

        {/* ── Bottom cap beam ── */}
        <rect x="14" y="223" width="72" height="9" rx="3" fill={`url(#fr-${id})`} />

        {/* ── Base platform ── */}
        <rect x="6" y="230" width="88" height="10" rx="4" fill={`url(#fr-${id})`} />

        {/* base decorative scrolls */}
        <path d="M 6,234 C 0,234 0,248 6,250 L 94,250 C 100,248 100,234 94,234"
              fill={`url(#fr-v-${id})`} />
        {/* base feet */}
        <ellipse cx="20" cy="254" rx="10" ry="5" fill={`url(#fr-${id})`} />
        <ellipse cx="50" cy="256" rx="12" ry="4" fill={`url(#fr-${id})`} />
        <ellipse cx="80" cy="254" rx="10" ry="5" fill={`url(#fr-${id})`} />
        {/* base bottom line */}
        <rect x="10" y="256" width="80" height="3" rx="1.5" fill={`url(#fr-${id})`} />

        {/* ── Rank badge ── */}
        <circle cx="50" cy="274" r="10" fill={`url(#fr-${id})`} />
        <circle cx="50" cy="274" r="8.5" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
        <text x="50" y="278" textAnchor="middle" fontSize="11" fontWeight="800"
              fontFamily="Georgia, serif" fill="#1a1000">{standing.rank}</text>
      </svg>

      <div className={styles.label} style={{ color: h.label }}>{team.name}</div>
      <div className={styles.points}>{standing.pointsFor} pts</div>
    </div>
  );
}

// ── Container ────────────────────────────────────────────────────────────────
export default function HouseHourglasses({ standings }: { standings: TeamStanding[] }) {
  const sorted = [...standings].sort((a, b) => a.rank - b.rank);
  const pts    = sorted.map(s => s.pointsFor);
  const min    = Math.min(...pts);
  const max    = Math.max(...pts);
  const range  = max - min || 1;

  return (
    <div className={styles.container}>
      {sorted.map(s => (
        <Hourglass
          key={s.teamId}
          standing={s}
          fill={0.15 + 0.80 * (s.pointsFor - min) / range}
        />
      ))}
    </div>
  );
}

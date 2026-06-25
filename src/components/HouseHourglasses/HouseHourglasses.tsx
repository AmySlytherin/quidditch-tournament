'use client';

import React from 'react';
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

// ── House animal toppers — bronze/brass sculptural style ─────────────────────
// All animals use a metallic brass palette to look like cast figurines on the frame.

const B = { // brass palette
  light: '#e8c860', mid: '#c09030', base: '#8a6018', dark: '#3a2008', shadow: '#1e1004',
};

function Lion() {
  return (
    <g>
      {/* outer mane ring — unmistakable lion silhouette */}
      <circle cx="50" cy="17" r="16" fill={B.dark} />
      <circle cx="50" cy="16" r="13" fill={B.base} />
      {/* mane texture strokes */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map(deg => {
        const r1 = 10, r2 = 13, a = deg * Math.PI / 180;
        return <line key={deg}
          x1={50 + r1 * Math.cos(a)} y1={16 + r1 * Math.sin(a)}
          x2={50 + r2 * Math.cos(a)} y2={16 + r2 * Math.sin(a)}
          stroke={B.light} strokeWidth="0.8" opacity="0.5" />;
      })}
      {/* head */}
      <circle cx="50" cy="15" r="9" fill={B.mid} />
      <circle cx="50" cy="14" r="8" fill={B.light} opacity="0.15" />
      {/* ears above mane */}
      <polygon points="42,5 39,0 46,7" fill={B.mid} />
      <polygon points="58,5 61,0 54,7" fill={B.mid} />
      {/* deep-set eyes (shadow sockets, sculpture style) */}
      <ellipse cx="46" cy="14" rx="2.5" ry="2" fill={B.shadow} />
      <ellipse cx="54" cy="14" rx="2.5" ry="2" fill={B.shadow} />
      <circle cx="46" cy="14" r="1" fill={B.light} opacity="0.4" />
      <circle cx="54" cy="14" r="1" fill={B.light} opacity="0.4" />
      {/* muzzle */}
      <ellipse cx="50" cy="20" rx="4" ry="3" fill={B.base} />
      <ellipse cx="50" cy="21" rx="2" ry="1.5" fill={B.shadow} />
      {/* highlight on forehead */}
      <ellipse cx="50" cy="10" rx="3" ry="2" fill={B.light} opacity="0.35" />
    </g>
  );
}

function Eagle() {
  return (
    <g>
      {/* heraldic spread wings — wide V silhouette */}
      <path d="M50,18 C46,14 36,8 18,11 C25,13 38,15 44,20 Z" fill={B.dark} />
      <path d="M50,18 C54,14 64,8 82,11 C75,13 62,15 56,20 Z" fill={B.dark} />
      <path d="M50,18 C46,14 36,8 18,11 C25,13 38,15 44,20 Z" fill={B.base} opacity="0.8" />
      <path d="M50,18 C54,14 64,8 82,11 C75,13 62,15 56,20 Z" fill={B.base} opacity="0.8" />
      {/* feather lines left */}
      <path d="M50,18 C42,15 30,11 19,12" stroke={B.light} strokeWidth="0.7" fill="none" opacity="0.5" />
      <path d="M50,18 C42,16 32,13 22,14" stroke={B.light} strokeWidth="0.5" fill="none" opacity="0.3" />
      {/* feather lines right */}
      <path d="M50,18 C58,15 70,11 81,12" stroke={B.light} strokeWidth="0.7" fill="none" opacity="0.5" />
      <path d="M50,18 C58,16 68,13 78,14" stroke={B.light} strokeWidth="0.5" fill="none" opacity="0.3" />
      {/* body */}
      <ellipse cx="50" cy="22" rx="6" ry="8" fill={B.mid} />
      {/* tail */}
      <path d="M45,29 L50,27 L55,29 L52,33 L48,33 Z" fill={B.base} />
      {/* neck + head */}
      <ellipse cx="50" cy="11" rx="5" ry="7" fill={B.mid} />
      <circle  cx="50" cy="6"  r="5"   fill={B.mid} />
      {/* highlight on head */}
      <ellipse cx="48" cy="4" rx="2.5" ry="1.5" fill={B.light} opacity="0.4" />
      {/* beak — prominent hooked shape */}
      <path d="M50,4 L58,7 L54,11 L50,9 Z" fill={B.base} />
      <path d="M54,11 L58,9 L58,7" fill={B.dark} />
      {/* eye */}
      <circle cx="47" cy="6" r="1.8" fill={B.shadow} />
      <circle cx="46.5" cy="5.5" r="0.7" fill={B.light} opacity="0.6" />
    </g>
  );
}

function Badger() {
  // Eurasian badger — face-on, very wide/flat, unmistakable stripe pattern
  return (
    <g>
      {/* body — wide, low, clearly not a cat */}
      <ellipse cx="50" cy="27" rx="20" ry="7" fill={B.dark} />
      <ellipse cx="50" cy="27" rx="18" ry="5.5" fill={B.base} />
      {/* head — round, wide */}
      <ellipse cx="50" cy="14" rx="16" ry="13" fill="#9a9488" />
      {/* BLACK stripes running from crown down past eyes — the definitive badge marking */}
      <path d="M38,2 C37,6 37,14 38,22" stroke="#1a1410" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M62,2 C63,6 63,14 62,22" stroke="#1a1410" strokeWidth="7" fill="none" strokeLinecap="round" />
      {/* white/light centre of face between stripes */}
      <ellipse cx="50" cy="13" rx="8" ry="11" fill="#d8d4cc" />
      {/* eyes sit inside the dark stripes */}
      <circle cx="40" cy="13" r="2.2" fill="#c8a820" />
      <circle cx="40" cy="13" r="1.1" fill={B.shadow} />
      <circle cx="60" cy="13" r="2.2" fill="#c8a820" />
      <circle cx="60" cy="13" r="1.1" fill={B.shadow} />
      {/* snout — slightly pointed */}
      <ellipse cx="50" cy="21" rx="6" ry="4.5" fill="#a89e94" />
      <ellipse cx="50" cy="23" rx="3.5" ry="2.5" fill="#8a8078" />
      {/* nose */}
      <ellipse cx="50" cy="24" rx="2.5" ry="1.5" fill="#1a1008" />
      {/* highlight */}
      <ellipse cx="50" cy="8" rx="4" ry="2" fill="white" opacity="0.25" />
    </g>
  );
}

function Snake() {
  return (
    <g>
      {/* coiled body — thicker, more sculptural */}
      <path d="M38,28 C24,24 22,14 32,8 C42,2 58,4 60,12 C62,18 54,22 48,18"
            stroke={B.dark} strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M38,28 C24,24 22,14 32,8 C42,2 58,4 60,12 C62,18 54,22 48,18"
            stroke={B.mid} strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* scale sheen */}
      <path d="M38,28 C24,24 22,14 32,8 C42,2 58,4 60,12 C62,18 54,22 48,18"
            stroke={B.light} strokeWidth="2" fill="none" strokeLinecap="round"
            strokeDasharray="6,5" opacity="0.4" />
      {/* head — raised, slightly flattened */}
      <ellipse cx="47" cy="17" rx="8" ry="5" fill={B.mid} transform="rotate(-20 47 17)" />
      <ellipse cx="47" cy="17" rx="6" ry="3.5" fill={B.light} opacity="0.2" transform="rotate(-20 47 17)" />
      {/* eye */}
      <ellipse cx="44" cy="13" rx="2" ry="1.4" fill={B.shadow} transform="rotate(-20 44 13)" />
      <ellipse cx="43.5" cy="12.5" rx="0.7" ry="0.9" fill={B.light} opacity="0.5" transform="rotate(-20 43.5 12.5)" />
      {/* forked tongue */}
      <path d="M51,13 L57,10 M57,10 L60,8 M57,10 L60,12"
            stroke="#aa1818" strokeWidth="1.1" fill="none" strokeLinecap="round"
            transform="rotate(-20 51 13)" />
    </g>
  );
}

const ANIMALS: Record<string, () => React.ReactElement> = {
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

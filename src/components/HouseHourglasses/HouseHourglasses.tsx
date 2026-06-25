'use client';

import React from 'react';
import { TeamStanding } from '@/data/types';
import { TEAM_MAP } from '@/data';
import styles from './HouseHourglasses.module.css';

const HOUSE: Record<string, {
  gem: string; gemDark: string; gemLight: string;
  label: string; sand: string; sandDark: string;
}> = {
  gryffindor: { gem:'#e03030', gemDark:'#7a100a', gemLight:'#ffaaaa', label:'#e8443a', sand:'#e05030', sandDark:'#7a1808' },
  slytherin:  { gem:'#30b858', gemDark:'#0a4a20', gemLight:'#90ffb8', label:'#4ecb71', sand:'#30b858', sandDark:'#0a4a20' },
  hufflepuff: { gem:'#f0c020', gemDark:'#7a5800', gemLight:'#fff090', label:'#c9a200', sand:'#f0c020', sandDark:'#8a6000' },
  ravenclaw:  { gem:'#4878d0', gemDark:'#0e2260', gemLight:'#90c0ff', label:'#5b8cdb', sand:'#4878d0', sandDark:'#0e2260' },
};

// ── Geometry (viewBox 0 0 110 308) ──────────────────────────────────────────
const NECK_TOP  = 126;
const NECK_BOT  = 148;
const NECK_L    = 41;
const NECK_R    = 69;
const BULB_T    = 58;   // top of upper bulb
const BULB_B    = 230;  // bottom of lower bulb

const topBulbPath    = `M${NECK_L},${NECK_TOP} C30,114 17,84 17,${BULB_T} L93,${BULB_T} C93,84 80,114 ${NECK_R},${NECK_TOP} Z`;
const bottomBulbPath = `M${NECK_L},${NECK_BOT} C28,162 15,194 15,${BULB_B} L95,${BULB_B} C95,194 82,162 ${NECK_R},${NECK_BOT} Z`;

// ── Antique bronze palette (dark base, warm gold accents) ────────────────────
const B = { light:'#e8c860', mid:'#c09030', base:'#8a6018', dark:'#3a2008', shadow:'#1e1004' };

// ── House animal toppers — sculptural heraldic style ────────────────────────

function Lion() {
  // Gryffindor — bronze lion head with full mane, sculptural depth
  return (
    <g>
      <defs>
        <radialGradient id="lgm" cx="40%" cy="38%" r="62%">
          <stop offset="0%"   stopColor="#e8b840" />
          <stop offset="45%"  stopColor="#b07820" />
          <stop offset="100%" stopColor="#4a2808" />
        </radialGradient>
        <radialGradient id="lgf" cx="42%" cy="36%" r="58%">
          <stop offset="0%"   stopColor="#f0cc60" />
          <stop offset="50%"  stopColor="#c89030" />
          <stop offset="100%" stopColor="#7a4c10" />
        </radialGradient>
      </defs>
      {/* drop shadow */}
      <ellipse cx="56" cy="23" rx="17" ry="14" fill="rgba(0,0,0,0.4)" />
      {/* outer mane ring — dark */}
      <circle cx="55" cy="19" r="17" fill="#2e1606" />
      {/* mane tufts radiating outward */}
      {(Array.from({length:12},(_,i)=>{
        const a=(i*30-90)*Math.PI/180;
        const x1=55+9*Math.cos(a),  y1=19+9*Math.sin(a);
        const x2=55+14*Math.cos(a-0.22), y2=19+14*Math.sin(a-0.22);
        const x3=55+17*Math.cos(a), y3=19+17*Math.sin(a);
        const x4=55+14*Math.cos(a+0.22), y4=19+14*Math.sin(a+0.22);
        return <path key={i} d={`M${x1},${y1} L${x2},${y2} L${x3},${y3} L${x4},${y4}Z`} fill="#c08020" />;
      }))}
      {/* inner mane */}
      <circle cx="55" cy="19" r="12" fill="url(#lgm)" />
      {/* face */}
      <circle cx="55" cy="18" r="9"  fill="url(#lgf)" />
      {/* brow ridge — makes it regal not cute */}
      <path d="M47,14 C49,12 52,12 55,13 C58,12 61,12 63,14"
            stroke="rgba(60,25,0,0.65)" strokeWidth="2.2" fill="none" />
      {/* eye sockets — shadowed hollows, sculptural */}
      <ellipse cx="50" cy="17" rx="2.8" ry="2.2" fill="rgba(35,12,0,0.6)" />
      <ellipse cx="60" cy="17" rx="2.8" ry="2.2" fill="rgba(35,12,0,0.6)" />
      {/* nose — triangular, low */}
      <path d="M52,22 L58,22 L55,25.5 Z" fill="rgba(55,18,0,0.5)" />
      {/* chin highlight */}
      <ellipse cx="55" cy="11" rx="3.5" ry="2" fill="rgba(255,225,90,0.3)" />
    </g>
  );
}

function Eagle() {
  // Ravenclaw — heraldic eagle, wings spread, head in profile
  return (
    <g>
      <defs>
        <radialGradient id="egb" cx="40%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#3868c8" />
          <stop offset="55%"  stopColor="#1a3880" />
          <stop offset="100%" stopColor="#080e30" />
        </radialGradient>
      </defs>
      {/* drop shadow */}
      <ellipse cx="56" cy="24" rx="36" ry="10" fill="rgba(0,0,0,0.35)" />
      {/* left wing */}
      <path d="M55,18 C50,12 38,6 22,8 C15,9 12,13 14,16 C20,13 32,11 43,16 C48,18 52,19 55,19 Z" fill="#06102a" />
      <path d="M55,18 C50,12 38,6 22,8 C15,9 12,13 14,16 C20,13 32,11 43,16 C48,18 52,19 55,19 Z" fill="url(#egb)" opacity="0.92" />
      <path d="M55,18 C46,14 33,9 18,11"  stroke="#5888e0" strokeWidth="0.9" fill="none" opacity="0.55" />
      <path d="M53,19 C44,16 31,12 18,14"  stroke="#5888e0" strokeWidth="0.6" fill="none" opacity="0.35" />
      <path d="M50,20 C42,18 31,15 20,17"  stroke="#5888e0" strokeWidth="0.5" fill="none" opacity="0.22" />
      {/* right wing */}
      <path d="M55,18 C60,12 72,6 88,8 C95,9 98,13 96,16 C90,13 78,11 67,16 C62,18 58,19 55,19 Z" fill="#06102a" />
      <path d="M55,18 C60,12 72,6 88,8 C95,9 98,13 96,16 C90,13 78,11 67,16 C62,18 58,19 55,19 Z" fill="url(#egb)" opacity="0.92" />
      <path d="M55,18 C64,14 77,9 92,11"  stroke="#5888e0" strokeWidth="0.9" fill="none" opacity="0.55" />
      <path d="M57,19 C66,16 79,12 92,14"  stroke="#5888e0" strokeWidth="0.6" fill="none" opacity="0.35" />
      {/* body */}
      <ellipse cx="55" cy="24" rx="7" ry="10" fill="#0c1c4a" />
      <ellipse cx="55" cy="24" rx="5" ry="8"  fill="url(#egb)" opacity="0.75" />
      {/* tail */}
      <path d="M50,33 L55,31 L60,33 L57,37 L53,37 Z" fill="#0c1c4a" />
      {/* neck + head */}
      <ellipse cx="55" cy="11" rx="5.5" ry="7" fill="#162048" />
      <circle  cx="55" cy="5.5" r="5.5"        fill="#1e3080" />
      <ellipse cx="53" cy="3.5" rx="3" ry="1.8" fill="#6090e0" opacity="0.38" />
      {/* hooked beak — profile facing right */}
      <path d="M55,3 L65,6 L60,11 L56,9 Z" fill="#c8a018" />
      <path d="M60,11 L65,8 L65,6"          fill="#7a6008" />
      {/* eye */}
      <circle cx="51" cy="5" r="2.2" fill="#060818" />
      <circle cx="50.5" cy="4.5" r="0.9" fill="#d8c040" opacity="0.75" />
    </g>
  );
}

function Badger() {
  // Hufflepuff — face-on badger portrait, massive black stripes are unmistakable
  return (
    <g>
      <defs>
        <radialGradient id="bgf" cx="45%" cy="38%" r="62%">
          <stop offset="0%"   stopColor="#ccc4b4" />
          <stop offset="55%"  stopColor="#988e80" />
          <stop offset="100%" stopColor="#483e30" />
        </radialGradient>
      </defs>
      {/* drop shadow */}
      <ellipse cx="56" cy="30" rx="22" ry="7" fill="rgba(0,0,0,0.35)" />
      {/* body — very wide, squat */}
      <path d="M32,32 C28,28 28,22 32,19 L78,19 C82,22 82,28 78,32 Z" fill="#201c14" />
      <path d="M33,31 C30,27 30,23 33,20 L77,20 C80,23 80,27 77,31 Z" fill="#302820" />
      {/* head — wide oval */}
      <path d="M36,16 C34,8 38,1 46,0 C49,-1 51,0 55,0 C59,0 61,-1 64,0 C72,1 76,8 74,16 C72,22 65,26 55,26 C45,26 38,22 36,16 Z"
            fill="url(#bgf)" />
      {/* LEFT black facial stripe — thick, runs crown to jaw */}
      <path d="M41,-1 C39,4 38,11 38,17 C38,21 40,25 42,26"
            stroke="#14100a" strokeWidth="10" fill="none" strokeLinecap="round" />
      {/* RIGHT black stripe */}
      <path d="M69,-1 C71,4 72,11 72,17 C72,21 70,25 68,26"
            stroke="#14100a" strokeWidth="10" fill="none" strokeLinecap="round" />
      {/* cream centre face */}
      <path d="M47,0 C50,-1 60,-1 63,0 C67,2 67,9 65,14 C62,18 59,20 55,20 C51,20 48,18 45,14 C43,9 43,2 47,0 Z"
            fill="#e0dcd2" />
      {/* white crown stripe */}
      <path d="M55,-2 L55,9" stroke="#f2eee8" strokeWidth="8" fill="none" strokeLinecap="round" />
      {/* eyes in dark stripes — gleaming amber */}
      <circle cx="39" cy="14" r="3.8" fill="#c89010" />
      <circle cx="39" cy="14" r="2.2" fill="#0c0a06" />
      <circle cx="38.5" cy="13.2" r="0.9" fill="rgba(255,245,160,0.65)" />
      <circle cx="71" cy="14" r="3.8" fill="#c89010" />
      <circle cx="71" cy="14" r="2.2" fill="#0c0a06" />
      <circle cx="70.5" cy="13.2" r="0.9" fill="rgba(255,245,160,0.65)" />
      {/* snout — triangular, pushed out */}
      <path d="M48,19 C50,16 53,15 55,15 C57,15 60,16 62,19 C63,21 62,25 60,26 C58,27 52,27 50,26 C48,25 47,21 48,19 Z"
            fill="#9a9080" />
      {/* nose */}
      <path d="M52,22 C53,20 57,20 58,22 C59,24 57,26 55,26 C53,26 51,24 52,22 Z" fill="#1a1410" />
    </g>
  );
}

function Snake() {
  // Slytherin — thick coiled serpent, angular head, slit pupil
  return (
    <g>
      <defs>
        <linearGradient id="sgl" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#38c868" />
          <stop offset="50%"  stopColor="#1a7830" />
          <stop offset="100%" stopColor="#093018" />
        </linearGradient>
      </defs>
      {/* drop shadow */}
      <ellipse cx="52" cy="31" rx="18" ry="6" fill="rgba(0,0,0,0.35)" />
      {/* body outer shadow */}
      <path d="M40,30 C22,26 18,14 28,6 C38,-1 58,1 62,11 C66,20 56,27 48,21"
            stroke="#061408" strokeWidth="13" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* body main */}
      <path d="M40,30 C22,26 18,14 28,6 C38,-1 58,1 62,11 C66,20 56,27 48,21"
            stroke="url(#sgl)" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* scale highlight */}
      <path d="M40,30 C22,26 18,14 28,6 C38,-1 58,1 62,11 C66,20 56,27 48,21"
            stroke="#70f090" strokeWidth="3" fill="none" strokeLinecap="round"
            strokeDasharray="5,7" opacity="0.38" />
      {/* head — angular diamond/triangle (realistic snake shape) */}
      <path d="M45,19 C41,14 40,9 44,6 C48,3 55,4 59,7 C63,10 63,16 59,19 C55,22 49,22 45,19 Z"
            fill="#083018" />
      <path d="M46,19 C42,14 42,10 45,7 C49,4 55,5 58,8 C61,11 61,16 58,19 C55,21 49,21 46,19 Z"
            fill="#1e8840" />
      {/* head highlight */}
      <ellipse cx="52" cy="11" rx="5.5" ry="3" fill="#60e880" opacity="0.18" />
      {/* eye — vertical slit pupil, reptilian */}
      <ellipse cx="53" cy="12" rx="2.8" ry="2.2" fill="#d8c000" />
      <ellipse cx="53" cy="12" rx="0.9" ry="2.2" fill="#080c00" />
      <ellipse cx="52.4" cy="11" rx="0.9" ry="0.5" fill="rgba(255,255,180,0.55)" />
      {/* forked tongue */}
      <path d="M58,15 L65,12 M65,12 L68,10 M65,12 L68,14"
            stroke="#ee2020" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </g>
  );
}

const ANIMALS: Record<string, () => React.ReactElement> = {
  gryffindor: Lion,
  ravenclaw:  Eagle,
  hufflepuff: Badger,
  slytherin:  Snake,
};

// ── Faceted crown gem ────────────────────────────────────────────────────────
function Gem({ cx, cy, r, color, colorLight, colorDark, id }: {
  cx:number; cy:number; r:number; color:string; colorLight:string; colorDark:string; id:string;
}) {
  return (
    <>
      <defs>
        <radialGradient id={`gc-${id}`} cx="35%" cy="30%" r="70%">
          <stop offset="0%"   stopColor={colorLight} />
          <stop offset="40%"  stopColor={color}      />
          <stop offset="100%" stopColor={colorDark}  />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r+3} fill={color} opacity="0.18" />
      <circle cx={cx} cy={cy} r={r+1} fill={colorDark} />
      <polygon
        points={`${cx},${cy-r} ${cx+r*.75},${cy-r*.25} ${cx+r*.75},${cy+r*.55} ${cx},${cy+r} ${cx-r*.75},${cy+r*.55} ${cx-r*.75},${cy-r*.25}`}
        fill={`url(#gc-${id})`} stroke={colorDark} strokeWidth="0.6" />
      <line x1={cx} y1={cy-r} x2={cx} y2={cy}           stroke={colorLight} strokeWidth="0.5" opacity="0.6" />
      <line x1={cx+r*.75} y1={cy-r*.25} x2={cx} y2={cy} stroke={colorLight} strokeWidth="0.4" opacity="0.4" />
      <line x1={cx-r*.75} y1={cy-r*.25} x2={cx} y2={cy} stroke={colorLight} strokeWidth="0.4" opacity="0.4" />
      <ellipse cx={cx-r*.28} cy={cy-r*.38} rx={r*.32} ry={r*.2} fill="white" opacity="0.55" />
    </>
  );
}

// ── Single hourglass ─────────────────────────────────────────────────────────
function Hourglass({ standing, fill }: { standing: TeamStanding; fill: number }) {
  const team = TEAM_MAP[standing.teamId];
  const h    = HOUSE[standing.teamId];
  if (!team || !h) return null;

  const id    = standing.teamId;
  const fillH = (BULB_B - BULB_BOT_TOP) * fill;
  const fillY = BULB_B - fillH;
  const Animal = ANIMALS[id];

  // Helpers — shadow stroke + gold stroke layered for depth
  const archShadow = (d: string, w: number) =>
    <path d={d} stroke="#0e0804" strokeWidth={w+2} fill="none" strokeLinecap="round" />;
  const archGold   = (d: string, w: number, opacity = 1) =>
    <path d={d} stroke={`url(#fr-${id})`} strokeWidth={w} fill="none" strokeLinecap="round" opacity={opacity} />;

  return (
    <div className={styles.hourglassWrap}>
      <svg width="110" height="308" viewBox="0 0 110 308" fill="none"
           xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
        <defs>
          {/* Antique bronze: very dark edges, warm gold centre */}
          <linearGradient id={`fr-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#120804" />
            <stop offset="18%"  stopColor="#7a4e12" />
            <stop offset="45%"  stopColor="#d49828" />
            <stop offset="72%"  stopColor="#9a6418" />
            <stop offset="100%" stopColor="#120804" />
          </linearGradient>
          <linearGradient id={`fr-v-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#d49828" />
            <stop offset="45%"  stopColor="#9a6418" />
            <stop offset="100%" stopColor="#2a1608" />
          </linearGradient>
          {/* Antique glass — slightly amber/sepia tinted, not pure black */}
          <linearGradient id={`gl-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(22,13,6,0.93)" />
            <stop offset="32%"  stopColor="rgba(14,10,5,0.42)" />
            <stop offset="68%"  stopColor="rgba(14,10,5,0.42)" />
            <stop offset="100%" stopColor="rgba(22,13,6,0.90)" />
          </linearGradient>
          {/* Sand/gem fill */}
          <linearGradient id={`sf-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={h.sand}     stopOpacity="0.65" />
            <stop offset="50%"  stopColor={h.sand}     stopOpacity="0.92" />
            <stop offset="100%" stopColor={h.sandDark} stopOpacity="1"    />
          </linearGradient>
          <radialGradient id={`sg-${id}`} cx="50%" cy="82%" r="55%">
            <stop offset="0%"   stopColor={h.sand} stopOpacity="0.5" />
            <stop offset="100%" stopColor={h.sand} stopOpacity="0"   />
          </radialGradient>
          {/* Glass edge sheen */}
          <linearGradient id={`sh-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(255,230,180,0.22)" />
            <stop offset="100%" stopColor="rgba(255,230,180,0)"    />
          </linearGradient>
          {/* Clip paths */}
          <clipPath id={`ct-${id}`}><path d={topBulbPath}    /></clipPath>
          <clipPath id={`cb-${id}`}><path d={bottomBulbPath} /></clipPath>
        </defs>

        {/* ══════════════ CROWN ══════════════ */}
        {/* Outer arch shadow */}
        {archShadow("M 7,58 C 7,28 24,10 55,6 C 86,10 103,28 103,58", 8)}
        {/* Main arch */}
        {archGold  ("M 7,58 C 7,28 24,10 55,6 C 86,10 103,28 103,58", 6)}
        {/* Inner accent arc */}
        {archGold  ("M 13,58 C 13,32 28,16 55,12 C 82,16 97,32 97,58", 2, 0.35)}

        {/* Decorative knobs along arch */}
        {([
          [18,40],[29,23],[42,13],[55,9],[68,13],[81,23],[92,40]
        ] as [number,number][]).map(([cx,cy],i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="4.5" fill="#0e0804" />
            <circle cx={cx} cy={cy} r="3.5" fill={`url(#fr-${id})`} />
          </g>
        ))}

        {/* Crown gem */}
        <Gem cx={55} cy={9} r={7} color={h.gem} colorLight={h.gemLight} colorDark={h.gemDark} id={id} />

        {/* Side finials at arch ends */}
        {([7,103] as number[]).map((x,i) => (
          <g key={i}>
            <circle cx={x} cy={58} r="7"   fill="#0e0804" />
            <circle cx={x} cy={58} r="5.5" fill={`url(#fr-${id})`} />
            <circle cx={x} cy={58} r="2.5" fill="#0e0804" opacity="0.5" />
          </g>
        ))}
        {/* Finial scrolls */}
        {archShadow("M 7,51 C 1,48 -1,41 3,37 C 7,33 11,36 10,41 C 9,46 3,47 4,52", 3)}
        {archGold  ("M 7,51 C 1,48 -1,41 3,37 C 7,33 11,36 10,41 C 9,46 3,47 4,52", 2)}
        {archShadow("M 103,51 C 109,48 111,41 107,37 C 103,33 99,36 100,41 C 101,46 107,47 106,52", 3)}
        {archGold  ("M 103,51 C 109,48 111,41 107,37 C 103,33 99,36 100,41 C 101,46 107,47 106,52", 2)}

        {/* ══════════════ TOP CAP BEAM ══════════════ */}
        <rect x="9"  y="55" width="92" height="7" rx="2"   fill="#0e0804" />
        <rect x="10" y="55" width="90" height="6" rx="1.5" fill={`url(#fr-${id})`} />

        {/* ══════════════ POSTS ══════════════ */}
        {/* Shadow rects */}
        <rect x="8"  y="58" width="12" height="178" rx="6" fill="#0e0804" />
        <rect x="90" y="58" width="12" height="178" rx="6" fill="#0e0804" />
        {/* Main posts */}
        <rect x="9"  y="58" width="10" height="178" rx="5" fill={`url(#fr-${id})`} />
        <rect x="91" y="58" width="10" height="178" rx="5" fill={`url(#fr-${id})`} />

        {/* Post rings — every ~18px, larger at bracket positions */}
        {[76,94,112,130,150,170,190,210,228].map((y,i) => {
          const big = i===2||i===4||i===6; // larger rings at glass bracket points
          const rw = big ? 16 : 13;
          const rh = big ? 11 : 8;
          return (
            <g key={y}>
              <rect x={9  - (rw-10)/2} y={y-rh/2}   width={rw} height={rh} rx={rh/2} fill="#0e0804" />
              <rect x={10 - (rw-10)/2} y={y-rh/2+.5} width={rw-1} height={rh-1} rx={(rh-1)/2} fill={`url(#fr-${id})`} />
              <rect x={91 - (rw-10)/2} y={y-rh/2}   width={rw} height={rh} rx={rh/2} fill="#0e0804" />
              <rect x={91 - (rw-10)/2+.5} y={y-rh/2+.5} width={rw-1} height={rh-1} rx={(rh-1)/2} fill={`url(#fr-${id})`} />
            </g>
          );
        })}

        {/* ══════════════ BRACKETS — posts to glass ══════════════ */}
        {/* Top of upper bulb */}
        {archShadow("M 19,66 C 26,61 33,59 41,59", 3.5)}
        {archGold  ("M 19,66 C 26,61 33,59 41,59", 2.5)}
        {archShadow("M 91,66 C 84,61 77,59 69,59", 3.5)}
        {archGold  ("M 91,66 C 84,61 77,59 69,59", 2.5)}
        {/* Neck — top */}
        {archShadow(`M 19,${NECK_TOP-2} C 27,${NECK_TOP-6} 34,${NECK_TOP-4} ${NECK_L},${NECK_TOP-2}`, 3)}
        {archGold  (`M 19,${NECK_TOP-2} C 27,${NECK_TOP-6} 34,${NECK_TOP-4} ${NECK_L},${NECK_TOP-2}`, 2)}
        {archShadow(`M 91,${NECK_TOP-2} C 83,${NECK_TOP-6} 76,${NECK_TOP-4} ${NECK_R},${NECK_TOP-2}`, 3)}
        {archGold  (`M 91,${NECK_TOP-2} C 83,${NECK_TOP-6} 76,${NECK_TOP-4} ${NECK_R},${NECK_TOP-2}`, 2)}
        {/* Neck — bottom */}
        {archShadow(`M 19,${NECK_BOT+2} C 27,${NECK_BOT+6} 34,${NECK_BOT+4} ${NECK_L},${NECK_BOT+2}`, 3)}
        {archGold  (`M 19,${NECK_BOT+2} C 27,${NECK_BOT+6} 34,${NECK_BOT+4} ${NECK_L},${NECK_BOT+2}`, 2)}
        {archShadow(`M 91,${NECK_BOT+2} C 83,${NECK_BOT+6} 76,${NECK_BOT+4} ${NECK_R},${NECK_BOT+2}`, 3)}
        {archGold  (`M 91,${NECK_BOT+2} C 83,${NECK_BOT+6} 76,${NECK_BOT+4} ${NECK_R},${NECK_BOT+2}`, 2)}
        {/* Bottom of lower bulb */}
        {archShadow("M 19,222 C 26,228 33,230 41,230", 3.5)}
        {archGold  ("M 19,222 C 26,228 33,230 41,230", 2.5)}
        {archShadow("M 91,222 C 84,228 77,230 69,230", 3.5)}
        {archGold  ("M 91,222 C 84,228 77,230 69,230", 2.5)}

        {/* ══════════════ TOP BULB ══════════════ */}
        <path d={topBulbPath} fill={`url(#gl-${id})`} stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.5" />
        <path d="M41,126 C30,112 19,84 19,60 C23,68 24,96 37,118 Z"
              fill={`url(#sh-${id})`} clipPath={`url(#ct-${id})`} />

        {/* ══════════════ NECK ══════════════ */}
        <rect x={NECK_L-3} y={NECK_TOP} width={NECK_R-NECK_L+6} height={NECK_BOT-NECK_TOP} rx="3" fill="#0e0804" />
        <rect x={NECK_L-2} y={NECK_TOP} width={NECK_R-NECK_L+4} height={NECK_BOT-NECK_TOP} rx="2" fill={`url(#fr-${id})`} />
        {/* Neck centre band */}
        <rect x={NECK_L-4} y={135} width={NECK_R-NECK_L+8} height="8" rx="4" fill="#0e0804" />
        <rect x={NECK_L-3} y={135.5} width={NECK_R-NECK_L+6} height="7" rx="3.5" fill={`url(#fr-${id})`} />

        {/* ══════════════ BOTTOM BULB ══════════════ */}
        <path d={bottomBulbPath} fill={`url(#gl-${id})`} stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.5" />

        {/* Sand/gem fill */}
        {fillH > 0 && (
          <>
            <rect x="0" y={fillY} width="110" height={fillH+2}
                  clipPath={`url(#cb-${id})`} fill={`url(#sf-${id})`} className={styles.gemFill} />
            <rect x="0" y={BULB_B-24} width="110" height="26"
                  clipPath={`url(#cb-${id})`} fill={`url(#sg-${id})`} />
            {fill > 0.15 && <>
              <circle cx="38" cy={fillY+4}  r="1.5" fill="rgba(255,255,255,0.6)"  clipPath={`url(#cb-${id})`} />
              <circle cx="60" cy={fillY+10} r="1.1" fill="rgba(255,255,255,0.42)" clipPath={`url(#cb-${id})`} />
              <circle cx="30" cy={fillY+18} r="0.9" fill="rgba(255,255,255,0.3)"  clipPath={`url(#cb-${id})`} />
            </>}
          </>
        )}

        <path d="M41,148 C28,162 17,192 17,228 C21,214 24,182 36,162 Z"
              fill={`url(#sh-${id})`} clipPath={`url(#cb-${id})`} />

        {/* ══════════════ BOTTOM CAP BEAM ══════════════ */}
        <rect x="9"  y="230" width="92" height="8" rx="2"   fill="#0e0804" />
        <rect x="10" y="230" width="90" height="7" rx="1.5" fill={`url(#fr-${id})`} />

        {/* ══════════════ BASE ══════════════ */}
        {/* Transition apron — flares outward */}
        <path d="M 9,237 C 5,241 3,246 3,250 L 107,250 C 107,246 105,241 101,237 Z"
              fill="#0e0804" />
        <path d="M 10,237 C 6,241 4,246 4,250 L 106,250 C 106,246 104,241 100,237 Z"
              fill={`url(#fr-v-${id})`} />
        {/* Carved line on apron */}
        <path d="M 12,244 C 30,241 45,243 55,242 C 65,241 80,243 98,244"
              stroke="#e0b030" strokeWidth="0.8" fill="none" opacity="0.4" />

        {/* Wide platform */}
        <rect x="1"  y="249" width="108" height="13" rx="4"   fill="#0e0804" />
        <rect x="2"  y="250" width="106" height="11" rx="3.5" fill={`url(#fr-${id})`} />
        <rect x="2"  y="254" width="106" height="4"  rx="2"   fill="#0e0804" opacity="0.3" />

        {/* Lower skirt */}
        <path d="M 4,261 C 0,265 -1,273 5,277 L 105,277 C 111,273 110,265 106,261 Z"
              fill="#0e0804" />
        <path d="M 5,261 C 1,265 0,273 6,277 L 104,277 C 110,273 109,265 105,261 Z"
              fill={`url(#fr-v-${id})`} />
        {/* Carved decorative lines on skirt */}
        <path d="M 10,266 C 28,263 45,265 55,264 C 65,263 82,265 100,266"
              stroke="#e0b030" strokeWidth="0.9" fill="none" opacity="0.45" />
        <path d="M 12,270 C 30,267 46,269 55,268 C 64,267 80,269 98,270"
              stroke="#e0b030" strokeWidth="0.6" fill="none" opacity="0.28" />

        {/* ── Scroll feet ── */}
        {/* Left scroll */}
        {archShadow("M 6,277 C 0,279 -2,288 4,292 C 10,296 18,292 18,286 C 18,280 10,278 7,282", 4)}
        {archGold  ("M 6,277 C 0,279 -2,288 4,292 C 10,296 18,292 18,286 C 18,280 10,278 7,282", 2.5)}
        {/* Right scroll */}
        {archShadow("M 104,277 C 110,279 112,288 106,292 C 100,296 92,292 92,286 C 92,280 100,278 103,282", 4)}
        {archGold  ("M 104,277 C 110,279 112,288 106,292 C 100,296 92,292 92,286 C 92,280 100,278 103,282", 2.5)}
        {/* Centre arch foot */}
        {archShadow("M 28,279 C 37,285 45,288 55,288 C 65,288 73,285 82,279", 4)}
        {archGold  ("M 28,279 C 37,285 45,288 55,288 C 65,288 73,285 82,279", 2.5)}
        <circle cx="55" cy="288" r="5"   fill="#0e0804" />
        <circle cx="55" cy="288" r="3.8" fill={`url(#fr-${id})`} />
        {/* Ground rail */}
        <rect x="4"  y="293" width="102" height="4" rx="2" fill="#0e0804" />
        <rect x="5"  y="294" width="100" height="2" rx="1" fill={`url(#fr-${id})`} opacity="0.7" />

        {/* ══════════════ ANIMAL — rendered last so it sits on top of crown ══════════════ */}
        {Animal && <Animal />}
      </svg>

      {/* Rank below SVG */}
      <div className={styles.rank} style={{ background: `url(#fr-${id})` }}>
        <svg width="28" height="28" viewBox="0 0 28 28">
          <defs>
            <linearGradient id={`rb-${id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"  stopColor="#d49828" />
              <stop offset="100%" stopColor="#7a4e12" />
            </linearGradient>
          </defs>
          <circle cx="14" cy="14" r="13"  fill="#0e0804" />
          <circle cx="14" cy="14" r="11"  fill={`url(#rb-${id})`} />
          <circle cx="14" cy="14" r="9.5" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="0.8" />
          <text x="14" y="18.5" textAnchor="middle" fontSize="11" fontWeight="800"
                fontFamily="Georgia, serif" fill="#0e0804">{standing.rank}</text>
        </svg>
      </div>

      <div className={styles.label} style={{ color: h.label }}>{team.name}</div>
      <div className={styles.points}>{standing.pointsFor} pts</div>
    </div>
  );
}

// ── Missing constant fix ─────────────────────────────────────────────────────
const BULB_BOT_TOP = NECK_BOT;

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
        <Hourglass key={s.teamId} standing={s}
          fill={0.15 + 0.80 * (s.pointsFor - min) / range} />
      ))}
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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

// ── House animal toppers — antique cast bronze, same palette as the frame ────
// Key: NO house colors. Everything uses the B bronze palette so they look like
// cast metal sculptures, not cartoons. Light source upper-left.

function Lion() {
  return (
    <g>
      <defs>
        <radialGradient id="lmane" cx="38%" cy="32%" r="65%">
          <stop offset="0%"  stopColor={B.mid}    />
          <stop offset="55%" stopColor={B.dark}   />
          <stop offset="100%" stopColor={B.shadow} />
        </radialGradient>
        <radialGradient id="lface" cx="35%" cy="28%" r="60%">
          <stop offset="0%"  stopColor={B.light} />
          <stop offset="50%" stopColor={B.mid}   />
          <stop offset="100%" stopColor={B.dark}  />
        </radialGradient>
      </defs>
      {/* mane — solid dark bronze ring, organic bumpy edge */}
      <circle cx="55" cy="19" r="18" fill="url(#lmane)" />
      {/* bumpy mane edge — overlapping arcs that look like tufts of fur, NOT rays */}
      {Array.from({length:9},(_,i)=>{
        const a = (i * 40 - 70) * Math.PI / 180;
        const mx = 55 + 15 * Math.cos(a);
        const my = 19 + 15 * Math.sin(a);
        return <ellipse key={i} cx={mx} cy={my} rx="4.5" ry="3.5"
          transform={`rotate(${i*40-70} ${mx} ${my})`}
          fill={B.base} opacity="0.75" />;
      })}
      {/* curved fur lines — following the mane shape, not radiating out */}
      <path d="M42,7  C46,5  50,6  52,9"  stroke={B.light} strokeWidth="1.2" fill="none" opacity="0.4" />
      <path d="M52,6  C55,4  58,5  60,8"  stroke={B.light} strokeWidth="1.2" fill="none" opacity="0.4" />
      <path d="M60,7  C63,6  66,8  67,11" stroke={B.light} strokeWidth="1.2" fill="none" opacity="0.4" />
      <path d="M68,13 C70,15 70,18 68,21" stroke={B.light} strokeWidth="1.2" fill="none" opacity="0.35" />
      <path d="M42,31 C40,28 40,25 42,22" stroke={B.light} strokeWidth="1.2" fill="none" opacity="0.35" />
      {/* face — forward, catches full light */}
      <circle cx="55" cy="18" r="11" fill="url(#lface)" />
      {/* brow ridge */}
      <path d="M46,14 C49,11 52,11 55,12 C58,11 61,11 64,14"
            stroke={B.shadow} strokeWidth="2.2" fill="none" />
      {/* eye hollows */}
      <ellipse cx="50" cy="17.5" rx="3" ry="2.5" fill={B.shadow} opacity="0.8" />
      <ellipse cx="60" cy="17.5" rx="3" ry="2.5" fill={B.shadow} opacity="0.8" />
      {/* muzzle */}
      <ellipse cx="55" cy="23" rx="5.5" ry="4" fill={B.dark} opacity="0.65" />
      <path d="M52.5,21.5 L57.5,21.5 L55,25.5 Z" fill={B.shadow} />
      {/* specular on forehead */}
      <ellipse cx="51" cy="11" rx="4" ry="2.5" fill={B.light} opacity="0.42" />
    </g>
  );
}

function Eagle() {
  return (
    <g>
      <defs>
        <radialGradient id="ewing" cx="40%" cy="35%" r="65%">
          <stop offset="0%"  stopColor={B.mid}    />
          <stop offset="60%" stopColor={B.dark}   />
          <stop offset="100%" stopColor={B.shadow} />
        </radialGradient>
        <radialGradient id="ehead" cx="35%" cy="28%" r="58%">
          <stop offset="0%"  stopColor={B.light}  />
          <stop offset="55%" stopColor={B.mid}    />
          <stop offset="100%" stopColor={B.dark}   />
        </radialGradient>
      </defs>
      {/* left wing — sweeping back */}
      <path d="M55,17 C48,10 34,4 14,7 C8,9 7,14 11,16 C20,13 37,12 47,18 Z"
            fill={B.shadow} />
      <path d="M55,17 C48,10 34,4 14,7 C8,9 7,14 11,16 C20,13 37,12 47,18 Z"
            fill="url(#ewing)" opacity="0.9" />
      {/* wing feather ridge lines */}
      <path d="M50,14 C38,10 24,7 10,9"  stroke={B.light} strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M48,17 C36,14 24,11 12,13" stroke={B.light} strokeWidth="0.7" fill="none" opacity="0.25" />
      {/* right wing */}
      <path d="M55,17 C62,10 76,4 96,7 C102,9 103,14 99,16 C90,13 73,12 63,18 Z"
            fill={B.shadow} />
      <path d="M55,17 C62,10 76,4 96,7 C102,9 103,14 99,16 C90,13 73,12 63,18 Z"
            fill="url(#ewing)" opacity="0.9" />
      <path d="M60,14 C72,10 86,7 100,9"  stroke={B.light} strokeWidth="1" fill="none" opacity="0.4" />
      {/* body */}
      <ellipse cx="55" cy="24" rx="8" ry="11" fill={B.dark} />
      <ellipse cx="55" cy="22" rx="6" ry="9"  fill="url(#ehead)" opacity="0.85" />
      {/* tail */}
      <path d="M50,35 L55,32 L60,35 L57,39 L53,39 Z" fill={B.dark} />
      {/* neck + head */}
      <ellipse cx="55" cy="9" rx="6" ry="8"  fill={B.dark} />
      <circle  cx="55" cy="5" r="7"           fill="url(#ehead)" />
      {/* polished highlight on crown */}
      <ellipse cx="51" cy="2" rx="4" ry="2.2" fill={B.light} opacity="0.38" />
      {/* beak — cast bronze, same tones */}
      <path d="M55,2 L67,5 L62,11 L56,9 Z" fill={B.base}   />
      <path d="M62,11 L67,7 L67,5"          fill={B.dark}   />
      <path d="M56,3 L65,6"                  stroke={B.light} strokeWidth="0.7" opacity="0.5" fill="none" />
      {/* eye hollow */}
      <circle cx="50" cy="5" r="2.8" fill={B.shadow} />
      <ellipse cx="49.5" cy="4.5" rx="1.2" ry="1" fill={B.base} opacity="0.5" />
    </g>
  );
}

function Badger() {
  return (
    <g>
      <defs>
        <radialGradient id="bhead" cx="38%" cy="28%" r="65%">
          <stop offset="0%"  stopColor={B.light}  />
          <stop offset="45%" stopColor={B.mid}    />
          <stop offset="100%" stopColor={B.shadow} />
        </radialGradient>
      </defs>
      {/* body */}
      <path d="M30,32 C26,28 26,22 32,18 L78,18 C84,22 84,28 80,32 Z" fill={B.shadow} />
      {/* head — wide bronze oval, full B palette */}
      <ellipse cx="55" cy="13" rx="26" ry="18" fill="url(#bhead)" />
      {/* dark flanks — deep shadow zones (the "stripe" in bronze) */}
      <ellipse cx="33" cy="11" rx="13" ry="16" fill={B.shadow} opacity="0.9" />
      <ellipse cx="77" cy="11" rx="13" ry="16" fill={B.shadow} opacity="0.9" />
      {/* bright centre ridge — polished bronze catching the light */}
      <path d="M46,-2 C49,-5 61,-5 64,-2 C68,3 68,16 65,21 C62,25 59,27 55,27 C51,27 48,25 45,21 C42,16 42,3 46,-2 Z"
            fill={B.mid} />
      {/* crown specular — brightest point */}
      <ellipse cx="52" cy="3" rx="5" ry="3" fill={B.light} opacity="0.6" />
      {/* eye hollows in shadow flanks */}
      <circle cx="33" cy="14" r="5"   fill={B.shadow} />
      <circle cx="33" cy="14" r="3.2" fill={B.dark}   />
      <ellipse cx="32" cy="12.5" rx="1.5" ry="1" fill={B.mid} opacity="0.6" />
      <circle cx="77" cy="14" r="5"   fill={B.shadow} />
      <circle cx="77" cy="14" r="3.2" fill={B.dark}   />
      <ellipse cx="76" cy="12.5" rx="1.5" ry="1" fill={B.mid} opacity="0.6" />
      {/* snout */}
      <ellipse cx="55" cy="21" rx="9"   ry="7"   fill={B.dark}   />
      <ellipse cx="55" cy="21" rx="7"   ry="5.5" fill={B.base}   opacity="0.85" />
      <ellipse cx="55" cy="24" rx="4.5" ry="3"   fill={B.shadow} />
    </g>
  );
}

function Snake() {
  return (
    <g>
      <defs>
        <linearGradient id="sbody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"  stopColor={B.light}  />
          <stop offset="50%" stopColor={B.base}   />
          <stop offset="100%" stopColor={B.shadow} />
        </linearGradient>
        <radialGradient id="shead" cx="35%" cy="28%" r="60%">
          <stop offset="0%"  stopColor={B.light}  />
          <stop offset="50%" stopColor={B.mid}    />
          <stop offset="100%" stopColor={B.shadow} />
        </radialGradient>
      </defs>
      {/* body coil — shadow pass */}
      <path d="M42,30 C24,26 19,13 30,5 C41,-3 61,0 64,11 C67,19 57,26 49,20"
            stroke={B.shadow} strokeWidth="13" fill="none" strokeLinecap="round" />
      {/* body — bronze */}
      <path d="M42,30 C24,26 19,13 30,5 C41,-3 61,0 64,11 C67,19 57,26 49,20"
            stroke="url(#sbody)" strokeWidth="9" fill="none" strokeLinecap="round" />
      {/* body highlight ridge */}
      <path d="M42,30 C24,26 19,13 30,5 C41,-3 61,0 64,11 C67,19 57,26 49,20"
            stroke={B.light} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.35" />
      {/* head */}
      <path d="M45,20 C40,13 41,6 46,3 C51,0 58,2 62,7 C66,12 64,19 59,21 C54,23 48,23 45,20 Z"
            fill={B.shadow} />
      <path d="M46,20 C41,13 42,7 47,4 C52,1 57,3 61,8 C64,12 62,18 58,20 C54,22 49,22 46,20 Z"
            fill="url(#shead)" />
      {/* head specular */}
      <ellipse cx="52" cy="9" rx="6" ry="3" fill={B.light} opacity="0.32" />
      {/* scale detail lines */}
      <path d="M43,16 C48,14 55,14 61,17" stroke={B.dark} strokeWidth="1.2" fill="none" opacity="0.6" />
      <path d="M42,20 C47,18 55,18 62,21" stroke={B.dark} strokeWidth="1.2" fill="none" opacity="0.4" />
      {/* eye hollow */}
      <ellipse cx="48" cy="11" rx="3"   ry="3.5" fill={B.shadow} />
      <ellipse cx="48" cy="11" rx="1.2" ry="3.2" fill={B.dark}   />
      <ellipse cx="47.2" cy="9.5" rx="1" ry="0.7" fill={B.light} opacity="0.45" />
      {/* tongue */}
      <path d="M61,13 L70,9 M70,9 L74,7 M70,9 L74,11"
            stroke={B.mid} strokeWidth="1.5" fill="none" strokeLinecap="round" />
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
function Hourglass({ standing, fill, animate }: { standing: TeamStanding; fill: number; animate: boolean }) {
  const team = TEAM_MAP[standing.teamId];
  const h    = HOUSE[standing.teamId];
  if (!team || !h) return null;

  const id         = standing.teamId;
  const fillH      = (BULB_B    - BULB_BOT_TOP) * fill;
  const fillY      = BULB_B    - fillH;
  const upperFill  = 1 - fill;
  const upperFillH = (NECK_TOP  - BULB_T)       * upperFill;
  const upperFillY = NECK_TOP   - upperFillH;
  const Animal     = ANIMALS[id];

  // Helpers — shadow stroke + gold stroke layered for depth
  const archShadow = (d: string, w: number) =>
    <path d={d} stroke="#0e0804" strokeWidth={w+2} fill="none" strokeLinecap="round" />;
  const archGold   = (d: string, w: number, opacity = 1) =>
    <path d={d} stroke={`url(#fr-${id})`} strokeWidth={w} fill="none" strokeLinecap="round" opacity={opacity} />;

  return (
    <Link href={`/teams/${id}`} className={styles.hourglassWrap} style={{ textDecoration: 'none' }}>
      <svg width="90" height="252" viewBox="0 0 110 308" fill="none"
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

        {/* Sand remaining in top — piled at the neck, drains as points are earned */}
        {upperFillH > 0 && (
          <>
            <rect x="0" y={upperFillY} width="110" height={upperFillH + 2}
                  clipPath={`url(#ct-${id})`} fill={`url(#sf-${id})`} className={styles.gemFill} />
            {upperFill > 0.15 && <>
              <circle cx="72" cy={upperFillY + 4}  r="1.5" fill="rgba(255,255,255,0.6)"  clipPath={`url(#ct-${id})`} />
              <circle cx="50" cy={upperFillY + 10} r="1.1" fill="rgba(255,255,255,0.42)" clipPath={`url(#ct-${id})`} />
              <circle cx="80" cy={upperFillY + 18} r="0.9" fill="rgba(255,255,255,0.3)"  clipPath={`url(#ct-${id})`} />
            </>}
          </>
        )}

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

        {/* ══════════════ FALLING SAND ANIMATION ══════════════ */}
        {animate && Array.from({ length: 9 }, (_, i) => (
          <circle
            key={i}
            cx={55 + ((i % 5) - 2) * 3}
            cy={NECK_BOT}
            r={1.4 + (i % 3) * 0.6}
            fill={h.sand}
            clipPath={`url(#cb-${id})`}
            className={styles.sandParticle}
            style={{
              '--dx': `${((i % 3) - 1) * 7}px`,
              animationDelay: `${i * 130}ms`,
            } as React.CSSProperties}
          />
        ))}

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
    </Link>
  );
}

// ── Missing constant fix ─────────────────────────────────────────────────────
const BULB_BOT_TOP = NECK_BOT;

// ── Container ────────────────────────────────────────────────────────────────
export default function HouseHourglasses({ standings }: { standings: TeamStanding[] }) {
  const sorted  = [...standings].sort((a, b) => a.rank - b.rank);
  const diffs   = sorted.map(s => s.pointsDiff);
  const min     = Math.min(...diffs);
  const max     = Math.max(...diffs);
  const range   = max - min || 1;
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('sand-animated-2')) {
      sessionStorage.setItem('sand-animated-2', '1');
      setAnimate(true);
      const t = setTimeout(() => setAnimate(false), 2800);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div className={styles.container}>
      {sorted.map(s => (
        <Hourglass key={s.teamId} standing={s}
          fill={0.05 + 0.90 * (s.pointsDiff - min) / range}
          animate={animate} />
      ))}
    </div>
  );
}

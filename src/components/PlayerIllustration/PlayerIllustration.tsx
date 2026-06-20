'use client';

import { Position } from '@/data/types';

interface Props {
  position: Position;
  primary: string;
  secondary: string;
  num: number;
  gender: 'male' | 'female';
  hairColor: string;
  uid: string;
}

// Silhouette color — clean white figure on team background
const SIL = 'rgba(255,255,255,0.92)';
const BROOM_WOOD = '#C4A035';
const BROOM_STRAW = '#E8C040';

// ─── Shared broom ─────────────────────────────────────────────────────────
// Handle runs (205,148) → (32,255). Rider sits at ~(145,192).
function Broom() {
  return (
    <g>
      <line x1={205} y1={148} x2={32} y2={255}
        stroke={BROOM_WOOD} strokeWidth={5.5} strokeLinecap="round" />
      {/* Bristle bundle */}
      {[[-8, 5], [-4, 8], [0, 10], [4, 8], [8, 5], [12, 2], [16, -2]].map(([dx, dy], i) => (
        <line key={i}
          x1={32 + dx * 0.2} y1={255 + dy * 0.2}
          x2={15 + dx * 1.5} y2={270 + dy * 1.2}
          stroke={BROOM_STRAW} strokeWidth={2.5} strokeLinecap="round" />
      ))}
    </g>
  );
}

// ─── Quaffle ──────────────────────────────────────────────────────────────
function Quaffle({ cx, cy, r = 14 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#D94400" />
      <circle cx={cx} cy={cy} r={r * 0.85} fill="#E85010" />
      {/* Seam lines */}
      <path d={`M${cx - r},${cy} Q${cx},${cy - r * 0.8} ${cx + r},${cy}`}
        stroke="#8B2200" strokeWidth={1.5} fill="none" opacity={0.6} />
      <path d={`M${cx - r},${cy} Q${cx},${cy + r * 0.8} ${cx + r},${cy}`}
        stroke="#8B2200" strokeWidth={1.5} fill="none" opacity={0.6} />
      <ellipse cx={cx - r * 0.12} cy={cy - r * 0.25} rx={r * 0.2} ry={r * 0.12}
        fill="rgba(255,255,255,0.25)" />
    </g>
  );
}

// ─── Bat ──────────────────────────────────────────────────────────────────
function Bat() {
  // Handle tip at (170,155), barrel pointing up-right to (185,100)
  return (
    <g>
      {/* Handle */}
      <line x1={168} y1={155} x2={178} y2={118} stroke="#8B6030" strokeWidth={8} strokeLinecap="round" />
      {/* Barrel */}
      <path d="M 173,118 Q 184,100 190,96 Q 196,92 198,100 Q 200,110 190,120 Q 182,128 173,118 Z"
        fill="#A07840" />
      <line x1={183} y1={100} x2={188} y2={108} stroke="rgba(255,255,255,0.15)" strokeWidth={2} />
    </g>
  );
}

// ─── Bludger ──────────────────────────────────────────────────────────────
function Bludger({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={11} fill="#1a1a1a" />
      <circle cx={cx} cy={cy} r={9} fill="#242424" />
      <ellipse cx={cx - 3} cy={cy - 3} rx={3} ry={2} fill="rgba(255,255,255,0.18)" />
    </g>
  );
}

// ─── Snitch ───────────────────────────────────────────────────────────────
function Snitch({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      {/* Wings */}
      <path d={`M${cx - 8},${cy - 2} Q${cx - 24},${cy - 18} ${cx - 30},${cy - 8} Q${cx - 22},${cy + 2} ${cx - 8},${cy - 2}`}
        fill="rgba(255,255,255,0.72)" />
      <path d={`M${cx + 8},${cy - 2} Q${cx + 24},${cy - 18} ${cx + 30},${cy - 8} Q${cx + 22},${cy + 2} ${cx + 8},${cy - 2}`}
        fill="rgba(255,255,255,0.72)" />
      {/* Wing vein lines */}
      <line x1={cx - 8} y1={cy - 2} x2={cx - 28} y2={cy - 9} stroke="rgba(180,160,0,0.5)" strokeWidth={1} />
      <line x1={cx + 8} y1={cy - 2} x2={cx + 28} y2={cy - 9} stroke="rgba(180,160,0,0.5)" strokeWidth={1} />
      {/* Body */}
      <circle cx={cx} cy={cy} r={9} fill="#FFD700" />
      <circle cx={cx} cy={cy} r={7} fill="#FFC107" />
      <ellipse cx={cx - 2} cy={cy - 2} rx={2.5} ry={1.8} fill="rgba(255,255,255,0.55)" />
    </g>
  );
}

// ─── Keeper (front-facing, arms spread) ──────────────────────────────────
function KeeperFigure({ primary }: { primary: string }) {
  const cx = 120, cy = 92;
  return (
    <g>
      {/* Goal hoops — subtle behind figure */}
      <ellipse cx={35} cy={175} rx={20} ry={30} fill="none"
        stroke="rgba(255,255,255,0.15)" strokeWidth={5} />
      <ellipse cx={120} cy={155} rx={26} ry={38} fill="none"
        stroke="rgba(255,255,255,0.18)" strokeWidth={6} />
      <ellipse cx={205} cy={175} rx={20} ry={30} fill="none"
        stroke="rgba(255,255,255,0.15)" strokeWidth={5} />
      <line x1={35} y1={205} x2={35} y2={275} stroke="rgba(255,255,255,0.1)" strokeWidth={4} />
      <line x1={120} y1={193} x2={120} y2={275} stroke="rgba(255,255,255,0.12)" strokeWidth={4} />
      <line x1={205} y1={205} x2={205} y2={275} stroke="rgba(255,255,255,0.1)" strokeWidth={4} />

      {/* HEAD */}
      <circle cx={cx} cy={cy} r={22} fill={SIL} />

      {/* NECK */}
      <rect x={113} y={112} width={14} height={15} rx={5} fill={SIL} />

      {/* TORSO */}
      <path d="M 96,126 L 144,126 L 146,198 L 94,198 Z" fill={SIL} />

      {/* LEFT ARM — spread wide */}
      <path d="M 96,140 Q 64,150 30,158" stroke={SIL} strokeWidth={14} strokeLinecap="round" fill="none" />
      {/* Left glove */}
      <ellipse cx={25} cy={160} rx={13} ry={9} fill={SIL} />

      {/* RIGHT ARM — spread wide */}
      <path d="M 144,140 Q 176,150 210,158" stroke={SIL} strokeWidth={14} strokeLinecap="round" fill="none" />
      {/* Right glove */}
      <ellipse cx={215} cy={160} rx={13} ry={9} fill={SIL} />

      {/* LEFT LEG */}
      <path d="M 106,197 Q 100,232 96,262" stroke={SIL} strokeWidth={15} strokeLinecap="round" fill="none" />
      {/* Left foot */}
      <path d="M 96,262 Q 92,272 80,274 Q 68,272 66,262"
        stroke={SIL} strokeWidth={12} strokeLinecap="round" fill="none" />

      {/* RIGHT LEG */}
      <path d="M 134,197 Q 140,232 144,262" stroke={SIL} strokeWidth={15} strokeLinecap="round" fill="none" />
      {/* Right foot */}
      <path d="M 144,262 Q 148,272 160,274 Q 172,272 174,262"
        stroke={SIL} strokeWidth={12} strokeLinecap="round" fill="none" />
    </g>
  );
}

// ─── Flying figure base ───────────────────────────────────────────────────
// Side profile, facing right. Head at (152,108). Rider center ~(142,192) on broom.
function FlyingBase({ forwardArm }: { forwardArm: React.ReactNode }) {
  return (
    <g>
      <Broom />

      {/* HEAD */}
      <circle cx={152} cy={108} r={18} fill={SIL} />

      {/* NECK */}
      <rect x={145} y={124} width={12} height={12} rx={4} fill={SIL} />

      {/* TORSO — leaning slightly forward */}
      <path d="M 136,135 L 162,133 L 160,188 L 132,190 Z" fill={SIL} />

      {/* TRAILING ARM (left, back) */}
      <path d="M 136,150 Q 120,152 108,156"
        stroke={SIL} strokeWidth={12} strokeLinecap="round" fill="none" />

      {/* FORWARD ARM — position-specific */}
      {forwardArm}

      {/* FORWARD LEG (right, front of broom) */}
      <path d="M 150,188 Q 156,215 152,245"
        stroke={SIL} strokeWidth={13} strokeLinecap="round" fill="none" />
      {/* Forward foot */}
      <path d="M 152,245 Q 152,258 140,260 Q 128,258 126,248"
        stroke={SIL} strokeWidth={11} strokeLinecap="round" fill="none" />

      {/* TRAILING LEG (left, behind broom) */}
      <path d="M 138,188 Q 128,212 122,240"
        stroke={SIL} strokeWidth={12} strokeLinecap="round" fill="none" />
      {/* Trailing foot */}
      <path d="M 122,240 Q 120,252 108,254 Q 97,252 96,242"
        stroke={SIL} strokeWidth={10} strokeLinecap="round" fill="none" />
    </g>
  );
}

function ChaserFigure() {
  return (
    <FlyingBase forwardArm={
      <g>
        {/* Upper arm forward */}
        <path d="M 162,148 Q 178,148 188,152"
          stroke={SIL} strokeWidth={12} strokeLinecap="round" fill="none" />
        {/* Lower arm cradles quaffle */}
        <path d="M 188,152 Q 196,156 200,162"
          stroke={SIL} strokeWidth={10} strokeLinecap="round" fill="none" />
        <Quaffle cx={208} cy={165} r={15} />
      </g>
    } />
  );
}

function BeaterFigure() {
  return (
    <FlyingBase forwardArm={
      <g>
        {/* Arm raised to swing */}
        <path d="M 162,146 Q 170,135 170,122"
          stroke={SIL} strokeWidth={12} strokeLinecap="round" fill="none" />
        <Bat />
        <Bludger cx={208} cy={120} />
      </g>
    } />
  );
}

function SeekerFigure({ secondary }: { secondary: string }) {
  return (
    <FlyingBase forwardArm={
      <g>
        {/* Arm fully outstretched reaching */}
        <path d="M 162,148 Q 180,146 196,144"
          stroke={SIL} strokeWidth={12} strokeLinecap="round" fill="none" />
        {/* Glove */}
        <ellipse cx={200} cy={143} rx={10} ry={7} fill={SIL} />
        <Snitch cx={222} cy={130} />
      </g>
    } />
  );
}

// ─── Main export ──────────────────────────────────────────────────────────
export default function PlayerIllustration({ position, primary, secondary, num, uid }: Props) {
  const gId = `g${uid}`;
  const sId = `s${uid}`;
  const cId = `c${uid}`;

  // Darken the primary color slightly for gradient bottom
  return (
    <svg viewBox="0 0 240 300" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', display: 'block' }} aria-hidden="true">
      <defs>
        <linearGradient id={gId} x1="0" y1="0" x2="0.1" y2="1">
          <stop offset="0%" stopColor={primary} stopOpacity="0.95" />
          <stop offset="100%" stopColor={primary} stopOpacity="0.75" />
        </linearGradient>
        <radialGradient id={sId} cx="50%" cy="30%" r="65%">
          <stop offset="0%" stopColor={secondary} stopOpacity="0.22" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <clipPath id={cId}><rect width="240" height="300" /></clipPath>
      </defs>

      <g clipPath={`url(#${cId})`}>
        {/* Background */}
        <rect width="240" height="300" fill={`url(#${gId})`} />
        <rect width="240" height="300" fill={`url(#${sId})`} />

        {/* Subtle diagonal light rays */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={i}
            x1={-40 + i * 55} y1="305" x2={75 + i * 55} y2="-8"
            stroke="rgba(255,255,255,0.028)" strokeWidth="22" />
        ))}

        {/* Jersey number — large, ghosted behind the figure */}
        <text x="120" y="210" textAnchor="middle"
          fill="rgba(255,255,255,0.07)"
          fontWeight="900" fontSize="180" fontFamily="Georgia, serif"
          dominantBaseline="auto">
          {num}
        </text>

        {/* Player illustration */}
        {position === 'Keeper' && <KeeperFigure primary={primary} />}
        {position === 'Chaser' && <ChaserFigure />}
        {position === 'Beater' && <BeaterFigure />}
        {position === 'Seeker' && <SeekerFigure secondary={secondary} />}

        {/* Bottom accent bar */}
        <rect x="0" y="270" width="240" height="30"
          fill="rgba(0,0,0,0.25)" />
        <text x="120" y="291" textAnchor="middle"
          fill="rgba(255,255,255,0.6)"
          fontWeight="700" fontSize="11" fontFamily="system-ui, sans-serif"
          letterSpacing="3">
          {position.toUpperCase()} · #{num}
        </text>
      </g>
    </svg>
  );
}

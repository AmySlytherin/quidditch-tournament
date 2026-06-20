'use client';

import { Position } from '@/data/types';

interface FigProps {
  primary: string;
  secondary: string;
  num: number;
  gender: 'male' | 'female';
  hairColor: string;
}

interface Props extends FigProps {
  position: Position;
  uid: string;
}

const SKIN = '#c8855a';
const BOOT = '#1a1a1a';
const WOOD = '#9B7B3A';
const STRAW = '#C4A035';

// ─── Hair helpers ─────────────────────────────────────────────────────────
// Front-facing (Keeper). hx/hy = head center.
function FrontHair({ cx, cy, gender, hairColor }: { cx: number; cy: number; gender: 'male' | 'female'; hairColor: string }) {
  if (gender === 'female') {
    return (
      <>
        <ellipse cx={cx} cy={cy - 18} rx={30} ry={20} fill={hairColor} />
        <path d={`M${cx - 28},${cy - 5} Q${cx - 36},${cy + 28} ${cx - 29},${cy + 50}`}
          stroke={hairColor} strokeWidth={13} fill="none" strokeLinecap="round" />
        <path d={`M${cx + 28},${cy - 5} Q${cx + 36},${cy + 28} ${cx + 29},${cy + 50}`}
          stroke={hairColor} strokeWidth={13} fill="none" strokeLinecap="round" />
      </>
    );
  }
  // Male: hair covers top of head, clear hairline above forehead, no side curtains
  return (
    <>
      <ellipse cx={cx} cy={cy - 20} rx={30} ry={18} fill={hairColor} />
      {/* Hairline — cuts the bottom of the ellipse into a clean masculine line */}
      <rect x={cx - 32} y={cy - 5} width={64} height={14} fill={hairColor} opacity={0} />
    </>
  );
}

// Side-facing (flying positions). Figure faces RIGHT. Head center at hx, hy.
function SideHair({ cx, cy, gender, hairColor }: { cx: number; cy: number; gender: 'male' | 'female'; hairColor: string }) {
  if (gender === 'female') {
    return (
      <>
        {/* Top of head */}
        <ellipse cx={cx} cy={cy - 16} rx={23} ry={18} fill={hairColor} />
        {/* Flowing tail behind (to the left for right-facing figure) */}
        <path d={`M${cx - 20},${cy - 5} Q${cx - 34},${cy + 20} ${cx - 26},${cy + 48}`}
          stroke={hairColor} strokeWidth={14} fill="none" strokeLinecap="round" />
      </>
    );
  }

  // Male: short hair. Head faces right (+x), so forehead is to the right.
  // Hairline visible at about x = cx+12. Hair covers top and back of head only.
  return (
    <path
      d={`
        M ${cx + 12},${cy - 14}
        Q ${cx + 8},${cy - 38}
          ${cx - 4},${cy - 40}
        Q ${cx - 18},${cy - 37}
          ${cx - 23},${cy - 22}
        Q ${cx - 26},${cy - 8}
          ${cx - 22},${cy + 4}
      `}
      fill={hairColor}
    />
  );
}

// ─── Props ────────────────────────────────────────────────────────────────
function Quaffle({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={16} fill="#C43B00" />
      <circle cx={cx} cy={cy} r={14} fill="#D94400" />
      <path d={`M${cx - 14},${cy} Q${cx},${cy - 12} ${cx + 14},${cy}`} stroke="#8B2200" strokeWidth={1.5} fill="none" opacity={0.7} />
      <path d={`M${cx - 14},${cy} Q${cx},${cy + 12} ${cx + 14},${cy}`} stroke="#8B2200" strokeWidth={1.5} fill="none" opacity={0.7} />
      <path d={`M${cx},${cy - 14} Q${cx + 10},${cy} ${cx},${cy + 14}`} stroke="#8B2200" strokeWidth={1.5} fill="none" opacity={0.5} />
    </g>
  );
}

function Bat({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={WOOD} strokeWidth={9} strokeLinecap="round" />
      <ellipse cx={x2} cy={y2} rx={10} ry={13} fill="#8B6030"
        transform={`rotate(${angle + 90} ${x2} ${y2})`} />
    </g>
  );
}

function Snitch({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <path d={`M${cx - 9},${cy} Q${cx - 22},${cy - 14} ${cx - 28},${cy - 4} Q${cx - 20},${cy + 2} ${cx - 9},${cy}`} fill="rgba(255,255,255,0.75)" />
      <path d={`M${cx + 9},${cy} Q${cx + 22},${cy - 14} ${cx + 28},${cy - 4} Q${cx + 20},${cy + 2} ${cx + 9},${cy}`} fill="rgba(255,255,255,0.75)" />
      <circle cx={cx} cy={cy} r={9} fill="#FFD700" />
      <circle cx={cx} cy={cy} r={7} fill="#FFC000" />
      <ellipse cx={cx - 2} cy={cy - 2} rx={2.5} ry={1.5} fill="rgba(255,255,255,0.6)" />
    </g>
  );
}

function Broom() {
  return (
    <g>
      <line x1={205} y1={150} x2={38} y2={262} stroke={WOOD} strokeWidth={6} strokeLinecap="round" />
      {[[-9, 6], [-5, 9], [0, 11], [5, 9], [9, 6], [13, 2], [17, -2]].map(([dx, dy], i) => (
        <line key={i}
          x1={38 + dx * 0.25} y1={262 + dy * 0.25}
          x2={20 + dx * 1.4} y2={278 + dy * 1.0}
          stroke={STRAW} strokeWidth={2.5} strokeLinecap="round"
        />
      ))}
    </g>
  );
}

// ─── Keeper (front-facing) ────────────────────────────────────────────────
function KeeperFigure({ primary, secondary, num, gender, hairColor }: FigProps) {
  const cx = 120, cy = 100;
  return (
    <g>
      {/* Hoops */}
      <ellipse cx={38} cy={180} rx={21} ry={32} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={5} />
      <ellipse cx={120} cy={158} rx={27} ry={40} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth={6} />
      <ellipse cx={202} cy={180} rx={21} ry={32} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={5} />
      <line x1={38} y1={212} x2={38} y2={285} stroke="rgba(255,255,255,0.12)" strokeWidth={4} />
      <line x1={120} y1={198} x2={120} y2={285} stroke="rgba(255,255,255,0.14)" strokeWidth={4} />
      <line x1={202} y1={212} x2={202} y2={285} stroke="rgba(255,255,255,0.12)" strokeWidth={4} />
      {/* Robe */}
      <path d="M84,222 Q74,254 72,292 L168,292 Q166,254 156,222 Z" fill={primary} opacity={0.8} />
      {/* Jersey */}
      <path d="M80,135 Q120,124 160,135 L163,226 Q120,232 77,226 Z" fill={primary} />
      <path d="M80,135 Q120,124 160,135 L156,152 Q120,143 84,152 Z" fill={secondary} opacity={0.9} />
      <text x={120} y={206} textAnchor="middle" fill="rgba(255,255,255,0.95)"
        fontWeight="900" fontSize={34} fontFamily="Georgia, serif">{num}</text>
      {/* Arms */}
      <path d="M80,155 Q52,162 24,170" stroke={SKIN} strokeWidth={16} strokeLinecap="round" fill="none" />
      <ellipse cx={20} cy={171} rx={15} ry={11} fill={secondary} transform="rotate(-15 20 171)" />
      <path d="M160,155 Q188,162 216,170" stroke={SKIN} strokeWidth={16} strokeLinecap="round" fill="none" />
      <ellipse cx={220} cy={171} rx={15} ry={11} fill={secondary} transform="rotate(15 220 171)" />
      {/* Legs */}
      <rect x={93} y={224} width={22} height={60} rx={9} fill={secondary} />
      <rect x={125} y={224} width={22} height={60} rx={9} fill={secondary} />
      <ellipse cx={104} cy={289} rx={19} ry={10} fill={BOOT} />
      <ellipse cx={136} cy={289} rx={19} ry={10} fill={BOOT} />
      {/* Neck */}
      <rect x={113} y={129} width={14} height={16} rx={5} fill={SKIN} />
      {/* Head */}
      <ellipse cx={cx} cy={cy} rx={30} ry={33} fill={SKIN} />
      <FrontHair cx={cx} cy={cy} gender={gender} hairColor={hairColor} />
      {/* Eyes */}
      <ellipse cx={cx - 10} cy={cy} rx={5} ry={4.5} fill="rgba(255,255,255,0.9)" />
      <ellipse cx={cx + 10} cy={cy} rx={5} ry={4.5} fill="rgba(255,255,255,0.9)" />
      <ellipse cx={cx - 9.5} cy={cy} rx={3} ry={3} fill="rgba(0,0,0,0.75)" />
      <ellipse cx={cx + 10.5} cy={cy} rx={3} ry={3} fill="rgba(0,0,0,0.75)" />
      <path d={`M${cx - 3},${cy + 8} Q${cx},${cy + 15} ${cx + 3},${cy + 8}`}
        stroke="rgba(0,0,0,0.22)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <path d={`M${cx - 8},${cy + 20} Q${cx},${cy + 27} ${cx + 8},${cy + 20}`}
        stroke="rgba(0,0,0,0.38)" strokeWidth={2} fill="none" strokeLinecap="round" />
    </g>
  );
}

// ─── Shared flying base ───────────────────────────────────────────────────
function FlyingBase({ primary, secondary, num, gender, hairColor, forwardArm }: FigProps & { forwardArm: React.ReactNode }) {
  const hx = 152, hy = 147;
  return (
    <g>
      <Broom />
      {/* Robe flowing behind */}
      <path d="M112,178 Q92,208 86,255 Q118,250 132,218 Z" fill={primary} opacity={0.8} />
      {/* Torso */}
      <path d="M114,170 L150,170 L155,218 L110,218 Z" fill={primary} />
      <path d="M114,170 L150,170 L151,185 L113,185 Z" fill={secondary} opacity={0.9} />
      <text x={133} y={210} textAnchor="middle" fill="rgba(255,255,255,0.95)"
        fontWeight="900" fontSize={24} fontFamily="Georgia, serif">{num}</text>
      {/* Back arm */}
      <path d="M114,184 Q100,178 88,174" stroke={SKIN} strokeWidth={13} strokeLinecap="round" fill="none" />
      <circle cx={86} cy={173} r={9} fill={secondary} />
      {/* Forward arm — position-specific */}
      {forwardArm}
      {/* Front leg */}
      <path d="M138,216 Q145,237 141,258" stroke={secondary} strokeWidth={14} strokeLinecap="round" fill="none" />
      <ellipse cx={140} cy={262} rx={13} ry={7} fill={BOOT} />
      {/* Back leg */}
      <path d="M122,216 Q116,234 118,252" stroke={secondary} strokeWidth={13} strokeLinecap="round" fill="none" />
      <ellipse cx={118} cy={256} rx={12} ry={6} fill={BOOT} />
      {/* Head */}
      <ellipse cx={hx} cy={hy} rx={23} ry={25} fill={SKIN} />
      <SideHair cx={hx} cy={hy} gender={gender} hairColor={hairColor} />
      {/* Eye */}
      <ellipse cx={hx + 7} cy={hy - 1} rx={4.5} ry={4} fill="rgba(255,255,255,0.9)" />
      <ellipse cx={hx + 8} cy={hy - 1} rx={2.5} ry={2.5} fill="rgba(0,0,0,0.75)" />
      {/* Ear */}
      <ellipse cx={hx - 21} cy={hy + 2} rx={5} ry={7} fill={SKIN} />
    </g>
  );
}

// ─── Position figures ─────────────────────────────────────────────────────
function ChaserFigure(props: FigProps) {
  return (
    <FlyingBase {...props} forwardArm={
      <g>
        <path d="M150,184 Q168,174 184,166" stroke={SKIN} strokeWidth={13} strokeLinecap="round" fill="none" />
        <Quaffle cx={197} cy={160} />
      </g>
    } />
  );
}

function BeaterFigure(props: FigProps) {
  return (
    <FlyingBase {...props} forwardArm={
      <g>
        <path d="M150,180 Q162,165 168,148" stroke={SKIN} strokeWidth={13} strokeLinecap="round" fill="none" />
        <Bat x1={168} y1={148} x2={178} y2={105} />
        {/* Bludger */}
        <circle cx={205} cy={125} r={10} fill="#2a2a2a" />
        <circle cx={205} cy={125} r={8} fill="#333" />
        <ellipse cx={202} cy={122} rx={2} ry={1.5} fill="rgba(255,255,255,0.2)" />
      </g>
    } />
  );
}

function SeekerFigure(props: FigProps) {
  return (
    <FlyingBase {...props} forwardArm={
      <g>
        <path d="M150,182 Q170,170 194,160" stroke={SKIN} strokeWidth={13} strokeLinecap="round" fill="none" />
        <circle cx={196} cy={159} r={9} fill={props.secondary} />
        <Snitch cx={220} cy={142} />
      </g>
    } />
  );
}

// ─── Main export ──────────────────────────────────────────────────────────
export default function PlayerIllustration({ position, primary, secondary, num, gender, hairColor, uid }: Props) {
  const gradId = `g-${uid}`;
  const spotId = `s-${uid}`;
  const clipId = `c-${uid}`;

  return (
    <svg viewBox="0 0 240 300" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', display: 'block' }} aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0.15" y2="1">
          <stop offset="0%" stopColor={primary} stopOpacity="1" />
          <stop offset="100%" stopColor={primary} stopOpacity="0.78" />
        </linearGradient>
        <radialGradient id={spotId} cx="55%" cy="28%" r="62%">
          <stop offset="0%" stopColor={secondary} stopOpacity="0.28" />
          <stop offset="100%" stopColor={primary} stopOpacity="0" />
        </radialGradient>
        <clipPath id={clipId}><rect width="240" height="300" /></clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width="240" height="300" fill={`url(#${gradId})`} />
        <rect width="240" height="300" fill={`url(#${spotId})`} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={i} x1={-35 + i * 52} y1="305" x2={80 + i * 52} y2="-8"
            stroke="rgba(255,255,255,0.032)" strokeWidth="20" />
        ))}
        {position === 'Keeper' && <KeeperFigure primary={primary} secondary={secondary} num={num} gender={gender} hairColor={hairColor} />}
        {position === 'Chaser' && <ChaserFigure primary={primary} secondary={secondary} num={num} gender={gender} hairColor={hairColor} />}
        {position === 'Beater' && <BeaterFigure primary={primary} secondary={secondary} num={num} gender={gender} hairColor={hairColor} />}
        {position === 'Seeker' && <SeekerFigure primary={primary} secondary={secondary} num={num} gender={gender} hairColor={hairColor} />}
      </g>
    </svg>
  );
}

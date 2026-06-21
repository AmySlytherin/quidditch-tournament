export default function HogwartsCrest({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 1.15}
      viewBox="0 0 100 115"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Hogwarts crest"
    >
      <defs>
        <clipPath id="shield-clip">
          <path d="M50 4 L96 18 L96 62 C96 88 50 111 50 111 C50 111 4 88 4 62 L4 18 Z" />
        </clipPath>
        <filter id="crest-glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Shield quadrants */}
      <g clipPath="url(#shield-clip)">
        {/* Top-left — Gryffindor red */}
        <rect x="4" y="4" width="46" height="57" fill="#6b0001" />
        {/* Top-right — Slytherin green */}
        <rect x="50" y="4" width="46" height="57" fill="#1a4a2a" />
        {/* Bottom-left — Hufflepuff gold */}
        <rect x="4" y="61" width="46" height="54" fill="#d4a81a" />
        {/* Bottom-right — Ravenclaw blue */}
        <rect x="50" y="61" width="46" height="54" fill="#0e1a40" />

        {/* Dividing lines */}
        <line x1="50" y1="4" x2="50" y2="111" stroke="#d4a843" strokeWidth="2" />
        <line x1="4" y1="61" x2="96" y2="61" stroke="#d4a843" strokeWidth="2" />

        {/* ── Gryffindor Lion (top-left) ── */}
        <g transform="translate(27,32)" fill="rgba(255,200,50,0.85)">
          {/* body */}
          <ellipse cx="0" cy="4" rx="8" ry="6" />
          {/* head */}
          <circle cx="0" cy="-5" r="6" />
          {/* mane ring */}
          <circle cx="0" cy="-5" r="8" fill="none" stroke="rgba(255,200,50,0.85)" strokeWidth="3" />
          {/* tail */}
          <path d="M8,8 Q16,2 14,-4 Q16,-8 12,-6" fill="none" stroke="rgba(255,200,50,0.85)" strokeWidth="2" strokeLinecap="round" />
          {/* legs */}
          <rect x="-7" y="9" width="3" height="6" rx="1" />
          <rect x="-2" y="9" width="3" height="6" rx="1" />
          <rect x="3" y="9" width="3" height="6" rx="1" />
        </g>

        {/* ── Slytherin Serpent (top-right) ── */}
        <g transform="translate(73,32)" fill="none" stroke="rgba(180,220,180,0.9)" strokeWidth="2.5" strokeLinecap="round">
          <path d="M0,-14 C6,-10 8,-4 4,0 C0,4 -6,4 -6,10 C-6,16 0,18 4,14" />
          {/* head */}
          <ellipse cx="0" cy="-15" rx="4" ry="3" fill="rgba(180,220,180,0.9)" stroke="none" />
          {/* tongue */}
          <path d="M0,-18 L0,-22 M0,-22 L-2,-25 M0,-22 L2,-25" stroke="rgba(220,50,50,0.8)" strokeWidth="1" />
        </g>

        {/* ── Hufflepuff Badger (bottom-left) ── */}
        <g transform="translate(27,83)">
          {/* body */}
          <ellipse cx="0" cy="4" rx="9" ry="6" fill="rgba(50,40,20,0.9)" />
          {/* head */}
          <ellipse cx="0" cy="-4" rx="7" ry="6" fill="rgba(50,40,20,0.9)" />
          {/* white stripe */}
          <rect x="-2" y="-10" width="4" height="16" rx="2" fill="rgba(255,255,255,0.85)" />
          {/* ears */}
          <ellipse cx="-5" cy="-9" rx="2.5" ry="2" fill="rgba(50,40,20,0.9)" />
          <ellipse cx="5" cy="-9" rx="2.5" ry="2" fill="rgba(50,40,20,0.9)" />
        </g>

        {/* ── Ravenclaw Eagle (bottom-right) ── */}
        <g transform="translate(73,83)" fill="rgba(160,185,220,0.85)">
          {/* body */}
          <ellipse cx="0" cy="4" rx="6" ry="8" />
          {/* head */}
          <circle cx="0" cy="-7" r="5" />
          {/* beak */}
          <path d="M4,-7 L9,-5 L4,-4 Z" fill="rgba(212,168,67,0.9)" />
          {/* left wing */}
          <path d="M-6,2 Q-18,-4 -16,-12 Q-8,-6 -6,2 Z" />
          {/* right wing */}
          <path d="M6,2 Q18,-4 16,-12 Q8,-6 6,2 Z" />
          {/* tail feathers */}
          <path d="M-5,10 L0,18 L5,10" strokeWidth="1" />
        </g>
      </g>

      {/* Shield border — gold */}
      <path
        d="M50 4 L96 18 L96 62 C96 88 50 111 50 111 C50 111 4 88 4 62 L4 18 Z"
        fill="none"
        stroke="#d4a843"
        strokeWidth="3"
        filter="url(#crest-glow)"
      />

      {/* Center H */}
      <text
        x="50" y="65"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Georgia, serif"
        fontSize="18"
        fontWeight="900"
        fill="#d4a843"
        opacity="0.9"
        style={{ pointerEvents: 'none' }}
      >H</text>
    </svg>
  );
}

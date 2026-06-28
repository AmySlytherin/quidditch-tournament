// A small, glossy chocolate frog. Reused by the hopping egg and the nav tin.
// `className` lets the caller animate parts (e.g. the leg kick while hopping).

export default function FrogSvg({
  size = 40,
  legClass,
  eyeClass,
}: {
  size?: number;
  legClass?: string;
  eyeClass?: string;
}) {
  const height = (size * 32) / 40;
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 40 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="frogBody" cx="40%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#9a6531" />
          <stop offset="55%" stopColor="#6f4622" />
          <stop offset="100%" stopColor="#4a2d14" />
        </radialGradient>
      </defs>

      {/* Hind legs, tucked at the sides (animatable for a little kick) */}
      <g className={legClass}>
        <ellipse cx="7.5" cy="24" rx="6" ry="3.2" fill="#5a3819" transform="rotate(-18 7.5 24)" />
        <ellipse cx="32.5" cy="24" rx="6" ry="3.2" fill="#5a3819" transform="rotate(18 32.5 24)" />
        {/* little webbed feet */}
        <circle cx="3.5" cy="26.5" r="2.1" fill="#6f4622" />
        <circle cx="36.5" cy="26.5" r="2.1" fill="#6f4622" />
      </g>

      {/* Front feet */}
      <circle cx="14" cy="28.5" r="2" fill="#6f4622" />
      <circle cx="26" cy="28.5" r="2" fill="#6f4622" />

      {/* Body */}
      <ellipse cx="20" cy="20" rx="13" ry="9.5" fill="url(#frogBody)" stroke="#3a2410" strokeWidth="0.6" />

      {/* Glossy chocolate highlight */}
      <ellipse cx="15.5" cy="15.5" rx="5" ry="2.6" fill="rgba(255,228,180,0.30)" transform="rotate(-20 15.5 15.5)" />

      {/* Eye bumps */}
      <g className={eyeClass}>
        <circle cx="13" cy="9" r="5" fill="url(#frogBody)" stroke="#3a2410" strokeWidth="0.6" />
        <circle cx="27" cy="9" r="5" fill="url(#frogBody)" stroke="#3a2410" strokeWidth="0.6" />
        {/* eyes — warm gold like the rest of the site's accents */}
        <circle cx="13" cy="8.5" r="2.6" fill="#f5d77a" />
        <circle cx="27" cy="8.5" r="2.6" fill="#f5d77a" />
        <circle cx="13" cy="8.8" r="1.3" fill="#2a1808" />
        <circle cx="27" cy="8.8" r="1.3" fill="#2a1808" />
        {/* glints */}
        <circle cx="14" cy="7.8" r="0.6" fill="#fffaf0" />
        <circle cx="28" cy="7.8" r="0.6" fill="#fffaf0" />
      </g>

      {/* Content little smile */}
      <path d="M16 22 Q20 25 24 22" stroke="#3a2410" strokeWidth="1" strokeLinecap="round" fill="none" />
    </svg>
  );
}

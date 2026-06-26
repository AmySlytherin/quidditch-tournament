import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className={`${styles.page} container`}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>⚡ 2025–2026</p>
        <h1 className={styles.title}>The History of Quidditch</h1>
        <div className="page-divider"><span>✦</span></div>
      </header>

      {/* ── Origins ─────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.diagBroom}><BroomIllustration /></div>
        <h2 className={styles.sectionTitle}>Origins</h2>
        <p className={styles.sectionP}>Quidditch traces its roots to the eleventh century, when wizards first mounted enchanted broomsticks and took to the skies over the Scottish Highlands. Early accounts describe informal aerial contests played over the bogs of Queerditch Marsh — a remote location chosen to keep the sport hidden from Muggle eyes. A leather ball called the Quaffle was thrown between players and hurled through a target: at first a simple basket nailed to a tree, later the iconic tall hoops we know today.</p>
        <p className={styles.sectionP}>The game spread quickly across wizarding Britain. Each region added its own flavour, and rival villages developed fierce loyalties to their local teams. By the twelfth century, the broad shape of modern Quidditch — aerial play, a scoring ball, and two fearsome Bludgers — had taken hold across much of Europe.</p>
      </section>

      {/* ── Four Balls ──────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.snitchFloat}><SnitchIllustration /></div>
        <h2 className={styles.sectionTitle}>The Four Balls</h2>
        <p className={styles.sectionP}>The <em>Quaffle</em> is the primary scoring ball — a scarlet leather sphere roughly a foot across. Chasers pass it between themselves and attempt to hurl it through one of three goal hoops, defended by the opposing Keeper. Each successful goal is worth ten points.</p>
        <p className={styles.sectionP}>The two <em>Bludgers</em> are iron balls enchanted to pursue and unseat players. Beaters carry short bats and redirect them — both protecting teammates and targeting the opposition. A well-placed Bludger has decided many a match.</p>
        <p className={styles.sectionP}>The <em>Golden Snitch</em> is the smallest and most consequential ball. A winged sphere no larger than a walnut, it darts across the pitch at extraordinary speed. Catching it ends the match and awards one hundred and fifty points. The Snitch traces its lineage to the Golden Snidget, a rare protected bird once used in an earlier form of the game. When hunting the Snidget was outlawed, craftsman Bowman Wright forged the first mechanical Snitch, and the Seeker position was born.</p>
      </section>

      {/* ── Positions ───────────────────────────────────── */}
      <section className={styles.sectionPositions}>
        <h2 className={styles.sectionTitle}>Positions</h2>
        <div className={styles.positionsGrid}>
          {[
            { icon: '🥅', name: 'Keeper', desc: 'Guards the three goal hoops. Last line of defence against the opposing Chasers.' },
            { icon: '🏆', name: 'Chaser', desc: 'Three per team. Pass the Quaffle and score goals worth ten points each.' },
            { icon: '🏏', name: 'Beater', desc: 'Two per team. Armed with bats, they redirect Bludgers away from teammates.' },
            { icon: '🟡', name: 'Seeker', desc: 'Hunts the Golden Snitch. Catching it ends the match and earns 150 points.' },
          ].map(({ icon, name, desc }) => (
            <div key={name} className={styles.positionCard}>
              <div className={styles.positionIcon}>{icon}</div>
              <div className={styles.positionName}>{name}</div>
              <div className={styles.positionDesc}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pitch ───────────────────────────────────────── */}
      <section className={styles.sectionPitch}>
        <div className={styles.pitchContent}>
          <h2 className={styles.sectionTitle}>The Pitch</h2>
          <p className={styles.sectionP}>A standard Quidditch pitch is an oval approximately five hundred feet long and one hundred and eighty feet wide. At each end stand three golden goal hoops at heights of twenty, thirty, and forty feet — giving Chasers a variety of angles and Keepers a greater challenge to cover. There are no boundaries above the pitch; players may fly as high as they wish. The only firm rule is that no player may touch the ground while in possession of the Quaffle.</p>
        </div>
        <div style={{ width: '100%', height: '160px', overflow: 'hidden', opacity: 0.22, pointerEvents: 'none', lineHeight: 0 }}>
          <GoalPostsIllustration />
        </div>
      </section>

      {/* ── Hogwarts ────────────────────────────────────── */}
      <section className={styles.sectionHogwarts}>
        <h2 className={styles.sectionTitle}>Quidditch at Hogwarts</h2>
        <p className={styles.sectionP}>Each of the four Hogwarts houses — Gryffindor, Slytherin, Hufflepuff, and Ravenclaw — fields a team of seven players selected by their house captain. House matches take place throughout the school year on the grounds Quidditch pitch, drawing the full student body as spectators.</p>
        <p className={styles.sectionP}>The house that accumulates the most points across all matches by season&apos;s end is awarded the Quidditch Cup — one of the most coveted trophies at Hogwarts. Matches have been known to hinge on a single Snitch catch, a Keeper&apos;s inspired save, or a Beater&apos;s perfectly timed strike. No two matches are ever the same, which is precisely why Quidditch has captivated the wizarding world for nearly a thousand years.</p>
      </section>

    </div>
  );
}

/* ─── Broom Illustration ──────────────────────────────────────────────────── */
function BroomIllustration() {
  return (
    <svg viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Main handle — long elegant taper */}
      <path d="M 30,175 C 120,155 280,120 480,65"
        stroke="#c9a84c" strokeWidth="6" strokeLinecap="round" />
      {/* Handle taper — slightly thinner overlay */}
      <path d="M 30,175 C 120,155 280,120 470,67"
        stroke="#8a6010" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />

      {/* Wood grain lines along handle */}
      <path d="M 80,162 C 170,142 300,112 460,70" stroke="#a07828" strokeWidth="0.8" opacity="0.35" strokeDasharray="8 6" />
      <path d="M 60,168 C 150,148 290,118 455,72" stroke="#a07828" strokeWidth="0.6" opacity="0.25" strokeDasharray="6 8" />

      {/* Binding wrap near bristles */}
      <path d="M 472,66 C 474,62 479,61 481,64 C 483,68 479,72 476,72 C 472,72 470,70 472,66 Z"
        fill="#a07828" stroke="#c9a84c" strokeWidth="1" />
      <path d="M 476,62 C 478,58 483,57 485,60 C 487,64 483,68 480,68"
        fill="none" stroke="#c9a84c" strokeWidth="1.2" />
      {/* Binding cross-wrap lines */}
      <line x1="468" y1="68" x2="484" y2="60" stroke="#c9a84c" strokeWidth="0.8" opacity="0.5" />
      <line x1="470" y1="71" x2="486" y2="63" stroke="#c9a84c" strokeWidth="0.6" opacity="0.4" />
      <line x1="466" y1="65" x2="482" y2="57" stroke="#c9a84c" strokeWidth="0.6" opacity="0.4" />

      {/* Bristle fan — many individual strands */}
      {Array.from({ length: 32 }, (_, i) => {
        const angle = -40 + i * 3.8;
        const rad = (angle * Math.PI) / 180;
        const len = 45 + Math.abs(Math.sin(rad * 2)) * 25;
        const x2 = 490 + Math.cos(rad) * len;
        const y2 = 62 + Math.sin(rad) * len;
        const opacity = 0.5 + Math.cos((i - 16) * 0.15) * 0.3;
        const width = i === 0 || i === 31 ? 0.8 : i < 4 || i > 27 ? 1 : 1.4;
        return (
          <line key={i} x1="487" y1="63" x2={x2} y2={y2}
            stroke="#8a6010" strokeWidth={width} strokeLinecap="round" opacity={opacity} />
        );
      })}
      {/* Bristle outer edge — the curved silhouette of the bristle bunch */}
      <path d="M 490,18 C 522,22 540,35 545,50 C 548,62 540,78 530,88 C 520,98 508,105 494,108"
        fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.5" />

      {/* Knot / footrest peg */}
      <ellipse cx="200" cy="138" rx="7" ry="4" fill="#8a6010" stroke="#c9a84c" strokeWidth="1.2"
        transform="rotate(-15,200,138)" />

      {/* Handle end cap */}
      <ellipse cx="34" cy="174" rx="5" ry="3.5" fill="#6b4a08" stroke="#c9a84c" strokeWidth="1.2"
        transform="rotate(-20,34,174)" />

      {/* Subtle glow around handle */}
      <path d="M 30,175 C 120,155 280,120 480,65"
        stroke="#c9a84c" strokeWidth="12" strokeLinecap="round" opacity="0.04" />
    </svg>
  );
}

/* ─── Snitch Illustration ─────────────────────────────────────────────────── */
function SnitchIllustration() {
  return (
    <svg viewBox="0 0 340 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

      {/* Outer soft glow */}
      <circle cx="170" cy="148" r="72" fill="#c9a84c" opacity="0.04" />
      <circle cx="170" cy="148" r="58" fill="#c9a84c" opacity="0.05" />

      {/* ── Left wing ── */}
      {/* Wing membrane */}
      <path d="M 138,145 C 118,130 88,118 62,122 C 42,126 28,138 30,150 C 32,162 48,168 68,164 C 88,160 108,148 124,148 C 108,155 88,162 72,166 C 52,170 34,168 30,158 C 26,170 36,180 56,180 C 76,180 100,170 118,158 C 104,165 90,172 80,178 C 64,184 50,182 48,174 C 48,182 58,190 76,188 C 94,186 116,172 132,158"
        fill="none" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
      {/* Primary feather shafts */}
      <line x1="136" y1="146" x2="42" y2="128" stroke="#c9a84c" strokeWidth="1" opacity="0.6" />
      <line x1="134" y1="150" x2="38" y2="145" stroke="#c9a84c" strokeWidth="1" opacity="0.55" />
      <line x1="132" y1="154" x2="40" y2="160" stroke="#c9a84c" strokeWidth="0.9" opacity="0.5" />
      <line x1="130" y1="158" x2="46" y2="172" stroke="#c9a84c" strokeWidth="0.9" opacity="0.45" />
      <line x1="130" y1="162" x2="54" y2="182" stroke="#c9a84c" strokeWidth="0.8" opacity="0.4" />
      <line x1="130" y1="166" x2="64" y2="190" stroke="#c9a84c" strokeWidth="0.8" opacity="0.35" />
      {/* Barb lines (cross-hatching suggesting feather texture) */}
      {[128,122,116,110,98,86,74,62,50].map((x, i) => (
        <line key={i} x1={x} y1={140 + i * 4} x2={x - 10} y2={142 + i * 4}
          stroke="#c9a84c" strokeWidth="0.5" opacity="0.25" />
      ))}

      {/* ── Right wing ── */}
      <path d="M 202,145 C 222,130 252,118 278,122 C 298,126 312,138 310,150 C 308,162 292,168 272,164 C 252,160 232,148 216,148 C 232,155 252,162 268,166 C 288,170 306,168 310,158 C 314,170 304,180 284,180 C 264,180 240,170 222,158 C 236,165 250,172 260,178 C 276,184 290,182 292,174 C 292,182 282,190 264,188 C 246,186 224,172 208,158"
        fill="none" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
      {/* Primary feather shafts - right */}
      <line x1="204" y1="146" x2="298" y2="128" stroke="#c9a84c" strokeWidth="1" opacity="0.6" />
      <line x1="206" y1="150" x2="302" y2="145" stroke="#c9a84c" strokeWidth="1" opacity="0.55" />
      <line x1="208" y1="154" x2="300" y2="160" stroke="#c9a84c" strokeWidth="0.9" opacity="0.5" />
      <line x1="210" y1="158" x2="294" y2="172" stroke="#c9a84c" strokeWidth="0.9" opacity="0.45" />
      <line x1="210" y1="162" x2="286" y2="182" stroke="#c9a84c" strokeWidth="0.8" opacity="0.4" />
      <line x1="210" y1="166" x2="276" y2="190" stroke="#c9a84c" strokeWidth="0.8" opacity="0.35" />

      {/* ── Body sphere ── */}
      {/* Base sphere */}
      <circle cx="170" cy="148" r="42" fill="none" stroke="#c9a84c" strokeWidth="2.5" />
      {/* Latitude rings */}
      <ellipse cx="170" cy="135" rx="42" ry="10" fill="none" stroke="#c9a84c" strokeWidth="0.7" opacity="0.4" />
      <ellipse cx="170" cy="148" rx="42" ry="6"  fill="none" stroke="#c9a84c" strokeWidth="0.6" opacity="0.35" />
      <ellipse cx="170" cy="161" rx="42" ry="10" fill="none" stroke="#c9a84c" strokeWidth="0.7" opacity="0.4" />
      {/* Longitude arcs */}
      <path d="M 170,106 C 182,118 186,133 186,148 C 186,163 182,178 170,190"
        fill="none" stroke="#c9a84c" strokeWidth="0.7" opacity="0.4" />
      <path d="M 170,106 C 158,118 154,133 154,148 C 154,163 158,178 170,190"
        fill="none" stroke="#c9a84c" strokeWidth="0.7" opacity="0.4" />
      {/* Panel seam lines (like a Quaffle but smaller) */}
      <path d="M 148,120 C 158,130 168,140 170,148 C 172,156 178,168 188,176"
        fill="none" stroke="#c9a84c" strokeWidth="0.9" opacity="0.5" />
      <path d="M 192,120 C 182,130 172,140 170,148 C 168,156 162,168 152,176"
        fill="none" stroke="#c9a84c" strokeWidth="0.9" opacity="0.5" />
      {/* Shading arcs for depth */}
      <path d="M 140,128 C 148,122 158,118 170,117"
        fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.3" />
      <path d="M 136,135 C 142,128 152,122 164,120"
        fill="none" stroke="#c9a84c" strokeWidth="1.2" opacity="0.25" />
      <path d="M 134,143 C 138,135 144,128 152,124"
        fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.2" />
      {/* Specular highlight */}
      <path d="M 148,118 C 155,114 164,113 172,115 C 168,118 160,119 153,120 Z"
        fill="#c9a84c" opacity="0.2" />
      <circle cx="154" cy="117" r="4" fill="#c9a84c" opacity="0.15" />

      {/* Wing attachment band around equator */}
      <path d="M 132,145 C 134,140 138,137 143,137 L 197,137 C 202,137 206,140 208,145 C 206,150 202,153 197,153 L 143,153 C 138,153 134,150 132,145 Z"
        fill="none" stroke="#c9a84c" strokeWidth="1.4" opacity="0.6" />
      {/* Band rivets */}
      {[145, 155, 165, 175, 185, 195].map((x, i) => (
        <circle key={i} cx={x} cy={145} r="1.5" fill="#c9a84c" opacity="0.5" />
      ))}

      {/* Sparkle dots */}
      <circle cx="108" cy="108" r="2"   fill="#c9a84c" opacity="0.4" />
      <circle cx="232" cy="108" r="2"   fill="#c9a84c" opacity="0.4" />
      <circle cx="170" cy="82"  r="1.5" fill="#c9a84c" opacity="0.35" />
      <circle cx="96"  cy="148" r="1.5" fill="#c9a84c" opacity="0.3" />
      <circle cx="244" cy="148" r="1.5" fill="#c9a84c" opacity="0.3" />
      {/* Small cross sparkles */}
      <line x1="108" y1="104" x2="108" y2="112" stroke="#c9a84c" strokeWidth="0.8" opacity="0.3" />
      <line x1="104" y1="108" x2="112" y2="108" stroke="#c9a84c" strokeWidth="0.8" opacity="0.3" />
      <line x1="232" y1="104" x2="232" y2="112" stroke="#c9a84c" strokeWidth="0.8" opacity="0.3" />
      <line x1="228" y1="108" x2="236" y2="108" stroke="#c9a84c" strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

/* ─── Goal Posts Illustration ─────────────────────────────────────────────── */
function GoalPostsIllustration() {
  return (
    <svg viewBox="0 -5 800 325" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Sky atmosphere */}
      <ellipse cx="400" cy="0" rx="500" ry="120" fill="#c9a84c" opacity="0.02" />

      {/* Distant stars */}
      {[[80,30],[160,18],[250,45],[380,12],[520,38],[640,22],[730,40]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="1.2" fill="#c9a84c" opacity="0.3" />
      ))}

      {/* Ground plane */}
      <line x1="0" y1="310" x2="800" y2="310" stroke="#c9a84c" strokeWidth="1" opacity="0.25" />
      {/* Pitch oval */}
      <ellipse cx="400" cy="312" rx="360" ry="22" fill="none" stroke="#c9a84c" strokeWidth="0.8" opacity="0.18" />
      <ellipse cx="400" cy="314" rx="240" ry="14" fill="none" stroke="#c9a84c" strokeWidth="0.5" opacity="0.12" />
      {/* Centre line */}
      <line x1="400" y1="295" x2="400" y2="315" stroke="#c9a84c" strokeWidth="0.6" opacity="0.15" />
      <ellipse cx="400" cy="310" rx="18" ry="6" fill="none" stroke="#c9a84c" strokeWidth="0.5" opacity="0.15" />

      {/* ── LEFT POSTS ── perspective: shorter base, base bar */}
      {/* Post shadows on ground */}
      <line x1="100" y1="310" x2="145" y2="315" stroke="#c9a84c" strokeWidth="1" opacity="0.1" />
      <line x1="148" y1="310" x2="193" y2="315" stroke="#c9a84c" strokeWidth="1" opacity="0.1" />
      <line x1="196" y1="310" x2="240" y2="315" stroke="#c9a84c" strokeWidth="1" opacity="0.1" />

      {/* Left post 1 — tallest */}
      <line x1="100" y1="42"  x2="100" y2="310" stroke="#c9a84c" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="90"  y1="90"  x2="110" y2="90"  stroke="#c9a84c" strokeWidth="1.5" opacity="0.5" />
      <line x1="90"  y1="180" x2="110" y2="180" stroke="#c9a84c" strokeWidth="1.2" opacity="0.4" />
      <line x1="90"  y1="260" x2="110" y2="260" stroke="#c9a84c" strokeWidth="1" opacity="0.35" />
      {/* Upright hoop — circle standing on top of pole */}
      <circle cx="100" cy="22" r="20" fill="none" stroke="#c9a84c" strokeWidth="3.5" />

      {/* Left post 2 — medium */}
      <line x1="148" y1="92"  x2="148" y2="310" stroke="#c9a84c" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="138" y1="135" x2="158" y2="135" stroke="#c9a84c" strokeWidth="1.5" opacity="0.5" />
      <line x1="138" y1="220" x2="158" y2="220" stroke="#c9a84c" strokeWidth="1.2" opacity="0.4" />
      <circle cx="148" cy="72" r="20" fill="none" stroke="#c9a84c" strokeWidth="3.5" />

      {/* Left post 3 — shortest */}
      <line x1="196" y1="130" x2="196" y2="310" stroke="#c9a84c" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="186" y1="168" x2="206" y2="168" stroke="#c9a84c" strokeWidth="1.5" opacity="0.5" />
      <line x1="186" y1="248" x2="206" y2="248" stroke="#c9a84c" strokeWidth="1.2" opacity="0.4" />
      <circle cx="196" cy="110" r="20" fill="none" stroke="#c9a84c" strokeWidth="3.5" />

      {/* Left base bar */}
      <line x1="78"  y1="312" x2="218" y2="312" stroke="#c9a84c" strokeWidth="4" strokeLinecap="round" />
      {/* Anchor bolts */}
      <circle cx="85"  cy="312" r="3" fill="#c9a84c" opacity="0.5" />
      <circle cx="210" cy="312" r="3" fill="#c9a84c" opacity="0.5" />

      {/* ── RIGHT POSTS ── mirrored */}
      <line x1="700" y1="42"  x2="700" y2="310" stroke="#c9a84c" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="690" y1="90"  x2="710" y2="90"  stroke="#c9a84c" strokeWidth="1.5" opacity="0.5" />
      <line x1="690" y1="180" x2="710" y2="180" stroke="#c9a84c" strokeWidth="1.2" opacity="0.4" />
      <line x1="690" y1="260" x2="710" y2="260" stroke="#c9a84c" strokeWidth="1" opacity="0.35" />
      <circle cx="700" cy="22" r="20" fill="none" stroke="#c9a84c" strokeWidth="3.5" />

      <line x1="652" y1="92"  x2="652" y2="310" stroke="#c9a84c" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="642" y1="135" x2="662" y2="135" stroke="#c9a84c" strokeWidth="1.5" opacity="0.5" />
      <line x1="642" y1="220" x2="662" y2="220" stroke="#c9a84c" strokeWidth="1.2" opacity="0.4" />
      <circle cx="652" cy="72" r="20" fill="none" stroke="#c9a84c" strokeWidth="3.5" />

      <line x1="604" y1="130" x2="604" y2="310" stroke="#c9a84c" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="594" y1="168" x2="614" y2="168" stroke="#c9a84c" strokeWidth="1.5" opacity="0.5" />
      <line x1="594" y1="248" x2="614" y2="248" stroke="#c9a84c" strokeWidth="1.2" opacity="0.4" />
      <circle cx="604" cy="110" r="20" fill="none" stroke="#c9a84c" strokeWidth="3.5" />

      <line x1="582" y1="312" x2="722" y2="312" stroke="#c9a84c" strokeWidth="4" strokeLinecap="round" />
      <circle cx="590" cy="312" r="3" fill="#c9a84c" opacity="0.5" />
      <circle cx="715" cy="312" r="3" fill="#c9a84c" opacity="0.5" />

      {/* Crowd silhouettes — bottom edge */}
      {Array.from({ length: 40 }, (_, i) => {
        const x = 20 + i * 19.5;
        const h = 10 + Math.sin(i * 0.8) * 5 + Math.cos(i * 1.3) * 4;
        return (
          <ellipse key={i} cx={x} cy={318} rx={5} ry={h}
            fill="#c9a84c" opacity={0.06 + Math.sin(i) * 0.02} />
        );
      })}
    </svg>
  );
}

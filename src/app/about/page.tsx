import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className={`${styles.page} container`}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>⚡ 2024–2025</p>
        <h1 className={styles.title}>The History of Quidditch</h1>
        <div className="page-divider"><span>✦</span></div>
      </header>

      {/* ── Origins ───────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.floatRight}>
          <ChaserInFlight />
        </div>
        <h2 className={styles.sectionTitle}>Origins</h2>
        <p>
          Quidditch traces its roots to the eleventh century, when wizards first mounted enchanted
          broomsticks and took to the skies over the Scottish Highlands. Early accounts describe
          informal aerial contests played over the bogs of Queerditch Marsh — a remote location
          chosen to keep the sport hidden from Muggle eyes. A leather ball called the Quaffle was
          thrown between players and hurled through a target: at first a simple basket nailed to a
          tree, later the iconic tall hoops we know today.
        </p>
        <p>
          The game spread quickly across wizarding Britain. Each region added its own flavour, and
          rival villages developed fierce loyalties to their local teams. By the twelfth century,
          the broad shape of modern Quidditch — aerial play, a scoring ball, and two fearsome
          Bludgers — had taken hold across much of Europe. What remained missing was a way to end
          the match.
        </p>
      </section>

      {/* ── Four Balls ────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.floatLeft}>
          <SnitchIllustration />
        </div>
        <h2 className={styles.sectionTitle}>The Four Balls</h2>
        <p>
          The <em>Quaffle</em> is the primary scoring ball — a scarlet leather sphere roughly a foot
          across. Chasers pass it between themselves and attempt to hurl it through one of three goal
          hoops, defended by the opposing Keeper. Each successful goal is worth ten points.
        </p>
        <p>
          The two <em>Bludgers</em> are iron balls enchanted to pursue and unseat players. Beaters
          carry short clubs and redirect them — both protecting teammates and targeting the opposition.
          A well-placed Bludger has decided many a match.
        </p>
        <p>
          The <em>Golden Snitch</em> is the smallest and most consequential ball. A winged sphere no
          larger than a walnut, it darts across the pitch at extraordinary speed. Catching it ends
          the match and awards one hundred and fifty points to the catching team. The Snitch traces its
          lineage to the Golden Snidget, a rare protected bird once used in an earlier form of the
          game. When hunting the Snidget was outlawed, craftsman Bowman Wright forged the first
          mechanical Snitch, and the Seeker position was born.
        </p>
      </section>

      {/* ── Positions ─────────────────────────────────────────── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Positions</h2>
        <div className={styles.positionsGrid}>
          <div className={styles.positionCard}>
            <div className={styles.positionIcon}>🥅</div>
            <div className={styles.positionName}>Keeper</div>
            <div className={styles.positionDesc}>Guards the three goal hoops. The last line of defence against the opposing Chasers.</div>
          </div>
          <div className={styles.positionCard}>
            <div className={styles.positionIcon}>🏆</div>
            <div className={styles.positionName}>Chaser</div>
            <div className={styles.positionDesc}>Three per team. Pass the Quaffle and attempt to score goals worth ten points each.</div>
          </div>
          <div className={styles.positionCard}>
            <div className={styles.positionIcon}>🏏</div>
            <div className={styles.positionName}>Beater</div>
            <div className={styles.positionDesc}>Two per team. Armed with clubs, they bat Bludgers away from teammates and toward opponents.</div>
          </div>
          <div className={styles.positionCard}>
            <div className={styles.positionIcon}>🔮</div>
            <div className={styles.positionName}>Seeker</div>
            <div className={styles.positionDesc}>Hunts the elusive Golden Snitch. Catching it ends the match and earns 150 points.</div>
          </div>
        </div>
      </section>

      {/* ── Pitch — full-width illustration behind text ───────── */}
      <section className={styles.sectionWithBg}>
        <div className={styles.bgIllustration}>
          <GoalPostsPanorama />
        </div>
        <div className={styles.bgContent}>
          <h2 className={styles.sectionTitle}>The Pitch</h2>
          <p>
            A standard Quidditch pitch is an oval approximately five hundred feet long and one
            hundred and eighty feet wide. At each end stand three golden goal hoops of differing
            heights — twenty, thirty, and forty feet tall — giving Chasers a variety of angles and
            Keepers a greater challenge to cover. There are no set boundaries above the pitch; players
            may fly as high as they wish. The only firm rule is that no player may touch the ground
            while in possession of the Quaffle without surrendering it.
          </p>
        </div>
      </section>

      {/* ── Hogwarts ──────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.floatRight}>
          <SeekerDiving />
        </div>
        <h2 className={styles.sectionTitle}>Quidditch at Hogwarts</h2>
        <p>
          Each of the four Hogwarts houses — Gryffindor, Slytherin, Hufflepuff, and Ravenclaw —
          fields a team of seven players selected by their house captain. House matches take place
          throughout the school year on the grounds Quidditch pitch, drawing the full student body as
          spectators. House points are not awarded for Quidditch results, but the competition for the
          Quidditch Cup is fierce regardless.
        </p>
        <p>
          The house that accumulates the most points across all matches by season&apos;s end is
          awarded the Quidditch Cup — one of the most coveted trophies at Hogwarts. Matches have been
          known to hinge on a single Snitch catch, a Keeper&apos;s inspired save, or a Beater&apos;s
          perfectly timed strike. No two matches are ever the same, which is precisely why Quidditch
          has captivated the wizarding world for nearly a thousand years.
        </p>
      </section>

    </div>
  );
}

/* ─── Illustrations ─────────────────────────────────────────────────────── */

function ChaserInFlight() {
  return (
    <svg viewBox="0 0 260 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Speed lines */}
      <line x1="10" y1="95" x2="40" y2="93" stroke="#c9a84c" strokeWidth="0.6" opacity="0.3" />
      <line x1="8"  y1="103" x2="35" y2="102" stroke="#c9a84c" strokeWidth="0.5" opacity="0.25" />
      <line x1="12" y1="87" x2="38" y2="86"  stroke="#c9a84c" strokeWidth="0.4" opacity="0.2" />

      {/* Broom handle */}
      <path d="M 50,165 C 110,145 170,120 245,90" stroke="#8a6418" strokeWidth="2.2" strokeLinecap="round" />
      {/* Bristles */}
      <line x1="245" y1="90" x2="255" y2="98" stroke="#7a5c10" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="245" y1="90" x2="258" y2="90" stroke="#7a5c10" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="245" y1="90" x2="256" y2="82" stroke="#7a5c10" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="245" y1="90" x2="252" y2="77" stroke="#7a5c10" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="245" y1="90" x2="248" y2="102" stroke="#7a5c10" strokeWidth="1.2" strokeLinecap="round" />
      {/* Binding */}
      <ellipse cx="238" cy="92" rx="4" ry="2.5" fill="none" stroke="#a07828" strokeWidth="1.2" transform="rotate(-22,238,92)" />

      {/* Head */}
      <circle cx="130" cy="92" r="11" fill="none" stroke="#c9a84c" strokeWidth="1.5" />
      {/* Hair streaming back */}
      <path d="M 138,86 C 152,82 168,80 182,83" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 139,84 C 153,80 170,78 184,81" stroke="#c9a84c" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
      <path d="M 140,82 C 154,78 172,76 185,79" stroke="#c9a84c" strokeWidth="0.6" strokeLinecap="round" opacity="0.4" />
      {/* Face hint */}
      <circle cx="126" cy="93" r="1" fill="#c9a84c" opacity="0.5" />

      {/* Torso — leaning forward */}
      <path d="M 133,101 C 140,98 152,99 154,108 C 150,115 138,115 133,110 Z"
        fill="#c9a84c" opacity="0.15" stroke="#c9a84c" strokeWidth="1.2" />

      {/* Left arm gripping broom */}
      <path d="M 133,106 C 124,108 115,112 108,116" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" />
      {/* Right arm (forward) */}
      <path d="M 135,102 C 126,97 118,94 110,91" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" />
      {/* Hand with quaffle */}
      <circle cx="104" cy="88" r="8" fill="none" stroke="#c9a84c" strokeWidth="1.5" />
      {/* Quaffle seam lines */}
      <path d="M 100,85 Q 106,90 103,94" stroke="#c9a84c" strokeWidth="0.75" fill="none" opacity="0.6" />

      {/* Robes flowing back — main drama */}
      <path d="M 148,108 C 165,115 188,125 210,130 C 208,136 195,138 180,133 C 162,127 148,118 145,113 Z"
        fill="#c9a84c" opacity="0.1" stroke="#c9a84c" strokeWidth="1.2" />
      {/* Robe fold lines */}
      <path d="M 150,110 C 167,117 190,126 212,131" stroke="#c9a84c" strokeWidth="0.7" opacity="0.4" />
      <path d="M 151,113 C 168,119 191,128 213,133" stroke="#c9a84c" strokeWidth="0.5" opacity="0.3" />
      <path d="M 152,116 C 168,122 188,130 208,135" stroke="#c9a84c" strokeWidth="0.4" opacity="0.25" />

      {/* Legs either side of broom */}
      <path d="M 143,115 C 145,125 146,138 145,150" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 154,112 C 155,122 156,135 154,147" stroke="#c9a84c" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
      {/* Boot */}
      <path d="M 144,150 C 140,154 136,157 139,161 C 143,164 149,162 152,157" stroke="#c9a84c" strokeWidth="1.4" fill="none" />

      {/* Faint cloud wisps */}
      <path d="M 40,145 C 55,140 70,143 65,148 C 60,152 45,150 40,145 Z" fill="#c9a84c" opacity="0.06" />
      <path d="M 200,165 C 215,160 230,162 228,167 C 225,171 210,170 200,165 Z" fill="#c9a84c" opacity="0.05" />
    </svg>
  );
}

function SnitchIllustration() {
  return (
    <svg viewBox="0 0 220 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Sparkle trail */}
      {([[20,100],[40,85],[65,95],[90,80],[115,88]] as [number,number][]).map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={1.5 - i*0.2} fill="#c9a84c" opacity={0.15 + i*0.04} />
      ))}

      {/* Left wing — detailed feather structure */}
      <path d="M 85,90 C 65,75 40,65 25,72 C 20,78 28,85 45,84 C 30,88 18,90 20,97 C 22,103 40,100 55,96 C 40,102 28,107 32,113 C 36,118 55,113 70,107 C 62,112 55,118 60,122 C 65,126 78,120 85,114"
        stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Wing inner feather lines - left */}
      <path d="M 80,88 C 65,78 48,70 35,74" stroke="#c9a84c" strokeWidth="0.6" opacity="0.5" />
      <path d="M 78,93 C 62,85 44,82 32,86" stroke="#c9a84c" strokeWidth="0.6" opacity="0.4" />
      <path d="M 76,99 C 60,94 44,94 33,99" stroke="#c9a84c" strokeWidth="0.6" opacity="0.4" />
      <path d="M 76,105 C 61,102 47,104 38,108" stroke="#c9a84c" strokeWidth="0.5" opacity="0.35" />
      <path d="M 78,110 C 65,108 54,112 48,116" stroke="#c9a84c" strokeWidth="0.5" opacity="0.3" />

      {/* Right wing */}
      <path d="M 135,90 C 155,75 180,65 195,72 C 200,78 192,85 175,84 C 190,88 202,90 200,97 C 198,103 180,100 165,96 C 180,102 192,107 188,113 C 184,118 165,113 150,107 C 158,112 165,118 160,122 C 155,126 142,120 135,114"
        stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Wing inner feather lines - right */}
      <path d="M 140,88 C 155,78 172,70 185,74" stroke="#c9a84c" strokeWidth="0.6" opacity="0.5" />
      <path d="M 142,93 C 158,85 176,82 188,86" stroke="#c9a84c" strokeWidth="0.6" opacity="0.4" />
      <path d="M 144,99 C 160,94 176,94 187,99" stroke="#c9a84c" strokeWidth="0.6" opacity="0.4" />
      <path d="M 144,105 C 159,102 173,104 182,108" stroke="#c9a84c" strokeWidth="0.5" opacity="0.35" />
      <path d="M 142,110 C 155,108 166,112 172,116" stroke="#c9a84c" strokeWidth="0.5" opacity="0.3" />

      {/* Body — golden sphere with etched detail */}
      <circle cx="110" cy="100" r="22" fill="none" stroke="#c9a84c" strokeWidth="2" />
      {/* Body shading lines */}
      <path d="M 96,88 C 108,84 122,86 130,94" stroke="#c9a84c" strokeWidth="0.7" opacity="0.4" />
      <path d="M 92,96 C 104,91 120,92 130,100" stroke="#c9a84c" strokeWidth="0.6" opacity="0.35" />
      <path d="M 90,104 C 100,100 118,100 128,107" stroke="#c9a84c" strokeWidth="0.5" opacity="0.3" />
      <path d="M 92,112 C 101,109 117,110 125,116" stroke="#c9a84c" strokeWidth="0.5" opacity="0.25" />
      {/* Specular highlight */}
      <circle cx="102" cy="90" r="5" fill="none" stroke="#c9a84c" strokeWidth="0.8" opacity="0.5" />
      <circle cx="103" cy="91" r="2" fill="#c9a84c" opacity="0.25" />

      {/* Wing attachment points */}
      <line x1="88" y1="95" x2="95" y2="92" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="132" y1="95" x2="125" y2="92" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

      {/* Small sparkle dots */}
      <circle cx="68" cy="68" r="1.5" fill="#c9a84c" opacity="0.35" />
      <circle cx="155" cy="68" r="1.5" fill="#c9a84c" opacity="0.35" />
      <circle cx="110" cy="55" r="1" fill="#c9a84c" opacity="0.3" />
    </svg>
  );
}

function GoalPostsPanorama() {
  return (
    <svg viewBox="0 0 800 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Ground line */}
      <line x1="0" y1="220" x2="800" y2="220" stroke="#c9a84c" strokeWidth="0.8" opacity="0.3" />
      {/* Pitch oval markings */}
      <ellipse cx="400" cy="220" rx="380" ry="18" fill="none" stroke="#c9a84c" strokeWidth="0.5" opacity="0.2" />
      <ellipse cx="400" cy="220" rx="260" ry="12" fill="none" stroke="#c9a84c" strokeWidth="0.4" opacity="0.15" />

      {/* Left goal posts */}
      <line x1="80"  y1="60"  x2="80"  y2="220" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="120" y1="90"  x2="120" y2="220" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="160" y1="110" x2="160" y2="220" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" />
      {/* Left hoops */}
      <ellipse cx="80"  cy="60"  rx="14" ry="5" fill="none" stroke="#c9a84c" strokeWidth="2" />
      <ellipse cx="120" cy="90"  rx="14" ry="5" fill="none" stroke="#c9a84c" strokeWidth="2" />
      <ellipse cx="160" cy="110" rx="14" ry="5" fill="none" stroke="#c9a84c" strokeWidth="2" />
      {/* Left base bar */}
      <line x1="62" y1="220" x2="178" y2="220" stroke="#c9a84c" strokeWidth="3" strokeLinecap="round" />

      {/* Right goal posts */}
      <line x1="640" y1="110" x2="640" y2="220" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="680" y1="90"  x2="680" y2="220" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="720" y1="60"  x2="720" y2="220" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" />
      {/* Right hoops */}
      <ellipse cx="640" cy="110" rx="14" ry="5" fill="none" stroke="#c9a84c" strokeWidth="2" />
      <ellipse cx="680" cy="90"  rx="14" ry="5" fill="none" stroke="#c9a84c" strokeWidth="2" />
      <ellipse cx="720" cy="60"  rx="14" ry="5" fill="none" stroke="#c9a84c" strokeWidth="2" />
      {/* Right base bar */}
      <line x1="622" y1="220" x2="738" y2="220" stroke="#c9a84c" strokeWidth="3" strokeLinecap="round" />

      {/* Keeper silhouette - left posts */}
      <circle cx="120" cy="155" r="9" fill="none" stroke="#c9a84c" strokeWidth="1.5" />
      <path d="M 112,163 C 110,175 108,190 110,205" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 128,163 C 130,175 132,190 130,205" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 112,163 L 128,163" stroke="#c9a84c" strokeWidth="2.5" />
      <path d="M 98,170 L 112,163" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 142,170 L 128,163" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" />

      {/* Distant flyers — small silhouettes */}
      <g opacity="0.5">
        {/* Player 1 */}
        <circle cx="300" cy="80" r="4.5" fill="none" stroke="#c9a84c" strokeWidth="1" />
        <line x1="295" y1="82" x2="318" y2="88" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 296,82 C 290,85 284,84 280,82" stroke="#c9a84c" strokeWidth="0.8" fill="none" />
        {/* Player 2 */}
        <circle cx="400" cy="55" r="4" fill="none" stroke="#c9a84c" strokeWidth="1" />
        <line x1="395" y1="57" x2="418" y2="62" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" />
        {/* Player 3 */}
        <circle cx="500" cy="75" r="4.5" fill="none" stroke="#c9a84c" strokeWidth="1" />
        <line x1="495" y1="77" x2="518" y2="82" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" />
      </g>

      {/* Crowd silhouette */}
      {[50,90,130,170,210,260,310,360,420,470,520,570,620,660,700,740].map((x, i) => (
        <ellipse key={i} cx={x} cy={220} rx={6} ry={10+Math.sin(i)*3} fill="#c9a84c" opacity="0.12" />
      ))}
    </svg>
  );
}

function SeekerDiving() {
  return (
    <svg viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Speed blur lines */}
      <line x1="30" y1="20"  x2="75" y2="40"  stroke="#c9a84c" strokeWidth="0.5" opacity="0.2" />
      <line x1="25" y1="28"  x2="68" y2="46"  stroke="#c9a84c" strokeWidth="0.4" opacity="0.15" />
      <line x1="35" y1="14"  x2="78" y2="34"  stroke="#c9a84c" strokeWidth="0.4" opacity="0.15" />

      {/* Broom — steep downward angle */}
      <path d="M 60,30 C 90,70 115,115 130,165" stroke="#8a6418" strokeWidth="2.2" strokeLinecap="round" />
      {/* Bristles at bottom */}
      <line x1="130" y1="165" x2="138" y2="175" stroke="#7a5c10" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="130" y1="165" x2="140" y2="168" stroke="#7a5c10" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="130" y1="165" x2="139" y2="160" stroke="#7a5c10" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="130" y1="165" x2="133" y2="176" stroke="#7a5c10" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="130" y1="165" x2="135" y2="156" stroke="#7a5c10" strokeWidth="1.2" strokeLinecap="round" />

      {/* Head — looking down/forward */}
      <circle cx="72" cy="42" r="11" fill="none" stroke="#c9a84c" strokeWidth="1.5" />
      {/* Hair streaming up (since diving down) */}
      <path d="M 68,33 C 58,24 48,20 38,22" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 65,31 C 55,22 44,18 34,20" stroke="#c9a84c" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
      {/* Eye/face hint */}
      <circle cx="68" cy="44" r="1" fill="#c9a84c" opacity="0.5" />

      {/* Torso — nearly vertical, diving */}
      <path d="M 76,50 C 80,55 88,72 90,88 C 86,92 78,88 76,74 C 74,62 72,52 76,50 Z"
        fill="#c9a84c" opacity="0.12" stroke="#c9a84c" strokeWidth="1.2" />

      {/* Right arm reaching ahead toward snitch */}
      <path d="M 74,52 C 65,46 54,40 44,35" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" />
      {/* Fingers spread */}
      <line x1="44" y1="35" x2="38" y2="30" stroke="#c9a84c" strokeWidth="1" strokeLinecap="round" />
      <line x1="44" y1="35" x2="40" y2="28" stroke="#c9a84c" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="44" y1="35" x2="36" y2="33" stroke="#c9a84c" strokeWidth="0.8" strokeLinecap="round" />

      {/* Left arm gripping broom */}
      <path d="M 80,62 C 88,66 96,72 100,78" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" />

      {/* Robes streaming upward behind diver */}
      <path d="M 82,80 C 72,68 58,52 50,40 C 45,42 44,52 50,62 C 42,52 38,42 42,34 C 36,36 34,48 40,60 C 36,54 34,46 38,40"
        stroke="#c9a84c" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M 84,84 C 75,70 60,54 52,42" stroke="#c9a84c" strokeWidth="0.7" opacity="0.35" />
      <path d="M 86,88 C 77,74 64,58 56,46" stroke="#c9a84c" strokeWidth="0.6" opacity="0.3" />

      {/* Snitch ahead of outstretched hand */}
      <circle cx="26" cy="22" r="7" fill="none" stroke="#c9a84c" strokeWidth="1.5" />
      <ellipse cx="16" cy="20" rx="10" ry="4" fill="none" stroke="#c9a84c" strokeWidth="0.9"
        transform="rotate(-20,16,20)" />
      <ellipse cx="36" cy="20" rx="10" ry="4" fill="none" stroke="#c9a84c" strokeWidth="0.9"
        transform="rotate(20,36,20)" />
      {/* Snitch sparkle */}
      <circle cx="23" cy="19" r="2" fill="#c9a84c" opacity="0.3" />

      {/* Legs trailing */}
      <path d="M 88,90 C 95,110 110,140 118,160" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 92,92 C 100,112 115,142 122,162" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

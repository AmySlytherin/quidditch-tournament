import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className={`${styles.page} container`}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>⚡ 2024–2025</p>
        <h1 className={styles.title}>The History of Quidditch</h1>
        <div className="page-divider"><span>✦</span></div>
      </header>

      {/* Hero illustration — players in flight */}
      <div className={styles.heroIllustration}>
        <FlightScene />
      </div>

      <div className={styles.content}>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Origins</h2>
          <p>
            Quidditch traces its roots to the eleventh century, when wizards first mounted enchanted
            broomsticks and took to the skies. Early accounts describe informal aerial contests played
            over the bogs of Queerditch Marsh in the Scottish Highlands — a remote location chosen
            to keep the sport hidden from Muggle eyes. A leather ball called the Quaffle was thrown
            between players and hurled through a target: at first a simple basket nailed to a tree,
            later the iconic tall goal hoops we know today.
          </p>
          <p>
            The game spread quickly across wizarding Britain. Each region added its own flavour, and
            rival villages developed fierce loyalties to their local teams. By the twelfth century,
            the broad shape of modern Quidditch — aerial play, a scoring ball, and two fearsome
            Bludgers — had taken hold. What remained missing was a way to end the match.
          </p>
        </section>

        {/* Inline illustration — keeper */}
        <div className={styles.inlineIllustration}>
          <KeeperScene />
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The Four Balls</h2>
          <p>
            The Quaffle is the primary scoring ball — a scarlet leather sphere roughly a foot across.
            Chasers pass it between themselves and attempt to hurl it through one of three goal hoops,
            defended by the opposing Keeper. Each successful goal scores ten points.
          </p>
          <p>
            The two Bludgers are iron balls enchanted to pursue and unseat players. Beaters carry
            short clubs and redirect them — both protecting their own teammates and targeting the
            opposition. A well-placed Bludger has decided many a match.
          </p>
          <p>
            The Golden Snitch is the smallest and most consequential ball in the game. A tiny
            winged sphere no larger than a walnut, it darts across the pitch at extraordinary
            speed. Catching it ends the match and awards the catching team one hundred and fifty
            points — enough to determine the outcome even when the score is lopsided. The Snitch
            traces its lineage to the Golden Snidget, a rare protected bird once used in an earlier
            form of the game. When hunting the Snidget was outlawed, Bowman Wright of Godric&apos;s
            Hollow crafted the first mechanical Golden Snitch in the 1300s, and the modern Seeker
            position was born.
          </p>
        </section>

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

        {/* Inline illustration — snitch catch */}
        <div className={styles.inlineIllustration}>
          <SnitchScene />
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The Pitch</h2>
          <p>
            A standard Quidditch pitch is an oval approximately five hundred feet long and one
            hundred and eighty feet wide. At each end stand three golden goal hoops of differing
            heights — twenty, thirty, and forty feet tall — giving Chasers a variety of angles to
            aim for and Keepers a greater challenge to cover. There are no set boundaries above
            the pitch; players may fly as high as they wish. The only firm rule is that no player
            may touch the ground while in possession of the Quaffle without surrendering it.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Quidditch at Hogwarts</h2>
          <p>
            Each of the four Hogwarts houses — Gryffindor, Slytherin, Hufflepuff, and Ravenclaw —
            fields a team of seven players selected by their house captain. House matches take
            place throughout the school year on the grounds Quidditch pitch, drawing the full
            student body as spectators. House points are not awarded for Quidditch results, but
            the competition for the House Cup is fierce regardless.
          </p>
          <p>
            The house that accumulates the most points across all matches by season&apos;s end
            is awarded the Quidditch Cup — one of the most coveted trophies in the school. Matches
            have been known to hinge on a single Snitch catch, a goalkeeper&apos;s inspired save,
            or a Beater&apos;s perfectly timed strike. No two matches are ever the same, which is
            precisely why Quidditch has captivated the wizarding world for nearly a thousand years.
          </p>
        </section>

      </div>
    </div>
  );
}

/* ─── SVG Illustrations ─────────────────────────────────────────────────── */

function FlightScene() {
  return (
    <svg viewBox="0 0 800 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Stars */}
      {[[60,30],[120,15],[200,40],[340,10],[500,25],[650,35],[740,12],[780,50]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.2" fill="rgba(255,248,200,0.5)" />
      ))}

      {/* Goal posts right side */}
      <line x1="720" y1="50" x2="720" y2="200" stroke="#c9a84c" strokeWidth="3" />
      <line x1="720" y1="65" x2="745" y2="65" stroke="#c9a84c" strokeWidth="2.5" />
      <circle cx="745" cy="65" r="5" fill="none" stroke="#c9a84c" strokeWidth="2" />
      <line x1="720" y1="105" x2="745" y2="105" stroke="#c9a84c" strokeWidth="2.5" />
      <circle cx="745" cy="105" r="5" fill="none" stroke="#c9a84c" strokeWidth="2" />
      <line x1="720" y1="145" x2="745" y2="145" stroke="#c9a84c" strokeWidth="2.5" />
      <circle cx="745" cy="145" r="5" fill="none" stroke="#c9a84c" strokeWidth="2" />

      {/* Chaser 1 — leading with quaffle */}
      <g transform="translate(280, 80)">
        <BroomstickPlayer color="#740001" direction={1} hasQuaffle />
      </g>

      {/* Chaser 2 — slightly behind */}
      <g transform="translate(160, 110)">
        <BroomstickPlayer color="#740001" direction={1} />
      </g>

      {/* Opposing Chaser */}
      <g transform="translate(430, 95) scale(-1,1)">
        <BroomstickPlayer color="#1A472A" direction={1} />
      </g>

      {/* Beater swinging */}
      <g transform="translate(80, 70)">
        <BeaterPlayer color="#740001" />
      </g>

      {/* Keeper near posts */}
      <g transform="translate(660, 88)">
        <BroomstickPlayer color="#0E1A40" direction={1} />
      </g>

      {/* Seeker diving down */}
      <g transform="translate(550, 55) rotate(25)">
        <BroomstickPlayer color="#F0C75E" direction={1} />
      </g>

      {/* Quaffle in flight */}
      <circle cx="360" cy="88" r="9" fill="#c0392b" />
      <path d="M358,82 Q364,85 362,92" stroke="rgba(0,0,0,0.3)" strokeWidth="1" fill="none" />

      {/* Snitch near seeker */}
      <circle cx="590" cy="100" r="5" fill="#d4a843" />
      <ellipse cx="582" cy="100" rx="7" ry="3" fill="rgba(212,168,67,0.4)" transform="rotate(-20,582,100)" />
      <ellipse cx="598" cy="100" rx="7" ry="3" fill="rgba(212,168,67,0.4)" transform="rotate(20,598,100)" />

      {/* Ground fog */}
      <ellipse cx="400" cy="215" rx="400" ry="20" fill="rgba(26,23,16,0.6)" />
    </svg>
  );
}

function KeeperScene() {
  return (
    <svg viewBox="0 0 500 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Posts */}
      <line x1="160" y1="20" x2="160" y2="160" stroke="#c9a84c" strokeWidth="4" />
      <line x1="250" y1="20" x2="250" y2="160" stroke="#c9a84c" strokeWidth="4" />
      <line x1="340" y1="20" x2="340" y2="160" stroke="#c9a84c" strokeWidth="4" />
      {/* Hoops */}
      <ellipse cx="160" cy="20" rx="14" ry="6" fill="none" stroke="#c9a84c" strokeWidth="3" />
      <ellipse cx="250" cy="20" rx="14" ry="6" fill="none" stroke="#c9a84c" strokeWidth="3" />
      <ellipse cx="340" cy="20" rx="14" ry="6" fill="none" stroke="#c9a84c" strokeWidth="3" />
      {/* Base bar */}
      <line x1="140" y1="160" x2="360" y2="160" stroke="#c9a84c" strokeWidth="3" />

      {/* Keeper on broom, arms out */}
      <g transform="translate(250, 85)">
        <BroomstickPlayer color="#0E1A40" direction={0} arms />
      </g>

      {/* Quaffle incoming */}
      <circle cx="60" cy="75" r="11" fill="#c0392b" />
      <path d="M57,68 Q65,72 63,80" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" fill="none" />
      {/* Motion lines */}
      <line x1="20" y1="72" x2="45" y2="74" stroke="#c0392b" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="22" y1="78" x2="47" y2="79" stroke="#c0392b" strokeWidth="1.5" strokeOpacity="0.3" />

      {/* Ground */}
      <rect x="0" y="168" width="500" height="12" fill="rgba(26,23,16,0.5)" />
    </svg>
  );
}

function SnitchScene() {
  return (
    <svg viewBox="0 0 500 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Trail lines for snitch */}
      {[[50,80],[90,60],[140,90],[200,50],[270,75]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={2-i*0.25} fill="rgba(212,168,67,0.3)" />
      ))}

      {/* Snitch */}
      <circle cx="310" cy="65" r="9" fill="url(#sg)" />
      <ellipse cx="295" cy="62" rx="16" ry="7" fill="rgba(212,168,67,0.35)" transform="rotate(-15,295,62)" />
      <ellipse cx="325" cy="62" rx="16" ry="7" fill="rgba(212,168,67,0.35)" transform="rotate(15,325,62)" />
      <circle cx="307" cy="61" r="3" fill="rgba(255,248,180,0.5)" />
      <defs>
        <radialGradient id="sg" cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#fff0a0" />
          <stop offset="50%" stopColor="#d4a020" />
          <stop offset="100%" stopColor="#7a4e00" />
        </radialGradient>
      </defs>

      {/* Seeker reaching out */}
      <g transform="translate(380, 55) rotate(15)">
        <BroomstickPlayer color="#740001" direction={-1} reaching />
      </g>

      {/* Ground */}
      <ellipse cx="250" cy="155" rx="250" ry="12" fill="rgba(26,23,16,0.5)" />
    </svg>
  );
}

function BroomstickPlayer({ color, direction = 1, hasQuaffle = false, arms = false, reaching = false }:
  { color: string; direction?: number; hasQuaffle?: boolean; arms?: boolean; reaching?: boolean }) {
  return (
    <g>
      {/* Broom handle */}
      <line x1={-30*direction} y1="8" x2={32*direction} y2="-2" stroke="#8B6914" strokeWidth="2.5" strokeLinecap="round" />
      {/* Broom bristles */}
      <path d={`M${32*direction},-2 L${44*direction},4 L${38*direction},-8 Z`} fill="#6b4f0a" />
      {/* Body */}
      <ellipse cx="0" cy="-4" rx="10" ry="7" fill={color} />
      {/* Head */}
      <circle cx={-3*direction} cy="-14" r="7" fill="#d4a57a" />
      {/* Robe */}
      <path d={`M-8,-4 L-12,10 L12,10 L8,-4 Z`} fill={color} opacity="0.85" />
      {/* Arms */}
      {arms && (
        <>
          <line x1="-10" y1="-2" x2="-22" y2="-12" stroke={color} strokeWidth="4" strokeLinecap="round" />
          <line x1="10" y1="-2" x2="22" y2="-12" stroke={color} strokeWidth="4" strokeLinecap="round" />
        </>
      )}
      {reaching && (
        <line x1={-12*direction} y1="-4" x2={-28*direction} y2="-14" stroke={color} strokeWidth="4" strokeLinecap="round" />
      )}
      {/* Quaffle */}
      {hasQuaffle && (
        <circle cx={-20*direction} cy="-4" r="7" fill="#c0392b" />
      )}
    </g>
  );
}

function BeaterPlayer({ color }: { color: string }) {
  return (
    <g>
      <line x1="-28" y1="8" x2="30" y2="-2" stroke="#8B6914" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M30,-2 L42,4 L36,-8 Z" fill="#6b4f0a" />
      <ellipse cx="0" cy="-4" rx="10" ry="7" fill={color} />
      <circle cx="-3" cy="-14" r="7" fill="#d4a57a" />
      <path d="M-8,-4 L-12,10 L12,10 L8,-4 Z" fill={color} opacity="0.85" />
      {/* Club raised */}
      <line x1="8" y1="-6" x2="26" y2="-22" stroke="#5c3d0a" strokeWidth="5" strokeLinecap="round" />
    </g>
  );
}

// ─── Chocolate Frog Cards: "Mix of Legends" ──────────────────────────────
// A collectible set discovered by catching the hopping chocolate frog.
// Portraits reuse the same art as the rosters page (see /public/players/).
// `color` is a bright, saturated accent that reads in BOTH Lumos & Nox — it's
// only ever used for borders/glows, never as a text background, so we don't
// need to worry about contrast against the card surface.

export type FrogCard = {
  id: string;
  name: string;
  role: string;        // Position, e.g. "Seeker"
  icon: string;        // Position icon (sitewide convention)
  house: string;       // House (or "Legendary" for the Snitch)
  image: string | null; // null → rendered as the golden Snitch orb
  color: string;       // Accent colour for the card's border/glow
  flavor: string;      // Collectible-card flavour text
  legendary?: boolean;
};

// Position icons follow the sitewide convention:
// Keeper 🥅, Chaser 🤾, Beater 🏏, Seeker 🟡. (🏆 stays reserved for wins.)
export const FROG_CARDS: FrogCard[] = [
  {
    id: 'harry-potter',
    name: 'Harry Potter',
    role: 'Seeker',
    icon: '🟡',
    house: 'Gryffindor',
    image: '/players/harry_potter_v9a.png',
    color: '#d23b34',
    flavor:
      'The youngest Seeker in a century. Caught the Snitch in his very first match — by very nearly swallowing it.',
  },
  {
    id: 'draco-malfoy',
    name: 'Draco Malfoy',
    role: 'Seeker',
    icon: '🟡',
    house: 'Slytherin',
    image: '/players/draco_malfoy.png',
    color: '#2f9e63',
    flavor:
      "Slytherin's Seeker, never seen without the newest broom. Fast, fearless, and famously sore about second place.",
  },
  {
    id: 'cedric-diggory',
    name: 'Cedric Diggory',
    role: 'Seeker',
    icon: '🟡',
    house: 'Hufflepuff',
    image: '/players/cedric_diggory.png',
    color: '#e0b13a',
    flavor:
      "Hufflepuff's captain and Seeker. Fair play above all — once offered a rematch he had every right to refuse.",
  },
  {
    id: 'cho-chang',
    name: 'Cho Chang',
    role: 'Seeker',
    icon: '🟡',
    house: 'Ravenclaw',
    image: '/players/cho_chang.png',
    color: '#6f9eff',
    flavor:
      "Ravenclaw's graceful Seeker. Quick on the turn and very nearly impossible to shake from a dive.",
  },
  {
    id: 'oliver-wood',
    name: 'Oliver Wood',
    role: 'Keeper',
    icon: '🥅',
    house: 'Gryffindor',
    image: '/players/oliver_wood.png',
    color: '#d23b34',
    flavor:
      "Gryffindor's devoted captain and Keeper. Would happily practise in a thunderstorm — and frequently has.",
  },
  {
    id: 'marcus-flint',
    name: 'Marcus Flint',
    role: 'Chaser',
    icon: '🤾',
    house: 'Slytherin',
    image: '/players/marcus_flint.png',
    color: '#2f9e63',
    flavor:
      "Slytherin's hard-charging captain and Chaser. Plays every angle — and, on occasion, a foul or two.",
  },
  {
    id: 'amy-ward',
    name: 'Amy Ward',
    role: 'Keeper',
    icon: '🥅',
    house: 'Slytherin',
    image: '/players/amy_ward_v11.png',
    color: '#d4a843',
    flavor:
      "★ Wildcard ★ Slytherin's iron Keeper and the league's worst-kept secret. Has never let a Quaffle past without a fight.",
  },
  {
    id: 'golden-snitch',
    name: 'The Golden Snitch',
    role: 'The Legendary Catch',
    icon: '✦',
    house: 'Legendary',
    image: null,
    color: '#e8b820',
    flavor:
      'Worth 150 points and the end of the game. Catch them all, and you have caught the rarest card of the lot.',
    legendary: true,
  },
];

export const TOTAL_CARDS = FROG_CARDS.length;

export function getCard(id: string): FrogCard | undefined {
  return FROG_CARDS.find((c) => c.id === id);
}

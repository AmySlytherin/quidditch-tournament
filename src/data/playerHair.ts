/**
 * Canonical hair colors for known characters from the books.
 * Made-up characters get a reasonable default based on name/origin.
 */
export const PLAYER_HAIR: Record<string, string> = {
  // ── Gryffindor ──────────────────────────────────────────────────────────
  'Harry Potter':       '#111111',  // Black, famously messy
  'Fred Weasley':       '#b03a08',  // Bright ginger
  'George Weasley':     '#b03a08',  // Bright ginger (identical twins)
  'Oliver Wood':        '#3a220e',  // Dark brown
  'Angelina Johnson':   '#111111',  // Black
  'Alicia Spinnet':     '#1e1008',  // Very dark brown
  'Katie Bell':         '#7a4e1a',  // Chestnut brown

  // ── Slytherin ───────────────────────────────────────────────────────────
  'Amy Ward':           '#2b1a0c',  // Dark brown (default — can update)
  'Draco Malfoy':       '#ddd8b0',  // Platinum blonde, slicked back
  'Cassius Warrington': '#2a1a08',  // Dark brown
  'Montague':           '#1e1410',  // Near black
  'Vaisey':             '#3a2810',  // Dark brown
  'Crabbe Sr.':         '#111111',  // Black
  'Goyle Sr.':          '#111111',  // Black

  // ── Hufflepuff ──────────────────────────────────────────────────────────
  'Cedric Diggory':     '#5a3318',  // Brown
  'Zacharias Smith':    '#b09040',  // Dirty blonde
  'Tamsin Applebee':    '#7a4e1a',  // Brown
  'Heidi Macavoy':      '#3a220e',  // Dark brown
  'Herbert Fleet':      '#5a3318',  // Brown
  'Anthony Rickett':    '#3a220e',  // Dark brown
  'Grant Page':         '#8a6030',  // Light brown

  // ── Ravenclaw ───────────────────────────────────────────────────────────
  'Cho Chang':          '#111111',  // Black, long
  'Roger Davies':       '#4a2e10',  // Brown
  'Duncan Inglebee':    '#2e1e0a',  // Dark brown
  'Jeremy Stretton':    '#8a6030',  // Brown
  'Grant Whitmore':     '#5a3318',  // Brown
  'Owen Cauldwell':     '#c09040',  // Blonde
  'Lucinda Talkalot':   '#c09040',  // Blonde

  // ── Holyhead Harpies ────────────────────────────────────────────────────
  'Gwenog Jones':       '#111111',  // Black
  'Wilda Griffiths':    '#3a220e',  // Dark brown
  'Valmai Morgan':      '#8a6030',  // Auburn
  'Glynnis Griffiths':  '#3a220e',  // Dark brown
  'Bronwen Sharpe':     '#111111',  // Black
  'Siwan Hobday':       '#7a4e1a',  // Brown
  'Meghan McCormack':   '#c09040',  // Blonde

  // ── Chudley Cannons ─────────────────────────────────────────────────────
  'Dragomir Gorgovitch':'#3a2010',  // Dark brown
  'Barry Ryan':         '#c09040',  // Dirty blonde
  'Tamara Finnegan':    '#b03a08',  // Ginger
  'Idris Oakby':        '#111111',  // Black
  'Rod Plumpton':       '#8a6030',  // Brown
  'Alasdair Maddock':   '#3a220e',  // Dark brown
  'Lennox Campbell':    '#3a220e',  // Dark brown

  // ── Tutshill Tornados ───────────────────────────────────────────────────
  'Roderick Plumpton':  '#8a6030',  // Brown
  'Iona Banks':         '#111111',  // Black
  'Rufus Scrimgeour':   '#c09040',  // Described as lion-like, tawny
  'Catriona McCormack': '#b03a08',  // Red (Scottish)
  'Molly McBride':      '#b03a08',  // Red (Irish/Scottish)
  'Patrick Digweed':    '#5a3318',  // Brown
  'Eamon Delaney':      '#b03a08',  // Red (Irish)

  // ── Wimbourne Wasps ─────────────────────────────────────────────────────
  'Luca Caruso':        '#111111',  // Black (Italian)
  'Cormac McLaggen':    '#c09040',  // Blonde (canon)
  'Thaddeus Pryce':     '#3a220e',  // Dark brown
  'Nell Vance':         '#4a2e10',  // Dark brown
  'Aiden Cross':        '#111111',  // Black
  'Bram Hollis':        '#5a3318',  // Brown
  'Seren Ashby':        '#c09040',  // Blonde

  // ── Appleby Arrows ──────────────────────────────────────────────────────
  'Finley Quine':       '#c09040',  // Blonde
  'Petra Hawke':        '#111111',  // Black
  'Magnus Tully':       '#3a220e',  // Dark brown
  'Isla Fairweather':   '#c09040',  // Blonde
  'Callum North':       '#5a3318',  // Brown
  'Rory Stonebridge':   '#3a220e',  // Dark brown
  'Jess Galway':        '#b03a08',  // Red (Irish)

  // ── Ballycastle Bats ────────────────────────────────────────────────────
  'Finbar Quigley':     '#b03a08',  // Red (Irish)
  'Siobhan Quigley':    '#b03a08',  // Red (Finbar's sister in canon)
  'Declan Mullet':      '#8a6030',  // Auburn
  'Aoife Brennan':      '#111111',  // Black
  'Cormac Daly':        '#5a3318',  // Brown
  'Séamus Rafferty':    '#b03a08',  // Red (Irish)
  'Brigid Shaughnessy': '#3a220e',  // Dark brown
};

export const DEFAULT_HAIR = '#2b1a0c';

export function getHairColor(name: string): string {
  return PLAYER_HAIR[name] ?? DEFAULT_HAIR;
}

/**
 * Generates gpt-image-1 portraits for all 4-team Hogwarts rosters.
 * Skips amy_ward_v10.png and lucinda_v2.png (already finalized).
 * Run: node scripts/generate-portraits.mjs
 */

import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'players');
fs.mkdirSync(OUT_DIR, { recursive: true });

const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const apiKey = envContent.match(/OPENAI_API_KEY=(.+)/)?.[1]?.trim();
if (!apiKey) { console.error('No OPENAI_API_KEY found'); process.exit(1); }

const openai = new OpenAI({ apiKey });

// Players with explicit, distinctive physical descriptors.
// Amy Ward and Lucinda Talkalot have finalized portraits — skip them.
const PLAYERS = [
  // ── GRYFFINDOR (scarlet and gold robes) ───────────────────────────────
  {
    name: 'Oliver Wood',
    file: 'oliver_wood.png',
    prompt: `Sports trading card portrait photograph of a teenage Scottish male Quidditch Keeper, 18 years old, short dark brown wavy hair, square athletic jaw, intense focused expression, muscular broad-shouldered build. Wearing scarlet and gold Quidditch robes, matching helmet pushed back on head. Front-facing headshot, looking directly at camera. Dark gradient background. Photorealistic, professional sports card style, studio lighting, sharp focus. No text, no logos.`,
  },
  {
    name: 'Angelina Johnson',
    file: 'angelina_johnson.png',
    prompt: `Sports trading card portrait photograph of a Black British teenage female Quidditch Chaser, 17 years old, tall athletic build, natural coily dark hair pulled back tightly, warm deep brown skin, sharp cheekbones, confident determined expression. Wearing scarlet and gold Quidditch robes, matching helmet. Front-facing headshot, looking directly at camera. Dark gradient background. Photorealistic, professional sports card style, studio lighting, sharp focus. No text, no logos.`,
  },
  {
    name: 'Alicia Spinnet',
    file: 'alicia_spinnet.png',
    prompt: `Sports trading card portrait photograph of a mixed-race teenage female Quidditch Chaser, 16 years old, warm golden-brown complexion, curly light brown shoulder-length hair loose around her face, friendly open expression, almond-shaped brown eyes. Wearing scarlet and gold Quidditch robes, matching helmet. Front-facing headshot, looking directly at camera. Dark gradient background. Photorealistic, professional sports card style, studio lighting, sharp focus. No text, no logos.`,
  },
  {
    name: 'Katie Bell',
    file: 'katie_bell.png',
    prompt: `Sports trading card portrait photograph of a white British teenage female Quidditch Chaser, 16 years old, straight long blonde hair, pale blue eyes, fair complexion, gentle but focused expression, soft features. Wearing scarlet and gold Quidditch robes, matching helmet. Front-facing headshot, looking directly at camera. Dark gradient background. Photorealistic, professional sports card style, studio lighting, sharp focus. No text, no logos.`,
  },
  {
    name: 'Fred Weasley',
    file: 'fred_weasley.png',
    prompt: `Sports trading card portrait photograph of a white British teenage male Quidditch Beater, 17 years old, tall, vivid bright orange-red straight hair, very heavy freckles across nose and cheeks, gap-toothed wide grin, mischievous cheerful expression, broad build. Wearing scarlet and gold Quidditch robes, matching helmet pushed back. Front-facing headshot, looking directly at camera. Dark gradient background. Photorealistic, professional sports card style, studio lighting, sharp focus. No text, no logos.`,
  },
  {
    name: 'George Weasley',
    file: 'george_weasley.png',
    prompt: `Sports trading card portrait photograph of a white British teenage male Quidditch Beater, 17 years old, tall, vivid bright orange-red straight hair, very heavy freckles across nose and cheeks, slight knowing smirk, one eyebrow slightly raised, broad build. Wearing scarlet and gold Quidditch robes, matching helmet pushed back. Front-facing headshot, looking directly at camera. Dark gradient background. Photorealistic, professional sports card style, studio lighting, sharp focus. No text, no logos.`,
  },
  {
    // Harry Potter — using description only, no name, no scar mention
    name: 'Harry Potter',
    file: 'harry_potter.png',
    prompt: `Sports trading card portrait photograph of a white teenage male Quidditch Seeker, 15 years old, slender build, very untidy jet-black hair sticking up in all directions, round thin wire-frame glasses, bright alert green eyes, slightly small for his age. Wearing scarlet and gold Quidditch robes, matching helmet pushed back. Front-facing headshot, looking directly at camera. Dark gradient background. Photorealistic, professional sports card style, studio lighting, sharp focus. No text, no logos.`,
  },

  // ── SLYTHERIN (emerald green and silver robes) ─────────────────────────
  {
    name: 'Marcus Flint',
    file: 'marcus_flint.png',
    prompt: `Sports trading card portrait photograph of a white British teenage male Quidditch Chaser, 18 years old, heavyset jaw, brutish square face, black straggly lank hair falling past his ears, broad flat nose, slightly crooked teeth visible in a hard expression, thick-necked. Wearing emerald green and silver Quidditch robes, matching helmet. Front-facing headshot, looking directly at camera. Dark gradient background. Photorealistic, professional sports card style, studio lighting, sharp focus. No text, no logos.`,
  },
  {
    name: 'Adrian Pucey',
    file: 'adrian_pucey.png',
    prompt: `Sports trading card portrait photograph of a white British teenage male Quidditch Chaser, 17 years old, lean wiry athletic build, very dark brown short neat hair, sharp grey eyes, angular jaw, cool unreadable expression. Wearing emerald green and silver Quidditch robes, matching helmet. Front-facing headshot, looking directly at camera. Dark gradient background. Photorealistic, professional sports card style, studio lighting, sharp focus. No text, no logos.`,
  },
  {
    name: 'Cassius Warrington',
    file: 'cassius_warrington.png',
    prompt: `Sports trading card portrait photograph of a white British teenage male Quidditch Chaser, 18 years old, broad imposing face, wide-set features, close-cropped sandy brown hair, heavy brow, stern intimidating expression, broad-shouldered stocky build. Wearing emerald green and silver Quidditch robes, matching helmet. Front-facing headshot, looking directly at camera. Dark gradient background. Photorealistic, professional sports card style, studio lighting, sharp focus. No text, no logos.`,
  },
  {
    name: 'Vincent Crabbe',
    file: 'vincent_crabbe.png',
    prompt: `Sports trading card portrait photograph of a white British teenage male Quidditch Beater, 16 years old, very stocky heavy build, round fleshy face, short thick black hair, small eyes, blank vacant expression. Wearing emerald green and silver Quidditch robes, matching helmet. Front-facing headshot, looking directly at camera. Dark gradient background. Photorealistic, professional sports card style, studio lighting, sharp focus. No text, no logos.`,
  },
  {
    name: 'Gregory Goyle',
    file: 'gregory_goyle.png',
    prompt: `Sports trading card portrait photograph of a white British teenage male Quidditch Beater, 16 years old, very large heavy build, taller than average, flat broad nose, close-cropped dark hair, wide jaw, slow dull expression. Wearing emerald green and silver Quidditch robes, matching helmet. Front-facing headshot, looking directly at camera. Dark gradient background. Photorealistic, professional sports card style, studio lighting, sharp focus. No text, no logos.`,
  },
  {
    name: 'Draco Malfoy',
    file: 'draco_malfoy.png',
    prompt: `Sports trading card portrait photograph of a white British teenage male Quidditch Seeker, 15 years old, pale sharp aristocratic features, platinum blonde hair slicked back severely, cold pale grey eyes, thin lips in a contemptuous sneer, lean slight build. Wearing emerald green and silver Quidditch robes, matching helmet tucked under arm. Front-facing headshot, looking directly at camera. Dark gradient background. Photorealistic, professional sports card style, studio lighting, sharp focus. No text, no logos.`,
  },

  // ── HUFFLEPUFF (black and yellow robes) ───────────────────────────────
  {
    name: 'Herbert Fleet',
    file: 'herbert_fleet.png',
    prompt: `Sports trading card portrait photograph of a white British teenage male Quidditch Keeper, 17 years old, tall lanky build, short reddish-brown hair, long thin face, prominent nose, earnest friendly expression. Wearing black and yellow Quidditch robes, matching helmet. Front-facing headshot, looking directly at camera. Dark gradient background. Photorealistic, professional sports card style, studio lighting, sharp focus. No text, no logos.`,
  },
  {
    name: 'Zacharias Smith',
    file: 'zacharias_smith.png',
    prompt: `Sports trading card portrait photograph of a white British teenage male Quidditch Chaser, 16 years old, medium build, wavy blonde hair slightly swept to the side, blue eyes, faintly superior expression as if mildly unimpressed. Wearing black and yellow Quidditch robes, matching helmet. Front-facing headshot, looking directly at camera. Dark gradient background. Photorealistic, professional sports card style, studio lighting, sharp focus. No text, no logos.`,
  },
  {
    name: 'Tamsin Applebee',
    file: 'tamsin_applebee.png',
    prompt: `Sports trading card portrait photograph of a Black British teenage female Quidditch Chaser, 16 years old, short natural hair, warm medium-dark brown skin, round cheerful face with dimples, bright wide smile, athletic build. Wearing black and yellow Quidditch robes, matching helmet. Front-facing headshot, looking directly at camera. Dark gradient background. Photorealistic, professional sports card style, studio lighting, sharp focus. No text, no logos.`,
  },
  {
    name: 'Heidi Macavoy',
    file: 'heidi_macavoy.png',
    prompt: `Sports trading card portrait photograph of an East Asian British teenage female Quidditch Chaser, 16 years old, straight dark brown hair in a low ponytail, calm focused expression, high cheekbones, athletic lean build, light olive skin. Wearing black and yellow Quidditch robes, matching helmet. Front-facing headshot, looking directly at camera. Dark gradient background. Photorealistic, professional sports card style, studio lighting, sharp focus. No text, no logos.`,
  },
  {
    name: "Maxine O'Flaherty",
    file: 'maxine_o_flaherty.png',
    prompt: `Sports trading card portrait photograph of a white Irish teenage female Quidditch Beater, 16 years old, stocky solid athletic build, very pale freckled skin, bright auburn curly hair cropped short, green eyes, fierce competitive expression. Wearing black and yellow Quidditch robes, matching helmet. Front-facing headshot, looking directly at camera. Dark gradient background. Photorealistic, professional sports card style, studio lighting, sharp focus. No text, no logos.`,
  },
  {
    name: 'Anthony Rickett',
    file: 'anthony_rickett.png',
    prompt: `Sports trading card portrait photograph of a South Asian British teenage male Quidditch Beater, 17 years old, medium-dark complexion, short neat black hair, strong athletic build, serious steady expression, dark brown eyes. Wearing black and yellow Quidditch robes, matching helmet. Front-facing headshot, looking directly at camera. Dark gradient background. Photorealistic, professional sports card style, studio lighting, sharp focus. No text, no logos.`,
  },
  {
    name: 'Cedric Diggory',
    file: 'cedric_diggory.png',
    prompt: `Sports trading card portrait photograph of a white British teenage male Quidditch Seeker, 17 years old, exceptionally handsome, neatly combed dark brown hair, clear grey eyes, strong jaw, warm genuine smile, tall broad-shouldered athletic build, natural easy confidence. Wearing black and yellow Quidditch robes, matching helmet pushed back. Front-facing headshot, looking directly at camera. Dark gradient background. Photorealistic, professional sports card style, studio lighting, sharp focus. No text, no logos.`,
  },

  // ── RAVENCLAW (blue and bronze robes) ─────────────────────────────────
  {
    name: 'Roger Davies',
    file: 'roger_davies.png',
    prompt: `Sports trading card portrait photograph of a white British teenage male Quidditch Chaser, 17 years old, handsome athletic build, wavy chestnut brown hair, dark brown eyes, confident charming smile, strong jawline. Wearing blue and bronze Quidditch robes, matching helmet. Front-facing headshot, looking directly at camera. Dark gradient background. Photorealistic, professional sports card style, studio lighting, sharp focus. No text, no logos.`,
  },
  {
    name: 'Jeremy Stretton',
    file: 'jeremy_stretton.png',
    prompt: `Sports trading card portrait photograph of a white British teenage male Quidditch Chaser, 16 years old, lean build, loose curly dirty-blonde hair, hazel eyes, light scatter of freckles, thoughtful contemplative expression. Wearing blue and bronze Quidditch robes, matching helmet. Front-facing headshot, looking directly at camera. Dark gradient background. Photorealistic, professional sports card style, studio lighting, sharp focus. No text, no logos.`,
  },
  {
    name: 'Duncan Inglebee',
    file: 'duncan_inglebee.png',
    prompt: `Sports trading card portrait photograph of a Black British teenage male Quidditch Chaser, 17 years old, very close-cropped black hair, tall angular face, sharp defined cheekbones, dark skin, focused serious expression, lean athletic build. Wearing blue and bronze Quidditch robes, matching helmet. Front-facing headshot, looking directly at camera. Dark gradient background. Photorealistic, professional sports card style, studio lighting, sharp focus. No text, no logos.`,
  },
  {
    name: 'Jason Samuels',
    file: 'jason_samuels.png',
    prompt: `Sports trading card portrait photograph of a white British teenage male Quidditch Beater, 17 years old, short neat light brown hair, medium stocky build, oval face, steady reliable expression, calm brown eyes. Wearing blue and bronze Quidditch robes, matching helmet. Front-facing headshot, looking directly at camera. Dark gradient background. Photorealistic, professional sports card style, studio lighting, sharp focus. No text, no logos.`,
  },
  {
    name: 'Grant Whitmore',
    file: 'grant_whitmore.png',
    prompt: `Sports trading card portrait photograph of a white British teenage male Quidditch Beater, 16 years old, messy sandy blonde hair, light freckles, blue-grey eyes, easygoing relaxed expression, medium athletic build. Wearing blue and bronze Quidditch robes, matching helmet. Front-facing headshot, looking directly at camera. Dark gradient background. Photorealistic, professional sports card style, studio lighting, sharp focus. No text, no logos.`,
  },
  {
    name: 'Cho Chang',
    file: 'cho_chang.png',
    prompt: `Sports trading card portrait photograph of an East Asian British teenage female Quidditch Seeker, 16 years old, long straight jet-black hair loose around her shoulders, dark eyes, graceful delicate features, fair light skin, poised elegant expression, slender athletic build. Wearing blue and bronze Quidditch robes, matching helmet. Front-facing headshot, looking directly at camera. Dark gradient background. Photorealistic, professional sports card style, studio lighting, sharp focus. No text, no logos.`,
  },
];

async function generateAll() {
  let generated = 0;
  let skipped = 0;

  for (const player of PLAYERS) {
    const file = path.join(OUT_DIR, player.file);
    if (fs.existsSync(file)) {
      console.log(`  skip  ${player.name} (already exists)`);
      skipped++;
      continue;
    }

    process.stdout.write(`  gen   ${player.name} ... `);
    try {
      const response = await openai.images.generate({
        model: 'gpt-image-1',
        prompt: player.prompt,
        n: 1,
        size: '1024x1024',
        quality: 'medium',
        output_format: 'png',
      });

      const b64 = response.data[0].b64_json;
      fs.writeFileSync(file, Buffer.from(b64, 'base64'));
      console.log('done');
      generated++;

      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
    }
  }

  console.log(`\nDone. Generated: ${generated}, Skipped: ${skipped}`);
}

generateAll();

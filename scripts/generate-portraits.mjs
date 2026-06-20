/**
 * Generates DALL-E portrait images for every player and saves them to public/players/.
 * Run once: node scripts/generate-portraits.mjs
 */

import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'players');
fs.mkdirSync(OUT_DIR, { recursive: true });

// Load API key from .env.local
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const apiKey = envContent.match(/OPENAI_API_KEY=(.+)/)?.[1]?.trim();
if (!apiKey) { console.error('No OPENAI_API_KEY found'); process.exit(1); }

const openai = new OpenAI({ apiKey });

const FEMALE_PLAYERS = new Set([
  'Amy Ward',
  'Angelina Johnson', 'Alicia Spinnet', 'Katie Bell',
  'Gwenog Jones', 'Wilda Griffiths', 'Valmai Morgan', 'Glynnis Griffiths',
  'Bronwen Sharpe', 'Siwan Hobday', 'Meghan McCormack',
  'Cho Chang', 'Tamsin Applebee', 'Heidi Macavoy',
  'Tamara Finnegan', 'Iona Banks', 'Catriona McCormack', 'Molly McBride',
  'Nell Vance', 'Seren Ashby',
  'Petra Hawke', 'Isla Fairweather', 'Jess Galway',
  'Siobhan Quigley', 'Aoife Brennan', 'Brigid Shaughnessy',
]);

// Team uniform colors for the prompt
const TEAM_UNIFORMS = {
  gryffindor: 'scarlet and gold',
  slytherin:  'emerald green and silver',
  hufflepuff: 'black and yellow',
  ravenclaw:  'blue and bronze',
  harpies:    'dark green and gold',
  cannons:    'orange and black',
  tornados:   'royal blue and silver',
  wasps:      'yellow and black',
  arrows:     'teal and white',
  bats:       'black and red',
};

const PLAYERS = [
  // Gryffindor
  { name: 'Oliver Wood',       teamId: 'gryffindor', position: 'Keeper'  },
  { name: 'Angelina Johnson',  teamId: 'gryffindor', position: 'Chaser'  },
  { name: 'Alicia Spinnet',    teamId: 'gryffindor', position: 'Chaser'  },
  { name: 'Katie Bell',        teamId: 'gryffindor', position: 'Chaser'  },
  { name: 'Fred Weasley',      teamId: 'gryffindor', position: 'Beater'  },
  { name: 'George Weasley',    teamId: 'gryffindor', position: 'Beater'  },
  { name: 'Harry Potter',      teamId: 'gryffindor', position: 'Seeker'  },
  // Slytherin
  { name: 'Amy Ward',          teamId: 'slytherin',  position: 'Keeper'  },
  { name: 'Cassius Warrington',teamId: 'slytherin',  position: 'Chaser'  },
  { name: 'Montague',          teamId: 'slytherin',  position: 'Chaser'  },
  { name: 'Vaisey',            teamId: 'slytherin',  position: 'Chaser'  },
  { name: 'Crabbe Sr.',        teamId: 'slytherin',  position: 'Beater'  },
  { name: 'Goyle Sr.',         teamId: 'slytherin',  position: 'Beater'  },
  { name: 'Draco Malfoy',      teamId: 'slytherin',  position: 'Seeker'  },
  // Hufflepuff
  { name: 'Cedric Diggory',    teamId: 'hufflepuff', position: 'Seeker'  },
  { name: 'Zacharias Smith',   teamId: 'hufflepuff', position: 'Chaser'  },
  { name: 'Tamsin Applebee',   teamId: 'hufflepuff', position: 'Chaser'  },
  { name: 'Heidi Macavoy',     teamId: 'hufflepuff', position: 'Chaser'  },
  { name: 'Herbert Fleet',     teamId: 'hufflepuff', position: 'Beater'  },
  { name: 'Anthony Rickett',   teamId: 'hufflepuff', position: 'Beater'  },
  { name: 'Grant Page',        teamId: 'hufflepuff', position: 'Keeper'  },
  // Ravenclaw
  { name: 'Roger Davies',      teamId: 'ravenclaw',  position: 'Chaser'  },
  { name: 'Cho Chang',         teamId: 'ravenclaw',  position: 'Seeker'  },
  { name: 'Duncan Inglebee',   teamId: 'ravenclaw',  position: 'Chaser'  },
  { name: 'Jeremy Stretton',   teamId: 'ravenclaw',  position: 'Chaser'  },
  { name: 'Grant Whitmore',    teamId: 'ravenclaw',  position: 'Beater'  },
  { name: 'Owen Cauldwell',    teamId: 'ravenclaw',  position: 'Beater'  },
  { name: 'Lucinda Talkalot',  teamId: 'ravenclaw',  position: 'Keeper'  },
  // Harpies
  { name: 'Gwenog Jones',      teamId: 'harpies',    position: 'Beater'  },
  { name: 'Wilda Griffiths',   teamId: 'harpies',    position: 'Chaser'  },
  { name: 'Valmai Morgan',     teamId: 'harpies',    position: 'Chaser'  },
  { name: 'Glynnis Griffiths', teamId: 'harpies',    position: 'Chaser'  },
  { name: 'Bronwen Sharpe',    teamId: 'harpies',    position: 'Beater'  },
  { name: 'Siwan Hobday',      teamId: 'harpies',    position: 'Seeker'  },
  { name: 'Meghan McCormack',  teamId: 'harpies',    position: 'Keeper'  },
  // Cannons
  { name: 'Dragomir Gorgovitch',teamId:'cannons',    position: 'Chaser'  },
  { name: 'Barry Ryan',        teamId: 'cannons',    position: 'Keeper'  },
  { name: 'Tamara Finnegan',   teamId: 'cannons',    position: 'Chaser'  },
  { name: 'Idris Oakby',       teamId: 'cannons',    position: 'Seeker'  },
  { name: 'Rod Plumpton',      teamId: 'cannons',    position: 'Beater'  },
  { name: 'Alasdair Maddock',  teamId: 'cannons',    position: 'Beater'  },
  { name: 'Lennox Campbell',   teamId: 'cannons',    position: 'Chaser'  },
  // Tornados
  { name: 'Roderick Plumpton', teamId: 'tornados',   position: 'Seeker'  },
  { name: 'Iona Banks',        teamId: 'tornados',   position: 'Chaser'  },
  { name: 'Rufus Scrimgeour',  teamId: 'tornados',   position: 'Beater'  },
  { name: 'Catriona McCormack',teamId: 'tornados',   position: 'Chaser'  },
  { name: 'Molly McBride',     teamId: 'tornados',   position: 'Chaser'  },
  { name: 'Patrick Digweed',   teamId: 'tornados',   position: 'Beater'  },
  { name: 'Eamon Delaney',     teamId: 'tornados',   position: 'Keeper'  },
  // Wasps
  { name: 'Luca Caruso',       teamId: 'wasps',      position: 'Seeker'  },
  { name: 'Cormac McLaggen',   teamId: 'wasps',      position: 'Keeper'  },
  { name: 'Thaddeus Pryce',    teamId: 'wasps',      position: 'Chaser'  },
  { name: 'Nell Vance',        teamId: 'wasps',      position: 'Chaser'  },
  { name: 'Aiden Cross',       teamId: 'wasps',      position: 'Chaser'  },
  { name: 'Bram Hollis',       teamId: 'wasps',      position: 'Beater'  },
  { name: 'Seren Ashby',       teamId: 'wasps',      position: 'Beater'  },
  // Arrows
  { name: 'Finley Quine',      teamId: 'arrows',     position: 'Seeker'  },
  { name: 'Petra Hawke',       teamId: 'arrows',     position: 'Keeper'  },
  { name: 'Magnus Tully',      teamId: 'arrows',     position: 'Chaser'  },
  { name: 'Isla Fairweather',  teamId: 'arrows',     position: 'Chaser'  },
  { name: 'Callum North',      teamId: 'arrows',     position: 'Chaser'  },
  { name: 'Rory Stonebridge',  teamId: 'arrows',     position: 'Beater'  },
  { name: 'Jess Galway',       teamId: 'arrows',     position: 'Beater'  },
  // Bats
  { name: 'Finbar Quigley',    teamId: 'bats',       position: 'Seeker'  },
  { name: 'Siobhan Quigley',   teamId: 'bats',       position: 'Keeper'  },
  { name: 'Declan Mullet',     teamId: 'bats',       position: 'Chaser'  },
  { name: 'Aoife Brennan',     teamId: 'bats',       position: 'Chaser'  },
  { name: 'Cormac Daly',       teamId: 'bats',       position: 'Chaser'  },
  { name: 'Séamus Rafferty',   teamId: 'bats',       position: 'Beater'  },
  { name: 'Brigid Shaughnessy',teamId: 'bats',       position: 'Beater'  },
];

function fileName(name) {
  return name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() + '.png';
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

function buildPrompt(player) {
  const gender = FEMALE_PLAYERS.has(player.name) ? 'woman' : 'man';
  const uniform = TEAM_UNIFORMS[player.teamId];
  return (
    `Sports trading card portrait photograph of a ${gender} named ${player.name}, ` +
    `a Quidditch ${player.position}. ` +
    `Wearing ${uniform} Quidditch robes and a matching helmet. ` +
    `Front-facing headshot, looking directly at the camera with a neutral confident expression. ` +
    `Neutral dark gradient background. Photorealistic digital art, highly detailed, ` +
    `professional sports card style, sharp focus, studio lighting. ` +
    `No text, no logos.`
  );
}

async function generateAll() {
  let generated = 0;
  let skipped = 0;

  for (const player of PLAYERS) {
    const file = path.join(OUT_DIR, fileName(player.name));
    if (fs.existsSync(file)) {
      console.log(`  skip  ${player.name} (already exists)`);
      skipped++;
      continue;
    }

    process.stdout.write(`  gen   ${player.name} ... `);
    try {
      const response = await openai.images.generate({
        model: 'gpt-image-1',
        prompt: buildPrompt(player),
        n: 1,
        size: '1024x1024',
        quality: 'medium',
        output_format: 'png',
      });

      const b64 = response.data[0].b64_json;
      if (b64) {
        fs.writeFileSync(file, Buffer.from(b64, 'base64'));
      } else {
        const url = response.data[0].url;
        await downloadFile(url, file);
      }
      console.log('done');
      generated++;

      // Slight pause to avoid rate limiting
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
    }
  }

  console.log(`\nDone. Generated: ${generated}, Skipped (already existed): ${skipped}`);
}

generateAll();

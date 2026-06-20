# Quidditch League Tournament Tracker

A Next.js website for tracking standings, match results, and team stats across a simulated Quidditch tournament season.

---

## How to run it

1. Open a terminal
2. Navigate to this folder:
   ```
   cd /Users/amyward/Documents/quidditch-tournament
   ```
3. Start the dev server:
   ```
   npm run dev
   ```
4. Open your browser and go to: **http://localhost:3000**

To stop the server, press `Ctrl + C` in the terminal.

---

## Pages

| URL | What you'll find |
|-----|-----------------|
| http://localhost:3000 | League standings — sortable table, click any column header to re-sort |
| http://localhost:3000/schedule | All 45 matches grouped by round |
| http://localhost:3000/teams | All 10 teams with a summary card each |
| http://localhost:3000/teams/gryffindor | A team's full page — roster, match history, head-to-head records |
| http://localhost:3000/matches/match-1 | A match detail page — scoreline, scoring timeline, points breakdown |

You can also use the **nav bar at the top** to jump between sections, and the **"Jump to team" dropdown** in the top-right to go straight to any team's page.

### All team URLs
- `/teams/gryffindor` — Gryffindor Lions
- `/teams/slytherin` — Slytherin Serpents
- `/teams/hufflepuff` — Hufflepuff Badgers
- `/teams/ravenclaw` — Ravenclaw Eagles
- `/teams/harpies` — Holyhead Harpies
- `/teams/cannons` — Chudley Cannons
- `/teams/tornados` — Tutshill Tornados
- `/teams/wasps` — Wimbourne Wasps
- `/teams/arrows` — Appleby Arrows
- `/teams/bats` — Ballycastle Bats

---

## How the data works

All match data is simulated and lives in `src/data/simulation.ts`. It uses a seeded random number generator so the results are always the same — 45 matches across a 9-round round-robin season. To regenerate with different results, change the seed number at the top of that file.

Team rosters, colors, and names are in `src/data/teams.ts`.

Standings are computed on the fly from match results in `src/lib/standings.ts` — nothing is hardcoded.

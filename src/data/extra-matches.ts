/**
 * Real match results added as the season progresses.
 *
 * To add a new match, copy an existing entry and update the values:
 *   - date: 'YYYY-MM-DD'
 *   - round: next round number
 *   - homeId / awayId: 'gryffindor' | 'slytherin' | 'hufflepuff' | 'ravenclaw'
 *   - homeQuaffleGoals / awayQuaffleGoals: Quaffle goals only (each worth 10 pts)
 *   - snitchCaughtBy: 'home' or 'away'
 *   - snitchCatcher: the seeker's full name
 *   - durationMinutes: how long the match lasted
 */

import { Match, ScoringEvent, MatchSide } from './types';
import { TEAMS } from './teams';

function buildTimeline(
  homeId: string, awayId: string,
  homeGoals: number, awayGoals: number,
  snitchCaughtBy: MatchSide, snitchCatcher: string, duration: number
): ScoringEvent[] {
  const homeChasers = TEAMS.find((t) => t.id === homeId)!.roster
    .filter((p) => p.position === 'Chaser').map((p) => p.name);
  const awayChasers = TEAMS.find((t) => t.id === awayId)!.roster
    .filter((p) => p.position === 'Chaser').map((p) => p.name);

  const events: { minute: number; side: MatchSide; type: 'quaffle' | 'snitch'; player: string }[] = [];
  const step = Math.floor(duration / (homeGoals + awayGoals + 2));
  let tick = step;

  let h = 0, a = 0;
  while (h < homeGoals || a < awayGoals) {
    if (h < homeGoals) {
      events.push({ minute: tick, side: 'home', type: 'quaffle', player: homeChasers[h % homeChasers.length] });
      tick += step; h++;
    }
    if (a < awayGoals) {
      events.push({ minute: tick, side: 'away', type: 'quaffle', player: awayChasers[a % awayChasers.length] });
      tick += step; a++;
    }
  }
  events.sort((ev1, ev2) => ev1.minute - ev2.minute);
  events.push({ minute: duration, side: snitchCaughtBy, type: 'snitch', player: snitchCatcher });

  let hs = 0, as = 0;
  return events.map((e) => {
    if (e.type === 'quaffle') { if (e.side === 'home') hs += 10; else as += 10; }
    else                      { if (e.side === 'home') hs += 150; else as += 150; }
    return { minute: e.minute, type: e.type, side: e.side, player: e.player,
      points: e.type === 'quaffle' ? 10 : 150, homeScoreAfter: hs, awayScoreAfter: as } satisfies ScoringEvent;
  });
}

function makeMatch(
  id: string, date: string, round: number,
  homeId: string, awayId: string,
  homeQuaffleGoals: number, awayQuaffleGoals: number,
  snitchCaughtBy: MatchSide, snitchCatcher: string, durationMinutes: number
): Match {
  return {
    id, date, round, homeTeamId: homeId, awayTeamId: awayId,
    homeQuaffleGoals, awayQuaffleGoals, snitchCaughtBy, snitchCatcher, durationMinutes,
    timeline: buildTimeline(homeId, awayId, homeQuaffleGoals, awayQuaffleGoals,
      snitchCaughtBy, snitchCatcher, durationMinutes),
  };
}

// ─── Add new match results below ───────────────────────────────────────────

export const EXTRA_MATCHES: Match[] = [
  // Round 1 — 7 Sep 2024 — Gryffindor 250 – Slytherin 190
  // Harry Potter caught the snitch (150 pts); Gryffindor 10 quaffle goals, Slytherin 19
  makeMatch('match-1', '2024-09-07', 1, 'gryffindor', 'slytherin', 10, 19, 'home', 'Harry Potter', 95),

  // Round 6 — 12 Oct 2024 — Hufflepuff 240 – Ravenclaw 140
  // Cedric Diggory caught the snitch (150 pts); Hufflepuff 9 quaffle goals, Ravenclaw 14
  makeMatch('match-6', '2024-10-12', 6, 'hufflepuff', 'ravenclaw', 9, 14, 'home', 'Cedric Diggory', 110),
];

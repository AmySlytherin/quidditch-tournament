/**
 * Deterministic seeded PRNG + match simulation for the Hogwarts Quidditch season.
 * All randomness flows through `seededRand` so results are stable across builds.
 */

import { Match, ScoringEvent, MatchSide } from './types';
import { TEAMS } from './teams';

// Mulberry32 seeded PRNG
function makeRng(seed: number) {
  let s = seed;
  return function (): number {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rng = makeRng(20240449); // fixed seed → reproducible season

function randInt(min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function randChoice<T>(arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

// Team strength ratings — canon-based
const STRENGTH: Record<string, number> = {
  gryffindor: 0.84, // wins the cup most years, Harry is exceptional
  slytherin:  0.78, // well-funded, dirty tactics, Draco is capable
  ravenclaw:  0.70, // solid, Cho is talented
  hufflepuff: 0.66, // fair players, Cedric is brilliant but team depth is lighter
};

function seekerCatchProb(teamId: string): number {
  return 0.35 + STRENGTH[teamId] * 0.3;
}

function buildTimeline(
  homeId: string,
  awayId: string,
  homeGoals: number,
  awayGoals: number,
  snitchCaughtBy: MatchSide,
  snitchCatcher: string,
  duration: number
): ScoringEvent[] {
  const homeTeam = TEAMS.find((t) => t.id === homeId)!;
  const awayTeam = TEAMS.find((t) => t.id === awayId)!;
  const homeChasers = homeTeam.roster.filter((p) => p.position === 'Chaser').map((p) => p.name);
  const awayChasers = awayTeam.roster.filter((p) => p.position === 'Chaser').map((p) => p.name);

  type Pending = { minute: number; side: MatchSide; type: 'quaffle' | 'snitch'; player: string };
  const events: Pending[] = [];

  const usedMinutes = new Set<number>();
  const getMinute = (max: number): number => {
    let m: number;
    do { m = randInt(1, max - 1); } while (usedMinutes.has(m));
    usedMinutes.add(m);
    return m;
  };

  for (let i = 0; i < homeGoals; i++) {
    events.push({ minute: getMinute(duration), side: 'home', type: 'quaffle', player: randChoice(homeChasers) });
  }
  for (let i = 0; i < awayGoals; i++) {
    events.push({ minute: getMinute(duration), side: 'away', type: 'quaffle', player: randChoice(awayChasers) });
  }
  events.sort((a, b) => a.minute - b.minute);
  events.push({ minute: duration, side: snitchCaughtBy, type: 'snitch', player: snitchCatcher });

  let homeScore = 0;
  let awayScore = 0;
  return events.map((e) => {
    if (e.type === 'quaffle') {
      if (e.side === 'home') homeScore += 10; else awayScore += 10;
    } else {
      if (e.side === 'home') homeScore += 150; else awayScore += 150;
    }
    return {
      minute: e.minute,
      type: e.type,
      side: e.side,
      player: e.player,
      points: e.type === 'quaffle' ? 10 : 150,
      homeScoreAfter: homeScore,
      awayScoreAfter: awayScore,
    } satisfies ScoringEvent;
  });
}

function simulateMatch(
  id: string,
  date: string,
  round: number,
  homeId: string,
  awayId: string
): Match {
  const homeStr = STRENGTH[homeId];
  const awayStr = STRENGTH[awayId];

  const homeGoals = Math.max(0, Math.round(homeStr * 14 + (rng() - 0.5) * 10));
  const awayGoals = Math.max(0, Math.round(awayStr * 12 + (rng() - 0.5) * 10));

  const homeSnitchProb = seekerCatchProb(homeId);
  const awaySnitchProb = seekerCatchProb(awayId);
  const snitchCaughtBy: MatchSide = rng() < homeSnitchProb / (homeSnitchProb + awaySnitchProb) ? 'home' : 'away';

  const catchingTeam = TEAMS.find((t) => t.id === (snitchCaughtBy === 'home' ? homeId : awayId))!;
  const seeker = catchingTeam.roster.find((p) => p.position === 'Seeker')!;
  const duration = randInt(45, 180);
  const timeline = buildTimeline(homeId, awayId, homeGoals, awayGoals, snitchCaughtBy, seeker.name, duration);

  return { id, date, round, homeTeamId: homeId, awayTeamId: awayId,
    homeQuaffleGoals: homeGoals, awayQuaffleGoals: awayGoals,
    snitchCaughtBy, snitchCatcher: seeker.name, durationMinutes: duration, timeline };
}

// 2 full round-robins = 12 matches, each team plays 6 games
function generateSchedule(): Match[] {
  const ids = TEAMS.map((t) => t.id);
  // All 6 unique pairings
  const pairs: [string, string][] = [];
  for (let i = 0; i < ids.length; i++)
    for (let j = i + 1; j < ids.length; j++)
      pairs.push([ids[i], ids[j]]);

  const matches: Match[] = [];
  let matchNum = 0;
  const startDate = new Date('2024-09-07');

  for (let roundSet = 0; roundSet < 2; roundSet++) {
    for (let p = 0; p < pairs.length; p++) {
      const round = roundSet * pairs.length + p + 1;
      // Alternate home/away each round set
      const [a, b] = pairs[p];
      const [home, away] = roundSet % 2 === 0 ? [a, b] : [b, a];

      const matchDate = new Date(startDate);
      matchDate.setDate(startDate.getDate() + (roundSet * pairs.length + p) * 7);
      const dateStr = matchDate.toISOString().split('T')[0];

      matchNum++;
      matches.push(simulateMatch(`match-${matchNum}`, dateStr, round, home, away));
    }
  }

  return matches;
}

export const MATCHES: Match[] = generateSchedule();

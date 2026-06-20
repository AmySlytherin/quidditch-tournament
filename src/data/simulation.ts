/**
 * Deterministic seeded PRNG + match simulation for the Quidditch League season.
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

const rng = makeRng(20240901); // fixed seed → reproducible season

function randInt(min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function randChoice<T>(arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

// Team strength ratings (0–1) used to weight outcomes
const STRENGTH: Record<string, number> = {
  gryffindor: 0.82,
  slytherin: 0.78,
  hufflepuff: 0.70,
  ravenclaw: 0.74,
  harpies: 0.88,
  cannons: 0.45,
  tornados: 0.76,
  wasps: 0.72,
  arrows: 0.68,
  bats: 0.65,
};

// Seeker catch probability adjusted by team strength
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

  // Place quaffle goals at random minutes
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

  // Append snitch at the end
  events.push({ minute: duration, side: snitchCaughtBy, type: 'snitch', player: snitchCatcher });

  // Build running score
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

  // Goals scored proportional to strength, with some variance
  const homeGoals = Math.max(0, Math.round(homeStr * 14 + (rng() - 0.5) * 10));
  const awayGoals = Math.max(0, Math.round(awayStr * 12 + (rng() - 0.5) * 10));

  // Seeker: whichever team's seeker is "faster" this match
  const homeSnitchProb = seekerCatchProb(homeId);
  const awaySnitchProb = seekerCatchProb(awayId);
  const total = homeSnitchProb + awaySnitchProb;
  const snitchCaughtBy: MatchSide = rng() < homeSnitchProb / total ? 'home' : 'away';

  const catchingTeam = TEAMS.find((t) => t.id === (snitchCaughtBy === 'home' ? homeId : awayId))!;
  const seeker = catchingTeam.roster.find((p) => p.position === 'Seeker')!;

  const duration = randInt(45, 180);

  const timeline = buildTimeline(homeId, awayId, homeGoals, awayGoals, snitchCaughtBy, seeker.name, duration);

  return {
    id,
    date,
    round,
    homeTeamId: homeId,
    awayTeamId: awayId,
    homeQuaffleGoals: homeGoals,
    awayQuaffleGoals: awayGoals,
    snitchCaughtBy,
    snitchCatcher: seeker.name,
    durationMinutes: duration,
    timeline,
  };
}

// Generate a full round-robin schedule (each pair plays once)
function generateSchedule(): Match[] {
  const teamIds = TEAMS.map((t) => t.id);
  const matches: Match[] = [];
  let matchNum = 0;

  // Season starts 2024-09-07, one match-day per week
  const startDate = new Date('2024-09-07');

  // Berger-style round-robin rotation
  const n = teamIds.length;
  const fixed = teamIds[0];
  const rotating = teamIds.slice(1);
  let round = 0;

  for (let r = 0; r < n - 1; r++) {
    round++;
    const roundTeams = [fixed, ...rotating];
    const pairs: [string, string][] = [];
    for (let i = 0; i < n / 2; i++) {
      pairs.push([roundTeams[i], roundTeams[n - 1 - i]]);
    }

    const matchDate = new Date(startDate);
    matchDate.setDate(startDate.getDate() + r * 7);
    const dateStr = matchDate.toISOString().split('T')[0];

    for (const [home, away] of pairs) {
      matchNum++;
      matches.push(
        simulateMatch(`match-${matchNum}`, dateStr, round, home, away)
      );
    }

    // Rotate
    rotating.unshift(rotating.pop()!);
  }

  return matches;
}

export const MATCHES: Match[] = generateSchedule();

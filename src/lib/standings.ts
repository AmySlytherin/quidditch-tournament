import { Match, TeamStanding, HeadToHead } from '@/data/types';
import { TEAMS } from '@/data/teams';

export function matchScore(match: Match, side: 'home' | 'away'): number {
  const goals = side === 'home' ? match.homeQuaffleGoals : match.awayQuaffleGoals;
  const snitchBonus = match.snitchCaughtBy === side ? 150 : 0;
  return goals * 10 + snitchBonus;
}

export function matchWinner(match: Match): 'home' | 'away' {
  return matchScore(match, 'home') > matchScore(match, 'away') ? 'home' : 'away';
}

export function computeStandings(matches: Match[]): TeamStanding[] {
  const stats: Record<string, Omit<TeamStanding, 'rank' | 'pointsDiff'>> = {};

  for (const team of TEAMS) {
    stats[team.id] = {
      teamId: team.id,
      played: 0,
      wins: 0,
      losses: 0,
      pointsFor: 0,
      pointsAgainst: 0,
      snitchCatches: 0,
      recentForm: [],
    };
  }

  // Sort matches by date for accurate recentForm ordering
  const sorted = [...matches].sort((a, b) => a.date.localeCompare(b.date));

  for (const match of sorted) {
    const homeScore = matchScore(match, 'home');
    const awayScore = matchScore(match, 'away');
    const winner = matchWinner(match);

    const home = stats[match.homeTeamId];
    const away = stats[match.awayTeamId];

    home.played++;
    away.played++;
    home.pointsFor += homeScore;
    home.pointsAgainst += awayScore;
    away.pointsFor += awayScore;
    away.pointsAgainst += homeScore;

    if (match.snitchCaughtBy === 'home') home.snitchCatches++;
    else away.snitchCatches++;

    if (winner === 'home') {
      home.wins++;
      away.losses++;
      home.recentForm.push('W');
      away.recentForm.push('L');
    } else {
      away.wins++;
      home.losses++;
      away.recentForm.push('W');
      home.recentForm.push('L');
    }
  }

  // Keep only last 5 for recent form
  for (const s of Object.values(stats)) {
    s.recentForm = s.recentForm.slice(-5);
  }

  const standings = Object.values(stats).map((s) => ({
    ...s,
    pointsDiff: s.pointsFor - s.pointsAgainst,
  }));

  // Sort: wins desc, then pointsDiff desc, then snitchCatches desc
  standings.sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins;
    if (b.pointsDiff !== a.pointsDiff) return b.pointsDiff - a.pointsDiff;
    return b.snitchCatches - a.snitchCatches;
  });

  return standings.map((s, i) => ({ ...s, rank: i + 1 }));
}

export function teamMatches(matches: Match[], teamId: string): Match[] {
  return matches
    .filter((m) => m.homeTeamId === teamId || m.awayTeamId === teamId)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function headToHeadRecords(matches: Match[], teamId: string): HeadToHead[] {
  const record: Record<string, HeadToHead> = {};

  for (const match of matches) {
    let opponentId: string | null = null;
    let side: 'home' | 'away' | null = null;
    if (match.homeTeamId === teamId) { opponentId = match.awayTeamId; side = 'home'; }
    else if (match.awayTeamId === teamId) { opponentId = match.homeTeamId; side = 'away'; }
    if (!opponentId || !side) continue;

    if (!record[opponentId]) {
      record[opponentId] = { opponentId, wins: 0, losses: 0, pointsFor: 0, pointsAgainst: 0 };
    }

    const myScore = matchScore(match, side);
    const oppScore = matchScore(match, side === 'home' ? 'away' : 'home');
    record[opponentId].pointsFor += myScore;
    record[opponentId].pointsAgainst += oppScore;
    if (matchWinner(match) === side) record[opponentId].wins++;
    else record[opponentId].losses++;
  }

  return Object.values(record);
}

import { Match } from '@/data/types';

export interface PlayerStats {
  name: string;
  goalsScored: number;   // Chasers
  snitchCatches: number; // Seekers
  matchesPlayed: number;
  pointsContributed: number;
}

export function computePlayerStats(matches: Match[]): Record<string, PlayerStats> {
  const stats: Record<string, PlayerStats> = {};

  function get(name: string): PlayerStats {
    if (!stats[name]) {
      stats[name] = { name, goalsScored: 0, snitchCatches: 0, matchesPlayed: 0, pointsContributed: 0 };
    }
    return stats[name];
  }

  for (const match of matches) {
    const playersInMatch = new Set<string>();

    for (const event of match.timeline) {
      const s = get(event.player);
      playersInMatch.add(event.player);
      if (event.type === 'quaffle') {
        s.goalsScored++;
        s.pointsContributed += 10;
      } else {
        s.snitchCatches++;
        s.pointsContributed += 150;
      }
    }

    // Every player on both teams gets a match played credit
    // We track this via the timeline participants (seekers, chasers)
    for (const name of playersInMatch) {
      get(name).matchesPlayed++;
    }
  }

  return stats;
}

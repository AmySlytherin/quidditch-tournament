export type Position = 'Keeper' | 'Chaser' | 'Beater' | 'Seeker';

export interface Player {
  id: string;
  name: string;
  position: Position;
  number: number;
}

export interface TeamColors {
  primary: string;
  secondary: string;
  text: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  abbreviation: string;
  city: string;
  colors: TeamColors;
  roster: Player[];
}

export type MatchSide = 'home' | 'away';

export interface ScoringEvent {
  minute: number;
  type: 'quaffle' | 'snitch';
  side: MatchSide;
  player: string;
  points: number;
  homeScoreAfter: number;
  awayScoreAfter: number;
}

export interface Match {
  id: string;
  date: string;  // ISO date string
  round: number;
  homeTeamId: string;
  awayTeamId: string;
  homeQuaffleGoals: number;
  awayQuaffleGoals: number;
  snitchCaughtBy: MatchSide;
  snitchCatcher: string;  // player name
  durationMinutes: number;
  timeline: ScoringEvent[];
}

export interface TeamStanding {
  teamId: string;
  rank: number;
  played: number;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  pointsDiff: number;
  snitchCatches: number;
  recentForm: ('W' | 'L')[];
}

export interface HeadToHead {
  opponentId: string;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
}

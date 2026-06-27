export { TEAMS, TEAM_MAP } from './teams';
import { MATCHES as SIM_MATCHES } from './simulation';
import { EXTRA_MATCHES } from './extra-matches';

// Real results in EXTRA_MATCHES override the simulation by match ID
const overrides = new Map(EXTRA_MATCHES.map(m => [m.id, m]));
export const MATCHES = SIM_MATCHES.map(m => overrides.get(m.id) ?? m);
export type { Team, Match, Player, TeamStanding, ScoringEvent, HeadToHead, Position } from './types';

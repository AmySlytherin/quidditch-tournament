export { TEAMS, TEAM_MAP } from './teams';
import { MATCHES as SIM_MATCHES } from './simulation';
import { EXTRA_MATCHES } from './extra-matches';
export const MATCHES = [...SIM_MATCHES, ...EXTRA_MATCHES];
export type { Team, Match, Player, TeamStanding, ScoringEvent, HeadToHead, Position } from './types';

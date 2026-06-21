import { Team } from './types';

export const TEAMS: Team[] = [
  {
    id: 'gryffindor',
    name: 'Gryffindor',
    shortName: 'Gryffindor',
    abbreviation: 'GRY',
    city: 'Hogwarts',
    colors: { primary: '#740001', secondary: '#D3A625', text: '#ffffff' },
    roster: [
      { id: 'gry-1', name: 'Oliver Wood',      position: 'Keeper',  number: 1,  year: 7 },
      { id: 'gry-2', name: 'Angelina Johnson',  position: 'Chaser',  number: 7,  year: 7 },
      { id: 'gry-3', name: 'Alicia Spinnet',    position: 'Chaser',  number: 9,  year: 7 },
      { id: 'gry-4', name: 'Katie Bell',        position: 'Chaser',  number: 11, year: 5 },
      { id: 'gry-5', name: 'Fred Weasley',      position: 'Beater',  number: 4,  year: 7 },
      { id: 'gry-6', name: 'George Weasley',    position: 'Beater',  number: 5,  year: 7 },
      { id: 'gry-7', name: 'Harry Potter',      position: 'Seeker',  number: 3,  year: 5 },
    ],
  },
  {
    id: 'slytherin',
    name: 'Slytherin',
    shortName: 'Slytherin',
    abbreviation: 'SLY',
    city: 'Hogwarts',
    colors: { primary: '#1A472A', secondary: '#AAAAAA', text: '#ffffff' },
    roster: [
      { id: 'sly-1', name: 'Amy Ward',           position: 'Keeper',  number: 1,  year: 6 },
      { id: 'sly-2', name: 'Marcus Flint',        position: 'Chaser',  number: 6,  year: 7 },
      { id: 'sly-3', name: 'Adrian Pucey',        position: 'Chaser',  number: 8,  year: 6 },
      { id: 'sly-4', name: 'Cassius Warrington',  position: 'Chaser',  number: 10, year: 6 },
      { id: 'sly-5', name: 'Vincent Crabbe',      position: 'Beater',  number: 3,  year: 5 },
      { id: 'sly-6', name: 'Gregory Goyle',       position: 'Beater',  number: 2,  year: 5 },
      { id: 'sly-7', name: 'Draco Malfoy',        position: 'Seeker',  number: 13, year: 5 },
    ],
  },
  {
    id: 'hufflepuff',
    name: 'Hufflepuff',
    shortName: 'Hufflepuff',
    abbreviation: 'HUF',
    city: 'Hogwarts',
    colors: { primary: '#F0C75E', secondary: '#372E29', text: '#372E29' },
    roster: [
      { id: 'huf-1', name: 'Herbert Fleet',      position: 'Keeper',  number: 2,  year: 6 },
      { id: 'huf-2', name: 'Zacharias Smith',    position: 'Chaser',  number: 7,  year: 5 },
      { id: 'huf-3', name: 'Tamsin Applebee',    position: 'Chaser',  number: 9,  year: 5 },
      { id: 'huf-4', name: 'Heidi Macavoy',      position: 'Chaser',  number: 10, year: 4 },
      { id: 'huf-5', name: 'Maxine O\'Flaherty', position: 'Beater',  number: 5,  year: 4 },
      { id: 'huf-6', name: 'Anthony Rickett',    position: 'Beater',  number: 6,  year: 5 },
      { id: 'huf-7', name: 'Cedric Diggory',     position: 'Seeker',  number: 1,  year: 7 },
    ],
  },
  {
    id: 'ravenclaw',
    name: 'Ravenclaw',
    shortName: 'Ravenclaw',
    abbreviation: 'RAV',
    city: 'Hogwarts',
    colors: { primary: '#0E1A40', secondary: '#946B2D', text: '#ffffff' },
    roster: [
      { id: 'rav-1', name: 'Lucinda Talkalot',  position: 'Keeper',  number: 2,  year: 6 },
      { id: 'rav-2', name: 'Roger Davies',       position: 'Chaser',  number: 7,  year: 7 },
      { id: 'rav-3', name: 'Jeremy Stretton',    position: 'Chaser',  number: 8,  year: 5 },
      { id: 'rav-4', name: 'Duncan Inglebee',    position: 'Chaser',  number: 9,  year: 5 },
      { id: 'rav-5', name: 'Jason Samuels',      position: 'Beater',  number: 4,  year: 5 },
      { id: 'rav-6', name: 'Grant Whitmore',     position: 'Beater',  number: 5,  year: 4 },
      { id: 'rav-7', name: 'Cho Chang',          position: 'Seeker',  number: 1,  year: 6 },
    ],
  },
];

export const TEAM_MAP: Record<string, Team> = Object.fromEntries(
  TEAMS.map((t) => [t.id, t])
);

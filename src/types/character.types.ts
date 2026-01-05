/**
 * Types related to Rick and Morty characters
 */

export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: Gender;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';

export type Gender = 'Female' | 'Male' | 'Genderless' | 'unknown';

export interface Location {
  name: string;
  url: string;
}

export interface CharactersResponse {
  info: PaginationInfo;
  results: Character[];
}

export interface PaginationInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharacterFilters {
  name?: string;
  status?: CharacterStatus | 'all';
  species?: string;
  type?: string;
  gender?: Gender;
}

export interface CharacterStats {
  total: number;
  alive: number;
  dead: number;
  unknown: number;
}

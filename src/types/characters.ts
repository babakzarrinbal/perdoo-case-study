import { Episode } from "./episodes";
import { Location } from "./locations";

export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Location | null;
  location: Location | null;
  created: string;
  image: string;
  episode: Episode[];
}

export interface CharactersQueryData {
  characters: {
    results: Character[];
    info: {
      count: number;
      pages: number;
      next: number;
      prev: number;
    };
  };
}

export interface CharactersQueryVars {
  page: number;
  filter: {
    name?: string;
    status?: string;
    species?: string;
    type?: string;
    gender?: string;
  };
}

export interface CharacterQueryData {
  character: Character;
}

export interface CharacterQueryVars {
  id: string;
}

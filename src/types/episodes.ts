import { Character } from "./characters";

export interface Episode {
  id: string;
  name: string;
  episode: string;
  characters: Character[];
  air_date: string;
  created: string;
}

export interface EpisodesQueryData {
  episodes: {
    results: Episode[];
    info: {
      count: number;
      pages: number;
      next: number;
      prev: number;
    };
  };
}

export interface EpisodesQueryVars {
  page: number;
  filter?: {
    name?: string;
    episode?: string;
  };
}

export interface EpisodeQueryData {
  episode: Episode;
}

export interface EpisodeQueryVars {
  id: string;
}

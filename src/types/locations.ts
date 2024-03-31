import { Character } from "./characters";

export interface Location {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: Character[];
  created: string;
}

export interface LocationsQueryData {
  locations: {
    results: Location[];
    info: {
      count: number;
      pages: number;
    };
  };
}

export interface LocationQueryVars {
  page: number;
  filter: {
    name?: string;
    type?: string;
    dimension?: string;
  };
}

export interface LocationDetailQueryData {
  location: Location;
}

export interface LocationDetailQueryVars {
  id: string;
}

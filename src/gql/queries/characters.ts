// This file contains the query to get characters from the apollo server

// This query will be used in the Characters component to fetch the data
import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      results {
        id
        name
        status
        species
      }
      info {
        pages
        next
        prev
      }
    }
  }
`;

export const GET_CHARACTER_DETAILS = gql`
  query GetCharacterDetails($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        id
        name
        type
        dimension
        residents {
          id
          name
        }
        created
      }
      location {
        id
        name
        type
        dimension
        residents {
          id
          name
        }
        created
      }
      image
      episode {
        id
        name
        air_date
        episode
        characters {
          id
          name
        }
        created
      }
      created
    }
  }
`;

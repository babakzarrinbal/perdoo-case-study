import { gql } from "@apollo/client";

export const GET_LOCATIONS = gql`
  query GetLocations($page: Int, $filter: FilterLocation) {
    locations(page: $page, filter: $filter) {
      info {
        count
        pages
      }
      results {
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
    }
  }
`;

export const GET_LOCATION_DETAILS = gql`
  query GetLocationDetails($id: ID!) {
    location(id: $id) {
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
  }
`;

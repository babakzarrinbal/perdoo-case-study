import { gql } from "@apollo/client";

export const GET_EPISODES = gql`
  query GetEpisodes($page: Int, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
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
    }
  }
`;

export const GET_EPISODE_DETAILS = gql`
  query GetEpisodeDetails($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
        id
        name
        image
      }
      created
    }
  }
`;

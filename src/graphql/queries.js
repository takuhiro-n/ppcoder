/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGameScore = /* GraphQL */ `
  query GetGameScore($id: ID!) {
    getGameScore(id: $id) {
      id
      playerName
      score
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listGameScores = /* GraphQL */ `
  query ListGameScores(
    $filter: ModelGameScoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGameScores(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        playerName
        score
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

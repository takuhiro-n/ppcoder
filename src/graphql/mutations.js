/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGameScore = /* GraphQL */ `
  mutation CreateGameScore(
    $input: CreateGameScoreInput!
    $condition: ModelGameScoreConditionInput
  ) {
    createGameScore(input: $input, condition: $condition) {
      id
      playerName
      score
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateGameScore = /* GraphQL */ `
  mutation UpdateGameScore(
    $input: UpdateGameScoreInput!
    $condition: ModelGameScoreConditionInput
  ) {
    updateGameScore(input: $input, condition: $condition) {
      id
      playerName
      score
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteGameScore = /* GraphQL */ `
  mutation DeleteGameScore(
    $input: DeleteGameScoreInput!
    $condition: ModelGameScoreConditionInput
  ) {
    deleteGameScore(input: $input, condition: $condition) {
      id
      playerName
      score
      createdAt
      updatedAt
      __typename
    }
  }
`;

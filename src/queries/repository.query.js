import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query GetRepositories($developerToken: String!) {
    repositories(developerToken: $developerToken) {
      name
      size
      owner
    }
  }
`;

export const GET_REPOSITORY_DETAILS = gql`
  query GetRepositoryDetails($developerToken: String!, $repoName: String!) {
    repository(developerToken: $developerToken, repoName: $repoName) {
      name
      size
      owner
      isPrivate
      numberOfFiles
      randomYamlFileContent
      webhooks
    }
  }
`;

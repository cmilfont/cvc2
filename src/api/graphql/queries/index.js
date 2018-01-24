import gql from 'graphql-tag';

export const getKinds = variables => ({
  query: gql`
    query GetKinds($token: String!) {
      getKinds(token:$token) {
        id
        color
        description
        tags
      }
    }
  `,
  variables,
});

export const getTodayActivities = variables => ({
  query: gql`
    query TodayActivities ($token: String!) {
      todayActivities(
        token: $token
      ) {
        id
        loggedAt
        description
        kind {
          id
          color
          description
          tags
        }
      }
    }
  `,
  variables,
});


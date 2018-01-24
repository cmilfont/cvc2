import gql from 'graphql-tag';

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


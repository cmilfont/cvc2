import gql from 'graphql-tag';

export const loginMutation = variables => ({
  mutation: gql`
    mutation Login($token: String!){
      login(token: $token) {
        token
      }
    }
  `,
  variables,
});

export const updateActivityMutation = variables => ({
  mutation: gql`
    mutation ($id: String!, $KindId: Int, $description: String, $loggedAt: String, $token: String!) {
      updateActivity(
        params: {
          id: $id
          KindId: $KindId
          description: $description
          loggedAt: $loggedAt
          token: $token
        }
      ) {
        id
      }
    }
  `,
  variables,
});

export const deleteActivityMutation = variables => ({
  mutation: gql`
    mutation ($id: String!, $token: String!) {
      deleteActivity(
        params: {
          id: $id
          token: $token
        }
      )
    }
  `,
  variables,
});


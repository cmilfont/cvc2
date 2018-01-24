import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const graphqlClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL,
  }),
  cache: new InMemoryCache({
    addTypename: true,
  }),
});

window.graphqlClient = graphqlClient;

export default graphqlClient;

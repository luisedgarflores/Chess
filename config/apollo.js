// config/apollo.js

import ApolloClient from "apollo-boost";

export const client = new ApolloClient({
  uri: 'http://192.81.219.106/graphql/'
});
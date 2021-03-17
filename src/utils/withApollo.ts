import { withApollo as createWithApollo } from 'next-apollo';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { NextPageContext } from 'next';

const createClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
  cache: new InMemoryCache({
    typePolicies: {
      Mutation: {
        fields: {
          post: {
            merge: true,
          },
        },
      },
    },
  }),
});

export const withApollo = createWithApollo(createClient);

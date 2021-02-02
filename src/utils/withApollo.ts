import { ApolloClient } from '@apollo/client';
import { withApollo: createWithApollo } from 'next-apollo';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include'
})

export const withApollo = createWithApollo(apolloClient)

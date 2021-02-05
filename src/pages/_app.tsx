import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import AppProvider from '../hooks/AppProvider';
import { useApollo } from '../lib/apolloClient';
import GlobalStyles from '../styles/GlobalStyles';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <AppProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </AppProvider>
    </ApolloProvider>
  );
}

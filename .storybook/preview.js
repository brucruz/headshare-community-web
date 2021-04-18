import GlobalStyle from '../src/styles/GlobalStyles';
import { ApolloProvider } from '@apollo/client';

import { createClient } from '../src/utils/withApollo';
import AppProvider from '../src/hooks/AppProvider';

// Global decorator to apply the styles to all stories
export const decorators = [
  Story => (
    <>
    <AppProvider>
      <GlobalStyle />
      <ApolloProvider client={createClient}>
        <Story />
      </ApolloProvider>
      </AppProvider>
    </>
  ),
];


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

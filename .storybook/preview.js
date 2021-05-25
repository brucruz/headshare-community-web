import GlobalStyle from '../src/styles/GlobalStyles';
import { ApolloProvider } from '@apollo/client';
import * as nextImage from 'next/image';

import { createClient } from '../src/utils/withApollo';


Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props) => {
    return <img {...props} />;
  },
});

// Global decorator to apply the styles to all stories
export const decorators = [
  Story => (
    <>
      <GlobalStyle />
      <ApolloProvider client={createClient}>
        <Story />
      </ApolloProvider>
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

import { AppProps } from 'next/dist/next-server/lib/router/router';
import { AppProvider } from '../hooks/AppProvider';
import GlobalStyles from '../styles/GlobalStyles';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AppProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </AppProvider>
  );
}

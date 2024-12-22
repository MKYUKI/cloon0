// src/pages/_app.tsx
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import QuantumLines from '../components/QuantumLines';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <QuantumLines />
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;

// pages/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import ChatBox from '../components/ChatBox';
import AuthButton from '../components/AuthButton';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>ULTIMA</title>
      </Head>
      <header>
        <AuthButton />
      </header>
      <main>
        <ChatBox />
      </main>
    </div>
  );
};

export default Home;

// pages/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import ChatBox from '../components/ChatBox';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>ULTIMA - 次世代プラットフォーム</title>
        <meta name="description" content="次世代を導く革新的なプラットフォーム" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">ULTIMAへようこそ</h1>
        <ChatBox />
      </main>
    </div>
  );
};

export default Home;

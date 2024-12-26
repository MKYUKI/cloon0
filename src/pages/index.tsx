// src/pages/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import QuantumLines from '@/components/QuantumLines';

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResponse('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data: { result?: string; error?: string } = await res.json();

      if (res.ok) {
        setResponse(data.result || '');
      } else {
        setError(data.error || '予期せぬエラーが発生しました');
      }
    } catch (err) {
      setError('予期せぬエラーが発生しました');
      console.error('Fetch error:', err);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-black">
      <QuantumLines />

      <Head>
        <title>ようこそ</title>
        <meta name="description" content="ULTIMA Next-Gen Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">ようこそ</h1>
        {session ? (
          <div className="flex flex-col items-center mb-4">
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt="プロフィール画像"
                width={96}
                height={96}
                className="rounded-full mb-4"
              />
            )}
            <p className="mb-4">こんにちは, {session.user?.name}</p>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
            >
              ログアウト
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
          >
            ログイン
          </button>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="ここにメッセージを入力..."
            className="w-80 h-32 p-2 border border-gray-300 rounded mb-4"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            送信
          </button>
        </form>

        {response && (
          <div className="mt-4 p-4 bg-gray-100 rounded shadow w-80 text-left">
            <p>
              <strong>GPTの返答:</strong>
            </p>
            <p>{response}</p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-100 rounded shadow w-80 text-left">
            <p>
              <strong>エラー:</strong> {error}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;

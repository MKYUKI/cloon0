// src/pages/index.tsx
import type { NextPage } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import QuantumLines from '@/components/QuantumLines';

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data.result);
      } else {
        setResult(data.error || 'Error generating text.');
      }
    } catch (error) {
      console.error('Error:', error);
      setResult('Error generating text.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image
              className="h-48 w-full object-cover md:h-full md:w-48"
              src="/images/your-image.jpg"
              alt="Your Image"
              width={500}
              height={300}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {session ? `Welcome, ${session.user?.name}` : 'Please sign in'}
            </div>
            <a
              href="#"
              className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
            >
              Finding customers for your new business
            </a>
            <p className="mt-2 text-gray-500">
              Getting a new business off the ground is a lot of hard work. Here are five ideas you
              can use to find your first customers.
            </p>
            {!session && (
              <button
                onClick={() => signIn('google')}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Sign in with Google
              </button>
            )}
            {session && (
              <button
                onClick={() => signOut()}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Sign out
              </button>
            )}
            <form onSubmit={handleSubmit} className="mt-4">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                {isLoading ? 'Loading...' : 'Submit'}
              </button>
            </form>
            {result && <div className="mt-4 p-4 border rounded-md">{result}</div>}
          </div>
        </div>
      </div>
      <QuantumLines />
    </div>
  );
};

export default Home;

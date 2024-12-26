// src/pages/profile.tsx
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile: React.FC = () => {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
      setProfileImage(session.user.image || '');
      // 背景画像はカスタムフィールドとして設定
      // 必要に応じてfetchProfile関数を実装
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/profile', {
        name,
        profileImage,
        backgroundImage,
      });
      setMessage(res.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'エラーが発生しました');
    }
  };

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>ログインしてください。</p>
        <button
          onClick={() => signIn()}
          className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
        >
          ログイン
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">プロフィール編集</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start bg-white p-6 rounded shadow-md"
      >
        <label className="mb-2">
          アカウントネーム:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="ml-2 p-1 border rounded"
            required
          />
        </label>
        <label className="mb-2">
          プロフィール画像URL:
          <input
            type="url"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
            className="ml-2 p-1 border rounded"
          />
        </label>
        <label className="mb-2">
          背景画像URL:
          <input
            type="url"
            value={backgroundImage}
            onChange={(e) => setBackgroundImage(e.target.value)}
            className="ml-2 p-1 border rounded"
          />
        </label>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
        >
          更新
        </button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
      <button
        onClick={() => signOut()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        ログアウト
      </button>
    </div>
  );
};

export default Profile;

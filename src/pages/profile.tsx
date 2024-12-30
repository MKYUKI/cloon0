import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { Session } from "next-auth";
import { useRouter } from 'next/router';
import QuantumLines from '@/components/QuantumLines';
import clientPromise from '../lib/mongodb';
import { IUser } from '../lib/models/User'; // IUser をインポート

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  profileImage?: string;
  backgroundImage?: string;
}

export default function Profile({ user }: { user: User }) {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [profileImage, setProfileImage] = useState(user.profileImage || '');
  const [backgroundImage, setBackgroundImage] = useState(user.backgroundImage || '');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      signIn('google');
    }
  }, [loading, session]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, profileImage, backgroundImage }),
      });

      if (response.ok) {
        setMessage('プロフィールが更新されました');
        setIsEditing(false);
        router.reload(); // ページをリロードして更新を反映
      } else {
        const data = await response.json();
        setMessage(data.error || '更新に失敗しました');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('更新に失敗しました');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please sign in.</div>;
  }

  return (
    <div className="profile-container dark:bg-gray-800 dark:text-white p-4">
      <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }}>
        {!backgroundImage && <div className="h-48 bg-gray-400 rounded"></div>}
      </div>
      <img src={profileImage || session.user?.image || ''} alt="Profile" className="profile-image" />

      <h1 className="text-2xl font-bold">{name}</h1>
      <p className="text-gray-600 dark:text-gray-400">{session.user?.email}</p>

      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="名前"
            className="mt-2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <input
            type="text"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
            placeholder="プロフィール画像URL"
            className="mt-2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <input
            type="text"
            value={backgroundImage}
            onChange={(e) => setBackgroundImage(e.target.value)}
            placeholder="背景画像URL"
            className="mt-2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <button onClick={handleSave} className="save-button">保存</button>
          {message && <p className="message">{message}</p>}
        </div>
      ) : (
        <button onClick={handleEdit} className="edit-button">プロフィールを編集</button>
      )}

      <button onClick={() => signOut()} className="logout-button mt-4">ログアウト</button>
      <QuantumLines />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session || !session.user?.email) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  const client = await clientPromise;
  const db = client.db();

  const user = await db.collection('users').findOne<IUser>({ email: session.user.email });

  return {
    props: {
      user: {
        id: user?._id.toString() || '',
        name: user?.name || '',
        email: user?.email || '',
        image: user?.image || '',
        profileImage: user?.profileImage || null, // 追加
        backgroundImage: user?.backgroundImage || null, // 追加
      },
    },
  };
};
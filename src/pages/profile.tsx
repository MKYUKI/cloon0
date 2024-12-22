// src/pages/profile.tsx
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Profile from '../components/Profile';
import Header from '../components/Header';

const ProfilePage: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>読み込み中...</div>;
  }

  if (!session) {
    return (
      <div>
        <Header />
        <main className="main">
          <p>ログインしてください。</p>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="main">
        <Profile />
      </main>
    </div>
  );
};

export default ProfilePage;

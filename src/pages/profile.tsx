// pages/profile.tsx
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Profile from '../components/Profile';
import AuthButton from '../components/AuthButton';

const ProfilePage: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>読み込み中...</div>;
  }

  if (!session) {
    return (
      <div>
        <AuthButton />
        <p>ログインしてください。</p>
      </div>
    );
  }

  return (
    <div>
      <header>
        <AuthButton />
      </header>
      <main>
        <Profile />
      </main>
    </div>
  );
};

export default ProfilePage;

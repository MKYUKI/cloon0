// src/components/AuthButton.tsx
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const AuthButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="auth-button">
        <Image
          src={session.user.image || '/default-profile.png'}
          alt="プロフィール画像"
          width={40}
          height={40}
          className="profile-image"
        />
        <span>{session.user.name}</span>
        <button onClick={() => signOut()} className="logout-button">
          ログアウト
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn('google')} className="login-button">
      Googleでログイン
    </button>
  );
};

export default AuthButton;

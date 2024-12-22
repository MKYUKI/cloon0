// components/AuthButton.tsx
import { signIn, signOut, useSession } from 'next-auth/react';

const AuthButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="auth-button">
        <img src={session.user.image || '/default-profile.png'} alt="プロフィール画像" className="profile-image" />
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

// src/components/AuthButton.tsx
import { signIn, signOut, useSession } from 'next-auth/react';

const AuthButton: React.FC = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <img src={session.user?.image || '/default-profile.png'} alt="Profile" className="w-8 h-8 rounded-full" />
        <span>{session.user?.name}</span>
        <button onClick={() => signOut()} className="ml-4 px-4 py-2 bg-red-500 text-white rounded">
          Sign Out
        </button>
      </>
    );
  }
  return (
    <button onClick={() => signIn('google')} className="px-4 py-2 bg-blue-500 text-white rounded">
      Sign in with Google
    </button>
  );
};

export default AuthButton;

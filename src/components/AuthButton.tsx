// src/components/AuthButton.tsx
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

const AuthButton: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <button onClick={() => signOut()}>Sign Out</button>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
    </div>
  );
};

export default AuthButton;

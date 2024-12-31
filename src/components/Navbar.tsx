// src/components/Navbar.tsx
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav>
      <h1>アプリケーション名</h1>
      {session ? (
        <div>
          <span>こんにちは、{session.user?.name}</span>
          <button onClick={() => signOut()}>サインアウト</button>
        </div>
      ) : (
        <button onClick={() => signIn("google")}>Googleでサインイン</button>
      )}
    </nav>
  );
}

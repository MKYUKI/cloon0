// src/components/SignInButton.tsx

import { signIn, signOut, useSession } from "next-auth/react";
import styles from "../styles/SignInButton.module.css";

const SignInButton: React.FC = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <button onClick={() => signOut()} className={styles.logoutButton}>
        ログアウト
      </button>
    );
  }

  return (
    <button onClick={() => signIn("google")} className={styles.loginButton}>
      Googleでログイン
    </button>
  );
};

export default SignInButton;

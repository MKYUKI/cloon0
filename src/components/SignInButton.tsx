// src/components/SignInButton.tsx

import { signIn } from "next-auth/react";
import styles from "../styles/SignInButton.module.css";

const SignInButton: React.FC = () => {
  return (
    <button onClick={() => signIn("google")} className={styles.signInButton}>
      Googleでログイン
    </button>
  );
};

export default SignInButton;

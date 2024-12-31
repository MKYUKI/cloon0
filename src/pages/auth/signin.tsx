// src/pages/auth/signin.tsx
import { getProviders, signIn } from "next-auth/react";
import { GetServerSideProps } from "next";
import React from "react";
import AnimatedBackground from "../../components/AnimatedBackground";
import styles from "../../styles/SignIn.module.css";

type Providers = {
  [key: string]: any;
};

const SignIn: React.FC<{ providers: Providers }> = ({ providers }) => {
  return (
    <div className={styles.container}>
      <AnimatedBackground />
      <div className={styles.content}>
        <h1 className={styles.title}>Cloon0 にサインイン</h1>
        {Object.values(providers).map((provider) => (
          <div key={provider.name} className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => signIn(provider.id)}
            >
              {provider.name} でサインイン
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default SignIn;

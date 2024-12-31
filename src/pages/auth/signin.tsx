// src/pages/auth/signin.tsx
import { getProviders, signIn } from "next-auth/react";
import { GetServerSideProps } from "next";
import React from "react";
import AnimatedBackground from "../../components/AnimatedBackground";

type Providers = {
  [key: string]: any;
};

const SignIn: React.FC<{ providers: Providers }> = ({ providers }) => {
  return (
    <div style={styles.container}>
      <AnimatedBackground />
      <div style={styles.content}>
        <h1 style={styles.title}>Cloon0 にサインイン</h1>
        {Object.values(providers).map((provider) => (
          <div key={provider.name} style={styles.buttonContainer}>
            <button
              style={styles.button}
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

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  content: {
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "2rem",
    fontSize: "2rem",
    color: "#333",
  },
  buttonContainer: {
    marginBottom: "1rem",
    width: "100%",
    maxWidth: "300px",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#4285f4",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s ease",
  },
};

export default SignIn;

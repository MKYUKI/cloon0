// src/pages/auth/signin.tsx
import { getProviders, signIn } from "next-auth/react";
import { GetServerSideProps } from "next";
import React from "react";

type Providers = {
  [key: string]: any;
};

const SignIn: React.FC<{ providers: Providers }> = ({ providers }) => {
  return (
    <div style={styles.container}>
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
    padding: "2rem",
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
    backgroundColor: "#4285F4",
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

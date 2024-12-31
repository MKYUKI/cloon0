// src/pages/index.tsx
import React from "react";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import Chat from "../components/Chat";

const Home: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div>
      <Navbar />
      <main style={styles.main}>
        <h1 style={styles.title}>Cloon0 へようこそ！</h1>
        {session ? (
          <div style={styles.content}>
            <p style={styles.text}>ログイン中: {session.user?.email}</p>
            <Chat />
          </div>
        ) : (
          <p style={styles.text}>ログインしてください。</p>
        )}
      </main>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh",
    backgroundColor: "#f0f2f5",
    padding: "2rem",
  },
  title: {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "1rem",
  },
  content: {
    width: "100%",
    maxWidth: "800px",
    textAlign: "center",
  },
  text: {
    fontSize: "1.25rem",
    color: "#555",
    marginBottom: "2rem",
  },
};

export default Home;

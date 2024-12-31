// src/pages/profile.tsx
import { useSession, getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const Profile: React.FC = () => {
  const { data: session, status } = useSession();
  const [displayName, setDisplayName] = useState(session?.user?.displayName || "");
  const [avatar, setAvatar] = useState(session?.user?.avatar || "");
  const [backgroundImage, setBackgroundImage] = useState(session?.user?.backgroundImage || "");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (session) {
      setDisplayName(session.user.displayName || "");
      setAvatar(session.user.avatar || "");
      setBackgroundImage(session.user.backgroundImage || "");
    }
  }, [session]);

  if (status === "loading") {
    return <p>読み込み中...</p>;
  }

  if (!session) {
    return <p>ログインしてください。</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/profile", {
        displayName,
        avatar,
        backgroundImage,
      });
      setMessage("プロフィールが更新されました。");
    } catch (error: any) {
      setMessage(error.response?.data?.error || "更新に失敗しました。");
    }
  };

  return (
    <div>
      <Navbar />
      <main style={styles.main}>
        <h1 style={styles.title}>プロフィール編集</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            表示名:
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              style={styles.input}
              required
            />
          </label>
          <label style={styles.label}>
            アバターURL:
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            背景画像URL:
            <input
              type="text"
              value={backgroundImage}
              onChange={(e) => setBackgroundImage(e.target.value)}
              style={styles.input}
            />
          </label>
          <button type="submit" style={styles.button}>
            更新
          </button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
      </main>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "1rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "1rem",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "1rem",
    fontSize: "1rem",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginTop: "0.5rem",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  message: {
    marginTop: "1rem",
    fontSize: "1rem",
    color: "#28a745",
    textAlign: "center",
  },
};

export default Profile;

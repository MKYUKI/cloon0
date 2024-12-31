// src/components/CreateTweet.tsx

import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

const CreateTweet: React.FC = () => {
  const { data: session } = useSession();
  const [content, setContent] = useState("");

  useEffect(() => {
    // Socket.ioの接続
    socket = io();

    socket.on("connect", () => {
      console.log("Connected to Socket.io");
    });

    // クリーンアップ関数でソケットを切断
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const tweetData = {
        author: session?.user?.email,
        content,
      };

      if (socket) {
        socket.emit("newTweet", tweetData);
      }

      setContent("");
    } catch (error) {
      console.error("ツイートの投稿に失敗しました:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="ツイート内容を入力..."
        style={styles.textarea}
        maxLength={280}
        required
      />
      <button type="submit" style={styles.button}>
        ツイート
      </button>
    </form>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "1rem",
  },
  textarea: {
    resize: "none",
    padding: "0.5rem",
    fontSize: "1rem",
    marginBottom: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    minHeight: "80px",
  },
  button: {
    alignSelf: "flex-end",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#1da1f2",
    color: "#fff",
    cursor: "pointer",
  },
};

export default CreateTweet;

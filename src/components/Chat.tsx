// src/components/Chat.tsx
import React, { useState } from "react";

const Chat: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResponse(data.response);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="メッセージを入力してください..."
          style={styles.textarea}
          required
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "送信中..." : "送信"}
        </button>
      </form>
      {response && (
        <div style={styles.response}>
          <h3>回答:</h3>
          <p>{response}</p>
        </div>
      )}
      {error && (
        <div style={styles.error}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "1rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  textarea: {
    resize: "vertical",
    minHeight: "100px",
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginBottom: "1rem",
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
  response: {
    marginTop: "1rem",
    padding: "1rem",
    backgroundColor: "#f8f9fa",
    borderRadius: "4px",
  },
  error: {
    marginTop: "1rem",
    padding: "1rem",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    borderRadius: "4px",
  },
};

export default Chat;

// components/Chat.tsx

import { useState, useEffect } from "react";
import axios from "axios";

interface Message {
  _id: string;
  sender: {
    _id: string;
    name: string;
    image: string;
  };
  receiver: {
    _id: string;
    name: string;
    image: string;
  };
  content: string;
  createdAt: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiverId, setReceiverId] = useState("");

  useEffect(() => {
    // 初期メッセージの取得（例として特定のユーザーとチャット）
    const fetchMessages = async () => {
      if (receiverId) {
        const response = await axios.get(`/api/chat?receiverId=${receiverId}`);
        setMessages(response.data);
      }
    };
    fetchMessages();
  }, [receiverId]);

  const handleSend = async () => {
    if (!newMessage || !receiverId) return;

    const response = await axios.post("/api/chat", {
      receiver: receiverId,
      content: newMessage,
    });

    setMessages([...messages, response.data]);
    setNewMessage("");
  };

  return (
    <div style={styles.container}>
      <h2>チャット</h2>
      <div style={styles.messages}>
        {messages.map((msg) => (
          <div key={msg._id} style={msg.sender._id === msg.receiver._id ? styles.sent : styles.received}>
            <img src={msg.sender.image} alt={msg.sender.name} style={styles.avatar} />
            <div style={styles.messageContent}>
              <p>{msg.content}</p>
              <span>{new Date(msg.createdAt).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={styles.inputArea}>
        <input
          type="text"
          placeholder="受信者IDを入力..."
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="メッセージを入力..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.button}>送信</button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "1rem",
    maxWidth: "600px",
    width: "100%",
  },
  messages: {
    maxHeight: "400px",
    overflowY: "scroll",
    marginBottom: "1rem",
  },
  sent: {
    display: "flex",
    alignItems: "center",
    marginBottom: "0.5rem",
    justifyContent: "flex-end",
  },
  received: {
    display: "flex",
    alignItems: "center",
    marginBottom: "0.5rem",
    justifyContent: "flex-start",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "0.5rem",
  },
  messageContent: {
    background: "#f1f1f1",
    borderRadius: "8px",
    padding: "0.5rem",
    maxWidth: "70%",
  },
  inputArea: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: "0.5rem",
    marginRight: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    border: "none",
    background: "#333",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Chat;

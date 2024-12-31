// src/components/Chat.tsx

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import styles from "../styles/Chat.module.css";

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

interface ChatProps {
  receiverId: string;
}

let socket: Socket;

const Chat: React.FC<ChatProps> = ({ receiverId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Socket.ioの初期化
    socket = io("/api/socket");

    socket.on("connect", () => {
      console.log("Connected to Socket.io for chat");
    });

    socket.on("newChatMessage", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/chat?receiverId=${receiverId}`);
        setMessages(response.data);
      } catch (error) {
        console.error("チャットメッセージの取得に失敗しました:", error);
      }
    };
    fetchMessages();
  }, [receiverId]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    const messageData = {
      sender: "current_user_id", // 実際のユーザーIDに置き換えてください
      receiver: receiverId,
      content: newMessage,
    };
    try {
      await axios.post("/api/chat", messageData);
      socket.emit("sendChatMessage", messageData);
      setNewMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("メッセージの送信に失敗しました:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messages}>
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={msg.sender._id === receiverId ? styles.sent : styles.received}
          >
            <img src={msg.sender.image || "/default-avatar.png"} alt={msg.sender.name} className={styles.avatar} />
            <div className={styles.messageContent}>
              <p>{msg.content}</p>
              <span>{new Date(msg.createdAt).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.inputArea}>
        <input
          type="text"
          placeholder="メッセージを入力..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className={styles.inputText}
        />
        <button onClick={handleSend} className={styles.sendButton}>送信</button>
      </div>
    </div>
  );
};

export default Chat;

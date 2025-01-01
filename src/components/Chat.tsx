// src/components/Chat.tsx

import React, { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import styles from "../styles/Chat.module.css";

const Chat: React.FC = () => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const ws = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (session) {
      ws.current = new WebSocket(`ws://${window.location.host}/api/chat`);

      ws.current.onopen = () => {
        console.log('WebSocket connection established');
      };

      ws.current.onmessage = (event) => {
        setMessages((prev) => [...prev, event.data]);
      };

      ws.current.onclose = () => {
        console.log('WebSocket connection closed');
      };

      return () => {
        ws.current?.close();
      };
    }
  }, [session]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === '' || !ws.current) return;
    ws.current.send(`${session?.user?.name}: ${input}`);
    setInput('');
  };

  if (!session) return <div>ログインしてください。</div>;

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messages}>
        {messages.map((msg, idx) => (
          <div key={idx} className={styles.message}>
            {msg}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="メッセージを入力..."
          className={styles.input}
        />
        <button onClick={sendMessage} className={styles.sendButton}>
          送信
        </button>
      </div>
    </div>
  );
};

export default Chat;

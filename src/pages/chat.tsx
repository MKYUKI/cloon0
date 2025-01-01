// src/pages/chat.tsx

import React from 'react';
import { useSession } from 'next-auth/react';
import Chat from '../components/Chat';
import SignInButton from '../components/SignInButton';
import styles from "../styles/ChatPage.module.css";

const ChatPage: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className={styles.chatPageContainer}>
      <header className={styles.header}>
        <h1>チャット</h1>
        <SignInButton />
      </header>
      <Chat />
    </div>
  );
};

export default ChatPage;

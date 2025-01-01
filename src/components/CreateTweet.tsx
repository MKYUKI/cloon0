// src/components/CreateTweet.tsx

import React, { useState } from 'react';
import axios from 'axios';
import styles from "../styles/CreateTweet.module.css";

const CreateTweet: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() === '') return;

    try {
      const res = await axios.post('/api/tweet/post', { content });
      setMessage('ツイートが投稿されました。');
      setContent('');
      // リアルタイムフィードへの通知などをここで行う
    } catch (error) {
      console.error('Error posting tweet:', error);
      setMessage('ツイートの投稿に失敗しました。');
    }
  };

  return (
    <div className={styles.createTweetContainer}>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="今どうしてる？"
          className={styles.textarea}
          required
        />
        <button type="submit" className={styles.submitButton}>
          ツイートする
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default CreateTweet;

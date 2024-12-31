// src/components/Tweet.tsx

import React from "react";
import axios from "axios";
import styles from "../styles/Tweet.module.css";

interface Author {
  _id: string;
  name: string;
  image: string;
}

interface TweetData {
  _id: string;
  author: Author;
  content: string;
  createdAt: string;
  likes: string[];
  retweets: string[];
  replies: string[];
}

interface TweetProps {
  tweet: TweetData;
}

const Tweet: React.FC<TweetProps> = ({ tweet }) => {
  const handleLike = async () => {
    try {
      await axios.post(`/api/tweet/${tweet._id}/like`);
      // 必要に応じて状態を更新
    } catch (error) {
      console.error("いいねに失敗しました:", error);
    }
  };

  const handleRetweet = async () => {
    try {
      await axios.post(`/api/tweet/${tweet._id}/retweet`);
      // 必要に応じて状態を更新
    } catch (error) {
      console.error("リツイートに失敗しました:", error);
    }
  };

  return (
    <div className={styles.container}>
      <img src={tweet.author.image} alt={tweet.author.name} className={styles.avatar} />
      <div className={styles.content}>
        <h3>{tweet.author.name}</h3>
        <p>{tweet.content}</p>
        <span>{new Date(tweet.createdAt).toLocaleString()}</span>
        <div className={styles.actions}>
          <button onClick={handleLike} className={styles.button}>いいね ({tweet.likes.length})</button>
          <button onClick={handleRetweet} className={styles.button}>リツイート ({tweet.retweets.length})</button>
        </div>
      </div>
    </div>
  );
};

export default Tweet;

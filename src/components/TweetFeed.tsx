// src/components/TweetFeed.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from "../styles/TweetFeed.module.css";
import { useSession } from 'next-auth/react';
import Chat from './Chat';

interface Tweet {
  _id: string;
  author: string;
  authorName: string;
  authorImage: string;
  content: string;
  createdAt: string;
  likes: string[];
  retweets: string[];
  replies: string[];
}

const TweetFeed: React.FC = () => {
  const { data: session } = useSession();
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const res = await axios.get('/api/tweets');
        setTweets(res.data.tweets);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tweets:', error);
        setLoading(false);
      }
    };

    fetchTweets();
  }, []);

  if (loading) return <div>ツイートを読み込み中...</div>;

  return (
    <div className={styles.tweetFeedContainer}>
      {tweets.map((tweet) => (
        <div key={tweet._id} className={styles.tweet}>
          <Image
            src={tweet.authorImage}
            alt="ユーザー画像"
            width={50}
            height={50}
            className={styles.userImage}
          />
          <div className={styles.tweetContent}>
            <h4>{tweet.authorName}</h4>
            <p>{tweet.content}</p>
            <p className={styles.timestamp}>{new Date(tweet.createdAt).toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TweetFeed;

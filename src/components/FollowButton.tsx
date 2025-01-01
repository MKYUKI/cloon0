// src/components/FollowButton.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import styles from "../styles/FollowButton.module.css";

interface FollowButtonProps {
  userId: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId }) => {
  const { data: session } = useSession();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (session) {
      axios.get('/api/profile')
        .then((res) => {
          const following = res.data.user.following;
          setIsFollowing(following.includes(userId));
        })
        .catch((err) => {
          console.error('Error fetching profile:', err);
        });
    }
  }, [session, userId]);

  const handleFollow = async () => {
    if (!session) return;
    setLoading(true);
    try {
      const res = await axios.post(`/api/user/${userId}/follow`);
      setIsFollowing(!isFollowing);
      alert(res.data.message);
    } catch (error) {
      console.error('Error following user:', error);
      alert('フォロー処理に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleFollow} className={styles.followButton} disabled={loading}>
      {isFollowing ? 'フォロー解除' : 'フォロー'}
    </button>
  );
};

export default FollowButton;

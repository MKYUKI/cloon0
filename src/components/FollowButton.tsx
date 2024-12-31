// src/components/FollowButton.tsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/FollowButton.module.css";

interface FollowButtonProps {
  targetId: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({ targetId }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // フォロー状態を取得
    const fetchFollowStatus = async () => {
      try {
        const response = await axios.get(`/api/user/${targetId}/follow-status`);
        setIsFollowing(response.data.isFollowing);
      } catch (error) {
        console.error("フォロー状態の取得に失敗しました:", error);
      }
    };
    fetchFollowStatus();
  }, [targetId]);

  const handleFollow = async () => {
    setLoading(true);
    try {
      await axios.post(`/api/user/${targetId}/follow`);
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("フォロー処理に失敗しました:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleFollow} className={styles.followButton} disabled={loading}>
      {isFollowing ? "フォロー解除" : "フォロー"}
    </button>
  );
};

export default FollowButton;

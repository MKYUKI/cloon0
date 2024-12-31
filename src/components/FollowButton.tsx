// components/FollowButton.tsx

import { useState, useEffect } from "react";
import axios from "axios";

interface FollowButtonProps {
  targetId: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({ targetId }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // 初期状態の取得
    const fetchFollowStatus = async () => {
      const response = await axios.get(`/api/user`);
      const user = response.data;
      setIsFollowing(user.following.includes(targetId));
    };
    fetchFollowStatus();
  }, [targetId]);

  const handleFollow = async () => {
    if (isFollowing) {
      await axios.delete("/api/follow", { data: { targetId } });
    } else {
      await axios.post("/api/follow", { targetId });
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <button onClick={handleFollow} style={styles.button}>
      {isFollowing ? "フォロー中" : "フォローする"}
    </button>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default FollowButton;

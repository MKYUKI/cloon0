// src/components/UserCard.tsx

import React from "react";
import FollowButton from "./FollowButton";
import styles from "../styles/UserCard.module.css";

interface UserCardProps {
  user: {
    _id: string;
    name: string;
    email: string;
    image?: string;
  };
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className={styles.card}>
      <img src={user.image || "/default-avatar.png"} alt={user.name} className={styles.avatar} />
      <div className={styles.info}>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
      <FollowButton targetId={user._id} />
    </div>
  );
};

export default UserCard;

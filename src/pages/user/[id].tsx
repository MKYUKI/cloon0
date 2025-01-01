// src/pages/user/[id].tsx

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import FollowButton from '../../components/FollowButton';
import styles from "../../styles/UserProfile.module.css";

interface SocialLinks {
  github?: string;
  youtube?: string;
  twitter?: string;
  facebook?: string;
  paypal?: string;
  amazonJP?: string;
  amazonUS?: string;
}

interface UserProfile {
  name: string;
  email: string;
  image: string;
  backgroundImage?: string;
  socialLinks: SocialLinks;
  following: string[];
  followers: string[];
}

const UserProfilePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      axios.get(`/api/user/${id}`)
        .then((res) => {
          setUser(res.data.user);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching user:', err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div>読み込み中...</div>;
  if (!user) return <div>ユーザーが見つかりません。</div>;

  return (
    <div className={styles.userProfileContainer}>
      {user.backgroundImage && (
        <div
          className={styles.backgroundImage}
          style={{ backgroundImage: `url(${user.backgroundImage})` }}
        ></div>
      )}
      <div className={styles.profileContent}>
        <Image
          src={user.image}
          alt="プロフィール画像"
          width={150}
          height={150}
          className={styles.profileImage}
        />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <div className={styles.socialLinks}>
          {user.socialLinks.github && (
            <a
              href={user.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          )}
          {/* 他のソーシャルリンクも同様に追加 */}
        </div>
        {session && session.user.email !== user.email && (
          <FollowButton userId={id as string} />
        )}
      </div>
      <div className={styles.followers}>
        <h3>フォロワー</h3>
        <ul>
          {user.followers.map((followerId) => (
            <li key={followerId}>{followerId}</li>
          ))}
        </ul>
      </div>
      <div className={styles.following}>
        <h3>フォロー中</h3>
        <ul>
          {user.following.map((followedId) => (
            <li key={followedId}>{followedId}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfilePage;

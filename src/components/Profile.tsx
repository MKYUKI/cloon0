// src/components/Profile.tsx

import React, { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import styles from "../styles/Profile.module.css";
import axios from "axios";

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
}

const Profile: React.FC = () => {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [form, setForm] = useState<UserProfile | null>(null);
  const [message, setMessage] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [backgroundImageFile, setBackgroundImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (session?.user?.email) {
      fetch('/api/profile')
        .then((res) => res.json())
        .then((data: { user: UserProfile }) => {
          setProfile(data.user);
          setForm(data.user);
        })
        .catch((error: Error) => {
          console.error('Error fetching profile:', error);
          setMessage('プロフィールの取得に失敗しました。');
        });
    }
  }, [session]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) =>
      prevForm
        ? {
            ...prevForm,
            [name]: value,
          }
        : prevForm
    );
  }, []);

  const handleSocialChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prevForm) =>
        prevForm
          ? {
              ...prevForm,
              socialLinks: {
                ...prevForm.socialLinks,
                [name]: value,
              },
            }
          : prevForm
      );
    },
    []
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleBackgroundImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBackgroundImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data.url;
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!form) return;

      try {
        let imageUrl = form.image;
        let backgroundImageUrl = form.backgroundImage || '';

        if (imageFile) {
          imageUrl = await uploadImage(imageFile);
        }

        if (backgroundImageFile) {
          backgroundImageUrl = await uploadImage(backgroundImageFile);
        }

        const updatedForm = {
          ...form,
          image: imageUrl,
          backgroundImage: backgroundImageUrl,
        };

        const res = await fetch('/api/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedForm),
        });

        if (res.ok) {
          const data: { user: UserProfile } = await res.json();
          setProfile(data.user);
          setEditing(false);
          setMessage('プロフィールが更新されました。');
        } else {
          const errorData: { error?: string } = await res.json();
          setMessage(errorData.error || 'プロフィールの更新に失敗しました。');
          console.error('Failed to update profile:', errorData);
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        setMessage('プロフィールの更新中にエラーが発生しました。');
      }
    },
    [form, imageFile, backgroundImageFile]
  );

  if (!profile) return <div>読み込み中...</div>;

  return (
    <div className={styles.profileContainer}>
      {profile.backgroundImage && (
        <div
          className={styles.backgroundImage}
          style={{ backgroundImage: `url(${profile.backgroundImage})` }}
        ></div>
      )}
      <div className={styles.profileContent}>
        <Image
          src={profile.image}
          alt="プロフィール画像"
          width={150}
          height={150}
          className={styles.profileImage}
        />
        <h2>{profile.name}</h2>
        <p>{profile.email}</p>
        <div className={styles.socialLinks}>
          {profile.socialLinks.github && (
            <a
              href={profile.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          )}
          {profile.socialLinks.youtube && (
            <a
              href={profile.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
          )}
          {profile.socialLinks.twitter && (
            <a
              href={profile.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          )}
          {profile.socialLinks.facebook && (
            <a
              href={profile.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          )}
          {profile.socialLinks.paypal && (
            <a
              href={profile.socialLinks.paypal}
              target="_blank"
              rel="noopener noreferrer"
            >
              PayPal
            </a>
          )}
          {profile.socialLinks.amazonJP && (
            <a
              href={profile.socialLinks.amazonJP}
              target="_blank"
              rel="noopener noreferrer"
            >
              Amazon JP
            </a>
          )}
          {profile.socialLinks.amazonUS && (
            <a
              href={profile.socialLinks.amazonUS}
              target="_blank"
              rel="noopener noreferrer"
            >
              Amazon US
            </a>
          )}
        </div>
        <button onClick={() => setEditing(!editing)} className={styles.editButton}>
          {editing ? 'キャンセル' : '編集'}
        </button>
        {message && <p className={styles.message}>{message}</p>}
      </div>
      {editing && form && (
        <form onSubmit={handleSubmit} className={styles.editForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">名前</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="名前"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="image">プロフィール画像</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="backgroundImage">背景画像</label>
            <input
              type="file"
              id="backgroundImage"
              name="backgroundImage"
              accept="image/*"
              onChange={handleBackgroundImageChange}
            />
          </div>
          <h3>ソーシャルリンク</h3>
          {/* ソーシャルリンクのフォームグループ */}
          <div className={styles.formGroup}>
            <label htmlFor="github">GitHub URL</label>
            <input
              type="url"
              id="github"
              name="github"
              value={form.socialLinks.github || ''}
              onChange={handleSocialChange}
              placeholder="GitHub URL"
            />
          </div>
          {/* 他のソーシャルリンクも同様に追加 */}
          <button type="submit" className={styles.saveButton}>
            保存
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;

// src/pages/profile.tsx

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import styles from "../styles/Profile.module.css";

const Profile: React.FC = () => {
  const { data: session } = useSession();
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewBackground, setPreviewBackground] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      setName(session.user?.name || "");
      setImage(session.user?.image || "");
      setBackgroundImage(session.user?.backgroundImage || "");
    }
  }, [session]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewBackground(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/profile", {
        name,
        image: previewImage,
        backgroundImage: previewBackground,
      });
      alert("プロフィールが更新されました！");
    } catch (error) {
      console.error("プロフィールの更新に失敗しました:", error);
      alert("プロフィールの更新に失敗しました。");
    }
  };

  if (!session) {
    return <p>ログインしてください。</p>;
  }

  return (
    <div className={styles.profileContainer}>
      <h1>プロフィール編集</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          名前:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          プロフィール画像:
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {previewImage && <img src={previewImage} alt="プロフィールプレビュー" className={styles.preview} />}
        </label>
        <label>
          背景画像:
          <input type="file" accept="image/*" onChange={handleBackgroundChange} />
          {previewBackground && <img src={previewBackground} alt="背景プレビュー" className={styles.preview} />}
        </label>
        <button type="submit">更新</button>
      </form>
    </div>
  );
};

export default Profile;

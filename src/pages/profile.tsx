// pages/profile.tsx

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";

const Profile: React.FC = () => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    if (session) {
      // APIからユーザーデータを取得
      axios.get('/api/user').then(response => {
        const user = response.data;
        setName(user.name);
        setImage(user.image);
        setBackgroundImage(user.backgroundImage);
      });
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // APIにユーザーデータを送信
    await axios.post('/api/user', { name, image, backgroundImage });
    alert('プロフィールが更新されました');
  };

  if (!session) {
    return <p>ログインしてください。</p>;
  }

  return (
    <div style={styles.container}>
      <h1>プロフィール編集</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>
          名前:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
        </label>
        <label>
          プロフィール画像URL:
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={styles.input}
          />
        </label>
        <label>
          背景画像URL:
          <input
            type="text"
            value={backgroundImage}
            onChange={(e) => setBackgroundImage(e.target.value)}
            style={styles.input}
          />
        </label>
        <button type="submit" style={styles.button}>更新</button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
  },
  input: {
    marginBottom: '1rem',
    padding: '0.5rem',
    fontSize: '1rem',
  },
  button: {
    padding: '0.5rem',
    fontSize: '1rem',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Profile;

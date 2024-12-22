// src/components/Profile.tsx
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

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

const Profile = () => {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<UserProfile | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (session?.user?.email) {
      fetch('/api/profile')
        .then((res) => res.json())
        .then((data) => {
          setProfile(data.user);
          setForm(data.user);
        });
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) return;
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) return;
    const { name, value } = e.target;
    setForm({
      ...form,
      socialLinks: {
        ...form.socialLinks,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const data = await res.json();
      setProfile(data.user);
      setEditing(false);
      setMessage('プロフィールが更新されました。');
    } else {
      const errorData = await res.json();
      setMessage(errorData.error || 'プロフィールの更新に失敗しました。');
      console.error('Failed to update profile');
    }
  };

  if (!profile) return <div>読み込み中...</div>;

  return (
    <div className="profile-container">
      {profile.backgroundImage && (
        <div className="background-image" style={{ backgroundImage: `url(${profile.backgroundImage})` }}></div>
      )}
      <img src={profile.image} alt="プロフィール画像" className="profile-image" />
      <h2>{profile.name}</h2>
      <p>{profile.email}</p>
      <div className="social-links">
        {profile.socialLinks.github && <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
        {profile.socialLinks.youtube && <a href={profile.socialLinks.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>}
        {profile.socialLinks.twitter && <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>}
        {profile.socialLinks.facebook && <a href={profile.socialLinks.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>}
        {profile.socialLinks.paypal && <a href={profile.socialLinks.paypal} target="_blank" rel="noopener noreferrer">PayPal</a>}
        {profile.socialLinks.amazonJP && <a href={profile.socialLinks.amazonJP} target="_blank" rel="noopener noreferrer">Amazon JP</a>}
        {profile.socialLinks.amazonUS && <a href={profile.socialLinks.amazonUS} target="_blank" rel="noopener noreferrer">Amazon US</a>}
      </div>
      <button onClick={() => setEditing(!editing)} className="edit-button">
        {editing ? 'キャンセル' : '編集'}
      </button>
      {message && <p className="message">{message}</p>}
      {editing && form && (
        <form onSubmit={handleSubmit} className="edit-form">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="名前"
            required
          />
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="プロフィール画像URL"
            required
          />
          <input
            type="text"
            name="backgroundImage"
            value={form.backgroundImage || ''}
            onChange={handleChange}
            placeholder="背景画像URL"
          />
          <input
            type="text"
            name="github"
            value={form.socialLinks.github || ''}
            onChange={handleSocialChange}
            placeholder="GitHub URL"
          />
          <input
            type="text"
            name="youtube"
            value={form.socialLinks.youtube || ''}
            onChange={handleSocialChange}
            placeholder="YouTube URL"
          />
          <input
            type="text"
            name="twitter"
            value={form.socialLinks.twitter || ''}
            onChange={handleSocialChange}
            placeholder="Twitter URL"
          />
          <input
            type="text"
            name="facebook"
            value={form.socialLinks.facebook || ''}
            onChange={handleSocialChange}
            placeholder="Facebook URL"
          />
          <input
            type="text"
            name="paypal"
            value={form.socialLinks.paypal || ''}
            onChange={handleSocialChange}
            placeholder="PayPal URL"
          />
          <input
            type="text"
            name="amazonJP"
            value={form.socialLinks.amazonJP || ''}
            onChange={handleSocialChange}
            placeholder="Amazon JP URL"
          />
          <input
            type="text"
            name="amazonUS"
            value={form.socialLinks.amazonUS || ''}
            onChange={handleSocialChange}
            placeholder="Amazon US URL"
          />
          <button type="submit" className="save-button">
            保存
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;

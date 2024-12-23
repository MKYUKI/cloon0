// src/components/Profile.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

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

  useEffect(() => {
    if (session?.user?.email) {
      fetch('/api/profile')
        .then((res) => res.json())
        .then((data) => {
          setProfile(data.user);
          setForm(data.user);
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
          setMessage('プロフィールの取得に失敗しました。');
        });
    }
  }, [session]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prevForm) =>
        prevForm
          ? {
              ...prevForm,
              [name]: value,
            }
          : prevForm
      );
    },
    []
  );

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

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!form) return;

      try {
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
          console.error('Failed to update profile:', errorData);
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        setMessage('プロフィールの更新中にエラーが発生しました。');
      }
    },
    [form]
  );

  if (!profile) return <div>読み込み中...</div>;

  return (
    <div className="profile-container">
      {profile.backgroundImage && (
        <div
          className="background-image"
          style={{ backgroundImage: `url(${profile.backgroundImage})` }}
        ></div>
      )}
      <div className="profile-content">
        <Image
          src={profile.image}
          alt="プロフィール画像"
          width={150}
          height={150}
          className="profile-image"
        />
        <h2>{profile.name}</h2>
        <p>{profile.email}</p>
        <div className="social-links">
          {profile.socialLinks.github && (
            <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
          {profile.socialLinks.youtube && (
            <a href={profile.socialLinks.youtube} target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
          )}
          {profile.socialLinks.twitter && (
            <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          )}
          {profile.socialLinks.facebook && (
            <a href={profile.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          )}
          {profile.socialLinks.paypal && (
            <a href={profile.socialLinks.paypal} target="_blank" rel="noopener noreferrer">
              PayPal
            </a>
          )}
          {profile.socialLinks.amazonJP && (
            <a href={profile.socialLinks.amazonJP} target="_blank" rel="noopener noreferrer">
              Amazon JP
            </a>
          )}
          {profile.socialLinks.amazonUS && (
            <a href={profile.socialLinks.amazonUS} target="_blank" rel="noopener noreferrer">
              Amazon US
            </a>
          )}
        </div>
        <button onClick={() => setEditing(!editing)} className="edit-button">
          {editing ? 'キャンセル' : '編集'}
        </button>
        {message && <p className="message">{message}</p>}
      </div>
      {editing && form && (
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
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
          <div className="form-group">
            <label htmlFor="image">プロフィール画像URL</label>
            <input
              type="url"
              id="image"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="プロフィール画像URL"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="backgroundImage">背景画像URL</label>
            <input
              type="url"
              id="backgroundImage"
              name="backgroundImage"
              value={form.backgroundImage || ''}
              onChange={handleChange}
              placeholder="背景画像URL"
            />
          </div>
          <h3>ソーシャルリンク</h3>
          <div className="form-group">
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
          <div className="form-group">
            <label htmlFor="youtube">YouTube URL</label>
            <input
              type="url"
              id="youtube"
              name="youtube"
              value={form.socialLinks.youtube || ''}
              onChange={handleSocialChange}
              placeholder="YouTube URL"
            />
          </div>
          <div className="form-group">
            <label htmlFor="twitter">Twitter URL</label>
            <input
              type="url"
              id="twitter"
              name="twitter"
              value={form.socialLinks.twitter || ''}
              onChange={handleSocialChange}
              placeholder="Twitter URL"
            />
          </div>
          <div className="form-group">
            <label htmlFor="facebook">Facebook URL</label>
            <input
              type="url"
              id="facebook"
              name="facebook"
              value={form.socialLinks.facebook || ''}
              onChange={handleSocialChange}
              placeholder="Facebook URL"
            />
          </div>
          <div className="form-group">
            <label htmlFor="paypal">PayPal URL</label>
            <input
              type="url"
              id="paypal"
              name="paypal"
              value={form.socialLinks.paypal || ''}
              onChange={handleSocialChange}
              placeholder="PayPal URL"
            />
          </div>
          <div className="form-group">
            <label htmlFor="amazonJP">Amazon JP URL</label>
            <input
              type="url"
              id="amazonJP"
              name="amazonJP"
              value={form.socialLinks.amazonJP || ''}
              onChange={handleSocialChange}
              placeholder="Amazon JP URL"
            />
          </div>
          <div className="form-group">
            <label htmlFor="amazonUS">Amazon US URL</label>
            <input
              type="url"
              id="amazonUS"
              name="amazonUS"
              value={form.socialLinks.amazonUS || ''}
              onChange={handleSocialChange}
              placeholder="Amazon US URL"
            />
          </div>
          <button type="submit" className="save-button">
            保存
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;

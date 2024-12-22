// pages/projects.tsx
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import AuthButton from '../components/AuthButton';
import Header from '../components/Header';

const ProjectsPage: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>読み込み中...</div>;
  }

  return (
    <div>
      <Header />
      <main className="main">
        <h1>プロジェクト</h1>
        <p>ここにプロジェクトの詳細を追加します。</p>
      </main>
    </div>
  );
};

export default ProjectsPage;

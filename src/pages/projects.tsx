// src/pages/projects.tsx
import type { NextPage } from 'next';
// import { useSession } from 'next-auth/react'; // 未使用なので削除
// import AuthButton from '../components/AuthButton'; // 未使用なので削除
import Header from '../components/Header';
import React from 'react';

const ProjectsPage: NextPage = () => {
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

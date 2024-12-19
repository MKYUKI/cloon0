import React from 'react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="w-full flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-600">
      <h1 className="text-xl font-bold">Clooon0 (ChatGPT Search Clone)</h1>
      <div className="flex items-center">
        {/* 認証ボタンや他のUI要素は後続ステップ(次回)で実装 */}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;

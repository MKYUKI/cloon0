// components/Header.tsx
import Link from 'next/link';
import AuthButton from './AuthButton';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <Link href="/">
          <a className="nav-link">ホーム</a>
        </Link>
        <Link href="/profile">
          <a className="nav-link">プロフィール</a>
        </Link>
      </nav>
      <AuthButton />
    </header>
  );
};

export default Header;

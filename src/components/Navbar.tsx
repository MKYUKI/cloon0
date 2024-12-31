// src/components/Navbar.tsx
import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link href="/" style={styles.link}>
          Cloon0
        </Link>
      </div>
      <div style={styles.menu}>
        <Link href="/projects" style={styles.link}>
          プロジェクト
        </Link>
        <Link href="/services" style={styles.link}>
          サービス
        </Link>
        {session ? (
          <>
            <span style={styles.user}>こんにちは、{session.user?.name}</span>
            <button style={styles.button} onClick={() => signOut()}>
              サインアウト
            </button>
          </>
        ) : (
          <button style={styles.button} onClick={() => signIn("google")}>
            Googleでサインイン
          </button>
        )}
      </div>
    </nav>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
  },
  menu: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    marginRight: "1.5rem",
    textDecoration: "none",
    color: "#333",
    fontSize: "1rem",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#4285F4",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    marginLeft: "1rem",
    transition: "background-color 0.3s ease",
  },
  user: {
    marginRight: "1rem",
    fontSize: "1rem",
    color: "#333",
  },
};

export default Navbar;

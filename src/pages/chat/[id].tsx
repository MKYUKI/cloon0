// src/pages/chat/[id].tsx

import { useRouter } from "next/router";
import Chat from "../../components/Chat";

const ChatPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== 'string') {
    return <p>ユーザーを選択してください。</p>;
  }

  return (
    <div style={styles.container}>
      <h1>ユーザー {id} とのチャット</h1>
      <Chat receiverId={id} />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "2rem",
    maxWidth: "800px",
    margin: "0 auto",
  },
};

export default ChatPage;

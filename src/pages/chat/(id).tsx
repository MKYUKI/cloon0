// pages/chat/[id].tsx

import { useRouter } from "next/router";
import Chat from "../../components/Chat";

const ChatPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div style={styles.container}>
      <h1>ユーザー {id} とのチャット</h1>
      <Chat />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "2rem",
  },
};

export default ChatPage;

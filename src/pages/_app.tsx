// src/pages/_app.tsx

import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  useEffect(() => {
    // Socket.ioの接続
    socket = io();

    socket.on("connect", () => {
      console.log("Connected to Socket.io");
    });

    socket.on("tweetAdded", (tweet: any) => {
      // 新しいツイートを取得して表示
      console.log("New tweet added:", tweet);
      // 必要に応じて状態を更新
    });

    // クリーンアップ関数でソケットを切断
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;

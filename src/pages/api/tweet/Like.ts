// src/pages/api/tweet/[id]/Like.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import dbConnect from "../../../utils/dbConnect";
import Tweet from "../../../models/Tweet";
import User from "../../../models/User";
import mongoose from "mongoose";
import { Server } from "ws";

const LikeHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const wss = new Server({ noServer: true });

  wss.on('connection', (ws) => {
    // 必要に応じてWebSocketのイベントを追加
  });

  res.socket?.on('upgrade', async (request, socket, head) => {
    const session = await getSession({ req: request });

    if (!session) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });

  // リクエストの処理
  // 既存のLIKE処理をここに統合
};

export default LikeHandler;

// src/pages/api/notifications.ts

import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "ws";
import { getSession } from "next-auth/react";
import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";

const NotificationHandler = (req: NextApiRequest, res: any) => {
  if (req.method !== 'GET') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const wss = new Server({ noServer: true });

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      // 通知メッセージを送信
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === 1) {
          client.send(message);
        }
      });
    });
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
};

export default NotificationHandler;

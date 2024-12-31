// src/pages/api/chat.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import dbConnect from "../../utils/dbConnect";
import Message from "../../models/Message";
import User from "../../models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "ログインが必要です。" });
  }

  await dbConnect();

  if (req.method === "GET") {
    try {
      const messages = await Message.find({ receiver: session.user.email }).populate("sender", "name image");
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: "メッセージの取得に失敗しました。" });
    }
  } else if (req.method === "POST") {
    try {
      const { receiver, content } = req.body;
      const newMessage = await Message.create({
        sender: session.user.email,
        receiver,
        content,
      });
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ message: "メッセージの送信に失敗しました。" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

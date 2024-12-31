// pages/api/chat.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import dbConnect from "../../utils/dbConnect";
import Message from "../../models/Message";
import User from "../../models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await dbConnect();

  const user = await User.findOne({ email: session.user?.email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  switch (req.method) {
    case "GET":
      const { receiverId } = req.query;
      if (!receiverId || typeof receiverId !== 'string') {
        return res.status(400).json({ message: "Receiver ID is required" });
      }

      const messages = await Message.find({
        $or: [
          { sender: user._id, receiver: receiverId },
          { sender: receiverId, receiver: user._id },
        ],
      }).populate('sender receiver').sort({ createdAt: 1 });

      res.status(200).json(messages);
      break;

    case "POST":
      const { receiver, content } = req.body;
      if (!receiver || !content) {
        return res.status(400).json({ message: "Receiver and content are required" });
      }

      const receiverUser = await User.findById(receiver);
      if (!receiverUser) {
        return res.status(404).json({ message: "Receiver not found" });
      }

      const message = new Message({
        sender: user._id,
        receiver: receiver,
        content,
      });

      await message.save();

      res.status(201).json(message);
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

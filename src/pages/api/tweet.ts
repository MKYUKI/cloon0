// src/pages/api/tweet.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import dbConnect from "../../utils/dbConnect";
import Tweet from "../../models/Tweet";
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
    case "POST":
      const { content, replyTo } = req.body;
      if (!content) {
        return res.status(400).json({ message: "Content is required" });
      }

      try {
        const tweet = new Tweet({
          author: user._id,
          content,
          replyTo: replyTo || null,
        });

        await tweet.save();

        res.status(201).json(tweet);
      } catch (error) {
        console.error("POST /api/tweet エラー:", error);
        res.status(500).json({ message: "Server error" });
      }
      break;

    case "GET":
      try {
        // ツイートの取得（例として最新10件）
        const tweets = await Tweet.find()
          .populate('author', 'name image')
          .sort({ createdAt: -1 })
          .limit(10);

        res.status(200).json(tweets);
      } catch (error) {
        console.error("GET /api/tweet エラー:", error);
        res.status(500).json({ message: "Server error" });
      }
      break;

    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

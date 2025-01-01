// src/pages/api/tweet/post.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import dbConnect from "../../../utils/dbConnect";
import Tweet from "../../../models/Tweet";
import User from "../../../models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "ログインが必要です。" });
  }

  const { content } = req.body;

  if (!content || typeof content !== 'string') {
    return res.status(400).json({ message: "無効なツイート内容です。" });
  }

  await dbConnect();

  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return res.status(404).json({ message: "ユーザーが見つかりません。" });
  }

  const newTweet = new Tweet({
    author: user._id,
    content,
  });

  await newTweet.save();

  res.status(201).json({ tweet: newTweet });
}

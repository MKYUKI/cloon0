// src/pages/api/tweet/[id]Like.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import dbConnect from "../../../utils/dbConnect"; // 修正済み
import Tweet from "../../../models/Tweet";
import User from "../../../models/User";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "ログインが必要です。" });
  }

  await dbConnect();

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "無効なツイートIDです。" });
  }

  const tweet = await Tweet.findById(id);
  const user = await User.findOne({ email: session.user.email });

  if (!tweet || !user) {
    return res.status(404).json({ message: "ツイートまたはユーザーが見つかりません。" });
  }

  switch (req.method) {
    case "POST":
      // いいねを追加する
      if (!tweet.likes.includes(user._id)) {
        tweet.likes.push(user._id);
        await tweet.save();
      }
      res.status(200).json({ message: "いいねしました。" });
      break;
    case "DELETE":
      // いいねを解除する
      tweet.likes = tweet.likes.filter((likeId: mongoose.Types.ObjectId) => likeId.toString() !== user._id.toString());
      await tweet.save();
      res.status(200).json({ message: "いいねを解除しました。" });
      break;
    default:
      res.status(405).json({ message: "Method Not Allowed" });
      break;
  }
}

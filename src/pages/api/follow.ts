// src/pages/api/follow.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";
import mongoose from "mongoose"; // 追加

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "ログインが必要です。" });
  }

  await dbConnect();

  const { targetId } = req.query;

  if (!targetId || typeof targetId !== "string") {
    return res.status(400).json({ message: "無効なターゲットIDです。" });
  }

  const user = await User.findOne({ email: session.user.email });
  const targetUser = await User.findById(targetId);

  if (!user || !targetUser) {
    return res.status(404).json({ message: "ユーザーが見つかりません。" });
  }

  switch (req.method) {
    case "POST":
      // フォローを追加する
      if (!user.following.includes(targetUser._id)) {
        user.following.push(targetUser._id);
        targetUser.followers.push(user._id);
        await user.save();
        await targetUser.save();
      }
      res.status(200).json({ message: "フォローしました。" });
      break;
    case "DELETE":
      // フォローを解除する
      user.following = user.following.filter((id: mongoose.Types.ObjectId) => id.toString() !== targetId);
      targetUser.followers = targetUser.followers.filter((id: mongoose.Types.ObjectId) => id.toString() !== user._id.toString());
      await user.save();
      await targetUser.save();
      res.status(200).json({ message: "フォローを解除しました。" });
      break;
    default:
      res.status(405).json({ message: "Method Not Allowed" });
      break;
  }
}

// src/pages/api/user/[id]/follow.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "ログインが必要です。" });
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "無効なユーザーIDです。" });
  }

  await dbConnect();

  const userToFollow = await User.findById(id);
  const currentUser = await User.findOne({ email: session.user.email });

  if (!userToFollow || !currentUser) {
    return res.status(404).json({ message: "ユーザーが見つかりません。" });
  }

  if (currentUser.following.includes(userToFollow._id)) {
    // フォロー解除
    currentUser.following = currentUser.following.filter(
      (userId) => !userId.equals(userToFollow._id)
    );
    userToFollow.followers = userToFollow.followers.filter(
      (userId) => !userId.equals(currentUser._id)
    );
  } else {
    // フォロー追加
    currentUser.following.push(userToFollow._id);
    userToFollow.followers.push(currentUser._id);
  }

  await currentUser.save();
  await userToFollow.save();

  res.status(200).json({ message: currentUser.following.includes(userToFollow._id) ? "フォロー解除しました。" : "フォローしました。" });
}

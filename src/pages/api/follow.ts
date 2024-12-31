// pages/api/follow.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import dbConnect from "../../utils/dbConnect";
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

  const { targetId } = req.body;

  if (!targetId) {
    return res.status(400).json({ message: "Target ID is required" });
  }

  const targetUser = await User.findById(targetId);

  if (!targetUser) {
    return res.status(404).json({ message: "Target user not found" });
  }

  switch (req.method) {
    case "POST":
      // フォローする
      if (!user.following.includes(targetId)) {
        user.following.push(targetId);
        targetUser.followers.push(user._id);
        await user.save();
        await targetUser.save();
      }
      res.status(200).json({ message: "フォローしました" });
      break;

    case "DELETE":
      // フォローを解除する
      user.following = user.following.filter(id => id.toString() !== targetId);
      targetUser.followers = targetUser.followers.filter(id => id.toString() !== user._id.toString());
      await user.save();
      await targetUser.save();
      res.status(200).json({ message: "フォローを解除しました" });
      break;

    default:
      res.setHeader("Allow", ["POST", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

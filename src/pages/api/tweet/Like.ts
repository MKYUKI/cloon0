// src/pages/api/tweet/[id]/like.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import dbConnect from "../../../../utils/dbConnect";
import Tweet from "../../../../models/Tweet";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "ログインが必要です。" });
  }

  await dbConnect();

  const { id } = req.query;

  if (req.method === "POST") {
    try {
      const tweet = await Tweet.findById(id);
      if (!tweet) {
        return res.status(404).json({ message: "ツイートが見つかりません。" });
      }

      if (tweet.likes.includes(session.user.email)) {
        tweet.likes = tweet.likes.filter((email) => email !== session.user.email);
      } else {
        tweet.likes.push(session.user.email);
      }

      await tweet.save();
      res.status(200).json(tweet);
    } catch (error) {
      res.status(500).json({ message: "いいねの処理に失敗しました。" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

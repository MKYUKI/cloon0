// src/pages/api/tweets.ts

import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/dbConnect";
import Tweet from "../../models/Tweet";
import User from "../../models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await dbConnect();

  try {
    const tweets = await Tweet.find({})
      .populate('author', 'name image') // 作者の名前と画像を取得
      .sort({ createdAt: -1 }); // 最新順にソート

    const formattedTweets = tweets.map((tweet) => ({
      _id: tweet._id,
      author: tweet.author._id.toString(),
      authorName: tweet.author.name,
      authorImage: tweet.author.image,
      content: tweet.content,
      createdAt: tweet.createdAt,
      likes: tweet.likes.map(id => id.toString()),
      retweets: tweet.retweets.map(id => id.toString()),
      replies: tweet.replies.map(id => id.toString()),
    }));

    res.status(200).json({ tweets: formattedTweets });
  } catch (error) {
    console.error('Error fetching tweets:', error);
    res.status(500).json({ message: "ツイートの取得に失敗しました。" });
  }
}

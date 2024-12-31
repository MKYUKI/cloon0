// src/pages/api/profile.ts
import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "認証が必要です。" });
  }

  const { displayName, avatar, backgroundImage } = req.body;

  if (!displayName) {
    return res.status(400).json({ error: "表示名は必須です。" });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    // session.user.id を ObjectId に変換
    const userId = new ObjectId(session.user.id);

    await db.collection("users").updateOne(
      { _id: userId },
      {
        $set: {
          displayName,
          avatar,
          backgroundImage,
        },
      }
    );

    res.status(200).json({ message: "プロフィールが更新されました。" });
  } catch (error: any) {
    console.error("プロフィール更新エラー:", error);
    res.status(500).json({ error: "プロフィールの更新に失敗しました。" });
  }
}

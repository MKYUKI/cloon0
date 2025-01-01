// src/pages/api/profile.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";

interface SocialLinks {
  github?: string;
  youtube?: string;
  twitter?: string;
  facebook?: string;
  paypal?: string;
  amazonJP?: string;
  amazonUS?: string;
}

interface UserProfile {
  name: string;
  email: string;
  image: string;
  backgroundImage?: string;
  socialLinks: SocialLinks;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "ログインが必要です。" });
  }

  await dbConnect();

  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return res.status(404).json({ message: "ユーザーが見つかりません。" });
  }

  switch (req.method) {
    case "GET":
      // プロフィールの取得
      const userProfile: UserProfile = {
        name: user.name,
        email: user.email,
        image: user.image,
        backgroundImage: user.backgroundImage,
        socialLinks: user.socialLinks,
      };
      res.status(200).json({ user: userProfile });
      break;
    case "PUT":
      // プロフィールの更新
      const { name, image, backgroundImage, socialLinks } = req.body;

      if (name) user.name = name;
      if (image) user.image = image;
      if (backgroundImage) user.backgroundImage = backgroundImage;
      if (socialLinks) user.socialLinks = socialLinks;

      await user.save();
      res.status(200).json({ user: user });
      break;
    default:
      res.status(405).json({ message: "Method Not Allowed" });
      break;
  }
}

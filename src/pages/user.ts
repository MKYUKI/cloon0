// pages/api/user.ts

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

  const email = session.user?.email;

  switch (req.method) {
    case "GET":
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
      break;

    case "POST":
      try {
        const { name, image, backgroundImage } = req.body;
        const user = await User.findOneAndUpdate(
          { email },
          { name, image, backgroundImage },
          { new: true, upsert: true }
        );
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

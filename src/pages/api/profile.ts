// src/pages/api/profile.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import dbConnect from '../lib/mongodb';
import User, { IUser } from '../lib/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await dbConnect();

  const userEmail = session.user.email;

  switch (req.method) {
    case 'GET':
      try {
        let user: IUser | null = await User.findOne({ email: userEmail });

        if (!user) {
          // ユーザーが存在しない場合は新規作成
          user = new User({
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            socialLinks: {},
          });
          await user.save();
        }

        return res.status(200).json({ user });
      } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ error: 'Error fetching user' });
      }

    case 'PUT':
      try {
        const { name, image, backgroundImage, socialLinks } = req.body;

        const updatedUser = await User.findOneAndUpdate(
          { email: userEmail },
          { name, image, backgroundImage, socialLinks },
          { new: true, upsert: true }
        );

        return res.status(200).json({ user: updatedUser });
      } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Error updating user' });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

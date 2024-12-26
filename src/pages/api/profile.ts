// src/pages/api/profile.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import clientPromise from '../../lib/mongodb';

interface ProfileUpdateResponse {
  message?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileUpdateResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getSession({ req });

  if (!session || !session.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { name, profileImage, backgroundImage } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    await db.collection('users').updateOne(
      { email: session.user.email },
      {
        $set: {
          name,
          profileImage: profileImage || '',
          backgroundImage: backgroundImage || '',
        },
      },
      { upsert: true }
    );

    return res.status(200).json({ message: 'プロフィールが更新されました' });
  } catch (error: any) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

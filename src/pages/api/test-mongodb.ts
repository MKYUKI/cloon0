// src/pages/api/test-mongodb.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db('myDatabase'); // 正しいデータベース名を指定
    const test = await db.collection('test').findOne({});
    res
      .status(200)
      .json({ message: 'MongoDB connected successfully', data: test });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to connect to MongoDB' });
  }
}

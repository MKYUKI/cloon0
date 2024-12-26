// pages/api/process.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  result: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ result: `Method ${req.method} Not Allowed` });
  }

  const { prompt, api } = req.body;

  if (!prompt) {
    return res.status(400).json({ result: 'プロンプトが提供されていません。' });
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, api }),
    });

    const data = await response.json();
    return res.status(response.status).json({ result: data.result });
  } catch (error) {
    console.error('Error connecting to backend:', error);
    return res
      .status(500)
      .json({ result: '内部サーバーエラーが発生しました。' });
  }
}

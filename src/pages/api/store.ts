// pages/api/store.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  items: Array<{
    id: number;
    name: string;
    description: string;
    link: string;
  }>;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ items: [] });
  }

  // 仮のストアアイテムデータ
  const items = [
    {
      id: 1,
      name: '商品1',
      description: '商品1の説明文。',
      link: '#',
    },
    {
      id: 2,
      name: '商品2',
      description: '商品2の説明文。',
      link: '#',
    },
    {
      id: 3,
      name: '商品3',
      description: '商品3の説明文。',
      link: '#',
    },
    // 他の商品も追加
  ];

  res.status(200).json({ items });
}

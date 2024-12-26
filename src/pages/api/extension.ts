import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 将来的にChrome拡張からのリクエスト処理を追加予定
  res.status(200).json({ message: 'Extension endpoint placeholder' });
}

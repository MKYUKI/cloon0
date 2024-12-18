// src/pages/api/singularity.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleSearchResponse, GoogleSearchItem } from '../../types/GoogleSearchResponse';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: 'クエリを入力してください。' });
    }

    try {
      const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Google検索APIの呼び出しに失敗しました。');
      }

      const data: GoogleSearchResponse = await response.json();

      if (data.items && data.items.length > 0) {
        const results = data.items.map((item: GoogleSearchItem) => `${item.title}: ${item.link}`).join('\n');
        return res.status(200).json({ results });
      }

      return res.status(200).json({ results: 'Google検索結果が見つかりませんでした。' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'サーバーエラーが発生しました。' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}

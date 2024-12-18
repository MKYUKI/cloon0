// pages/api/singularity.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import fetch from 'node-fetch';

type Data = {
  result: string;
};

// 環境変数の設定
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// 各APIのハンドリング関数
const handleOpenAI = async (prompt: string): Promise<string> => {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 150,
  });
  return response.data.choices[0].text?.trim() || 'OpenAIからの応答がありません。';
};

const handleGoogleSearch = async (query: string): Promise<string> => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;
  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  if (data.items && data.items.length > 0) {
    return data.items.map((item: any) => `${item.title}: ${item.link}`).join('\n');
  }
  return 'Google検索結果が見つかりませんでした。';
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ result: `Method ${req.method} Not Allowed` });
  }

  const { prompt, api } = req.body;

  if (!prompt) {
    return res.status(400).json({ result: 'プロンプトが提供されていません。' });
  }

  try {
    let result = '';

    switch (api) {
      case 'openai':
        result = await handleOpenAI(prompt);
        break;
      case 'google':
        result = await handleGoogleSearch(prompt);
        break;
      // 他のAPIを追加する場合はここにケースを追加
      default:
        result = await handleOpenAI(prompt); // デフォルトはOpenAI
        break;
    }

    res.status(200).json({ result });
  } catch (error) {
    console.error('Error in /api/singularity:', error);
    res.status(500).json({ result: '内部サーバーエラーが発生しました。' });
  }
}

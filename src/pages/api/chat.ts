// src/pages/api/chat.ts
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    });

    res.status(200).json({ result: response.choices[0].message.content });
  } catch (error: any) {
    console.error('OpenAI API Error:', error.response?.data || error.message || error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
}
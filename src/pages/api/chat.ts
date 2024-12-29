// src/pages/api/chat.ts (修正版)
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
  } catch (error) {
    res.status(500).json({ error: 'Error communicating with OpenAI' });
  }
}
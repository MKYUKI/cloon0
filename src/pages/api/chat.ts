// src/pages/api/chat.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { openai } from '../../lib/openaiClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    });

    res.status(200).json({ result: response.data.choices[0].message?.content });
  } catch (error: any) {
    console.error('OpenAI API Error:', error.response?.data || error.message || error);
    res.status(500).json({ error: 'Error communicating with OpenAI' });
  }
}

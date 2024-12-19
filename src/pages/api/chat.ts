// src/pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAIApi, Configuration } from 'openai';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 2000,
      temperature: 0.7,
    });
    const assistantReply = completion.data.choices[0]?.message?.content || '';
    return res.status(200).json({ role: 'assistant', content: assistantReply });
  } catch (error:any) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

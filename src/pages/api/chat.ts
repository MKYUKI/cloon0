import type { NextApiRequest, NextApiResponse } from 'next'
import { openai } from '../../lib/openaiClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { message } = req.body
  if (!message) return res.status(400).json({ error: 'No message provided' })

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message }
      ]
    })

    const answer = response.choices?.[0]?.message?.content || 'No answer'
    res.status(200).json({ answer })
  } catch (err: any) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

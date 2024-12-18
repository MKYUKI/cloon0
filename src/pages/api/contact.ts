// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import sendMail from '../../backend/sendMail';

type Data = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: '全てのフィールドを入力してください。' });
  }

  try {
    await sendMail({ name, email, message });
    return res.status(200).json({ message: 'お問い合わせありがとうございます。' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'メール送信中にエラーが発生しました。' });
  }
}

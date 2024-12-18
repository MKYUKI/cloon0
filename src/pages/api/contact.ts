// src/pages/api/contact.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import sendgrid from '@sendgrid/mail';

// 環境変数からSendGridのAPIキーを取得
sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // バリデーション（簡易版）
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'すべてのフィールドを入力してください。' });
    }

    try {
      await sendgrid.send({
        to: 'your-email@example.com', // 受信先メールアドレス
        from: 'no-reply@cloon0.com', // SendGridで認証済みの送信元メールアドレス
        subject: `新しいお問い合わせ: ${name}`,
        text: `名前: ${name}\nメール: ${email}\nメッセージ:\n${message}`,
      });
      res.status(200).json({ message: 'お問い合わせありがとうございます。' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'メール送信に失敗しました。' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}

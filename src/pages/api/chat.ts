// src/pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "メッセージは必須です。" });
  }

  try {
    const response = await fetch("https://api.gemini.com/your-endpoint", { // 正しいエンドポイントに変更
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GOOGLE_Gemini_API}`, // 環境変数名を確認
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API Error: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json({ reply: data.reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Gemini APIとの通信に失敗しました。" });
  }
}

import { OpenAI } from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OpenAI APIキーが設定されていません。");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// src/lib/openaiClient.ts
import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    'OpenAI APIキーが設定されていません。.env.localにOPENAI_API_KEYを設定してください。'
  );
}

const configuration = new OpenAI.Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI.OpenAIApi(configuration);

export { openai };

// src/lib/openaiClient.ts
import { Configuration, OpenAIApi } from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    'OpenAI APIキーが設定されていません。.env.localにOPENAI_API_KEYを設定してください。'
  );
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export { openai };

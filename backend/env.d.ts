// backend/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    OPENAI_API_KEY: string;
    GOOGLE_API_KEY: string;
    GOOGLE_SEARCH_ENGINE_ID: string;
    // 他の環境変数があればここに追加
  }
}

// src/types/global.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    OPENAI_API_KEY: string;
    MONGODB_URI: string;
    NEXTAUTH_URL: string;
    NEXT_PUBLIC_OPENAI_API_KEY: string;
    NEXTAUTH_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    // 必要な環境変数をここに追加
  }
}

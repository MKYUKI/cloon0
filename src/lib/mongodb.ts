// lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // 開発環境ではグローバル変数を使用してクライアントをキャッシュします
  // 再起動時に新しいクライアントが作成されるのを防ぎます
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // 本番環境では新しいクライアントを作成します
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

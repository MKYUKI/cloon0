// src/lib/mongodb.ts
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

// グローバルスコープでのキャッシュ
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  // 開発環境ではグローバル変数を使用してクライアントを再利用
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // 本番環境では新しいクライアントを作成
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

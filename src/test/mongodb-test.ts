// src/test/mongodb-test.ts
import clientPromise from '../lib/mongodb';

async function testConnection() {
  try {
    const client = await clientPromise;
    const db = client.db();
    console.log('Connected to MongoDB successfully');
    process.exit(0);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

testConnection();

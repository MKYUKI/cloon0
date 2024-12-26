// src/test/mongodb-test.ts
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;

const client = new MongoClient(uri);

const testConnection = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas successfully');
    await client.close();
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas', error);
  }
};

testConnection();

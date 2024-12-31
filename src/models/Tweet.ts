// src/models/Tweet.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface ITweet extends Document {
  author: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
  likes: mongoose.Types.ObjectId[];
  retweets: mongoose.Types.ObjectId[];
  replies: mongoose.Types.ObjectId[];
}

const TweetSchema: Schema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  retweets: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  replies: [{ type: Schema.Types.ObjectId, ref: 'Tweet' }],
});

export default mongoose.models.Tweet || mongoose.model<ITweet>('Tweet', TweetSchema);

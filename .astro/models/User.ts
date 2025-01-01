// src/models/User.ts

import mongoose, { Schema, Document } from 'mongoose';

interface SocialLinks {
  github?: string;
  youtube?: string;
  twitter?: string;
  facebook?: string;
  paypal?: string;
  amazonJP?: string;
  amazonUS?: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  image: string;
  backgroundImage?: string;
  socialLinks: SocialLinks;
  following: mongoose.Types.ObjectId[];
  followers: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  backgroundImage: { type: String },
  socialLinks: {
    github: { type: String },
    youtube: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    paypal: { type: String },
    amazonJP: { type: String },
    amazonUS: { type: String },
  },
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

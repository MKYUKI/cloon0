// src/lib/models/User.ts
import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IUser extends Document {
  _id: ObjectId; // 追加
  name: string;
  email: string;
  image: string;
  profileImage?: string;
  backgroundImage?: string;
  socialLinks: {
    github?: string;
    youtube?: string;
    twitter?: string;
    facebook?: string;
    paypal?: string;
    amazonJP?: string;
    amazonUS?: string;
  };
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  profileImage: { type: String },
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
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
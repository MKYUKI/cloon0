// src/pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NEXTAUTH_DEBUG === "true",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30日間
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async session({ session, token, user }) {
      if (user) {
        session.user.id = user.id;
        session.user.displayName = user.displayName || user.name;
        session.user.avatar = user.avatar || user.image;
        session.user.backgroundImage = user.backgroundImage || "";
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      // 初期カスタムフィールドを追加
      const db = (await clientPromise).db();
      await db.collection("users").updateOne(
        { _id: user.id },
        {
          $set: {
            displayName: user.name,
            avatar: user.image,
            backgroundImage: "",
          },
        }
      );
    },
  },
});

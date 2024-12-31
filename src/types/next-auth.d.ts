// src/types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      displayName?: string | null;
      avatar?: string | null;
      backgroundImage?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    displayName?: string | null;
    avatar?: string | null;
    backgroundImage?: string | null;
  }
}

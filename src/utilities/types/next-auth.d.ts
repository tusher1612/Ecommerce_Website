// next-auth.d.ts
import NextAuth, { DefaultSession, AdapterUser } from "next-auth";

declare module "next-auth" {

  interface User {
    id: string;
    email: string;
    name: string;
    emailVerified?: Date | null;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      emailVerified?: Date | null; // Make emailVerified optional
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    email: string;
    name: string;
    emailVerified?: Date | null;
  }
}


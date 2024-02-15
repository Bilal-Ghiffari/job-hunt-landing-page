import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../../lib/prisma";
import { comparePassword } from "@/lib/utils";
import NextAuth from "next-auth/next";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!!,
      clientSecret: process.env.GOOGLE_SECRET!!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });
        if (!user) {
          return null;
        }
        const isMatch = await comparePassword(
          credentials?.password!!,
          user?.password
        );
        if (isMatch) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/auth/error",
    newUser: "/signup",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: profile?.email,
          },
        });
        if (existingUser) {
          console.log("user already exists", existingUser);
        }
      }
      console.log("account", account);
      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

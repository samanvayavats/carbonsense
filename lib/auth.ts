import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { SessionStrategy } from "next-auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "username",
      credentials: {
        username: { label: "username", type: "text", placeholder: "username" },
        password: { label: "password", type: "text", placeholder: "password" },
      },
      async authorize(credentials: any, req) {
        console.log(credentials);
        const username = credentials?.username;
        const password = credentials?.password;

        const user = await prisma.user.findUnique({
          where: {
            name: username,
          },
        });

        const isPasswordCorrect = bcrypt.compareSync(
          password,
          user?.password || "",
        );

        if (!isPasswordCorrect || !user) {
          return null;
        }

        return {
          id: String(user.id),
          name: user?.name,
          email: user?.email,
        };

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: { id?: string } }) {
      // user is only available on first login
      if (user) {
        token.id = user.id; // store user id in JWT
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        // ensure user object exists to avoid runtime errors and allow assignment
        (session as any).user = (session as any).user || {};
        (session as any).user.id = token.id; // attach id to session.user
      }
      return session;
    },
  },

  session: {
    strategy: "jwt" as SessionStrategy,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

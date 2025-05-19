import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      const userEmail = user?.email
        ? await db.user.findUnique({
            where: { email: user.email },
          })
        : null;

      if (!user && userEmail) {
        const newUser = await db.user.create({
          data: {
            name: userEmail.name,
            email: userEmail.email,
          },
        });
        token.id = newUser.id;
      } else if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },

    redirect() {
      return "/login";
    },
  },
});

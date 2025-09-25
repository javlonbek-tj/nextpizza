import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import bcrypt from 'bcrypt';
import { loginSchema } from '@/components/modals/auth-modal/forms/schemas';
import prisma from '@/prisma/prisma-client';

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        if (!credentials) return null;

        // Validate the credentials
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          // Find user in database
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) {
            return null;
          }

          if (!user.verified) {
            return null;
          }

          // Check password
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return {
              id: user.id,
              email: user.email,
              name: user.fullName,
              role: user.role,
            };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    /*  async signIn({ user }) {
      const existingUser = await prisma.user.findUnique({
        where: { id: Number(user.id) },
      });
      if(!existingUser || !existingUser.verified) {
        return false;
      }
      return true;
    } */
    async jwt({ token }) {
      if (!token.sub) return token;
      const user = await prisma.user.findUnique({
        where: { id: Number(token.sub) },
      });
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

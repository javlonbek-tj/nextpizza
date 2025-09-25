import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import authConfig from '@/auth/auth.config';
import prisma from '@/prisma/prisma-client';

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  events: {
    async linkAccount({ user, account }) {
      if (account.provider === 'google' || account.provider === 'github') {
        await prisma.user.update({
          where: { id: Number(user.id) },
          data: {
            verified: new Date(),
          },
        });
      }
    },
  },
  ...authConfig,
});

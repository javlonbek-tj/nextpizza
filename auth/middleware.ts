import authConfig from '@/auth/auth.config';
import NextAuth from 'next-auth';

const { auth } = NextAuth(authConfig);
export default auth((req) => {
  // Your custom middleware logic goes here
  const isLoggedIn = !!req.auth;
  console.log({ isLoggedIn });
});

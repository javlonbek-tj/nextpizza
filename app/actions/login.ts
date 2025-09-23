'use server';

import bcrypt from 'bcrypt';

import {
  loginSchema,
  LoginValues,
} from '@/components/modals/auth-modal/forms/schemas';
import prisma from '@/prisma/prisma-client';

export async function loginAction(values: LoginValues) {
  const parsed = loginSchema.safeParse(values);

  if (!parsed.success) {
    return { error: 'Invalid input data' };
  }

  const { email, password } = parsed.data;

  try {
    // 1. Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: 'No account found with this email' };
    }

    // 2. Compare password
    const isPasswordValid =
      user.password && (await bcrypt.compare(password, user.password));

    if (!isPasswordValid) {
      return { error: 'Invalid email or password' };
    }

    // 3. Return success (you could also start a session here if needed)
    return { success: 'Login successful!' };
  } catch (err) {
    // TODO REMOVE IN PRODUCTION
    console.error(err);
    return { error: 'Something went wrong. Please try again.' };
  }
}

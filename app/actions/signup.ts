'use server';

import bcrypt from 'bcrypt';
import {
  signupSchema,
  SignUpValues,
} from '@/components/modals/auth-modal/forms/schemas';
import prisma from '@/prisma/prisma-client';

export async function signUpAction(values: SignUpValues) {
  const parsed = signupSchema.safeParse(values);

  if (!parsed.success) {
    return { error: 'Invalid input data' };
  }

  const { fullName, email, password } = parsed.data;

  try {
    // 1. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: 'User with this email already exists' };
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Save to database
    await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });

    return { success: `Welcome, ${fullName}! Registration successful.` };
  } catch (err) {
    // TODO REMOVE IN PRODUCTION
    console.error(err);
    return { error: 'Something went wrong. Please try again.' };
  }
}

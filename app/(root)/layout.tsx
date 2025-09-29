import { auth } from '@/auth/auth';
import { Header } from '@/components/shared';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Главная',
};

export default async function HomeLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  const session = await auth();
  return (
    <main className='min-h-screen'>
      <Header session={session} />
      {children}
      {modal}
    </main>
  );
}

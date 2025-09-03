import { Header } from '@/components/shared/Header';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Next Pizza | Главная',
};
export default function HomeLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
      {modal}
    </main>
  );
}

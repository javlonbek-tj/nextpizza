import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/shared';

export const metadata: Metadata = {
  title: 'Checkout',
};

export default function CheckoutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className='min-h-screen bg-[#F4F1EE]'>
      <Header hasSearch={false} hasCartBtn={false} />
      {children}
    </main>
  );
}

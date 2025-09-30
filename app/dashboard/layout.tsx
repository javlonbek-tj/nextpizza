import React from 'react';
import { Metadata } from 'next';

import { SimpleHeader } from '@/components/header/Simple-header';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className='bg-[#F4F1EE] min-h-screen'>
      <SimpleHeader />
      {children}
    </main>
  );
}

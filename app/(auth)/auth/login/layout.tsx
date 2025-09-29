import { Header } from '@/components/shared';
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Главная',
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <main className='min-h-screen'>
      <Header hasCartBtn={false} hasSearch={false} />

      <div className='flex justify-center py-6'>
        <Button asChild variant='outline' className='px-6'>
          <Link href='/'>
            <ArrowLeft size={16} /> Назад на главную
          </Link>
        </Button>
      </div>

      {children}
      {modal}
    </main>
  );
}

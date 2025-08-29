import { Header } from '@/components/shared/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next Pizza | Главная',
};
export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
    </main>
  );
}
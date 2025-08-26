import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Container } from './Container';
import { Button } from '../ui/button';
import { User } from 'lucide-react';

interface Props {
  className?: string;
}

export function Header({ className }: Props) {
  return (
    <header className={cn('border border-b', className)}>
      <Container className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="logo" width={35} height={35} />
          <div>
            <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
            <p className="text-sm text-gray-400 leading-3">
              вкусней уже некуда
            </p>
          </div>
        </div>
        <div>
          <Button>
            <User />
            <span>Профиль</span>
          </Button>
        </div>
      </Container>
    </header>
  );
}

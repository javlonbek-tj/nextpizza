import Image from 'next/image';
import { User } from 'lucide-react';

import { cn } from '@/lib';
import { Container } from './Container';
import { Button } from '../ui/button';
import { SearchInput } from './Search-input';
import { CartButton } from './Cart-button';
import { CartDrawer } from './Cart-drawer';

interface Props {
  className?: string;
}

export function Header({ className }: Props) {
  return (
    <header className={cn('border border-b', className)}>
      <Container className='flex items-center justify-between py-5'>
        <div className='flex items-center gap-4'>
          <Image src='/logo.png' alt='logo' width={35} height={35} />
          <div>
            <h1 className='text-2xl uppercase font-black'>Next Pizza</h1>
            <p className='text-sm text-gray-400 leading-3'>
              вкусней уже некуда
            </p>
          </div>
        </div>

        <SearchInput />

        <div className='flex items-center gap-4'>
          <Button
            variant={'outline'}
            className='cursor-pointer transition duration-300'
          >
            <User />
            <span>Профиль</span>
          </Button>
          <CartDrawer>
            <CartButton />
          </CartDrawer>
        </div>
      </Container>
    </header>
  );
}

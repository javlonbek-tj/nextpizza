import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Container } from './Container';
import { Button } from '../ui/button';
import { ArrowRight, ShoppingCart, User } from 'lucide-react';

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
        <div className='flex items-center gap-4'>
          <Button
            variant={'outline'}
            className='cursor-pointer transition duration-300'
          >
            <User />
            <span>Профиль</span>
          </Button>
          <Button className='group relative flex items-center cursor-pointer'>
            <b>500 ₽</b>
            <span className='h-full w-[1] bg-gray-100 mx-2'></span>
            <div className='flex items-center gap-1 group-hover:opacity-0 transition duration-300'>
              <ShoppingCart />
              <span>3</span>
            </div>
            <ArrowRight className='absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100' />
          </Button>
        </div>
      </Container>
    </header>
  );
}

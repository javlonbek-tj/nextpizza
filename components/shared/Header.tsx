import Image from 'next/image';
import { User } from 'lucide-react';

import { cn } from '@/lib';
import { Container } from './Container';
import { Button } from '../ui/button';
import { SearchInput } from '../filters/Search-input';
import { CartButton } from '../cart/';
import Link from 'next/link';

interface Props {
  className?: string;
  hasSearch?: boolean;
  hasCartBtn?: boolean;
}

export function Header({
  className,
  hasSearch = true,
  hasCartBtn = true,
}: Props) {
  return (
    <header className={cn('border border-b', className)}>
      <Container className='flex justify-between items-center py-5'>
        <Link href={'/'}>
          <div className='flex items-center gap-4'>
            <Image src='/logo.png' alt='logo' width={35} height={35} />
            <div>
              <h1 className='font-black text-2xl uppercase'>Next Pizza</h1>
              <p className='text-gray-400 text-sm leading-3'>
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && <SearchInput />}

        <div className='flex items-center gap-4'>
          <Button
            variant={'outline'}
            className='transition duration-300 cursor-pointer'
          >
            <User />
            <span>Профиль</span>
          </Button>

          {hasCartBtn && <CartButton />}
        </div>
      </Container>
    </header>
  );
}

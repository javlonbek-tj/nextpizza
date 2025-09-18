'use client';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { ArrowRight, Loader, ShoppingCart } from 'lucide-react';
import { useCart } from '../hooks';
import { calculateTotalAmount } from '@/lib/cart';
import { CartDrawer } from './Cart-drawer';

interface Props {
  className?: string;
}

export function CartButton({ className }: Props) {
  const { data: cartItems, isPending, isError } = useCart();

  if (isPending && !isError) {
    return (
      <Button
        className={cn('flex items-center min-w-[120px]', className)}
        disabled
      >
        <Loader className='w-5 h-5 animate-spin' />
      </Button>
    );
  }

  if (isError) {
    return (
      <Button
        className={cn('flex items-center min-w-[120px]', className)}
        disabled
      >
        <span className='text-red-500 text-sm'>Ошибка</span>
      </Button>
    );
  }

  const totalAmount = cartItems ? calculateTotalAmount(cartItems) : 0;
  const totalItems = cartItems?.length || 0;

  return (
    <CartDrawer>
      <Button
        className={cn(
          'group relative flex items-center cursor-pointer min-w-[120px]',
          className
        )}
      >
        {totalAmount > 0 && (
          <>
            <b>{totalAmount} ₽</b>
            <span className='bg-gray-100 mx-1 w-px h-5' />
          </>
        )}
        <span className='flex items-center gap-1 group-hover:opacity-0 transition duration-300'>
          <ShoppingCart />
          <span>{totalItems}</span>
        </span>
        <ArrowRight className='right-5 absolute opacity-0 group-hover:opacity-100 transition -translate-x-2 group-hover:translate-x-0 duration-300' />
      </Button>
    </CartDrawer>
  );
}

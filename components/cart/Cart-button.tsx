'use client';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { ArrowRight, Loader, ShoppingCart } from 'lucide-react';
import { useCart } from '../hooks';
import { calculateTotalAmount } from '@/lib/cart';

interface Props {
  className?: string;
}

export function CartButton({ className }: Props) {
  const { data: cartItems, isPending } = useCart();

  if (isPending) {
    return (
      <Button
        className={cn('flex items-center cursor-pointer w-[105px]', className)}
      >
        <Loader className='w-5 h-5 animate-spin' />
      </Button>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return null;
  }

  const totalAmount = calculateTotalAmount(cartItems);
  const totalItems = cartItems.length;

  return (
    <Button
      className={cn(
        'group relative flex items-center cursor-pointer',
        className
      )}
    >
      <b>{totalAmount.toFixed(2)} ₽</b>
      <span className='bg-gray-100 mx-1 w-px h-5' />
      <span className='flex items-center gap-1 group-hover:opacity-0 transition duration-300'>
        <ShoppingCart />
        <span>{totalItems}</span>
      </span>
      <ArrowRight className='right-5 absolute opacity-0 group-hover:opacity-100 transition -translate-x-2 group-hover:translate-x-0 duration-300' />
    </Button>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { PropsWithChildren, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ArrowRight } from 'lucide-react';
import { CartDrawerItem } from './Cart-drawer-item';
import { useCartStore } from '@/store/cart';

export function CartDrawer({ children }: PropsWithChildren) {
  const { items, fetchCartItems, totalAmount } = useCartStore((state) => state);

  console.log(items);

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className='pb-0 bg-[#F4F1EE]'>
        <SheetHeader>
          <SheetTitle>В корзине 3 товара</SheetTitle>
        </SheetHeader>
        <div className='flex flex-col gap-4'>
          {items.map((item) => (
            <CartDrawerItem key={item.id} cartItem={item} />
          ))}
        </div>
        <SheetFooter className='bg-white p-6'>
          <div className='flex items-center justify-between mb-4 gap-4'>
            <span>Итого</span>
            <span className='flex-1 border-b border-dashed border-b-neutral-200 relative top-1'></span>
            <span className='font-bold'>{totalAmount} ₽</span>
          </div>
          <Button className='cursor-pointer h-12'>
            Оформить заказ <ArrowRight className='ml-3' />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

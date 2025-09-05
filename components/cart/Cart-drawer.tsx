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
import { CartDrawerItem } from '../cart/Cart-drawer-item';
import { useCartStore } from '@/store/cart';

export function CartDrawer({ children }: PropsWithChildren) {
  const { items, fetchCartItems, totalAmount } = useCartStore((state) => state);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="bg-[#F4F1EE] pb-0">
        <SheetHeader>
          <SheetTitle>В корзине 3 товара</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <CartDrawerItem key={item.id} cartItem={item} />
          ))}
        </div>
        <SheetFooter className="bg-white p-6">
          <div className="flex justify-between items-center gap-4 mb-4">
            <span>Итого</span>
            <span className="top-1 relative flex-1 border-b border-b-neutral-200 border-dashed"></span>
            <span className="font-bold">{totalAmount} ₽</span>
          </div>
          <Button className="h-12 cursor-pointer">
            Оформить заказ <ArrowRight className="ml-3" />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

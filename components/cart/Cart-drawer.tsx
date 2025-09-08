'use client';

import { Button } from '@/components/ui/button';
import { PropsWithChildren } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CartDrawerItem } from '../cart';

import { calculateTotalAmount, getCartItemDetails } from '@/lib/cart';
import { useCart } from '../hooks';
import Image from 'next/image';
import { Title } from '../shared';
import { cn } from '@/lib';

export function CartDrawer({ children }: PropsWithChildren) {
  const { data, isPending, isError } = useCart();

  const totalAmount = data ? calculateTotalAmount(data) : 0;

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className={cn(
          'bg-[#F4F1EE] pb-0',
          !totalAmount && 'flex items-center justify-center'
        )}
      >
        {/* TODO MAKE MORE NICE LOADING AND ERROR */}
        {isPending && <p>Loading cart...</p>}
        {isError && <p>Error loading cart. Please try again.</p>}
        <>
          {totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle>
                {data?.length === 1
                  ? `В корзине ${data?.length} товар`
                  : `В корзине ${data?.length} товара`}
              </SheetTitle>
            </SheetHeader>
          )}

          {!totalAmount && (
            <div className="flex flex-col justify-center items-center mx-auto w-72">
              <Image
                src="/assets/images/empty-box.png"
                alt="Empty cart"
                width={120}
                height={120}
              />
              <Title
                size="sm"
                text="Корзина пустая"
                className="my-2 font-bold text-center"
              />
              <p className="mb-5 text-neutral-500 text-center">
                Добавьте хотя бы одну пиццу, чтобы совершить заказ
              </p>

              <SheetClose>
                <Button
                  className="w-56 h-12 text-base cursor-pointer"
                  size="lg"
                >
                  <ArrowLeft className="mr-2 w-5" />
                  Вернуться назад
                </Button>
              </SheetClose>
            </div>
          )}

          {totalAmount > 0 && (
            <>
              <div className="flex flex-col gap-4 overflow-auto scrollbar-thin">
                {data?.map((item) => (
                  <CartDrawerItem
                    key={item.id}
                    {...item}
                    details={getCartItemDetails(
                      item.ingredients,
                      item.pizzaSize,
                      item.pizzaType
                    )}
                  />
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
            </>
          )}
        </>
      </SheetContent>
    </Sheet>
  );
}

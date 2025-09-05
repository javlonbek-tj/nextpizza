import { cn } from '@/lib/utils';
import { CartItemState } from '@/store/cart';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';

interface Props {
  className?: string;
  cartItem: CartItemState;
}

export function CartDrawerItem({ className, cartItem }: Props) {
  return (
    <div className={cn('flex items-center bg-white gap-4 -mx-6', className)}>
      <Image
        src={cartItem.imageUrl}
        alt={cartItem.name}
        width={100}
        height={100}
      />
      <div className='flex flex-col gap-2'>
        <span className='font-bold'>{cartItem.name}</span>
        <p>
          {cartItem.pizzaType} {cartItem.pizzaSize} см,{' '}
          {cartItem.ingredients.map((ingredient) => ingredient.name).join(', ')}
        </p>
        <hr />
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <button className='h-6 w-6 rounded-2xl border border-primary'>
              <Minus />
            </button>
            <span>{cartItem.quantity}</span>
            <button className='h-6 w-6 rounded-2xl border border-primary'>
              <Plus />
            </button>
          </div>
          <span className='font-bold'>{cartItem.price} ₽</span>
        </div>
      </div>
    </div>
  );
}

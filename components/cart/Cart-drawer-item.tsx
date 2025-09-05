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
    <div
      className={cn('flex items-center gap-4 bg-white px-4 py-3', className)}
    >
      <Image
        src={cartItem.imageUrl}
        alt={cartItem.name}
        width={60}
        height={60}
      />
      <div className="flex flex-col gap-2">
        <span className="font-bold">{cartItem.name}</span>
        <p className="flex flex-col text-gray-500 text-sm">
          <span>
            {cartItem.pizzaType} {cartItem.pizzaSize} см,{' '}
          </span>
          <span>
            +{' '}
            {cartItem.ingredients
              .map((ingredient) => ingredient.name)
              .join(', ')}
          </span>
        </p>
        <hr />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button className="relative p-3 border-2 border-primary rounded-md w-6 h-6 cursor-pointer">
              <Minus className="top-1/2 left-1/2 absolute text-primary -translate-x-1/2 -translate-y-1/2" />
            </button>
            <span>{cartItem.quantity}</span>
            <button className="relative p-3 border-2 border-primary rounded-md w-6 h-6 cursor-pointer">
              <Plus className="top-1/2 left-1/2 absolute text-primary -translate-x-1/2 -translate-y-1/2" />
            </button>
          </div>
          <span className="font-bold">{cartItem.price} ₽</span>
        </div>
      </div>
    </div>
  );
}

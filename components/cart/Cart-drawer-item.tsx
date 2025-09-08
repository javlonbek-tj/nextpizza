import { cn } from '@/lib/utils';
import Image from 'next/image';
import { CartItemInfo } from './Cart-item-info';
import { CartIconButton } from './Cart-icon-button';
import { Trash2Icon } from 'lucide-react';
import { useRemoveCartItem } from '../hooks/use-cart';

interface Props {
  className?: string;
  id: number;
  imageUrl: string;
  name: string;
  quantity: number;
  totalCartItemPrice: number;
  details: string;
}

export function CartDrawerItem({
  className,
  id,
  imageUrl,
  name,
  quantity,
  totalCartItemPrice,
  details,
}: Props) {
  const { mutate: removeItem, isPending } = useRemoveCartItem();
  return (
    <div
      className={cn('flex items-center gap-4 bg-white px-4 py-3', className)}
    >
      <Image src={imageUrl} alt={name} width={60} height={60} />
      <div className="flex flex-col gap-2">
        <CartItemInfo name={name} details={details} />
        <hr />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <CartIconButton type="minus" quantity={quantity} cartItemId={id} />
            <span className="text-sm">{quantity}</span>
            <CartIconButton type="plus" quantity={quantity} cartItemId={id} />
          </div>
          <div className="flex items-center gap-4">
            <span className='font-bold text-sm"'>
              {totalCartItemPrice.toFixed(2)} ₽
            </span>
            <Trash2Icon
              className="text-red-500 cursor-pointer"
              size={16}
              onClick={() => removeItem({ id })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

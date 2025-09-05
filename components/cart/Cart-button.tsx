import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { ArrowRight, ShoppingCart } from 'lucide-react';

interface Props {
  className?: string;
}

export function CartButton({ className }: Props) {
  return (
    <Button
      className={cn(
        'group relative flex items-center cursor-pointer',
        className
      )}
    >
      <b>500 ₽</b>
      <span className='h-full w-[1] bg-gray-100 mx-2'></span>
      <div className='flex items-center gap-1 group-hover:opacity-0 transition duration-300'>
        <ShoppingCart />
        <span>3</span>
      </div>
      <ArrowRight className='absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100' />
    </Button>
  );
}

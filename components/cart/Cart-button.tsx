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
      <span className="bg-gray-100 mx-2 w-[1] h-full"></span>
      <span className="flex items-center gap-1 group-hover:opacity-0 transition duration-300">
        <ShoppingCart />
        <span>3</span>
      </span>
      <ArrowRight className="right-5 absolute opacity-0 group-hover:opacity-100 transition -translate-x-2 group-hover:translate-x-0 duration-300" />
    </Button>
  );
}

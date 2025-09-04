import { Ingredient } from '@/generated/prisma/client';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import Image from 'next/image';

interface Props {
  className?: string;
  ingredient: Ingredient;
  active?: boolean;
  selectedIngredients: Set<number>;
  onClick: () => void;
}

export function IngredientItem({
  className,
  ingredient,
  active,
  onClick,
}: Props) {
  return (
    <div
      className={cn(
        'flex flex-col relative items-center gap-3 bg-white rounded-3xl p-1 cursor-pointer border border-transparent',
        { 'border border-primary': active },
        className
      )}
      onClick={onClick}
    >
      {active && (
        <span className='border border-primary absolute top-2 right-2 h-5 w-5 rounded-full flex items-center justify-center'>
          <Check className='h-4 w-4 text-primary' />
        </span>
      )}
      <Image
        src={ingredient.imageUrl}
        width={100}
        height={100}
        alt={ingredient.name}
      />
      <p className='leading-none text-center'>{ingredient.name}</p>
      <p className='mt-auto'>{ingredient.price} ₽</p>
    </div>
  );
}

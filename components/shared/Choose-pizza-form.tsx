import { ProductWithRelations } from '@/@types/prisma';
import { cn } from '@/lib';

import { PizzaImage } from './Pizza-image';
import { Title } from './Title';
import {
  mapPizzaType,
  pizzaSizes,
  PizzaType,
  pizzaTypes,
} from '@/constants/pizza';

interface Props {
  className?: string;
  product: ProductWithRelations;
}

export function ChoosePizzaForm({ className, product }: Props) {
  return (
    <div className={cn('flex gap-2 items-center', className)}>
      <PizzaImage imageUrl={product.imageUrl} size={20} />
      <div className='flex-1 bg-[#f7f6f5] h-full p-7'>
        <Title text={product.name} size='md' />
        <p className='text-gray-400'>
          {product.productItems[0].size} см,{' '}
          {mapPizzaType[product.productItems[0].pizzaType as PizzaType]}
        </p>
        <div className='mt-2 bg-gray-200 flex justify-between rounded-full p-0.5'>
          {pizzaSizes.map(({ name, value }) => (
            <button
              key={value}
              className={cn('rounded-full px-4 py-1.5 bg-white flex-1')}
            >
              {name}
            </button>
          ))}
        </div>
        <div className='mt-3 bg-gray-200 flex justify-between rounded-full p-0.5'>
          {pizzaTypes.map(({ name, value }) => (
            <button
              key={value}
              className={cn('rounded-full px-4 py-1.5 bg-white flex-1')}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { ProductWithRelations } from '@/@types/prisma';
import { cn } from '@/lib';

import { PizzaImage } from './Pizza-image';
import { Title } from './Title';
import {
  mapPizzaType,
  PizzaSize,
  pizzaSizes,
  PizzaType,
  pizzaTypes,
} from '@/constants/pizza';
import { useState } from 'react';

interface Props {
  className?: string;
  product: ProductWithRelations;
}

export function ChoosePizzaForm({ className, product }: Props) {
  const [selectedPizzaSize, setSelectedPizzaSize] = useState<PizzaSize>(20);
  const [selectedPizzaTypeIndex, setSelectedPizzaTypeIndex] =
    useState<PizzaType>(1);

  const availablePizzaSizes = product.productItems.filter(
    (item) => item.pizzaType === selectedPizzaTypeIndex
  );

  const allPizzaSizes = pizzaSizes.map(({ name, value }) => {
    return {
      name,
      value,
      disabled: !availablePizzaSizes.some((item) => item.size === value),
    };
  });

  return (
    <div className={cn('flex items-center', className)}>
      <PizzaImage imageUrl={product.imageUrl} size={selectedPizzaSize} />
      <div className="flex-1 bg-[#f7f6f5] p-7 h-full">
        <Title text={product.name} size="md" />
        <p className="text-gray-400">
          {product.productItems[0].size} см,{' '}
          {mapPizzaType[product.productItems[0].pizzaType as PizzaType]}
        </p>
        <div className="flex justify-between bg-gray-200 mt-2 p-0.5 rounded-full">
          {allPizzaSizes.map(({ name, value, disabled }) => (
            <button
              key={value}
              disabled={disabled} // <-- this disables the button at the DOM level
              className={cn(
                'flex-1 px-4 py-1.5 rounded-full',
                selectedPizzaSize === value && 'bg-white',
                disabled && 'bg-gray-300 cursor-not-allowed'
              )}
              onClick={() =>
                !disabled && setSelectedPizzaSize(value as PizzaSize)
              }
            >
              {name}
            </button>
          ))}
        </div>
        <div className="flex justify-between bg-gray-200 mt-3 p-0.5 rounded-full">
          {pizzaTypes.map(({ name, value }) => (
            <button
              key={value}
              className={cn('flex-1 px-4 py-1.5 rounded-full cursor-pointer', {
                'bg-white cursor-not-allowed': value === selectedPizzaTypeIndex,
              })}
              onClick={() => setSelectedPizzaTypeIndex(value as PizzaType)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

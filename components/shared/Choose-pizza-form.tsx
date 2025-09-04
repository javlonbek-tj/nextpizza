'use client';

import { ProductWithRelations } from '@/@types/prisma';
import { cn } from '@/lib';

import { PizzaImage } from './Pizza-image';
import { Title } from './Title';
import { PizzaSize, PizzaType, pizzaTypes } from '@/constants/pizza';

import { usePizzaOptions } from './hooks/use-pizza-options';
import { GroupVariants } from './Group-variants';
import { IngredientItem } from './Ingredient';
import { Button } from '../ui/button';

interface Props {
  className?: string;
  product: ProductWithRelations;
}

export function ChoosePizzaForm({ className, product }: Props) {
  const {
    allPizzaSizes,
    type,
    size,
    setSize,
    setType,
    selectedIngredients,
    addIngredient,
    description,
  } = usePizzaOptions(product);
  return (
    <div className={cn('flex items-center', className)}>
      <PizzaImage imageUrl={product.imageUrl} size={size} />
      <div className='flex-1 bg-[#f7f6f5] p-7 h-full'>
        <Title text={product.name} size='md' />
        <p className='text-gray-400'>{description}</p>
        <GroupVariants
          variants={allPizzaSizes}
          value={size}
          onClick={(value) => setSize(value as PizzaSize)}
          className='mt-4'
        />
        <GroupVariants
          variants={pizzaTypes}
          value={type}
          onClick={(value) => setType(value as PizzaType)}
          className='mt-3'
        />
        <Title text='Ингредиенты' size='xs' className='mt-4' />
        <div className='grid grid-cols-3 gap-2 mt-4 h-[420px] overflow-y-scroll scrollbar-thin'>
          {product.ingredients.map((ingredient) => (
            <IngredientItem
              ingredient={ingredient}
              key={ingredient.id}
              selectedIngredients={selectedIngredients}
              onClick={() => addIngredient(ingredient.id)}
              active={selectedIngredients.has(ingredient.id)}
            />
          ))}
        </div>

        <Button className='mt-5 w-full py-5 cursor-pointer'>
          Добавить в корзину за 576 ₽
        </Button>
      </div>
    </div>
  );
}

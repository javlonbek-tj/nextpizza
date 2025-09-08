'use client';

import { ProductWithRelations } from '@/prisma/@types/prisma';
import { cn } from '@/lib';

import { PizzaImage } from './Pizza-image';
import { Title } from '../shared';
import { PizzaSize, PizzaType, pizzaTypes } from '@/constants';

import { usePizzaOptions } from '../hooks';
import { GroupVariants } from './Group-variants';
import { IngredientItem } from './Ingredient';
import { Button } from '../ui/button';
import { useAddToCart } from '../hooks/use-cart';

interface Props {
  className?: string;
  product: ProductWithRelations;
  onClose: () => void;
}

export function ChoosePizzaForm({ className, product, onClose }: Props) {
  const {
    allPizzaSizes,
    type,
    size,
    setSize,
    setType,
    selectedIngredients,
    addIngredient,
    description,
    hasValidPizzaItems,
    error,
    selectedPizzaItemId,
    totalPrice,
  } = usePizzaOptions(product);

  const { mutate: addToCart, isPending } = useAddToCart();

  function handleAddToCart() {
    if (selectedPizzaItemId) {
      addToCart({
        productItemId: selectedPizzaItemId,
        ingredients: Array.from(selectedIngredients),
        quantity: 1,
      });
    }
    onClose();
  }

  if (!hasValidPizzaItems) {
    return (
      <div
        className={cn(
          'flex justify-center items-center min-h-[500px]',
          className
        )}
      >
        <div className="p-8 text-center">
          <Title text="Продукт недоступен" size="md" className="text-red-600" />
          <p className="mt-2 text-gray-500">{error}</p>
          <p className="mt-4 text-gray-400 text-sm">
            Обратитесь к администратору для исправления конфигурации товара
          </p>
          <Button
            onClick={onClose}
            variant="outline"
            className="mt-4 cursor-pointer"
          >
            Закрыть
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center', className)}>
      <PizzaImage imageUrl={product.imageUrl} size={size} />
      <div className="flex-1 bg-[#f7f6f5] p-7 h-full">
        <Title text={product.name} size="md" />

        <p className="text-gray-400">{description}</p>

        <GroupVariants
          variants={allPizzaSizes}
          value={size}
          onClick={(value) => setSize(value as PizzaSize)}
          className="mt-4"
        />

        <GroupVariants
          variants={pizzaTypes}
          value={type}
          onClick={(value) => setType(value as PizzaType)}
          className="mt-3"
        />

        <Title text="Ингредиенты" size="xs" className="mt-4" />

        <div className="gap-2 grid grid-cols-3 mt-4 h-[400px] overflow-y-scroll scrollbar-thin">
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

        <Button
          className="mt-5 py-5 w-full cursor-pointer"
          disabled={isPending}
          onClick={handleAddToCart}
        >
          {isPending
            ? 'Добавляем...'
            : `Добавить в корзину за ${totalPrice.toFixed(2)} ₽`}
        </Button>
      </div>
    </div>
  );
}

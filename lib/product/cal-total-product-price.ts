import { PizzaSize, PizzaType } from '@/constants/pizza';
import { ProductItem } from '@/generated/prisma/client';

export const totalProductPrice = (
  items: ProductItem[],
  type: PizzaType,
  size: PizzaSize,
  selectedIngredients: Set<number>
) => {
  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)
      ?.price || 0;

  const totalIngredientsPrice = items.reduce(
    (acc, item) => acc + (selectedIngredients.has(item.id) ? item.price : 0),
    0
  );

  return Math.round(pizzaPrice + totalIngredientsPrice);
};

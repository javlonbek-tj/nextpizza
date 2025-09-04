import { mapPizzaType, PizzaSize } from './../../../constants/pizza';
import { useEffect, useState } from 'react';
import { ProductWithRelations } from '@/@types/prisma';
import { pizzaSizes, PizzaType } from '@/constants/pizza';
import { Variant } from '../Group-variants';
import { useSet } from 'react-use';

interface ReturnProps {
  type: PizzaType;
  setType: (type: PizzaType) => void;
  size: PizzaSize;
  setSize: (size: PizzaSize) => void;
  allPizzaSizes: Variant[];
  selectedIngredients: Set<number>;
  addIngredient: (id: number) => void;
  description: string;
}

export const usePizzaOptions = (product: ProductWithRelations): ReturnProps => {
  const defaultType = product.productItems[0]?.pizzaType as PizzaType;
  const defaultSize = product.productItems[0]?.size as PizzaSize;

  const [type, setType] = useState<PizzaType>(defaultType);
  const [size, setSize] = useState<PizzaSize>(defaultSize);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const availablePizzaSizes = product.productItems
    .filter((item) => item.pizzaType === type)
    .map((item) => {
      return { size: item.size };
    });

  useEffect(() => {
    const isAvailableSize = availablePizzaSizes?.find(
      (item) => item.size === size
    );
    if (!isAvailableSize) {
      setSize(availablePizzaSizes[0].size as PizzaSize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const allPizzaSizes = pizzaSizes.map(({ name, value }): Variant => {
    return {
      name,
      value,
      disabled: !availablePizzaSizes.some((item) => item.size === value),
    };
  });

  const description = `${size} см, ${mapPizzaType[type]} пицца`;

  return {
    type,
    setType,
    size,
    setSize,
    allPizzaSizes,
    selectedIngredients,
    addIngredient,
    description,
  };
};

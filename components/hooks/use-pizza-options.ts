import { mapPizzaType, PizzaSize } from '../../constants/pizza';
import { ProductWithRelations } from '@/@types/prisma';
import { pizzaSizes, PizzaType } from '@/constants/pizza';
import { Variant } from '../product/Group-variants';
import { useSet } from 'react-use';
import { useState } from 'react';

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

  const availableSizes = product.productItems
    .filter((item) => item.pizzaType === type)
    .map((item) => {
      return { size: item.size };
    });
  const handleTypeChange = (newType: PizzaType) => {
    const newAvailableSizes = product.productItems
      .filter((item) => item.pizzaType === newType)
      .map((item) => ({ size: item.size }));

    const isCurrentSizeAvailable = newAvailableSizes.find(
      (item) => item.size === size
    );

    setType(newType);
    if (!isCurrentSizeAvailable && newAvailableSizes.length > 0) {
      setSize(newAvailableSizes[0].size as PizzaSize);
    }
  };

  const allPizzaSizes = pizzaSizes.map(({ name, value }): Variant => {
    return {
      name,
      value,
      disabled: !availableSizes.some((item) => item.size === value),
    };
  });

  const description = `${size} см, ${mapPizzaType[type]} пицца`;

  return {
    type,
    setType: handleTypeChange,
    size,
    setSize,
    allPizzaSizes,
    selectedIngredients,
    addIngredient,
    description,
  };
};
